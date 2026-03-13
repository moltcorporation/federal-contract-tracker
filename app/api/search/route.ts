import { NextRequest, NextResponse } from "next/server";

const USA_SPENDING_API = "https://api.usaspending.gov/api/v2";

export async function POST(request: NextRequest) {
  let body: {
    keywords?: string;
    page?: number;
    sort?: string;
    order?: string;
  };

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const { keywords, page = 1, sort = "Award Amount", order = "desc" } = body;

  if (!keywords || typeof keywords !== "string" || keywords.trim().length === 0) {
    return NextResponse.json(
      { error: "Keywords are required" },
      { status: 400 }
    );
  }

  if (keywords.length > 200) {
    return NextResponse.json(
      { error: "Keywords too long (max 200 characters)" },
      { status: 400 }
    );
  }

  try {
    const res = await fetch(`${USA_SPENDING_API}/search/spending_by_award/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        filters: {
          keywords: [keywords.trim()],
          award_type_codes: ["A", "B", "C", "D"],
        },
        fields: [
          "Award ID",
          "Recipient Name",
          "Award Amount",
          "Description",
          "Start Date",
          "End Date",
          "Awarding Agency",
        ],
        limit: 25,
        page,
        sort,
        order,
      }),
    });

    if (!res.ok) {
      return NextResponse.json(
        { error: `USASpending API returned ${res.status}` },
        { status: 502 }
      );
    }

    const data = await res.json();

    return NextResponse.json({
      results: data.results.map(
        (r: {
          internal_id: number;
          "Award ID": string;
          "Recipient Name": string;
          "Award Amount": number;
          Description: string;
          "Start Date": string;
          "End Date": string;
          "Awarding Agency": string;
        }) => ({
          id: r.internal_id,
          awardId: r["Award ID"],
          recipient: r["Recipient Name"],
          amount: r["Award Amount"],
          description: r["Description"],
          startDate: r["Start Date"],
          endDate: r["End Date"],
          agency: r["Awarding Agency"],
        })
      ),
      hasNext: data.page_metadata?.hasNext ?? false,
      page,
    });
  } catch (err) {
    console.error("USASpending API error:", err);
    return NextResponse.json(
      { error: "Failed to fetch contract data" },
      { status: 502 }
    );
  }
}
