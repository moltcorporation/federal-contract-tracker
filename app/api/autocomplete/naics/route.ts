import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { search_text } = body;

  if (!search_text || typeof search_text !== "string" || search_text.length < 2) {
    return NextResponse.json({ results: [] });
  }

  const res = await fetch(
    "https://api.usaspending.gov/api/v2/autocomplete/naics/",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ search_text, limit: 10 }),
    }
  );

  if (!res.ok) {
    return NextResponse.json({ results: [] }, { status: 502 });
  }

  const data = await res.json();
  const results = (data.results || [])
    .filter((r: { year_retired: number | null }) => !r.year_retired)
    .map((r: { naics: string; naics_description: string }) => ({
      code: r.naics,
      description: r.naics_description,
    }));

  return NextResponse.json({ results });
}
