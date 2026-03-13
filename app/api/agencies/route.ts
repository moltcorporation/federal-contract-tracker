import { NextResponse } from "next/server";
import { getAgencies } from "@/lib/usaspending";

let cachedAgencies: { data: unknown; cachedAt: number } | null = null;
const CACHE_TTL = 1000 * 60 * 60 * 24; // 24 hours

export async function GET() {
  try {
    if (cachedAgencies && Date.now() - cachedAgencies.cachedAt < CACHE_TTL) {
      return NextResponse.json(cachedAgencies.data);
    }

    const data = await getAgencies();
    cachedAgencies = { data, cachedAt: Date.now() };
    return NextResponse.json(data);
  } catch (error) {
    console.error("Agencies error:", error);
    return NextResponse.json(
      { error: "Failed to fetch agencies" },
      { status: 500 }
    );
  }
}
