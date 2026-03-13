"use client";

import { useState, useCallback } from "react";

interface Contract {
  id: number;
  awardId: string;
  recipient: string;
  amount: number;
  description: string;
  startDate: string;
  endDate: string;
  agency: string;
}

interface SearchResult {
  results: Contract[];
  hasNext: boolean;
  page: number;
}

function formatCurrency(amount: number): string {
  if (amount >= 1_000_000_000) return `$${(amount / 1_000_000_000).toFixed(1)}B`;
  if (amount >= 1_000_000) return `$${(amount / 1_000_000).toFixed(1)}M`;
  if (amount >= 1_000) return `$${(amount / 1_000).toFixed(0)}K`;
  return `$${amount.toLocaleString()}`;
}

function formatDate(dateStr: string | null): string {
  if (!dateStr) return "—";
  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

type SortField = "Award Amount" | "Start Date" | "End Date" | "Recipient Name";

export default function Home() {
  const [keywords, setKeywords] = useState("");
  const [results, setResults] = useState<Contract[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const [hasNext, setHasNext] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [sort, setSort] = useState<SortField>("Award Amount");
  const [order, setOrder] = useState<"asc" | "desc">("desc");

  const search = useCallback(
    async (searchPage: number, searchSort?: SortField, searchOrder?: string) => {
      const q = keywords.trim();
      if (!q) return;

      setLoading(true);
      setError("");
      setHasSearched(true);

      try {
        const res = await fetch("/api/search", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            keywords: q,
            page: searchPage,
            sort: searchSort ?? sort,
            order: searchOrder ?? order,
          }),
        });

        if (!res.ok) {
          const data = await res.json().catch(() => null);
          throw new Error(data?.error ?? `Search failed (${res.status})`);
        }

        const data: SearchResult = await res.json();
        setResults(data.results);
        setPage(data.page);
        setHasNext(data.hasNext);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Search failed");
        setResults([]);
      } finally {
        setLoading(false);
      }
    },
    [keywords, sort, order]
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPage(1);
    search(1);
  };

  const handleSort = (field: SortField) => {
    const newOrder = sort === field && order === "desc" ? "asc" : "desc";
    setSort(field);
    setOrder(newOrder);
    search(1, field, newOrder);
  };

  const sortIndicator = (field: SortField) => {
    if (sort !== field) return "";
    return order === "desc" ? " ↓" : " ↑";
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      {/* Header */}
      <header className="border-b border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-600 text-sm font-bold text-white">
              FC
            </div>
            <span className="text-lg font-semibold text-slate-900 dark:text-white">
              Federal Contract Tracker
            </span>
          </div>
          <a
            href="https://moltcorporation.com"
            target="_blank"
            className="text-sm text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200"
          >
            by Moltcorp
          </a>
        </div>
      </header>

      {/* Hero + Search */}
      <div className="mx-auto max-w-6xl px-6 pt-12 pb-8">
        <div className="mb-8 text-center">
          <h1 className="mb-3 text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
            Search Federal Contracts
          </h1>
          <p className="mx-auto max-w-xl text-lg text-slate-600 dark:text-slate-400">
            Search government contracts by keyword. Track spending trends and find
            competitive intelligence powered by USASpending data.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mx-auto flex max-w-2xl gap-3">
          <input
            type="text"
            value={keywords}
            onChange={(e) => setKeywords(e.target.value)}
            placeholder="e.g. cybersecurity, cloud migration, AI training..."
            className="flex-1 rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:placeholder:text-slate-500"
          />
          <button
            type="submit"
            disabled={loading || !keywords.trim()}
            className="rounded-lg bg-blue-600 px-6 py-3 font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500/50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Searching..." : "Search"}
          </button>
        </form>
      </div>

      {/* Results */}
      <div className="mx-auto max-w-6xl px-6 pb-16">
        {error && (
          <div className="mb-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-red-700 dark:border-red-800 dark:bg-red-900/20 dark:text-red-400">
            {error}
          </div>
        )}

        {results.length > 0 && (
          <>
            <div className="overflow-x-auto rounded-lg border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-800/50">
                    <th className="px-4 py-3 font-medium text-slate-600 dark:text-slate-300">
                      Award ID
                    </th>
                    <th
                      className="cursor-pointer px-4 py-3 font-medium text-slate-600 hover:text-blue-600 dark:text-slate-300 dark:hover:text-blue-400"
                      onClick={() => handleSort("Recipient Name")}
                    >
                      Recipient{sortIndicator("Recipient Name")}
                    </th>
                    <th
                      className="cursor-pointer px-4 py-3 font-medium text-slate-600 hover:text-blue-600 dark:text-slate-300 dark:hover:text-blue-400 text-right"
                      onClick={() => handleSort("Award Amount")}
                    >
                      Amount{sortIndicator("Award Amount")}
                    </th>
                    <th className="px-4 py-3 font-medium text-slate-600 dark:text-slate-300">
                      Agency
                    </th>
                    <th
                      className="cursor-pointer px-4 py-3 font-medium text-slate-600 hover:text-blue-600 dark:text-slate-300 dark:hover:text-blue-400"
                      onClick={() => handleSort("Start Date")}
                    >
                      Start{sortIndicator("Start Date")}
                    </th>
                    <th
                      className="cursor-pointer px-4 py-3 font-medium text-slate-600 hover:text-blue-600 dark:text-slate-300 dark:hover:text-blue-400"
                      onClick={() => handleSort("End Date")}
                    >
                      End{sortIndicator("End Date")}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {results.map((c) => (
                    <tr
                      key={c.id}
                      className="border-b border-slate-100 hover:bg-slate-50 dark:border-slate-800/50 dark:hover:bg-slate-800/30"
                    >
                      <td className="px-4 py-3 font-mono text-xs text-slate-500 dark:text-slate-400">
                        {c.awardId}
                      </td>
                      <td className="max-w-[200px] px-4 py-3">
                        <div className="font-medium text-slate-900 dark:text-white truncate">
                          {c.recipient}
                        </div>
                        <div className="mt-0.5 text-xs text-slate-500 dark:text-slate-400 line-clamp-2">
                          {c.description}
                        </div>
                      </td>
                      <td className="px-4 py-3 text-right font-semibold text-slate-900 dark:text-white whitespace-nowrap">
                        {formatCurrency(c.amount)}
                      </td>
                      <td className="max-w-[160px] px-4 py-3 text-slate-600 dark:text-slate-400 truncate">
                        {c.agency}
                      </td>
                      <td className="px-4 py-3 text-slate-600 dark:text-slate-400 whitespace-nowrap">
                        {formatDate(c.startDate)}
                      </td>
                      <td className="px-4 py-3 text-slate-600 dark:text-slate-400 whitespace-nowrap">
                        {formatDate(c.endDate)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="mt-4 flex items-center justify-between">
              <span className="text-sm text-slate-500 dark:text-slate-400">
                Page {page}
              </span>
              <div className="flex gap-2">
                <button
                  onClick={() => search(page - 1)}
                  disabled={page <= 1 || loading}
                  className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
                >
                  Previous
                </button>
                <button
                  onClick={() => search(page + 1)}
                  disabled={!hasNext || loading}
                  className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
                >
                  Next
                </button>
              </div>
            </div>
          </>
        )}

        {hasSearched && !loading && results.length === 0 && !error && (
          <div className="py-16 text-center">
            <p className="text-lg text-slate-500 dark:text-slate-400">
              No contracts found. Try different keywords.
            </p>
          </div>
        )}

        {!hasSearched && (
          <div className="py-16 text-center">
            <div className="mx-auto grid max-w-3xl grid-cols-1 gap-6 sm:grid-cols-3">
              <div className="rounded-lg border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
                <div className="mb-2 text-2xl font-bold text-blue-600">$700B+</div>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Annual federal contract spending
                </p>
              </div>
              <div className="rounded-lg border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
                <div className="mb-2 text-2xl font-bold text-blue-600">Real-time</div>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Data from USASpending.gov
                </p>
              </div>
              <div className="rounded-lg border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
                <div className="mb-2 text-2xl font-bold text-blue-600">Free</div>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Search contracts instantly
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white py-8 dark:border-slate-800 dark:bg-slate-900">
        <div className="mx-auto max-w-6xl px-6 text-center text-sm text-slate-500 dark:text-slate-400">
          <p>
            Data sourced from{" "}
            <a
              href="https://usaspending.gov"
              target="_blank"
              className="text-blue-600 hover:underline dark:text-blue-400"
            >
              USASpending.gov
            </a>
            . Part of the{" "}
            <a
              href="https://moltcorporation.com"
              target="_blank"
              className="text-blue-600 hover:underline dark:text-blue-400"
            >
              Moltcorp Suite
            </a>
            .
          </p>
        </div>
      </footer>
    </div>
  );
}
