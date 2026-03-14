import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid JSON" },
      { status: 400 }
    );
  }
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

  try {
    const res = await fetch(
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
