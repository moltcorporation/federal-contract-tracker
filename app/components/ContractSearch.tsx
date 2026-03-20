"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { track } from "@vercel/analytics";
import { useSearchState } from "./SearchContext";

interface NaicsSuggestion {
  code: string;
  description: string;
}

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

interface AgencySpending {
  name: string;
  id: number;
  code: string;
  amount: number;
}

function formatDollars(amount: number) {
  if (amount >= 1_000_000_000) return `$${(amount / 1_000_000_000).toFixed(1)}B`;
  if (amount >= 1_000_000) return `$${(amount / 1_000_000).toFixed(1)}M`;
  if (amount >= 1_000) return `$${(amount / 1_000).toFixed(0)}K`;
  return `$${amount.toLocaleString()}`;
}

const NAICS_CATEGORIES = [
  { code: "541512", label: "IT Services", icon: "\u{1F4BB}" },
  { code: "236220", label: "Construction", icon: "\u{1F3D7}\uFE0F" },
  { code: "541330", label: "Engineering", icon: "\u2699\uFE0F" },
  { code: "541611", label: "Consulting", icon: "\u{1F4CA}" },
  { code: "561720", label: "Janitorial", icon: "\u{1F9F9}" },
  { code: "541511", label: "Custom Software", icon: "\u{1F5A5}\uFE0F" },
  { code: "562910", label: "Environmental", icon: "\u{1F33F}" },
  { code: "336411", label: "Aerospace", icon: "\u2708\uFE0F" },
  { code: "541690", label: "Scientific R&D", icon: "\u{1F52C}" },
  { code: "561210", label: "Facilities Support", icon: "\u{1F3E2}" },
];

const SUGGESTED_SEARCHES = [
  { label: "Cybersecurity contracts over $1M", keyword: "cybersecurity", minAmount: "1000000", naics: "", agency: "" },
  { label: "DoD IT modernization", keyword: "IT modernization", naics: "541512", agency: "Department of Defense" },
  { label: "Small business set-asides in construction", keyword: "", naics: "236220", agency: "", setAside: "SBA" },
  { label: "NASA engineering services", keyword: "engineering", naics: "541330", agency: "National Aeronautics and Space Administration" },
  { label: "VA healthcare IT", keyword: "healthcare IT", naics: "541512", agency: "Department of Veterans Affairs" },
  { label: "Environmental remediation work", keyword: "remediation", naics: "562910", agency: "" },
  { label: "GSA facilities maintenance", keyword: "maintenance", naics: "561210", agency: "General Services Administration" },
  { label: "DHS infrastructure security", keyword: "security", naics: "541690", agency: "Department of Homeland Security" },
];

const SET_ASIDE_OPTIONS = [
  { value: "", label: "All contracts" },
  { value: "SBA", label: "Small Business (SBA)" },
  { value: "8A", label: "8(a) Business Development" },
  { value: "HZC", label: "HUBZone" },
  { value: "WOSB", label: "Women-Owned Small Business" },
  { value: "SDVOSBC", label: "Service-Disabled Veteran" },
  { value: "ESB", label: "Economically Disadvantaged WOSB" },
];

