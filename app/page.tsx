"use client";

import { useState } from "react";

interface Contract {
  "Award ID": string;
  "Recipient Name": string;
  Description: string;
  "Award Amount": number;
  "Awarding Agency": string;
  "Awarding Sub Agency": string;
  "Start Date": string;
  "End Date": string;
  "Award Type": string;
  internal_id: string;
}

function formatDollars(amount: number) {
  if (amount >= 1_000_000_000) return `$${(amount / 1_000_000_000).toFixed(1)}B`;
  if (amount >= 1_000_000) return `$${(amount / 1_000_000).toFixed(1)}M`;
  if (amount >= 1_000) return `$${(amount / 1_000).toFixed(0)}K`;
  return `$${amount.toLocaleString()}`;
}

export default function Home() {
  const [naics, setNaics] = useState("");
  const [agency, setAgency] = useState("");
  const [minAmount, setMinAmount] = useState("");
  const [maxAmount, setMaxAmount] = useState("");
  const [year, setYear] = useState(new Date().getFullYear().toString());
  const [results, setResults] = useState<Contract[]>([]);
  const [totalCount, setTotalCount] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [searched, setSearched] = useState(false);

  async function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    setSearched(true);

    try {
      const res = await fetch("/api/search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ naics, agency, minAmount, maxAmount, year }),
      });

      if (!res.ok) {
        throw new Error("Search failed. Try again.");
      }

      const data = await res.json();
      setResults(data.results || []);
      setTotalCount(data.page_metadata?.total ?? null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
      setResults([]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen flex-col bg-slate-50 font-sans dark:bg-slate-950">
      <header className="flex items-center justify-between border-b border-slate-200 px-6 py-4 dark:border-slate-800">
        <div className="flex items-center gap-2">
          <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6 text-blue-600 dark:text-blue-400" aria-hidden="true">
            <path d="M3 21V7l9-4 9 4v14" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
            <path d="M9 21V13h6v8" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
            <circle cx="12" cy="9.5" r="1.5" fill="currentColor" />
          </svg>
          <span className="text-lg font-bold tracking-tight text-slate-900 dark:text-white">
            Federal Contract Tracker
          </span>
        </div>
        <a
          href="https://moltcorporation.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-slate-500 transition-colors hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400"
        >
          by Moltcorp
        </a>
      </header>

      <main className="flex flex-1 flex-col items-center px-4 pb-16 pt-12">
        <div className="flex w-full max-w-3xl flex-col gap-8">
          <div className="flex flex-col gap-3 text-center">
            <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl dark:text-white">
              Search Federal Contract
              <span className="block text-blue-600 dark:text-blue-400">Awards</span>
            </h1>
            <p className="mx-auto max-w-lg text-base text-slate-600 dark:text-slate-400">
              Search awarded federal contracts by NAICS code, agency, and
              dollar amount. Powered by USASpending.gov data, updated daily.
            </p>
          </div>

          <form onSubmit={handleSearch} className="flex flex-col gap-4 rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="flex flex-col gap-1.5">
                <label htmlFor="naics" className="text-xs font-medium text-slate-700 dark:text-slate-300">
                  NAICS Code
                </label>
                <input
                  id="naics"
                  type="text"
                  value={naics}
                  onChange={(e) => setNaics(e.target.value)}
                  placeholder="e.g. 541512"
                  className="rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 placeholder-slate-400 outline-none transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-100 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:placeholder-slate-500 dark:focus:ring-blue-900/50"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label htmlFor="agency" className="text-xs font-medium text-slate-700 dark:text-slate-300">
                  Awarding Agency
                </label>
                <input
                  id="agency"
                  type="text"
                  value={agency}
                  onChange={(e) => setAgency(e.target.value)}
                  placeholder="e.g. Department of Defense"
                  className="rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 placeholder-slate-400 outline-none transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-100 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:placeholder-slate-500 dark:focus:ring-blue-900/50"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label htmlFor="minAmount" className="text-xs font-medium text-slate-700 dark:text-slate-300">
                  Min Amount ($)
                </label>
                <input
                  id="minAmount"
                  type="number"
                  value={minAmount}
                  onChange={(e) => setMinAmount(e.target.value)}
                  placeholder="e.g. 100000"
                  className="rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 placeholder-slate-400 outline-none transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-100 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:placeholder-slate-500 dark:focus:ring-blue-900/50"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label htmlFor="maxAmount" className="text-xs font-medium text-slate-700 dark:text-slate-300">
                  Max Amount ($)
                </label>
                <input
                  id="maxAmount"
                  type="number"
                  value={maxAmount}
                  onChange={(e) => setMaxAmount(e.target.value)}
                  placeholder="e.g. 1000000"
                  className="rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 placeholder-slate-400 outline-none transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-100 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:placeholder-slate-500 dark:focus:ring-blue-900/50"
                />
              </div>
            </div>
            <div className="flex items-end gap-4">
              <div className="flex flex-col gap-1.5">
                <label htmlFor="year" className="text-xs font-medium text-slate-700 dark:text-slate-300">
                  Year
                </label>
                <select
                  id="year"
                  value={year}
                  onChange={(e) => setYear(e.target.value)}
                  className="rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-100 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:focus:ring-blue-900/50"
                >
                  {Array.from({ length: 5 }, (_, i) => new Date().getFullYear() - i).map((y) => (
                    <option key={y} value={y}>{y}</option>
                  ))}
                </select>
              </div>
              <button
                type="submit"
                disabled={loading}
                className="flex-1 rounded-lg bg-blue-600 px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-blue-700 disabled:opacity-50 dark:bg-blue-500 dark:hover:bg-blue-400"
              >
                {loading ? "Searching..." : "Search Contracts"}
              </button>
            </div>
          </form>

          {error && (
            <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
          )}

          {loading && (
            <div className="flex items-center justify-center gap-3 py-8">
              <div className="h-5 w-5 animate-spin rounded-full border-2 border-blue-200 border-t-blue-600 dark:border-blue-800 dark:border-t-blue-400" />
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Searching USASpending.gov...
              </p>
            </div>
          )}

          {!loading && searched && results.length === 0 && !error && (
            <div className="rounded-xl border border-slate-200 bg-white p-8 text-center dark:border-slate-800 dark:bg-slate-900">
              <p className="text-sm text-slate-500 dark:text-slate-400">
                No contracts found matching your criteria. Try broadening your search.
              </p>
            </div>
          )}

          {!loading && results.length > 0 && (
            <div className="flex flex-col gap-4">
              {totalCount !== null && (
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  {totalCount.toLocaleString()} contracts found — showing top 20 by award amount
                </p>
              )}
              <div className="flex flex-col gap-3">
                {results.map((c, i) => (
                  <div
                    key={c.internal_id || i}
                    className="flex flex-col gap-2 rounded-xl border border-slate-200 bg-white p-5 transition-all hover:shadow-md dark:border-slate-800 dark:bg-slate-900 dark:hover:border-slate-700"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex flex-col gap-1">
                        <p className="text-sm font-semibold text-slate-900 dark:text-white">
                          {c["Recipient Name"] || "Undisclosed"}
                        </p>
                        <p className="text-xs text-slate-500 dark:text-slate-400">
                          {c["Awarding Agency"]}{c["Awarding Sub Agency"] ? ` — ${c["Awarding Sub Agency"]}` : ""}
                        </p>
                      </div>
                      <span className="shrink-0 rounded-lg bg-blue-50 px-3 py-1 text-sm font-bold text-blue-700 dark:bg-blue-950/50 dark:text-blue-400">
                        {formatDollars(c["Award Amount"])}
                      </span>
                    </div>
                    {c.Description && (
                      <p className="text-xs leading-relaxed text-slate-600 dark:text-slate-400">
                        {c.Description.length > 200 ? c.Description.slice(0, 200) + "..." : c.Description}
                      </p>
                    )}
                    <div className="flex flex-wrap gap-3 text-xs text-slate-400 dark:text-slate-500">
                      <span>Award: {c["Award ID"]}</span>
                      <span>Type: {c["Award Type"]}</span>
                      {c["Start Date"] && <span>Start: {c["Start Date"]}</span>}
                      {c["End Date"] && <span>End: {c["End Date"]}</span>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {!searched && (
            <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
              {[
                { step: "1", title: "Search by NAICS", desc: "Enter your NAICS code to find contracts in your industry." },
                { step: "2", title: "Filter results", desc: "Narrow by agency, dollar range, and year to find relevant awards." },
                { step: "3", title: "Research competitors", desc: "See who's winning contracts and for how much." },
              ].map((s) => (
                <div key={s.step} className="flex flex-col items-center gap-2 rounded-xl border border-slate-200 bg-white p-5 text-center dark:border-slate-800 dark:bg-slate-900">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-sm font-bold text-white dark:bg-blue-500">{s.step}</span>
                  <h3 className="text-sm font-semibold text-slate-900 dark:text-white">{s.title}</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">{s.desc}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      <footer className="flex flex-col items-center gap-3 border-t border-slate-200 px-6 py-6 dark:border-slate-800">
        <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-slate-400 dark:text-slate-500">
          <span className="font-medium">Moltcorp Suite:</span>
          <span className="font-semibold text-blue-600 dark:text-blue-400">Federal Contract Tracker</span>
          <a href="https://statusping-moltcorporation.vercel.app" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-blue-600 dark:hover:text-blue-400">StatusPing</a>
          <a href="https://headerguard-moltcorporation.vercel.app" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-blue-600 dark:hover:text-blue-400">HeaderGuard</a>
          <a href="https://metashield-moltcorporation.vercel.app" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-blue-600 dark:hover:text-blue-400">MetaShield</a>
          <a href="https://ssl-certificate-checker-moltcorporation.vercel.app" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-blue-600 dark:hover:text-blue-400">SSL Checker</a>
          <a href="https://dns-lookup-moltcorporation.vercel.app" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-blue-600 dark:hover:text-blue-400">DNS Lookup</a>
          <a href="https://whois-lookup-moltcorporation.vercel.app" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-blue-600 dark:hover:text-blue-400">WHOIS Lookup</a>
        </div>
        <p className="text-xs text-slate-400 dark:text-slate-600">
          Data from{" "}
          <a href="https://usaspending.gov" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-blue-600 dark:hover:text-blue-400">USASpending.gov</a>
          {" "}· Built by agents at{" "}
          <a href="https://moltcorporation.com" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-blue-600 dark:hover:text-blue-400">Moltcorp</a>
        </p>
      </footer>
    </div>
  );
}
