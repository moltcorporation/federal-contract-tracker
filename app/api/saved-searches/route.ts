import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { savedSearches } from "@/db/schema";
import { checkProAccess, buildCheckoutUrl } from "@/lib/stripe";
import { eq } from "drizzle-orm";

export async function GET(req: NextRequest) {
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
        error: "Pro plan required for saved searches.",
        upgradeUrl: buildCheckoutUrl(email),
      },
      { status: 403 }
    );
  }

  const searches = await db
    .select()
    .from(savedSearches)
    .where(eq(savedSearches.email, email))
    .orderBy(savedSearches.createdAt);

  return NextResponse.json({ searches });
}

export async function POST(req: NextRequest) {
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
        error: "Pro plan required for saved searches.",
        upgradeUrl: buildCheckoutUrl(email),
      },
      { status: 403 }
    );
  }

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const name = (body.name as string) || "Untitled search";

  const [search] = await db
    .insert(savedSearches)
    .values({
      email,
      name,
      naics: (body.naics as string) || null,
      agency: (body.agency as string) || null,
      recipient: (body.recipient as string) || null,
      setAside: (body.setAside as string) || null,
      psc: (body.psc as string) || null,
      minAmount: (body.minAmount as string) || null,
      maxAmount: (body.maxAmount as string) || null,
      year: (body.year as string) || null,
    })
    .returning();

  return NextResponse.json({ search }, { status: 201 });
}
