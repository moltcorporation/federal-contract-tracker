"use client";

import { useState, useCallback, useRef } from "react";
import Link from "next/link";

interface TimelineEntry {
  amount: number;
  fiscalYear: string;
  quarter: string;
}

interface Recipient {
  name: string;
  amount: number;
  code: string;
}

interface Agency {
  name: string;
  amount: number;
  code: string;
  id: number;
}

interface NaicsSuggestion {
  code: string;
  description: string;
}

const SET_ASIDE_OPTIONS = [
  { value: "", label: "All contracts" },
  { value: "SBA", label: "Small Business (SBA)" },
  { value: "8A", label: "8(a) Business Development" },
  { value: "HZC", label: "HUBZone" },
  { value: "WOSB", label: "Women-Owned Small Business" },
  { value: "SDVOSBC", label: "Service-Disabled Veteran" },
  { value: "ESB", label: "Economically Disadvantaged WOSB" },
];

const US_STATES = [
  "", "AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "FL", "GA",
  "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MD",
  "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ",
  "NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA", "RI", "SC",
  "SD", "TN", "TX", "UT", "VT", "VA", "WA", "WV", "WI", "WY", "DC",
];

const inputClass =
  "rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 placeholder-slate-400 outline-none transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-100 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:placeholder-slate-500 dark:focus:ring-blue-900/50";
const selectClass =
  "rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-100 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:focus:ring-blue-900/50";
const labelClass = "text-xs font-medium text-slate-700 dark:text-slate-300";

function formatDollars(amount: number) {
  if (amount >= 1_000_000_000) return `$${(amount / 1_000_000_000).toFixed(1)}B`;
  if (amount >= 1_000_000) return `$${(amount / 1_000_000).toFixed(1)}M`;
  if (amount >= 1_000) return `$${(amount / 1_000).toFixed(0)}K`;
  return `$${amount.toLocaleString()}`;
}

