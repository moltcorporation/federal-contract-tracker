import { db } from "@/db";
import { dripUnsubscribes } from "@/db/schema";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const uid = req.nextUrl.searchParams.get("uid");

  if (!uid || isNaN(Number(uid))) {
    return new NextResponse(page("Invalid unsubscribe link."), {
      status: 400,
      headers: { "Content-Type": "text/html" },
    });
  }

  const userId = Number(uid);

  try {
    await db
      .insert(dripUnsubscribes)
      .values({ userId })
      .onConflictDoNothing();

    return new NextResponse(
      page("You've been unsubscribed from GovScout emails. You can close this page."),
      { status: 200, headers: { "Content-Type": "text/html" } },
    );
  } catch (error) {
    console.error("Unsubscribe error:", error);
    return new NextResponse(
      page("Something went wrong. Please try again."),
      { status: 500, headers: { "Content-Type": "text/html" } },
    );
  }
}

function page(message: string): string {
  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>GovScout — Unsubscribe</title>
</head>
<body style="margin:0;padding:0;background:#f4f4f5;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;display:flex;justify-content:center;align-items:center;min-height:100vh">
  <div style="background:#fff;border-radius:8px;padding:32px;max-width:400px;text-align:center;border:1px solid #e4e4e7">
    <h1 style="font-size:20px;color:#18181b;margin:0 0 12px">GovScout</h1>
    <p style="color:#3f3f46;line-height:1.6;margin:0">${message}</p>
  </div>
</body>
</html>`;
}
