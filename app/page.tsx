"use client";

import { useState } from "react";
import { US_STATES, SET_ASIDE_TYPES } from "@/lib/usaspending";
import { formatCurrency, formatFullCurrency, formatDate } from "@/lib/format";

interface Award {
  "Award ID": string;
  "Recipient Name": string;
  "Award Amount": number;
  Description: string;
  "Start Date": string;
  "End Date": string;
  "Awarding Agency": string;
  "Awarding Sub Agency": string;
  "Award Type": string;
  "Place of Performance State Code": string;
  generated_internal_id: string;
}

interface SearchResponse {
  results: Award[];
  page_metadata: {
    page: number;
    hasNext: boolean;
  };
  limit: number;
}

export default function Home() {
  const [results, setResults] = useState<SearchResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searched, setSearched] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  // Form state
  const [naicsCode, setNaicsCode] = useState("");
  const [agency, setAgency] = useState("");
  const [recipientName, setRecipientName] = useState("");
  const [state, setState] = useState("");
  const [minAmount, setMinAmount] = useState("");
  const [maxAmount, setMaxAmount] = useState("");
  const [setAsideType, setSetAsideType] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [page, setPage] = useState(1);

  async function handleSearch(newPage = 1) {
    setLoading(true);
    setError(null);
    setPage(newPage);

    try {
      const res = await fetch("/api/search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          naicsCode: naicsCode || undefined,
          agency: agency || undefined,
          recipientName: recipientName || undefined,
          state: state || undefined,
          minAmount: minAmount || undefined,
          maxAmount: maxAmount || undefined,
          setAsideType: setAsideType || undefined,
          startDate: startDate || undefined,
          endDate: endDate || undefined,
          page: newPage,
          limit: 25,
        }),
      });

      if (!res.ok) throw new Error("Search failed");
      const data = await res.json();
      setResults(data);
      setSearched(true);
    } catch {
      setError("Failed to search contracts. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
      {/* Hero */}
      {!searched && (
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
            Find Federal Contract Awards
          </h1>
          <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">
            Search billions in government contract data. Track spending trends,
            find competitors, and identify opportunities.
          </p>
          <div className="mt-4 flex justify-center gap-4 text-sm text-slate-500">
            <span>300K+ contractors</span>
            <span>|</span>
            <span>$700B+ in annual awards</span>
            <span>|</span>
            <span>Updated daily</span>
          </div>
        </div>
      )}

      {/* Search Form */}
      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSearch(1);
          }}
        >
          {/* Primary search row */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Contractor Name
              </label>
              <input
                type="text"
                value={recipientName}
                onChange={(e) => setRecipientName(e.target.value)}
                placeholder="e.g. Lockheed Martin"
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Agency
              </label>
              <input
                type="text"
                value={agency}
                onChange={(e) => setAgency(e.target.value)}
                placeholder="e.g. Department of Defense"
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                NAICS Code
              </label>
              <input
                type="text"
                value={naicsCode}
                onChange={(e) => setNaicsCode(e.target.value)}
                placeholder="e.g. 541512"
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
              />
            </div>
          </div>

          {/* Toggle advanced filters */}
          <button
            type="button"
            onClick={() => setShowFilters(!showFilters)}
            className="mt-3 text-sm text-blue-600 hover:text-blue-800"
          >
            {showFilters ? "Hide filters" : "More filters"}
          </button>

          {/* Advanced filters */}
          {showFilters && (
            <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-4 border-t border-slate-100 pt-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  State
                </label>
                <select
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
                >
                  <option value="">All states</option>
                  {US_STATES.map((s) => (
                    <option key={s.code} value={s.code}>
                      {s.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Set-Aside Type
                </label>
                <select
                  value={setAsideType}
                  onChange={(e) => setSetAsideType(e.target.value)}
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
                >
                  <option value="">All types</option>
                  {SET_ASIDE_TYPES.map((t) => (
                    <option key={t.code} value={t.code}>
                      {t.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Min Amount
                </label>
                <input
                  type="number"
                  value={minAmount}
                  onChange={(e) => setMinAmount(e.target.value)}
                  placeholder="$0"
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Max Amount
                </label>
                <input
                  type="number"
                  value={maxAmount}
                  onChange={(e) => setMaxAmount(e.target.value)}
                  placeholder="No limit"
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Start Date
                </label>
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  End Date
                </label>
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
                />
              </div>
            </div>
          )}

          {/* Search button */}
          <div className="mt-4">
            <button
              type="submit"
              disabled={loading}
              className="rounded-lg bg-blue-600 px-6 py-2.5 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-50 transition-colors"
            >
              {loading ? "Searching..." : "Search Contracts"}
            </button>
          </div>
        </form>
      </div>

      {/* Error */}
      {error && (
        <div className="mt-6 rounded-lg bg-red-50 border border-red-200 p-4 text-sm text-red-700">
          {error}
        </div>
      )}

      {/* Results */}
      {results && (
        <div className="mt-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-slate-900">
              Contract Awards
            </h2>
            <span className="text-sm text-slate-500">
              Page {results.page_metadata.page}
            </span>
          </div>

          {results.results.length === 0 ? (
            <div className="rounded-xl border border-slate-200 bg-white p-12 text-center">
              <p className="text-slate-500">
                No contracts found. Try broadening your search.
              </p>
            </div>
          ) : (
            <>
              <div className="space-y-3">
                {results.results.map((award, i) => (
                  <div
                    key={award.generated_internal_id || i}
                    className="rounded-xl border border-slate-200 bg-white p-5 hover:border-blue-200 transition-colors"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-semibold text-slate-900 truncate">
                            {award["Recipient Name"] || "Unknown Contractor"}
                          </span>
                          {award["Award Type"] && (
                            <span className="inline-flex items-center rounded-full bg-blue-50 px-2 py-0.5 text-xs font-medium text-blue-700">
                              {award["Award Type"]}
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-slate-600 line-clamp-2 mb-2">
                          {award.Description || "No description available"}
                        </p>
                        <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-500">
                          <span>
                            Agency: {award["Awarding Agency"] || "N/A"}
                          </span>
                          {award["Awarding Sub Agency"] && (
                            <span>Sub: {award["Awarding Sub Agency"]}</span>
                          )}
                          <span>
                            Award ID: {award["Award ID"] || "N/A"}
                          </span>
                          {award["Place of Performance State Code"] && (
                            <span>
                              State:{" "}
                              {award["Place of Performance State Code"]}
                            </span>
                          )}
                          <span>
                            {formatDate(award["Start Date"])} &mdash;{" "}
                            {formatDate(award["End Date"])}
                          </span>
                        </div>
                      </div>
                      <div className="text-right shrink-0">
                        <div className="text-lg font-bold text-slate-900">
                          {formatCurrency(award["Award Amount"])}
                        </div>
                        <div className="text-xs text-slate-500">
                          {formatFullCurrency(award["Award Amount"])}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pagination */}
              <div className="mt-6 flex justify-center gap-2">
                {page > 1 && (
                  <button
                    onClick={() => handleSearch(page - 1)}
                    disabled={loading}
                    className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm hover:bg-slate-50 disabled:opacity-50"
                  >
                    Previous
                  </button>
                )}
                {results.page_metadata.hasNext && (
                  <button
                    onClick={() => handleSearch(page + 1)}
                    disabled={loading}
                    className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm hover:bg-slate-50 disabled:opacity-50"
                  >
                    Next
                  </button>
                )}
              </div>
            </>
          )}
        </div>
      )}

      {/* Value props when not searched */}
      {!searched && (
        <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-3">
          <div className="text-center">
            <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-blue-600 text-xl font-bold">
              1
            </div>
            <h3 className="font-semibold text-slate-900">
              Search Awards
            </h3>
            <p className="mt-1 text-sm text-slate-600">
              Find contract awards by agency, NAICS code, contractor, state, or
              dollar amount.
            </p>
          </div>
          <div className="text-center">
            <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-blue-600 text-xl font-bold">
              2
            </div>
            <h3 className="font-semibold text-slate-900">
              Track Competitors
            </h3>
            <p className="mt-1 text-sm text-slate-600">
              See who&apos;s winning contracts in your space, how much they&apos;re
              getting, and from which agencies.
            </p>
          </div>
          <div className="text-center">
            <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-blue-600 text-xl font-bold">
              3
            </div>
            <h3 className="font-semibold text-slate-900">
              Spot Trends
            </h3>
            <p className="mt-1 text-sm text-slate-600">
              See spending trends over time by agency, industry, or geography to
              find growing markets.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
