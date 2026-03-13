import { NextRequest, NextResponse } from "next/server";
import { searchAwards, type SearchFilters } from "@/lib/usaspending";
import { checkProAccess, buildCheckoutUrl } from "@/lib/stripe";
import { hashIp, checkRateLimit, recordSearch } from "@/lib/ratelimit";

export const dynamic = "force-dynamic";

const FREE_RESULT_LIMIT = 25;
const PRO_RESULT_LIMIT = 100;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Check for Pro access via cookie
    const email = req.cookies.get("fct_email")?.value;
    const isPro = email ? await checkProAccess(email) : false;

    // Rate limit free users
    if (!isPro) {
      const ip =
        req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
      const ipHash = hashIp(ip);
      const { allowed, remaining } = await checkRateLimit(ipHash);

      if (!allowed) {
        return NextResponse.json(
          {
            error:
              "Rate limit exceeded. Upgrade to Pro for unlimited searches.",
            upgradeUrl: buildCheckoutUrl(email || undefined),
            remaining: 0,
          },
          { status: 429 }
        );
      }

      // Record this search
      const keywords = [body.recipientName, body.agency, body.naicsCode]
        .filter(Boolean)
        .join(", ");
      await recordSearch(ipHash, keywords || undefined);

      // Include remaining in response headers
      const response = await buildSearchResponse(body, FREE_RESULT_LIMIT);
      response.headers.set("X-RateLimit-Remaining", String(remaining - 1));
      return response;
    }

    return buildSearchResponse(body, PRO_RESULT_LIMIT);
  } catch (error) {
    console.error("Search error:", error);
    return NextResponse.json(
      { error: "Failed to search contracts" },
      { status: 500 }
    );
  }
}

async function buildSearchResponse(
  body: Record<string, unknown>,
  maxLimit: number
): Promise<NextResponse> {
  const filters: SearchFilters = {
    naicsCode: (body.naicsCode as string) || undefined,
    agency: (body.agency as string) || undefined,
    recipientName: (body.recipientName as string) || undefined,
    state: (body.state as string) || undefined,
    minAmount: body.minAmount ? Number(body.minAmount) : undefined,
    maxAmount: body.maxAmount ? Number(body.maxAmount) : undefined,
    setAsideType: (body.setAsideType as string) || undefined,
    page: (body.page as number) || 1,
    limit: Math.min((body.limit as number) || 25, maxLimit),
  };

  if (body.startDate && body.endDate) {
    filters.dateRange = {
      startDate: body.startDate as string,
      endDate: body.endDate as string,
    };
  }

  const data = await searchAwards(filters);
  return NextResponse.json(data);
}
