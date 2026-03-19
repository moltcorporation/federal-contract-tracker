import { getSession } from "@/lib/auth";
import { db } from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { naicsCodes, skip } = await request.json();

    if (skip) {
      await db
        .update(users)
        .set({ onboardingCompleted: true })
        .where(eq(users.id, session.userId));

      return NextResponse.json({ success: true });
    }

    if (!Array.isArray(naicsCodes) || naicsCodes.length === 0) {
      return NextResponse.json(
        { error: "Select at least one industry or skip" },
        { status: 400 }
      );
    }

    const codes = naicsCodes
      .filter((c: unknown) => typeof c === "string" && /^\d{2,6}$/.test(c))
      .slice(0, 10);

    if (codes.length === 0) {
      return NextResponse.json(
        { error: "No valid NAICS codes provided" },
        { status: 400 }
      );
    }

    await db
      .update(users)
      .set({
        naicsCodes: JSON.stringify(codes),
        onboardingCompleted: true,
      })
      .where(eq(users.id, session.userId));

    return NextResponse.json({ success: true, naicsCodes: codes });
  } catch {
    return NextResponse.json(
      { error: "Failed to save preferences" },
      { status: 500 }
    );
  }
}