function NaicsAutocomplete({
  id,
  value,
  onChange,
}: {
  id: string;
  value: string;
  onChange: (value: string) => void;
}) {
  const [suggestions, setSuggestions] = useState<NaicsSuggestion[]>([]);
  const [open, setOpen] = useState(false);
  const [highlightIndex, setHighlightIndex] = useState(-1);
  const debounceRef = useRef<ReturnType<typeof setTimeout>>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const fetchSuggestions = useCallback((text: string) => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    if (text.length < 2) {
      setSuggestions([]);
      setOpen(false);
      return;
    }
    debounceRef.current = setTimeout(async () => {
      try {
        const res = await fetch("/api/autocomplete/naics", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ search_text: text }),
        });
        const data = await res.json();
        setSuggestions(data.results || []);
        setOpen((data.results || []).length > 0);
        setHighlightIndex(-1);
      } catch {
        setSuggestions([]);
        setOpen(false);
      }
    }, 300);
  }, []);

  function handleKeyDown(e: React.KeyboardEvent) {
    if (!open || suggestions.length === 0) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlightIndex((prev) => (prev < suggestions.length - 1 ? prev + 1 : 0));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlightIndex((prev) => (prev > 0 ? prev - 1 : suggestions.length - 1));
    } else if (e.key === "Enter" && highlightIndex >= 0) {
      e.preventDefault();
      onChange(suggestions[highlightIndex].code);
      setOpen(false);
    } else if (e.key === "Escape") {
      setOpen(false);
    }
  }

  return (
    <div ref={containerRef} className="relative">
      <input
        id={id}
        type="text"
        value={value}
        onChange={(e) => {
          onChange(e.target.value);
          fetchSuggestions(e.target.value);
        }}
        onFocus={() => {
          if (suggestions.length > 0) setOpen(true);
        }}
        onBlur={() => setTimeout(() => setOpen(false), 200)}
        onKeyDown={handleKeyDown}
        placeholder="e.g. 541512 or computer"
        className={inputClass}
        autoComplete="off"
      />
      {open && suggestions.length > 0 && (
        <ul className="absolute left-0 right-0 top-full z-50 mt-1 max-h-56 overflow-auto rounded-lg border border-slate-200 bg-white shadow-lg dark:border-slate-700 dark:bg-slate-800">
          {suggestions.map((s, i) => (
            <li
              key={s.code}
              className={`cursor-pointer px-3 py-2 text-sm ${
                i === highlightIndex
                  ? "bg-blue-50 text-blue-900 dark:bg-blue-950/50 dark:text-blue-200"
                  : "text-slate-900 hover:bg-slate-50 dark:text-white dark:hover:bg-slate-700/50"
              }`}
              onMouseDown={() => {
                onChange(s.code);
                setOpen(false);
              }}
            >
              <span className="font-mono font-medium">{s.code}</span>
              <span className="ml-2 text-slate-500 dark:text-slate-400">
                — {s.description}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default function TrendsPage() {
  const [naics, setNaics] = useState("");
  const [setAside, setSetAside] = useState("");
  const [state, setState] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [searched, setSearched] = useState(false);

  const [timeline, setTimeline] = useState<TimelineEntry[]>([]);
  const [recipients, setRecipients] = useState<Recipient[]>([]);
  const [agencies, setAgencies] = useState<Agency[]>([]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    setSearched(true);

    try {
      const res = await fetch("/api/trends", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ naics, setAside, state }),
      });

      if (!res.ok) throw new Error("Failed to load trends data.");

      const data = await res.json();
      setTimeline(data.timeline || []);
      setRecipients(data.recipients || []);
      setAgencies(data.agencies || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  const maxTimeline =
    timeline.length > 0 ? Math.max(...timeline.map((t) => t.amount)) : 0;
  const maxRecipient =
    recipients.length > 0 ? Math.max(...recipients.map((r) => r.amount)) : 0;
  const maxAgency =
    agencies.length > 0 ? Math.max(...agencies.map((a) => a.amount)) : 0;

  return (
    <div className="flex min-h-screen flex-col bg-slate-50 font-sans dark:bg-slate-950">
      <header className="flex items-center justify-between border-b border-slate-200 px-6 py-4 dark:border-slate-800">
        <Link href="/" className="flex items-center gap-2">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            className="h-6 w-6 text-blue-600 dark:text-blue-400"
            aria-hidden="true"
          >
            <path d="M3 21V7l9-4 9 4v14" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
            <path d="M9 21V13h6v8" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
            <circle cx="12" cy="9.5" r="1.5" fill="currentColor" />
          </svg>
          <span className="text-lg font-bold tracking-tight text-slate-900 dark:text-white">
            Federal Contract Tracker
          </span>
        </Link>
        <div className="flex items-center gap-4">
          <Link
            href="/pricing"
            className="text-sm font-medium text-blue-600 transition-colors hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
          >
            Pricing
          </Link>
          <Link
            href="/"
            className="text-sm text-slate-500 transition-colors hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400"
          >
            Contract Search
          </Link>
        </div>
      </header>

      <main className="mx-auto flex w-full max-w-4xl flex-col gap-8 px-4 py-12">
        <div className="flex flex-col gap-3 text-center">
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl dark:text-white">
            Spending{" "}
            <span className="text-blue-600 dark:text-blue-400">Trends</span>
          </h1>
          <p className="mx-auto max-w-lg text-base text-slate-600 dark:text-slate-400">
            Quarterly spending timeline, top contractors, and agency rankings.
            Filter by NAICS code, set-aside type, or state.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900"
        >
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="flex flex-col gap-1.5">
              <label htmlFor="trendNaics" className={labelClass}>
                NAICS Code
              </label>
              <NaicsAutocomplete
                id="trendNaics"
                value={naics}
                onChange={setNaics}
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label htmlFor="trendSetAside" className={labelClass}>
                Set-Aside Type
              </label>
              <select
                id="trendSetAside"
                value={setAside}
                onChange={(e) => setSetAside(e.target.value)}
                className={selectClass}
              >
                {SET_ASIDE_OPTIONS.map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex flex-col gap-1.5">
              <label htmlFor="trendState" className={labelClass}>
                State
              </label>
              <select
                id="trendState"
                value={state}
                onChange={(e) => setState(e.target.value)}
                className={selectClass}
              >
                <option value="">All states</option>
                {US_STATES.filter(Boolean).map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <button
            type="submit"
            disabled={loading}
            className="rounded-lg bg-blue-600 px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-blue-700 disabled:opacity-50 dark:bg-blue-500 dark:hover:bg-blue-400"
          >
            {loading ? "Loading..." : "Show Trends"}
          </button>
        </form>

        {error && (
          <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
        )}

        {loading && (
          <div className="flex items-center justify-center gap-3 py-8">
            <div className="h-5 w-5 animate-spin rounded-full border-2 border-blue-200 border-t-blue-600 dark:border-blue-800 dark:border-t-blue-400" />
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Loading trends data...
            </p>
          </div>
        )}

        {!loading && searched && timeline.length === 0 && !error && (
          <div className="rounded-xl border border-slate-200 bg-white p-8 text-center dark:border-slate-800 dark:bg-slate-900">
            <p className="text-sm text-slate-500 dark:text-slate-400">
              No trends data found. Try different filters.
            </p>
          </div>
        )}

        {!loading && timeline.length > 0 && (
          <div className="flex flex-col gap-10">
            {/* Quarterly timeline */}
            <div className="flex flex-col gap-4">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                Quarterly Contract Spending
              </h2>
              <div className="flex flex-col gap-2">
                {timeline.map((t, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <span className="w-20 shrink-0 text-right text-xs font-medium text-slate-500 dark:text-slate-400">
                      FY{t.fiscalYear} Q{t.quarter}
                    </span>
                    <div className="flex-1">
                      <div className="h-6 overflow-hidden rounded bg-slate-100 dark:bg-slate-800">
                        <div
                          className="h-full rounded bg-blue-500 transition-all duration-500 dark:bg-blue-400"
                          style={{
                            width: `${maxTimeline > 0 ? (t.amount / maxTimeline) * 100 : 0}%`,
                          }}
                        />
                      </div>
                    </div>
                    <span className="w-20 shrink-0 text-xs font-bold text-slate-700 dark:text-slate-300">
                      {formatDollars(t.amount)}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Top recipients */}
            {recipients.length > 0 && (
              <div className="flex flex-col gap-4">
                <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                  Top Contractors
                </h2>
                <div className="flex flex-col gap-3">
                  {recipients.map((r, i) => (
                    <div
                      key={i}
                      className="flex flex-col gap-2 rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex items-center gap-3">
                          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-blue-100 text-xs font-bold text-blue-700 dark:bg-blue-950/50 dark:text-blue-400">
                            {i + 1}
                          </span>
                          <p className="text-sm font-semibold text-slate-900 dark:text-white">
                            {r.name}
                          </p>
                        </div>
                        <span className="shrink-0 rounded-lg bg-blue-50 px-3 py-1 text-sm font-bold text-blue-700 dark:bg-blue-950/50 dark:text-blue-400">
                          {formatDollars(r.amount)}
                        </span>
                      </div>
                      <div className="h-2 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
                        <div
                          className="h-full rounded-full bg-blue-500 transition-all duration-500 dark:bg-blue-400"
                          style={{
                            width: `${maxRecipient > 0 ? (r.amount / maxRecipient) * 100 : 0}%`,
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Top agencies */}
            {agencies.length > 0 && (
              <div className="flex flex-col gap-4">
                <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                  Top Agencies
                </h2>
                <div className="flex flex-col gap-3">
                  {agencies.map((a, i) => (
                    <div
                      key={i}
                      className="flex flex-col gap-2 rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex items-center gap-3">
                          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-blue-100 text-xs font-bold text-blue-700 dark:bg-blue-950/50 dark:text-blue-400">
                            {i + 1}
                          </span>
                          <div className="flex flex-col gap-0.5">
                            <p className="text-sm font-semibold text-slate-900 dark:text-white">
                              {a.name}
                            </p>
                            <p className="text-xs text-slate-400 dark:text-slate-500">
                              {a.code}
                            </p>
                          </div>
                        </div>
                        <span className="shrink-0 rounded-lg bg-blue-50 px-3 py-1 text-sm font-bold text-blue-700 dark:bg-blue-950/50 dark:text-blue-400">
                          {formatDollars(a.amount)}
                        </span>
                      </div>
                      <div className="h-2 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
                        <div
                          className="h-full rounded-full bg-blue-500 transition-all duration-500 dark:bg-blue-400"
                          style={{
                            width: `${maxAgency > 0 ? (a.amount / maxAgency) * 100 : 0}%`,
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {!searched && (
          <div className="rounded-xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Explore federal contract spending patterns over the last 3 fiscal
              years. See which agencies spend the most, which contractors win the
              biggest awards, and how spending changes quarter to quarter. Use
              filters to narrow by NAICS code, set-aside type, or state.
            </p>
          </div>
        )}
      </main>

      <footer className="flex flex-col items-center gap-3 border-t border-slate-200 px-6 py-6 dark:border-slate-800">
        <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-slate-400 dark:text-slate-500">
          <span className="font-medium">Moltcorp Suite:</span>
          <span className="font-semibold text-blue-600 dark:text-blue-400">
            Federal Contract Tracker
          </span>
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
          {" "}&middot; Built by agents at{" "}
          <a href="https://moltcorporation.com" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-blue-600 dark:hover:text-blue-400">Moltcorp</a>
        </p>
      </footer>
    </div>
  );
}
