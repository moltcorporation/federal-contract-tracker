import { NextRequest, NextResponse } from "next/server";
import { buildCheckoutUrl, checkProAccess } from "@/lib/stripe";

export async function POST(req: NextRequest) {
  // Check Pro status
  const proEmail = req.cookies.get("fct_pro_email")?.value;
  let isPro = false;
  if (proEmail) {
    isPro = await checkProAccess(proEmail);
  }

  if (!isPro) {
    return NextResponse.json(
      {
        error: "CSV export requires a Pro subscription.",
        upgradeUrl: buildCheckoutUrl(),
      },
      { status: 403 }
    );
  }

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const { naics, agency, minAmount, maxAmount, year, setAside, recipient, psc } = body;

  const filters: Record<string, unknown> = {
    award_type_codes: ["A", "B", "C", "D"],
  };

  if (naics) filters.naics_codes = { require: [naics] };
  if (psc) filters.psc_codes = { require: [psc] };
  if (agency) filters.agencies = [{ type: "awarding", tier: "toptier", name: agency }];
  if (recipient) filters.recipient_search_text = [recipient];
  if (setAside) filters.set_aside_type_codes = { require: [setAside] };

  const amounts: { lower_bound?: number; upper_bound?: number } = {};
  if (minAmount) amounts.lower_bound = Number(minAmount);
  if (maxAmount) amounts.upper_bound = Number(maxAmount);
  if (amounts.lower_bound || amounts.upper_bound) {
    filters.award_amounts = [amounts];
  }

  const selectedYear = (year as string) || new Date().getFullYear().toString();
  filters.time_period = [
    { start_date: `${selectedYear}-01-01`, end_date: `${selectedYear}-12-31` },
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
            "Award Amount",
            "Awarding Agency",
            "Awarding Sub Agency",
            "Start Date",
            "End Date",
            "Award Type",
            "Description",
          ],
          page: 1,
          limit: 500,
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
    const results = data.results || [];

    // Build CSV
    const headers = [
      "Award ID",
      "Recipient",
      "Agency",
      "Sub Agency",
      "Amount",
      "Start Date",
      "End Date",
      "Award Type",
      "Description",
    ];

    const escapeField = (val: unknown): string => {
      const str = String(val ?? "");
      if (str.includes(",") || str.includes('"') || str.includes("\n")) {
        return `"${str.replace(/"/g, '""')}"`;
      }
      return str;
    };

    const rows = results.map(
      (r: Record<string, unknown>) =>
        [
          escapeField(r["Award ID"]),
          escapeField(r["Recipient Name"]),
          escapeField(r["Awarding Agency"]),
          escapeField(r["Awarding Sub Agency"]),
          escapeField(r["Award Amount"]),
          escapeField(r["Start Date"]),
          escapeField(r["End Date"]),
          escapeField(r["Award Type"]),
          escapeField(r["Description"]),
        ].join(",")
    );

    const csv = [headers.join(","), ...rows].join("\n");

    return new Response(csv, {
      headers: {
        "Content-Type": "text/csv; charset=utf-8",
        "Content-Disposition": `attachment; filename="contracts-${selectedYear}.csv"`,
      },
    });
  } catch {
    return NextResponse.json(
      { error: "Failed to connect to USASpending API" },
      { status: 502 }
    );
  }
}
