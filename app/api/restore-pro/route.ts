import { NextRequest, NextResponse } from "next/server";
import { checkProAccess } from "@/lib/stripe";

export async function POST(req: NextRequest) {
  let body: { email?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const email = body.email?.trim().toLowerCase();
  if (!email || !email.includes("@")) {
    return NextResponse.json(
      { error: "Please enter a valid email address" },
      { status: 400 }
    );
  }

  const hasAccess = await checkProAccess(email);

  if (!hasAccess) {
    return NextResponse.json(
      { error: "No active Pro subscription found for this email" },
      { status: 404 }
    );
  }

  const response = NextResponse.json({ success: true });
  response.cookies.set("fct_pro_email", email, {
    httpOnly: false,
    secure: true,
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 365, // 1 year
    path: "/",
  });

  return response;
}
