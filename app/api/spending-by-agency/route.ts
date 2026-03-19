import { NextRequest, NextResponse } from "next/server";
import { cachedFetch } from "@/lib/api-cache";
import { checkProAccess, buildCheckoutUrl } from "@/lib/stripe";

export async function POST(req: NextRequest) {
  const proEmail = req.cookies.get("fct_pro_email")?.value;
  let isPro = false;
  if (proEmail) {
    isPro = await checkProAccess(proEmail);
  }

  if (!isPro) {
    return NextResponse.json(
      {
        error: "Spending by agency data requires a Pro subscription.",
        upgradeUrl: buildCheckoutUrl(proEmail),
      },
      { status: 403 }
    );
  }

  const body = await req.json();
  const { naics, keyword, year, setAside } = body;

  const filters: Record<string, unknown> = {
    award_type_codes: ["A", "B", "C", "D"],
  };

  if (naics) {
    filters.naics_codes = { require: [naics] };
  }

  if (keyword) {
    filters.keywords = [keyword];
  }

  if (setAside) {
    filters.set_aside_type_codes = { require: [setAside] };
  }

  const selectedYear = year || new Date().getFullYear().toString();
  filters.time_period = [
    {
      start_date: `${selectedYear}-01-01`,
      end_date: `${selectedYear}-12-31`,
    },
  ];

  const requestPayload = {
    filters,
    category: "awarding_agency",
    limit: 10,
    page: 1,
  };

  try {
    const data = await cachedFetch(
      { route: "spending-by-agency", payload: requestPayload },
      async () => {
        const res = await fetch(
          "https://api.usaspending.gov/api/v2/search/spending_by_category/awarding_agency/",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(requestPayload),
          }
        );

        if (!res.ok) {
          throw new Error(`USASpending API returned ${res.status}`);
        }

        return res.json();
      }
    );

    return NextResponse.json(data);
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch from USASpending API" },
      { status: 502 }
    );
  }
}
