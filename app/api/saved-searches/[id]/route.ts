import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { savedSearches } from "@/db/schema";
import { checkProAccess, buildCheckoutUrl } from "@/lib/stripe";
import { eq, and } from "drizzle-orm";

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const email = req.cookies.get("fct_pro_email")?.value;
  if (!email) {
    return NextResponse.json(
      { error: "Login required", upgradeUrl: buildCheckoutUrl() },
      { status: 401 }
    );
  }

  const isPro = await checkProAccess(email);
  if (!isPro) {
    return NextResponse.json(
      {
        error: "Pro plan required.",
        upgradeUrl: buildCheckoutUrl(email),
      },
      { status: 403 }
    );
  }

  const searchId = parseInt(id, 10);
  if (isNaN(searchId)) {
    return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
  }

  const deleted = await db
    .delete(savedSearches)
    .where(
      and(eq(savedSearches.id, searchId), eq(savedSearches.email, email))
    )
    .returning();

  if (deleted.length === 0) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json({ success: true });
}
