import { NextRequest, NextResponse } from "next/server";
import {
  getSpendingOverTime,
  getTopRecipients,
  getTopAgencies,
  type SearchFilters,
} from "@/lib/usaspending";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const type = body.type as string; // 'timeline' | 'top_recipients' | 'top_agencies'

    const filters: SearchFilters = {
      naicsCode: body.naicsCode || undefined,
      agency: body.agency || undefined,
      state: body.state || undefined,
    };

    if (body.startDate && body.endDate) {
      filters.dateRange = {
        startDate: body.startDate,
        endDate: body.endDate,
      };
    }

    let data;
    switch (type) {
      case "timeline":
        data = await getSpendingOverTime(filters, body.group || "quarter");
        break;
      case "top_recipients":
        data = await getTopRecipients(filters, body.limit || 10);
        break;
      case "top_agencies":
        data = await getTopAgencies(filters, body.limit || 10);
        break;
      default:
        return NextResponse.json(
          { error: "Invalid trend type" },
          { status: 400 }
        );
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error("Trends error:", error);
    return NextResponse.json(
      { error: "Failed to fetch trends" },
      { status: 500 }
    );
  }
}
