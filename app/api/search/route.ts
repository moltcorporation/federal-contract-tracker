import { NextRequest, NextResponse } from "next/server";
import { createHash } from "crypto";
import { db } from "@/db";
import { searchLogs } from "@/db/schema";
import { buildCheckoutUrl, checkProAccess } from "@/lib/stripe";
import { sql } from "drizzle-orm";

const FREE_LIMIT = 10;
const WINDOW_MS = 24 * 60 * 60 * 1000;

export async function POST(req: NextRequest) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const { keyword, naics, agency, minAmount, maxAmount, year, setAside, recipient, psc } = body;

  // Check Pro status
  const proEmail = req.cookies.get("fct_pro_email")?.value;
  let isPro = false;
  if (proEmail) {
    isPro = await checkProAccess(proEmail);
  }

  // Rate limiting
  const forwarded = req.headers.get("x-forwarded-for");
  const ip = forwarded?.split(",")[0]?.trim() || "unknown";
  const ipHash = createHash("sha256").update(ip).digest("hex");

  let used = 0;
  if (!isPro) {
    try {
      const windowStart = new Date(Date.now() - WINDOW_MS);
      const [countResult] = await db
        .select({ count: sql<number>`count(*)::int` })
        .from(searchLogs)
        .where(
          sql`${searchLogs.ipHash} = ${ipHash} AND ${searchLogs.searchedAt} >= ${windowStart}`
        );

      used = countResult?.count ?? 0;

      if (used >= FREE_LIMIT) {
        return NextResponse.json(
          {
            error: "Daily search limit reached. Upgrade to Pro for unlimited searches.",
            remaining: 0,
            limit: FREE_LIMIT,
            upgradeUrl: buildCheckoutUrl(),
          },
          { status: 429 }
        );
      }
    } catch {
      // DB unavailable — fail open so searches still work
      console.error("Rate limit DB query failed, allowing search");
    }
  }

  const filters: Record<string, unknown> = {
    award_type_codes: ["A", "B", "C", "D"],
  };

  if (keyword) {
    filters.keywords = [keyword];
  }

  if (naics) {
    filters.naics_codes = { require: [naics] };
  }

  if (psc) {
    filters.psc_codes = { require: [psc] };
  }

  if (agency) {
    filters.agencies = [
      { type: "awarding", tier: "toptier", name: agency },
    ];
  }

  if (recipient) {
    filters.recipient_search_text = [recipient];
  }

  if (setAside) {
    filters.set_aside_type_codes = { require: [setAside] };
  }

  const amounts: { lower_bound?: number; upper_bound?: number } = {};
  if (minAmount) amounts.lower_bound = Number(minAmount);
  if (maxAmount) amounts.upper_bound = Number(maxAmount);
  if (amounts.lower_bound || amounts.upper_bound) {
    filters.award_amounts = [amounts];
  }

  const selectedYear = (year as string) || new Date().getFullYear().toString();
  filters.time_period = [
    {
      start_date: `${selectedYear}-01-01`,
      end_date: `${selectedYear}-12-31`,
    },
  ];

  try {
    const res = await fetch(
      "https://api.usaspending.gov/api/v2/search/spending_by_award/",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          filters,
          fields: [
            "Award ID",
            "Recipient Name",
            "Description",
            "Award Amount",
            "Awarding Agency",
            "Awarding Sub Agency",
            "Start Date",
            "End Date",
            "Award Type",
            "recipient_id",
            "internal_id",
          ],
          page: body.page || 1,
          limit: 20,
          sort: "Award Amount",
          order: "desc",
          subawards: false,
        }),
      }
    );

    if (!res.ok) {
      return NextResponse.json(
        { error: "Failed to fetch from USASpending API" },
        { status: 502 }
      );
    }

    // Log the search (non-blocking — don't let DB errors break search)
    try {
      await db.insert(searchLogs).values({ ipHash });
    } catch {
      console.error("Failed to log search, continuing");
    }

    const data = await res.json();
    const remaining = isPro ? -1 : FREE_LIMIT - used - 1;

    return NextResponse.json({
      ...data,
      remaining,
      limit: isPro ? -1 : FREE_LIMIT,
      isPro,
    });
  } catch {
    return NextResponse.json(
      { error: "Failed to connect to USASpending API" },
      { status: 502 }
    );
  }
}