const inputClass = "rounded-lg border border-slate-700 bg-slate-800 px-3 py-2.5 text-sm text-white placeholder-slate-500 outline-none transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-900/50";
const selectClass = "rounded-lg border border-slate-700 bg-slate-800 px-3 py-2.5 text-sm text-white outline-none transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-900/50";
const labelClass = "text-xs font-medium text-slate-300";

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

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
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
        onFocus={() => { if (suggestions.length > 0) setOpen(true); }}
        onKeyDown={handleKeyDown}
        placeholder="e.g. 541512 or computer"
        className={inputClass}
        autoComplete="off"
        role="combobox"
        aria-expanded={open}
        aria-autocomplete="list"
        aria-controls={`${id}-listbox`}
      />
      {open && suggestions.length > 0 && (
        <ul
          id={`${id}-listbox`}
          role="listbox"
          className="absolute left-0 right-0 top-full z-50 mt-1 max-h-56 overflow-auto rounded-lg border border-slate-200 bg-white shadow-lg dark:border-slate-700 dark:bg-slate-800"
        >
          {suggestions.map((s, i) => (
            <li
              key={s.code}
              role="option"
              aria-selected={i === highlightIndex}
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
              <span className="ml-2 text-slate-500 dark:text-slate-400">&mdash; {s.description}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export function ContractSearch() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { setSearched: setGlobalSearched } = useSearchState();
  const [activeTab, setActiveTab] = useState<"search" | "agency">("search");
  const [naicsApplied, setNaicsApplied] = useState(false);

  // Contract search state
  const [keyword, setKeyword] = useState("");
  const [naics, setNaics] = useState("");
  const [agency, setAgency] = useState("");
  const [minAmount, setMinAmount] = useState("");
  const [maxAmount, setMaxAmount] = useState("");
  const [year, setYear] = useState(new Date().getFullYear().toString());
  const [setAside, setSetAside] = useState("");
  const [recipient, setRecipient] = useState("");
  const [psc, setPsc] = useState("");
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [results, setResults] = useState<Contract[]>([]);
  const [totalCount, setTotalCount] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [upgradeUrl, setUpgradeUrl] = useState("");
  const [remaining, setRemaining] = useState<number | null>(null);
  const [searched, setSearched] = useState(false);
  const [saveStatus, setSaveStatus] = useState<"idle" | "saving" | "saved" | "error">("idle");
  const maxResultAmount = results.length > 0 ? Math.max(...results.map((c) => c["Award Amount"])) : 0;

  const [captureEmail, setCaptureEmail] = useState("");
  const [emailCaptureLoading, setEmailCaptureLoading] = useState(false);
  const [emailCaptureSuccess, setEmailCaptureSuccess] = useState(false);
  const [emailCaptureError, setEmailCaptureError] = useState<string | null>(null);
  const [isFirstSearch, setIsFirstSearch] = useState(true);

  // Agency search state
  const [agencyNaics, setAgencyNaics] = useState("");
  const [agencyKeyword, setAgencyKeyword] = useState("");
  const [agencyYear, setAgencyYear] = useState(new Date().getFullYear().toString());
  const [agencySetAside, setAgencySetAside] = useState("");
  const [agencyResults, setAgencyResults] = useState<AgencySpending[]>([]);
  const [agencyLoading, setAgencyLoading] = useState(false);
  const [agencyError, setAgencyError] = useState("");
  const [agencySearched, setAgencySearched] = useState(false);

  // Pre-fill NAICS from URL param
  useEffect(() => {
    if (naicsApplied) return;
    const paramNaics = searchParams.get("naics");
    if (paramNaics) {
      setNaics(paramNaics);
      setNaicsApplied(true);
    }
  }, [searchParams, naicsApplied]);

  // Notify parent context when search state changes
  useEffect(() => {
    setGlobalSearched(searched || agencySearched);
  }, [searched, agencySearched, setGlobalSearched]);

  async function handleSaveSearch() {
    setSaveStatus("saving");
    try {
      const res = await fetch("/api/saved-searches", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ keyword, naics, agency, minAmount, maxAmount, year, setAside, recipient, psc }),
      });
      if (!res.ok) throw new Error();
      setSaveStatus("saved");
    } catch {
      setSaveStatus("error");
    }
  }

  async function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    setUpgradeUrl("");
    setResults([]);
    setTotalCount(null);
    setSearched(true);
    try {
      const params = new URLSearchParams();
      if (keyword) params.set("keyword", keyword);
      if (naics) params.set("naics", naics);
      if (agency) params.set("agency", agency);
      if (minAmount) params.set("min_amount", minAmount);
      if (maxAmount) params.set("max_amount", maxAmount);
      if (year) params.set("year", year);
      if (setAside) params.set("set_aside", setAside);
      if (recipient) params.set("recipient", recipient);
      if (psc) params.set("psc", psc);
      const res = await fetch(`/api/search?${params.toString()}`);
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Search failed");
        if (data.upgradeUrl) setUpgradeUrl(data.upgradeUrl);
      } else {
        setResults(data.results || []);
        setTotalCount(data.totalCount ?? null);
        if (data.remaining !== undefined) setRemaining(data.remaining);
        if (isFirstSearch) setIsFirstSearch(false);
        track("contract_search", { keyword, naics, results: (data.results || []).length });
      }
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  const [exporting, setExporting] = useState(false);

  async function handleExportCsv() {
    setExporting(true);
    try {
      const params = new URLSearchParams();
      if (keyword) params.set("keyword", keyword);
      if (naics) params.set("naics", naics);
      if (agency) params.set("agency", agency);
      if (minAmount) params.set("min_amount", minAmount);
      if (maxAmount) params.set("max_amount", maxAmount);
      if (year) params.set("year", year);
      if (setAside) params.set("set_aside", setAside);
      if (recipient) params.set("recipient", recipient);
      if (psc) params.set("psc", psc);
      const res = await fetch(`/api/export?${params.toString()}`);
      if (!res.ok) {
        const data = await res.json();
        if (data.upgradeUrl) {
          window.open(data.upgradeUrl, "_blank");
        } else {
          setError(data.error || "Export failed");
        }
        return;
      }
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `govscout-export-${new Date().toISOString().slice(0, 10)}.csv`;
      a.click();
      URL.revokeObjectURL(url);
      track("csv_exported");
    } catch {
      setError("Export failed. Please try again.");
    } finally {
      setExporting(false);
    }
  }

  async function handleAgencySearch(e: React.FormEvent) {
    e.preventDefault();
    setAgencyLoading(true);
    setAgencyError("");
    setAgencyResults([]);
    setAgencySearched(true);
    try {
      const params = new URLSearchParams();
      if (agencyNaics) params.set("naics", agencyNaics);
      if (agencyKeyword) params.set("keyword", agencyKeyword);
      if (agencyYear) params.set("year", agencyYear);
      if (agencySetAside) params.set("set_aside", agencySetAside);
      const res = await fetch(`/api/agency-spending?${params.toString()}`);
      const data = await res.json();
      if (!res.ok) {
        setAgencyError(data.error || "Search failed");
      } else {
        setAgencyResults(data.results || []);
        track("agency_search", { naics: agencyNaics, keyword: agencyKeyword });
      }
    } catch {
      setAgencyError("Something went wrong. Please try again.");
    } finally {
      setAgencyLoading(false);
    }
  }

  const maxAgencyAmount = agencyResults.length > 0 ? Math.max(...agencyResults.map((a) => a.amount)) : 0;

  return (
    <div className="flex w-full max-w-3xl flex-col gap-8">
      {searched || agencySearched ? (
        <div className="flex flex-col gap-1 text-center">
          <h1 className="text-2xl font-bold tracking-tight text-white">
            Contract Search Results
          </h1>
        </div>
      ) : (
        <div id="search" className="flex flex-col gap-6 scroll-mt-8">
          <div className="text-center">
            <h2 className="text-xl font-bold tracking-tight text-white">
              What does your business do?
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Pick your industry to see contracts you could be winning
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-2">
            {NAICS_CATEGORIES.map((cat) => (
              <button
                key={cat.code}
                type="button"
                onClick={() => {
                  setNaics(cat.code);
                  setActiveTab("search");
                }}
                className={`inline-flex items-center gap-1.5 rounded-full border px-4 py-2 text-sm font-medium transition-all ${
                  naics === cat.code
                    ? "border-blue-500 bg-blue-950/50 text-blue-300"
                    : "border-slate-700 bg-slate-800/50 text-slate-300 hover:border-blue-600 hover:text-blue-300"
                }`}
              >
                <span>{cat.icon}</span>
                {cat.label}
              </button>
            ))}
          </div>
          <div className="flex flex-col items-center gap-2 border-t border-slate-800 pt-4">
            <p className="text-xs font-medium uppercase tracking-wider text-slate-600">Or try a popular search</p>
            <div className="flex flex-wrap justify-center gap-2">
              {SUGGESTED_SEARCHES.map((s, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => {
                    setKeyword(s.keyword);
                    if (s.naics) setNaics(s.naics);
                    if (s.agency) setAgency(s.agency);
                    if (s.minAmount) setMinAmount(s.minAmount);
                    if (s.setAside) setSetAside(s.setAside);
                    setActiveTab("search");
                  }}
                  className="rounded-lg border border-dashed border-slate-700 px-3 py-1.5 text-xs text-slate-400 transition-colors hover:border-blue-600 hover:text-blue-300"
                >
                  {s.label} &rarr;
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tab navigation */}
      <div className="flex gap-1 rounded-lg border border-slate-200 bg-slate-100 p-1 dark:border-slate-800 dark:bg-slate-900">
        <button
          type="button"
          onClick={() => setActiveTab("search")}
          className={`flex-1 rounded-md px-4 py-2 text-sm font-medium transition-all ${
            activeTab === "search"
              ? "bg-white text-slate-900 shadow-sm dark:bg-slate-800 dark:text-white"
              : "text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-300"
          }`}
        >
          Contract Search
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("agency")}
          className={`flex-1 rounded-md px-4 py-2 text-sm font-medium transition-all ${
            activeTab === "agency"
              ? "bg-white text-slate-900 shadow-sm dark:bg-slate-800 dark:text-white"
              : "text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-300"
          }`}
        >
          Spending by Agency
        </button>
      </div>

      {/* Contract Search Tab */}
      {activeTab === "search" && (
        <>
          <form onSubmit={handleSearch} className="flex flex-col gap-4 rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <div className="flex flex-col gap-1.5">
              <label htmlFor="keyword" className={labelClass}>Keyword</label>
              <input id="keyword" type="text" value={keyword} onChange={(e) => setKeyword(e.target.value)} placeholder="Search by keyword, NAICS code, or agency name..." className={inputClass} />
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="flex flex-col gap-1.5">
                <label htmlFor="naics" className={labelClass}>NAICS Code</label>
                <NaicsAutocomplete id="naics" value={naics} onChange={setNaics} />
              </div>
              <div className="flex flex-col gap-1.5">
                <label htmlFor="agency" className={labelClass}>Awarding Agency</label>
                <input id="agency" type="text" value={agency} onChange={(e) => setAgency(e.target.value)} placeholder="e.g. Department of Defense" className={inputClass} />
              </div>
              <div className="flex flex-col gap-1.5">
                <label htmlFor="recipient" className={labelClass}>Recipient / Company</label>
                <input id="recipient" type="text" value={recipient} onChange={(e) => setRecipient(e.target.value)} placeholder="e.g. Lockheed Martin" className={inputClass} />
              </div>
              <div className="flex flex-col gap-1.5">
                <label htmlFor="setAside" className={labelClass}>Set-Aside Type</label>
                <select id="setAside" value={setAside} onChange={(e) => setSetAside(e.target.value)} className={selectClass}>
                  {SET_ASIDE_OPTIONS.map((o) => (
                    <option key={o.value} value={o.value}>{o.label}</option>
                  ))}
                </select>
              </div>
              <div className="flex flex-col gap-1.5">
                <label htmlFor="minAmount" className={labelClass}>Min Amount ($)</label>
                <input id="minAmount" type="number" value={minAmount} onChange={(e) => setMinAmount(e.target.value)} placeholder="e.g. 100000" className={inputClass} />
              </div>
              <div className="flex flex-col gap-1.5">
                <label htmlFor="maxAmount" className={labelClass}>Max Amount ($)</label>
                <input id="maxAmount" type="number" value={maxAmount} onChange={(e) => setMaxAmount(e.target.value)} placeholder="e.g. 1000000" className={inputClass} />
              </div>
            </div>

            {showAdvanced && (
              <div className="grid grid-cols-1 gap-4 border-t border-slate-100 pt-4 sm:grid-cols-2 dark:border-slate-800">
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="psc" className={labelClass}>PSC Code</label>
                  <input id="psc" type="text" value={psc} onChange={(e) => setPsc(e.target.value)} placeholder="e.g. D306" className={inputClass} />
                </div>
              </div>
            )}

            <div className="flex items-end gap-4">
              <div className="flex flex-col gap-1.5">
                <label htmlFor="year" className={labelClass}>Year</label>
                <select id="year" value={year} onChange={(e) => setYear(e.target.value)} className={selectClass}>
                  {Array.from({ length: 5 }, (_, i) => new Date().getFullYear() - i).map((y) => (
                    <option key={y} value={y}>{y}</option>
                  ))}
                </select>
              </div>
              <button type="button" onClick={() => setShowAdvanced(!showAdvanced)} className="rounded-lg border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-600 transition-all hover:bg-slate-50 dark:border-slate-700 dark:text-slate-400 dark:hover:bg-slate-800">
                {showAdvanced ? "Less filters" : "More filters"}
              </button>
              <button type="submit" disabled={loading} className="flex-1 rounded-lg bg-blue-600 px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-blue-700 disabled:opacity-50 dark:bg-blue-500 dark:hover:bg-blue-400">
                {loading ? "Searching..." : "Search Contracts"}
              </button>
            </div>
          </form>

          {error && (
            <div className="rounded-xl border border-red-200 bg-red-50 p-5 dark:border-red-800 dark:bg-red-900/20">
              <p className="text-sm font-medium text-red-700 dark:text-red-400">{error}</p>
              {upgradeUrl && (
                <a
                  href={upgradeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => track("pro_checkout_clicked")}
                  className="mt-3 inline-block rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-400"
                >
                  Upgrade to Pro &mdash; $49/mo
                </a>
              )}
            </div>
          )}

          {loading && (
            <div className="flex items-center justify-center gap-3 py-8">
              <div className="h-5 w-5 animate-spin rounded-full border-2 border-blue-200 border-t-blue-600 dark:border-blue-800 dark:border-t-blue-400" />
              <p className="text-sm text-slate-500 dark:text-slate-400">Searching USASpending.gov...</p>
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
              {isFirstSearch && totalCount !== null && totalCount > 0 && (
                <div className="rounded-xl border border-blue-700/50 bg-gradient-to-r from-blue-950/80 to-slate-900 p-5">
                  <div className="flex items-start gap-3">
                    <span className="text-2xl">{"\u{1F3AF}"}</span>
                    <div>
                      <p className="font-semibold text-white">
                        Found {totalCount.toLocaleString()} contracts matching your criteria
                      </p>
                      <p className="mt-1 text-sm text-slate-400">
                        Pro users can export all results to CSV, save searches for later, and track spending trends across agencies.
                      </p>
                      <Link
                        href="/pricing"
                        onClick={() => track("pro_checkout_clicked")}
                        className="mt-3 inline-flex items-center gap-1.5 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-blue-700"
                      >
                        Unlock Pro features &mdash; $49/mo
                      </Link>
                    </div>
                  </div>
                </div>
              )}
              {totalCount !== null && (
                <div className="flex items-center justify-between gap-4">
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    {totalCount.toLocaleString()} contracts found &mdash; showing top 20 by award amount
                    {remaining != null && remaining >= 0 && (
                      <span className="ml-2 text-slate-400 dark:text-slate-500">
                        &middot; {remaining} searches remaining today
                      </span>
                    )}
                  </p>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={handleExportCsv}
                      disabled={exporting}
                      className="flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-600 transition-colors hover:border-blue-300 hover:text-blue-700 disabled:opacity-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:border-blue-600 dark:hover:text-blue-400"
                    >
                      <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      {exporting ? "Exporting..." : "Export CSV"}
                      <span className="rounded bg-blue-100 px-1 py-0.5 text-[10px] font-semibold text-blue-700 dark:bg-blue-900/50 dark:text-blue-300">PRO</span>
                    </button>
                    <button
                      onClick={handleSaveSearch}
                      disabled={saveStatus === "saving" || saveStatus === "saved"}
                      className="shrink-0 rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-600 transition-all hover:border-blue-300 hover:text-blue-700 disabled:opacity-50 dark:border-slate-700 dark:text-slate-400 dark:hover:border-blue-600 dark:hover:text-blue-400"
                    >
                      {saveStatus === "saving" ? "Saving..." : saveStatus === "saved" ? "Saved" : "Save this search"}
                    </button>
                  </div>
                </div>
              )}
              <div className="flex flex-col gap-3">
                {results.map((c, i) => (
                  <Link
                    href={`/award/${encodeURIComponent(c.internal_id)}`}
                    key={c.internal_id || i}
                    className="flex flex-col gap-2 rounded-xl border border-slate-200 bg-white p-5 transition-all hover:shadow-md hover:border-blue-300 dark:border-slate-800 dark:bg-slate-900 dark:hover:border-blue-700 cursor-pointer"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex flex-col gap-1">
                        <p className="text-sm font-semibold text-slate-900 dark:text-white">
                          {c["Recipient Name"] || "Undisclosed"}
                        </p>
                        <p className="text-xs text-slate-500 dark:text-slate-400">
                          {c["Awarding Agency"]}{c["Awarding Sub Agency"] ? ` \u2014 ${c["Awarding Sub Agency"]}` : ""}
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
                    <div className="flex flex-wrap items-center gap-3 text-xs text-slate-400 dark:text-slate-500">
                      <span>Award: {c["Award ID"]}</span>
                      <span>Type: {c["Award Type"]}</span>
                      {c["Start Date"] && <span>Start: {c["Start Date"]}</span>}
                      {c["End Date"] && <span>End: {c["End Date"]}</span>}
                      <span className="ml-auto text-blue-500 dark:text-blue-400">View details &rarr;</span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </>
      )}

      {/* Spending by Agency Tab */}
      {activeTab === "agency" && (
        <>
          <form onSubmit={handleAgencySearch} className="flex flex-col gap-4 rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="flex flex-col gap-1.5">
                <label htmlFor="agencyNaics" className={labelClass}>NAICS Code</label>
                <NaicsAutocomplete id="agencyNaics" value={agencyNaics} onChange={setAgencyNaics} />
              </div>
              <div className="flex flex-col gap-1.5">
                <label htmlFor="agencyKeyword" className={labelClass}>Keyword</label>
                <input id="agencyKeyword" type="text" value={agencyKeyword} onChange={(e) => setAgencyKeyword(e.target.value)} placeholder="e.g. cybersecurity" className={inputClass} />
              </div>
              <div className="flex flex-col gap-1.5">
                <label htmlFor="agencySetAside" className={labelClass}>Set-Aside Type</label>
                <select id="agencySetAside" value={agencySetAside} onChange={(e) => setAgencySetAside(e.target.value)} className={selectClass}>
                  {SET_ASIDE_OPTIONS.map((o) => (
                    <option key={o.value} value={o.value}>{o.label}</option>
                  ))}
                </select>
              </div>
              <div className="flex flex-col gap-1.5">
                <label htmlFor="agencyYear" className={labelClass}>Year</label>
                <select id="agencyYear" value={agencyYear} onChange={(e) => setAgencyYear(e.target.value)} className={selectClass}>
                  {Array.from({ length: 5 }, (_, i) => new Date().getFullYear() - i).map((y) => (
                    <option key={y} value={y}>{y}</option>
                  ))}
                </select>
              </div>
            </div>
            <button type="submit" disabled={agencyLoading} className="rounded-lg bg-blue-600 px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-blue-700 disabled:opacity-50 dark:bg-blue-500 dark:hover:bg-blue-400">
              {agencyLoading ? "Loading..." : "Show Spending by Agency"}
            </button>
          </form>

          {agencyError && (
            <p className="text-sm text-red-600 dark:text-red-400">{agencyError}</p>
          )}

          {agencyLoading && (
            <div className="flex items-center justify-center gap-3 py-8">
              <div className="h-5 w-5 animate-spin rounded-full border-2 border-blue-200 border-t-blue-600 dark:border-blue-800 dark:border-t-blue-400" />
              <p className="text-sm text-slate-500 dark:text-slate-400">Loading agency spending data...</p>
            </div>
          )}

          {!agencyLoading && agencySearched && agencyResults.length === 0 && !agencyError && (
            <div className="rounded-xl border border-slate-200 bg-white p-8 text-center dark:border-slate-800 dark:bg-slate-900">
              <p className="text-sm text-slate-500 dark:text-slate-400">
                No spending data found. Try a different NAICS code or keyword.
              </p>
            </div>
          )}

          {!agencyLoading && agencyResults.length > 0 && (
            <div className="flex flex-col gap-4">
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Top 10 agencies by contract spending
                {agencyNaics && ` for NAICS ${agencyNaics}`}
                {agencyKeyword && ` matching "${agencyKeyword}"`}
                {` in ${agencyYear}`}
              </p>
              <div className="flex flex-col gap-3">
                {agencyResults.map((a, i) => (
                  <div
                    key={a.id || i}
                    className="flex flex-col gap-2 rounded-xl border border-slate-200 bg-white p-5 transition-all hover:shadow-md dark:border-slate-800 dark:bg-slate-900 dark:hover:border-slate-700"
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
                        style={{ width: `${maxAgencyAmount > 0 ? (a.amount / maxAgencyAmount) * 100 : 0}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {!agencySearched && (
            <div className="rounded-xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
              <p className="text-sm text-slate-600 dark:text-slate-400">
                See which federal agencies spend the most on contracts in your industry.
                Enter a NAICS code or keyword to see the top 10 agencies ranked by total
                contract spending. Use this to identify which agencies to target in your
                business development efforts.
              </p>
            </div>
          )}
        </>
      )}
    </div>
  );
}
