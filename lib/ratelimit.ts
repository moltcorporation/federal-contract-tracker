import { sql } from "drizzle-orm";
import { createHash } from "crypto";

const FREE_LIMIT = 10; // searches per 24 hours
const WINDOW_MS = 24 * 60 * 60 * 1000; // 24 hours

export function hashIp(ip: string): string {
  return createHash("sha256").update(ip).digest("hex").slice(0, 16);
}

async function getDb() {
  const { db } = await import("@/db");
  return db;
}

async function getSearchesTable() {
  const { searches } = await import("@/db/schema");
  return searches;
}

export async function checkRateLimit(
  ipHash: string
): Promise<{ allowed: boolean; remaining: number; used: number }> {
  try {
    const db = await getDb();
    const searches = await getSearchesTable();
    const windowStart = new Date(Date.now() - WINDOW_MS);

    const result = await db
      .select({ count: sql<number>`count(*)::int` })
      .from(searches)
      .where(
        sql`${searches.ipHash} = ${ipHash} AND ${searches.createdAt} > ${windowStart}`
      );

    const used = result[0]?.count ?? 0;
    const remaining = Math.max(0, FREE_LIMIT - used);

    return {
      allowed: used < FREE_LIMIT,
      remaining,
      used,
    };
  } catch {
    // If DB is unavailable, allow the request
    return { allowed: true, remaining: FREE_LIMIT, used: 0 };
  }
}

export async function recordSearch(
  ipHash: string,
  keywords?: string
): Promise<void> {
  try {
    const db = await getDb();
    const searches = await getSearchesTable();
    await db.insert(searches).values({
      ipHash,
      keywords: keywords || null,
    });
  } catch {
    // Silently fail - don't block search if recording fails
  }
}
