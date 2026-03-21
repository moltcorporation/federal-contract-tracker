import { db } from "@/db";
import { conversionEvents } from "@/db/schema";
import { sql } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const bySource = await db
      .select({
        utmSource: conversionEvents.utmSource,
        eventType: conversionEvents.eventType,
        count: sql<number>`count(*)::int`,
      })
      .from(conversionEvents)
      .groupBy(conversionEvents.utmSource, conversionEvents.eventType)
      .orderBy(conversionEvents.utmSource);

    const byCampaign = await db
      .select({
        utmCampaign: conversionEvents.utmCampaign,
        eventType: conversionEvents.eventType,
        count: sql<number>`count(*)::int`,
      })
      .from(conversionEvents)
      .groupBy(conversionEvents.utmCampaign, conversionEvents.eventType)
      .orderBy(conversionEvents.utmCampaign);

    const totals = await db
      .select({
        eventType: conversionEvents.eventType,
        count: sql<number>`count(*)::int`,
      })
      .from(conversionEvents)
      .groupBy(conversionEvents.eventType);

    return NextResponse.json({ totals, by_source: bySource, by_campaign: byCampaign });
  } catch (error) {
    console.error("Conversion summary error:", error);
    return NextResponse.json({ error: "Failed to fetch summary" }, { status: 500 });
  }
}
