"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";

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

const SET_ASIDE_LABELS: Record<string, string> = {
  SBA: "Small Business (SBA)",
  "8A": "8(a)",
  HZC: "HUBZone",
  WOSB: "WOSB",
  SDVOSBC: "SDVOSB",
  ESB: "EDWOSB",
};

function formatFilter(search: SavedSearch): string {
  const parts: string[] = [];
  if (search.naics) parts.push(`NAICS ${search.naics}`);
  if (search.agency) parts.push(search.agency);
  if (search.recipient) parts.push(`Recipient: ${search.recipient}`);
  if (search.set_aside)
    parts.push(SET_ASIDE_LABELS[search.set_aside] || search.set_aside);
  if (search.psc) parts.push(`PSC ${search.psc}`);
  if (search.min_amount || search.max_amount) {
    const min = search.min_amount ? `$${Number(search.min_amount).toLocaleString()}` : "$0";
    const max = search.max_amount ? `$${Number(search.max_amount).toLocaleString()}` : "any";
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

export default function SavedSearchesPage() {
  const [searches, setSearches] = useState<SavedSearch[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [upgradeUrl, setUpgradeUrl] = useState<string | null>(null);
  const [deleting, setDeleting] = useState<number | null>(null);

  const fetchSearches = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/saved-searches");
      const data = await res.json();
      if (!res.ok) {
        setError(data.error);
        if (data.upgradeUrl) setUpgradeUrl(data.upgradeUrl);
        return;
      }
      setSearches(data.searches);
    } catch {
      setError("Failed to load saved searches.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSearches();
  }, [fetchSearches]);

  async function handleDelete(id: number) {
    setDeleting(id);
    try {
      const res = await fetch(`/api/saved-searches/${id}`, { method: "DELETE" });
      if (res.ok) {
        setSearches((prev) => prev.filter((s) => s.id !== id));
      }
    } finally {
      setDeleting(null);
    }
  }

  return (
    <div className="flex min-h-screen flex-col bg-slate-950 font-sans">
      <header className="flex items-center justify-between border-b border-slate-800 px-6 py-4">
        <Link href="/" className="flex items-center gap-2">
          <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6 text-blue-400" aria-hidden="true">
            <path d="M3 21V7l9-4 9 4v14" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
            <path d="M9 21V13h6v8" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
            <circle cx="12" cy="9.5" r="1.5" fill="currentColor" />
          </svg>
          <span className="text-lg font-bold tracking-tight text-white">
            GovScout
          </span>
        </Link>
        <div className="flex items-center gap-4">
          <Link href="/trends" className="text-sm font-medium text-slate-400 transition-colors hover:text-blue-400">Trends</Link>
          <Link href="/pricing" className="text-sm font-medium text-blue-400 transition-colors hover:text-blue-300">Pricing</Link>
        </div>
      </header>

      <main className="mx-auto flex w-full max-w-3xl flex-col gap-8 px-4 py-12">
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Saved Searches
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Your saved contract searches. Click &quot;Run&quot; to execute a
            search with those filters.
          </p>
        </div>

        {loading && (
          <div className="flex items-center justify-center py-16">
            <div className="h-6 w-6 animate-spin rounded-full border-2 border-blue-600 border-t-transparent" />
          </div>
        )}

        {error && (
          <div className="flex flex-col items-center gap-4 rounded-xl border border-amber-200 bg-amber-50 p-8 text-center dark:border-amber-900/30 dark:bg-amber-950/20">
            <p className="text-sm font-medium text-amber-800 dark:text-amber-300">
              {error}
            </p>
            {upgradeUrl && (
              <a
                href={upgradeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg bg-blue-600 px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-400"
              >
                Upgrade to Enterprise
              </a>
            )}
          </div>
        )}

        {!loading && !error && searches.length === 0 && (
          <div className="flex flex-col items-center gap-4 rounded-xl border border-slate-200 bg-white p-12 text-center dark:border-slate-800 dark:bg-slate-900">
            <p className="text-sm text-slate-500 dark:text-slate-400">
              No saved searches yet. Run a search and click &quot;Save this
              search&quot; to add one here.
            </p>
            <Link
              href="/"
              className="rounded-lg bg-blue-600 px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-400"
            >
              Search contracts
            </Link>
          </div>
        )}

        {!loading && !error && searches.length > 0 && (
          <div className="flex flex-col gap-3">
            {searches.map((search) => (
              <div
                key={search.id}
                className="flex items-center justify-between gap-4 rounded-lg border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900"
              >
                <div className="flex min-w-0 flex-col gap-1">
                  <h3 className="truncate font-semibold text-slate-900 dark:text-white">
                    {search.name}
                  </h3>
                  <p className="truncate text-xs text-slate-500 dark:text-slate-400">
                    {formatFilter(search)}
                  </p>
                  <p className="text-xs text-slate-400 dark:text-slate-500">
                    Saved{" "}
                    {new Date(search.created_at).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </p>
                </div>
                <div className="flex shrink-0 items-center gap-2">
                  <Link
                    href={buildSearchUrl(search)}
                    className="rounded-lg bg-blue-600 px-4 py-2 text-xs font-semibold text-white transition-all hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-400"
                  >
                    Run
                  </Link>
                  <button
                    onClick={() => handleDelete(search.id)}
                    disabled={deleting === search.id}
                    className="rounded-lg border border-slate-200 px-3 py-2 text-xs font-medium text-slate-500 transition-all hover:border-red-300 hover:text-red-600 disabled:opacity-50 dark:border-slate-700 dark:text-slate-400 dark:hover:border-red-800 dark:hover:text-red-400"
                  >
                    {deleting === search.id ? "..." : "Delete"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      <footer className="flex flex-col items-center gap-3 border-t border-slate-800 px-6 py-6">
        <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-slate-500">
          <span className="font-medium">Moltcorp Products:</span>
          <span className="font-semibold text-blue-400">GovScout</span>
          <a href="https://statusping-moltcorporation.vercel.app" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-blue-400">StatusPing</a>
          <a href="https://qr-code-tool-moltcorporation.vercel.app" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-blue-400">OneQR</a>
        </div>
        <p className="text-xs text-slate-600">
          Data from{" "}
          <a href="https://usaspending.gov" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-blue-400">USASpending.gov</a>
          {" "}· Built by agents at{" "}
          <a href="https://moltcorporation.com" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-blue-400">Moltcorp</a>
        </p>
      </footer>
    </div>
  );
}
