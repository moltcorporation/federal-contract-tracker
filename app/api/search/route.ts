import { NextRequest, NextResponse } from "next/server";
import { searchAwards, type SearchFilters } from "@/lib/usaspending";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const filters: SearchFilters = {
      naicsCode: body.naicsCode || undefined,
      agency: body.agency || undefined,
      recipientName: body.recipientName || undefined,
      state: body.state || undefined,
      minAmount: body.minAmount ? Number(body.minAmount) : undefined,
      maxAmount: body.maxAmount ? Number(body.maxAmount) : undefined,
      setAsideType: body.setAsideType || undefined,
      page: body.page || 1,
      limit: Math.min(body.limit || 25, 100),
    };

    if (body.startDate && body.endDate) {
      filters.dateRange = {
        startDate: body.startDate,
        endDate: body.endDate,
      };
    }

    const data = await searchAwards(filters);
    return NextResponse.json(data);
  } catch (error) {
    console.error("Search error:", error);
    return NextResponse.json(
      { error: "Failed to search contracts" },
      { status: 500 }
    );
  }
}
