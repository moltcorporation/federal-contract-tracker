import { NextRequest, NextResponse } from "next/server";
import { cachedFetch } from "@/lib/api-cache";
import { checkProAccess, buildCheckoutUrl } from "@/lib/stripe";

function buildFilters(body: {
  naics?: string;
  setAside?: string;
  state?: string;
  years?: number;
}) {
  const { naics, setAside, state, years = 3 } = body;
  const filters: Record<string, unknown> = {
    award_type_codes: ["A", "B", "C", "D"],
  };

  const now = new Date();
  const endYear = now.getFullYear();
  const startYear = endYear - years;
  filters.time_period = [
    {
      start_date: `${startYear}-10-01`,
      end_date: `${endYear}-09-30`,
    },
  ];

  if (naics) filters.naics_codes = { require: [naics] };
  if (setAside) filters.set_aside_type_codes = { require: [setAside] };
  if (state) filters.place_of_performance_locations = [{ country: "USA", state }];

  return filters;
}

export async function POST(req: NextRequest) {
  const proEmail = req.cookies.get("fct_pro_email")?.value;
  let isPro = false;
  if (proEmail) {
    isPro = await checkProAccess(proEmail);
  }

  const body = await req.json();
  const filters = buildFilters({
    ...body,
    years: isPro ? (body.years || 3) : 2,
  });

  const resultLimit = isPro ? 10 : 5;
  const timelinePayload = { group: "quarter", filters };
  const recipientsPayload = { filters, category: "recipient", limit: resultLimit, page: 1 };
  const agenciesPayload = { filters, category: "awarding_agency", limit: resultLimit, page: 1 };

  const fetchWithCache = (route: string, url: string, payload: unknown) =>
    cachedFetch({ route, payload }, async () => {
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error(`USASpending API returned ${res.status}`);
      return res.json();
    });

  let timelineData, recipientsData, agenciesData;
  try {
    [timelineData, recipientsData, agenciesData] = await Promise.all([
      fetchWithCache("trends-timeline", "https://api.usaspending.gov/api/v2/search/spending_over_time/", timelinePayload),
      fetchWithCache("trends-recipients", "https://api.usaspending.gov/api/v2/search/spending_by_category/recipient/", recipientsPayload),
      fetchWithCache("trends-agencies", "https://api.usaspending.gov/api/v2/search/spending_by_category/awarding_agency/", agenciesPayload),
    ]);
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch trends data" },
      { status: 502 }
    );
  }

  return NextResponse.json({
    isPro,
    upgradeUrl: isPro ? undefined : buildCheckoutUrl(proEmail),
    timeline: (timelineData.results || []).map(
      (r: { aggregated_amount: number; time_period: { fiscal_year: string; quarter: string } }) => ({
        amount: r.aggregated_amount,
        fiscalYear: r.time_period.fiscal_year,
        quarter: r.time_period.quarter,
      })
    ),
    recipients: (recipientsData.results || []).map(
      (r: { name: string; amount: number; code: string }) => ({
        name: r.name,
        amount: r.amount,
        code: r.code,
      })
    ),
    agencies: (agenciesData.results || []).map(
      (r: { name: string; amount: number; code: string; id: number }) => ({
        name: r.name,
        amount: r.amount,
        code: r.code,
        id: r.id,
      })
    ),
  });
}
