import { NextRequest, NextResponse } from "next/server";

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
  const body = await req.json();
  const filters = buildFilters(body);

  const [timelineRes, recipientsRes, agenciesRes] = await Promise.all([
    fetch("https://api.usaspending.gov/api/v2/search/spending_over_time/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ group: "quarter", filters }),
    }),
    fetch(
      "https://api.usaspending.gov/api/v2/search/spending_by_category/recipient/",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ filters, category: "recipient", limit: 10, page: 1 }),
      }
    ),
    fetch(
      "https://api.usaspending.gov/api/v2/search/spending_by_category/awarding_agency/",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          filters,
          category: "awarding_agency",
          limit: 10,
          page: 1,
        }),
      }
    ),
  ]);

  if (!timelineRes.ok || !recipientsRes.ok || !agenciesRes.ok) {
    return NextResponse.json(
      { error: "Failed to fetch trends data" },
      { status: 502 }
    );
  }

  const [timelineData, recipientsData, agenciesData] = await Promise.all([
    timelineRes.json(),
    recipientsRes.json(),
    agenciesRes.json(),
  ]);

  return NextResponse.json({
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
