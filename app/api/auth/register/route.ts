import { db } from "@/db";
import { users } from "@/db/schema";
import { hashPassword, createSession } from "@/lib/auth";
import { scheduleDrip } from "@/lib/drip";
import { trackServerEvent } from "@/lib/track";
import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";

export async function POST(request: Request) {
  try {
    const { email, password, name, utm_source, utm_medium, utm_campaign } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { error: "Password must be at least 6 characters" },
        { status: 400 }
      );
    }

    const existing = await db
      .select({ id: users.id })
      .from(users)
      .where(eq(users.email, email.toLowerCase().trim()))
      .limit(1);

    if (existing.length > 0) {
      return NextResponse.json(
        { error: "An account with this email already exists" },
        { status: 409 }
      );
    }

    const passwordHash = await hashPassword(password);
    const sanitizeUtm = (v: unknown) => (typeof v === "string" ? v.trim().slice(0, 200) || null : null);
    const utmSource = sanitizeUtm(utm_source);
    const utmMedium = sanitizeUtm(utm_medium);
    const utmCampaign = sanitizeUtm(utm_campaign);

    const [user] = await db
      .insert(users)
      .values({
        email: email.toLowerCase().trim(),
        passwordHash,
        name: name?.trim() || null,
        ...(utmSource && { utmSource }),
        ...(utmMedium && { utmMedium }),
        ...(utmCampaign && { utmCampaign }),
      })
      .returning({ id: users.id });

    await createSession(user.id);

    // Track signup conversion event
    await trackServerEvent(String(user.id), "signup", {
      utmSource,
      utmMedium,
      utmCampaign,
    });

    // Schedule B2B drip email sequence (non-blocking)
    scheduleDrip(user.id).catch((err) =>
      console.error("Failed to schedule drip for user", user.id, err)
    );

    return NextResponse.json({ id: user.id }, { status: 201 });
  } catch (error) {
    console.error("Register error:", error);
    return NextResponse.json({ error: "Registration failed" }, { status: 500 });
  }
}
