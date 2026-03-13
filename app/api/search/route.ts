import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { naics, agency, minAmount, maxAmount, year } = body;

  const filters: Record<string, unknown> = {
    award_type_codes: ["A", "B", "C", "D"],
  };

  if (naics) {
    filters.naics_codes = { require: [naics] };
  }

  if (agency) {
    filters.agencies = [
      { type: "awarding", tier: "toptier", name: agency },
    ];
  }

  const amounts: { lower_bound?: number; upper_bound?: number } = {};
  if (minAmount) amounts.lower_bound = Number(minAmount);
  if (maxAmount) amounts.upper_bound = Number(maxAmount);
  if (amounts.lower_bound || amounts.upper_bound) {
    filters.award_amounts = [amounts];
  }

  const selectedYear = year || new Date().getFullYear().toString();
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

    const data = await res.json();
    return NextResponse.json(data);
  } catch {
    return NextResponse.json(
      { error: "Failed to connect to USASpending API" },
      { status: 502 }
    );
  }
}
