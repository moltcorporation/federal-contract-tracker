"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { CrossProductFooter } from "@/app/components/cross-product-footer";

interface User {
  id: number;
  email: string;
  name: string | null;
  naicsCodes: string[] | null;
  onboardingCompleted: boolean;
}

interface SavedSearch {
  id: number;
  name: string;
  naics: string | null;
  agency: string | null;
  recipient: string | null;
  set_aside: string | null;
  psc: string | null;
  min_amount: string | null;
  max_amount: string | null;
  year: string | null;
  created_at: string;
}

const POPULAR_NAICS = [
  { code: "541512", label: "IT Services" },
  { code: "236220", label: "Construction" },
  { code: "541330", label: "Engineering" },
  { code: "541611", label: "Management Consulting" },
  { code: "561720", label: "Janitorial Services" },
  { code: "541511", label: "Custom Software" },
];

function formatFilter(search: SavedSearch): string {
  const parts: string[] = [];
  if (search.naics) parts.push(`NAICS ${search.naics}`);
  if (search.agency) parts.push(search.agency);
  if (search.recipient) parts.push(`Recipient: ${search.recipient}`);
  if (search.set_aside) parts.push(search.set_aside);
  if (search.psc) parts.push(`PSC ${search.psc}`);
  if (search.min_amount || search.max_amount) {
    const min = search.min_amount
      ? `$${Number(search.min_amount).toLocaleString()}`
      : "$0";
    const max = search.max_amount
      ? `$${Number(search.max_amount).toLocaleString()}`
      : "any";
    parts.push(`${min}–${max}`);
  }
  if (search.year) parts.push(search.year);
  return parts.length > 0 ? parts.join(" · ") : "All contracts";
}

