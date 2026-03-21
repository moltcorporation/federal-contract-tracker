import { db } from "@/db";
import { conversionEvents, users } from "@/db/schema";
import { sql } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const source = searchParams.get("source");
    const campaign = searchParams.get("campaign");
    const days = Math.min(parseInt(searchParams.get("days") || "30", 10), 90);

    const since = new Date();
    since.setDate(since.getDate() - days);

    const sourceFilter = source
      ? sql`AND utm_source = ${source}`
      : sql``;
    const campaignFilter = campaign
      ? sql`AND utm_campaign = ${campaign}`
      : sql``;

    // Funnel: signups → searches → checkout initiated → purchase completed
    const funnel = await db.execute(sql`
      SELECT
        COUNT(*) FILTER (WHERE event_type = 'signup_completed') AS signups,
        COUNT(*) FILTER (WHERE event_type = 'search_completed') AS searches,
        COUNT(*) FILTER (WHERE event_type = 'checkout_initiated') AS checkouts,
        COUNT(*) FILTER (WHERE event_type = 'purchase_completed') AS purchases
      FROM conversion_events
      WHERE created_at >= ${since}
        ${sourceFilter}
        ${campaignFilter}
    `);

    // Total registered users with UTM attribution
    const usersBySource = await db.execute(sql`
      SELECT
        utm_source,
        utm_medium,
        utm_campaign,
        COUNT(*) AS user_count
      FROM users
      WHERE created_at >= ${since}
        AND utm_source IS NOT NULL
      GROUP BY utm_source, utm_medium, utm_campaign
      ORDER BY user_count DESC
      LIMIT 50
    `);

    const row = funnel.rows[0] || { signups: 0, searches: 0, checkouts: 0, purchases: 0 };

    return NextResponse.json({
      period_days: days,
      filters: { source: source || "all", campaign: campaign || "all" },
      funnel: {
        signups: Number(row.signups),
        searches: Number(row.searches),
        checkouts: Number(row.checkouts),
        purchases: Number(row.purchases),
        signup_to_search_rate: Number(row.signups) > 0
          ? Math.round((Number(row.searches) / Number(row.signups)) * 10000) / 100
          : 0,
        signup_to_checkout_rate: Number(row.signups) > 0
          ? Math.round((Number(row.checkouts) / Number(row.signups)) * 10000) / 100
          : 0,
        checkout_to_purchase_rate: Number(row.checkouts) > 0
          ? Math.round((Number(row.purchases) / Number(row.checkouts)) * 10000) / 100
          : 0,
        signup_to_purchase_rate: Number(row.signups) > 0
          ? Math.round((Number(row.purchases) / Number(row.signups)) * 10000) / 100
          : 0,
      },
      users_by_source: usersBySource.rows,
    });
  } catch (error) {
    console.error("Conversion funnel error:", error);
    return NextResponse.json({ error: "Failed to fetch funnel" }, { status: 500 });
  }
}
