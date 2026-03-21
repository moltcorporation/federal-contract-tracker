import { db } from "@/db";
import { dripSchedule, dripUnsubscribes, users } from "@/db/schema";
import { DRIP_EMAILS } from "@/lib/drip-emails";
import { checkProAccess } from "@/lib/stripe";
import { eq, sql } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

function getResend() {
  return new Resend(process.env.RESEND_API_KEY);
}
const BATCH_SIZE = 20;
const FROM_EMAIL = process.env.DRIP_FROM_EMAIL || "GovScout <noreply@moltcorporation.com>";

export async function POST(req: NextRequest) {
  // Authenticate with CRON_SECRET
  const authHeader = req.headers.get("authorization");
  const cronSecret = process.env.CRON_SECRET;
  if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const now = new Date();

    // Fetch pending drip emails that are due
    const pending = await db
      .select({
        dripId: dripSchedule.id,
        userId: dripSchedule.userId,
        emailStep: dripSchedule.emailStep,
        userEmail: users.email,
        userName: users.name,
      })
      .from(dripSchedule)
      .innerJoin(users, eq(dripSchedule.userId, users.id))
      .where(
        sql`${dripSchedule.sentAt} IS NULL AND ${dripSchedule.sendAt} <= ${now}`
      )
      .limit(BATCH_SIZE);

    if (pending.length === 0) {
      return NextResponse.json({ sent: 0, skipped: 0 });
    }

    // Get unsubscribed user IDs
    const userIds = [...new Set(pending.map((p) => p.userId))];
    const unsubs = await db
      .select({ userId: dripUnsubscribes.userId })
      .from(dripUnsubscribes)
      .where(sql`${dripUnsubscribes.userId} IN (${sql.join(userIds.map(id => sql`${id}`), sql`, `)})`);
    const unsubSet = new Set(unsubs.map((u) => u.userId));

    let sent = 0;
    let skipped = 0;

    for (const item of pending) {
      // Skip unsubscribed users
      if (unsubSet.has(item.userId)) {
        await db
          .update(dripSchedule)
          .set({ sentAt: now })
          .where(eq(dripSchedule.id, item.dripId));
        skipped++;
        continue;
      }

      // Skip users who already upgraded to Pro
      const isPro = await checkProAccess(item.userEmail);
      if (isPro) {
        await db
          .update(dripSchedule)
          .set({ sentAt: now })
          .where(eq(dripSchedule.id, item.dripId));
        skipped++;
        continue;
      }

      const template = DRIP_EMAILS[item.emailStep];
      if (!template) {
        skipped++;
        continue;
      }

      try {
        await getResend().emails.send({
          from: FROM_EMAIL,
          to: item.userEmail,
          subject: template.subject,
          html: template.html({
            name: item.userName,
            email: item.userEmail,
            userId: item.userId,
          }),
        });

        await db
          .update(dripSchedule)
          .set({ sentAt: now })
          .where(eq(dripSchedule.id, item.dripId));
        sent++;
      } catch (err) {
        console.error(`Drip send failed for user ${item.userId} step ${item.emailStep}:`, err);
      }
    }

    return NextResponse.json({ sent, skipped });
  } catch (error) {
    console.error("Drip cron error:", error);
    return NextResponse.json({ error: "Drip processing failed" }, { status: 500 });
  }
}