function buildSearchUrl(search: SavedSearch): string {
  const params = new URLSearchParams();
  if (search.naics) params.set("naics", search.naics);
  if (search.agency) params.set("agency", search.agency);
  if (search.recipient) params.set("recipient", search.recipient);
  if (search.set_aside) params.set("setAside", search.set_aside);
  if (search.psc) params.set("psc", search.psc);
  if (search.min_amount) params.set("minAmount", search.min_amount);
  if (search.max_amount) params.set("maxAmount", search.max_amount);
  if (search.year) params.set("year", search.year);
  const qs = params.toString();
  return qs ? `/?${qs}` : "/";
}

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [searches, setSearches] = useState<SavedSearch[]>([]);
  const [loading, setLoading] = useState(true);
  const [isPro, setIsPro] = useState(false);

  useEffect(() => {
    async function load() {
      try {
        const meRes = await fetch("/api/auth/me");
        const meData = await meRes.json();
        if (!meRes.ok || !meData.user) {
          router.push("/login");
          return;
        }
        setUser(meData.user);

        // Try loading saved searches (will fail with 403 if not Pro)
        const searchRes = await fetch("/api/saved-searches");
        if (searchRes.ok) {
          const searchData = await searchRes.json();
          setSearches(searchData.searches || []);
          setIsPro(true);
        }
      } catch {
        router.push("/login");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [router]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-950">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-blue-600 border-t-transparent" />
      </div>
    );
  }

  if (!user) return null;

  const hasSearches = searches.length > 0;
  const hasNaics = user.naicsCodes && user.naicsCodes.length > 0;

  return (
    <div className="flex min-h-screen flex-col bg-slate-950 font-sans">
      <header className="flex items-center justify-between border-b border-slate-800 px-6 py-4">
        <Link href="/" className="flex items-center gap-2">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            className="h-6 w-6 text-blue-400"
            aria-hidden="true"
          >
            <path
              d="M3 21V7l9-4 9 4v14"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinejoin="round"
            />
            <path
              d="M9 21V13h6v8"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinejoin="round"
            />
            <circle cx="12" cy="9.5" r="1.5" fill="currentColor" />
          </svg>
          <span className="text-lg font-bold tracking-tight text-white">
            GovScout
          </span>
        </Link>
        <div className="flex items-center gap-4">
          <Link
            href="/"
            className="text-sm font-medium text-slate-400 transition-colors hover:text-blue-400"
          >
            Search
          </Link>
          <Link
            href="/trends"
            className="text-sm font-medium text-slate-400 transition-colors hover:text-blue-400"
          >
            Trends
          </Link>
          <Link
            href="/saved-searches"
            className="text-sm font-medium text-slate-400 transition-colors hover:text-blue-400"
          >
            Saved
          </Link>
          <Link
            href="/pricing"
            className="text-sm font-medium text-slate-400 transition-colors hover:text-blue-400"
          >
            Pricing
          </Link>
        </div>
      </header>

      <main className="mx-auto flex w-full max-w-4xl flex-col gap-8 px-4 py-8">
        {/* Welcome + status */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white">
              {user.name ? `Welcome back, ${user.name}` : "Welcome back"}
            </h1>
            <p className="mt-1 text-sm text-slate-400">{user.email}</p>
          </div>
          <div className="flex items-center gap-3">
            <span
              className={`rounded-full px-3 py-1 text-xs font-semibold ${
                isPro
                  ? "bg-blue-900/50 text-blue-300 border border-blue-700"
                  : "bg-slate-800 text-slate-400 border border-slate-700"
              }`}
            >
              {isPro ? "Pro" : "Free"}
            </span>
            {!isPro && (
              <Link
                href="/pricing"
                className="rounded-lg bg-blue-600 px-4 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-blue-700"
              >
                Upgrade to Pro
              </Link>
            )}
          </div>
        </div>

        {/* Quick actions */}
        <div className="grid gap-4 sm:grid-cols-3">
          <Link
            href="/"
            className="flex flex-col gap-2 rounded-xl border border-slate-800 bg-slate-900 p-5 transition-colors hover:border-blue-700"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-900/50">
              <svg
                className="h-5 w-5 text-blue-400"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                />
              </svg>
            </div>
            <span className="text-sm font-semibold text-white">
              Search contracts
            </span>
            <span className="text-xs text-slate-500">
              150K+ federal contract awards
            </span>
          </Link>

          <Link
            href="/trends"
            className="flex flex-col gap-2 rounded-xl border border-slate-800 bg-slate-900 p-5 transition-colors hover:border-blue-700"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-900/50">
              <svg
                className="h-5 w-5 text-blue-400"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 3v11.25A2.25 2.25 0 0 0 6 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0 1 18 16.5h-2.25m-7.5 0h7.5m-7.5 0-1 3m8.5-3 1 3m0 0 .5 1.5m-.5-1.5h-9.5m0 0-.5 1.5"
                />
              </svg>
            </div>
            <span className="text-sm font-semibold text-white">
              Spending trends
            </span>
            <span className="text-xs text-slate-500">
              Agency spending over time
            </span>
          </Link>

          <Link
            href="/saved-searches"
            className="flex flex-col gap-2 rounded-xl border border-slate-800 bg-slate-900 p-5 transition-colors hover:border-blue-700"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-900/50">
              <svg
                className="h-5 w-5 text-blue-400"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z"
                />
              </svg>
            </div>
            <span className="text-sm font-semibold text-white">
              Saved searches
            </span>
            <span className="text-xs text-slate-500">
              {isPro
                ? `${searches.length} saved search${searches.length !== 1 ? "es" : ""}`
                : "Pro feature"}
            </span>
          </Link>
        </div>

        {/* Saved searches section (Pro users with searches) */}
        {isPro && hasSearches && (
          <section>
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-white">
                Your saved searches
              </h2>
              <Link
                href="/saved-searches"
                className="text-xs font-medium text-blue-400 hover:text-blue-300"
              >
                View all
              </Link>
            </div>
            <div className="flex flex-col gap-3">
              {searches.slice(0, 5).map((search) => (
                <div
                  key={search.id}
                  className="flex items-center justify-between gap-4 rounded-lg border border-slate-800 bg-slate-900 p-4"
                >
                  <div className="flex min-w-0 flex-col gap-1">
                    <h3 className="truncate font-semibold text-white">
                      {search.name}
                    </h3>
                    <p className="truncate text-xs text-slate-400">
                      {formatFilter(search)}
                    </p>
                  </div>
                  <Link
                    href={buildSearchUrl(search)}
                    className="shrink-0 rounded-lg bg-blue-600 px-4 py-2 text-xs font-semibold text-white transition-all hover:bg-blue-700"
                  >
                    Run
                  </Link>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Empty state: first-use experience */}
        {!hasSearches && !hasNaics && (
          <section className="rounded-xl border border-slate-800 bg-slate-900 p-8 text-center">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-blue-900/50">
              <svg
                className="h-7 w-7 text-blue-400"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                />
              </svg>
            </div>
            <h2 className="text-lg font-bold text-white">
              Set up your first saved search
            </h2>
            <p className="mx-auto mt-2 max-w-md text-sm text-slate-400">
              Start by searching contracts in your industry. Save searches to
              get email alerts when new awards match your criteria.
            </p>

            <div className="mt-6">
              <p className="mb-3 text-xs font-medium uppercase tracking-wider text-slate-600">
                Popular starting points
              </p>
              <div className="flex flex-wrap justify-center gap-2">
                {POPULAR_NAICS.map((cat) => (
                  <Link
                    key={cat.code}
                    href={`/?naics=${cat.code}`}
                    className="rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-xs font-medium text-slate-300 transition-colors hover:border-blue-600 hover:text-blue-300"
                  >
                    {cat.label}
                    <span className="ml-1 text-slate-500">{cat.code}</span>
                  </Link>
                ))}
              </div>
            </div>

            <Link
              href="/"
              className="mt-6 inline-block rounded-lg bg-blue-600 px-6 py-2.5 text-sm font-semibold text-white shadow-lg shadow-blue-600/25 transition-all hover:bg-blue-700"
            >
              Search all contracts
            </Link>
          </section>
        )}

        {/* Empty state: has NAICS but no saved searches */}
        {!hasSearches && hasNaics && (
          <section className="rounded-xl border border-slate-800 bg-slate-900 p-8 text-center">
            <h2 className="text-lg font-bold text-white">
              Ready to find contracts
            </h2>
            <p className="mx-auto mt-2 max-w-md text-sm text-slate-400">
              Your industry preferences are set. Search for contracts and save
              the ones that match your business to get email alerts.
            </p>
            <div className="mt-4 flex flex-wrap justify-center gap-2">
              {user.naicsCodes!.slice(0, 4).map((code) => (
                <Link
                  key={code}
                  href={`/?naics=${code}`}
                  className="rounded-lg border border-blue-700 bg-blue-900/30 px-3 py-2 text-xs font-medium text-blue-300 transition-colors hover:bg-blue-900/50"
                >
                  NAICS {code}
                </Link>
              ))}
            </div>
            <Link
              href="/"
              className="mt-6 inline-block rounded-lg bg-blue-600 px-6 py-2.5 text-sm font-semibold text-white shadow-lg shadow-blue-600/25 transition-all hover:bg-blue-700"
            >
              Search contracts
            </Link>
          </section>
        )}
      </main>

      <CrossProductFooter />
    </div>
  );
}
