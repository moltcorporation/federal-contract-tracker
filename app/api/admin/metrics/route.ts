import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { users, savedSearches } from "@/db/schema";
import { sql, count, countDistinct } from "drizzle-orm";

export async function GET(request: NextRequest) {
  const authHeader = request.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.ADMIN_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const [totalSignups] = await db
      .select({ total: count() })
      .from(users);

    const [signupsToday] = await db
      .select({ total: count() })
      .from(users)
      .where(sql`${users.createdAt} >= current_date`);

    const bySource = await db
      .select({
        source: sql<string>`coalesce(${users.signupSource}, 'direct')`,
        total: count(),
      })
      .from(users)
      .groupBy(sql`coalesce(${users.signupSource}, 'direct')`);

    const [proUsers] = await db
      .select({ total: count() })
      .from(users)
      .where(sql`${users.plan} != 'free'`);

    // Activated users = users who saved at least one search
    const [activated] = await db
      .select({ total: countDistinct(savedSearches.email) })
      .from(savedSearches);

    const activatedCount = activated.total;
    const activationRate =
      totalSignups.total > 0
        ? Math.round((activatedCount / totalSignups.total) * 1000) / 10
        : 0;

    return NextResponse.json({
      signups_total: totalSignups.total,
      signups_today: signupsToday.total,
      signups_by_source: bySource.reduce(
        (acc, row) => ({ ...acc, [row.source]: row.total }),
        {} as Record<string, number>
      ),
      pro_users: proUsers.total,
      activated_users: activatedCount,
      activation_rate: activationRate,
      generated_at: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Metrics error:", error);
    return NextResponse.json(
      { error: "Failed to fetch metrics" },
      { status: 500 }
    );
  }
}
