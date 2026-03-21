import { db } from "@/db";
import { conversionEvents } from "@/db/schema";
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

    await db.insert(conversionEvents).values({
      eventType: event_type,
      userId: typeof user_id === "number" ? user_id : null,
      utmSource: sanitize(utm_source),
      utmMedium: sanitize(utm_medium),
      utmCampaign: sanitize(utm_campaign),
      utmContent: sanitize(utm_content),
      utmTerm: sanitize(utm_term),
    });

    return NextResponse.json({ ok: true }, { status: 201 });
  } catch (error) {
    console.error("Conversion track error:", error);
    return NextResponse.json({ error: "Failed to record event" }, { status: 500 });
  }
}
