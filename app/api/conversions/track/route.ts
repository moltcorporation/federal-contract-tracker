import { db } from "@/db";
import { conversionEvents } from "@/db/schema";
import { sendToGA4 } from "@/lib/ga4";
import { NextResponse } from "next/server";

const VALID_EVENTS = ["page_view", "signup_completed", "search_completed", "checkout_initiated", "purchase_completed"];

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { event_type, user_id, utm_source, utm_medium, utm_campaign, utm_content, utm_term } = body;

    if (!event_type || !VALID_EVENTS.includes(event_type)) {
      return NextResponse.json(
        { error: `Invalid event_type. Must be one of: ${VALID_EVENTS.join(", ")}` },
        { status: 400 }
      );
    }

    const sanitize = (v: unknown) => (typeof v === "string" ? v.trim().slice(0, 200) : null);

    const utmSourceVal = sanitize(utm_source);
    const utmMediumVal = sanitize(utm_medium);
    const utmCampaignVal = sanitize(utm_campaign);

    await db.insert(conversionEvents).values({
      eventType: event_type,
      userId: typeof user_id === "number" ? user_id : null,
      utmSource: utmSourceVal,
      utmMedium: utmMediumVal,
      utmCampaign: utmCampaignVal,
      utmContent: sanitize(utm_content),
      utmTerm: sanitize(utm_term),
    });

    // Send to GA4 (fire-and-forget)
    sendToGA4({
      event_type,
      user_id: typeof user_id === "number" ? String(user_id) : undefined,
      timestamp: Date.now(),
      product_name: "GovScout",
      utm_source: utmSourceVal,
      utm_medium: utmMediumVal,
      utm_campaign: utmCampaignVal,
    }).catch(() => {
      // GA4 errors don't block user flows
    });

    return NextResponse.json({ ok: true }, { status: 201 });
  } catch (error) {
    console.error("Conversion track error:", error);
    return NextResponse.json({ error: "Failed to record event" }, { status: 500 });
  }
}
