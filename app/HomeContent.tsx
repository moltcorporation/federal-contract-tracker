"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { CrossProductFooter } from "@/app/components/cross-product-footer";

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
  { code: "541512", label: "IT Services", icon: "💻" },
  { code: "236220", label: "Construction", icon: "🏗️" },
  { code: "541330", label: "Engineering", icon: "⚙️" },
  { code: "541611", label: "Consulting", icon: "📊" },
  { code: "561720", label: "Janitorial", icon: "🧹" },
  { code: "541511", label: "Custom Software", icon: "🖥️" },
  { code: "562910", label: "Environmental", icon: "🌿" },
  { code: "336411", label: "Aerospace", icon: "✈️" },
  { code: "541690", label: "Scientific R&D", icon: "🔬" },
  { code: "561210", label: "Facilities Support", icon: "🏢" },
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
              <span className="ml-2 text-slate-500 dark:text-slate-400">— {s.description}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default function HomeContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [activeTab, setActiveTab] = useState<"search" | "agency">("search");
  const [user, setUser] = useState<{ id: number; email: string; name: string | null; naicsCodes: string[] | null; onboardingCompleted: boolean } | null>(null);
  const [authChecked, setAuthChecked] = useState(false);
  const [naicsApplied, setNaicsApplied] = useState(false);

  useEffect(() => {
    fetch("/api/auth/me")
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data?.user) {
          setUser(data.user);
          // Redirect to onboarding if not completed
          if (!data.user.onboardingCompleted) {
            router.push("/onboarding");
            return;
          }
          // Handle post-payment redirect from Stripe
          if (searchParams.get("pro") === "activated") {
            fetch("/api/restore-pro", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ email: data.user.email }),
            })
              .then(() => router.replace("/"))
              .catch(() => {});
          }
        }
        setAuthChecked(true);
      })
      .catch(() => setAuthChecked(true));
  }, [router, searchParams]);

  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST" });
    setUser(null);
  }

  // Pre-fill NAICS from URL param or user profile
  useEffect(() => {
    if (naicsApplied) return;
    const paramNaics = searchParams.get("naics");
    if (paramNaics) {
      setNaics(paramNaics);
      setNaicsApplied(true);
    } else if (user?.naicsCodes && user.naicsCodes.length > 0) {
      setNaics(user.naicsCodes[0]);
      setNaicsApplied(true);
    }
  }, [user, searchParams, naicsApplied]);

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

  // Email capture state
  const [captureEmail, setCaptureEmail] = useState("");
  const [emailCaptureLoading, setEmailCaptureLoading] = useState(false);
  const [emailCaptureSuccess, setEmailCaptureSuccess] = useState(false);
  const [emailCaptureError, setEmailCaptureError] = useState<string | null>(null);
  const [isFirstSearch, setIsFirstSearch] = useState(true);

  // Spending by agency state
  const [agencyNaics, setAgencyNaics] = useState("");
  const [agencyKeyword, setAgencyKeyword] = useState("");
  const [agencyYear, setAgencyYear] = useState(new Date().getFullYear().toString());
  const [agencySetAside, setAgencySetAside] = useState("");
  const [agencyResults, setAgencyResults] = useState<AgencySpending[]>([]);
  const [agencyLoading, setAgencyLoading] = useState(false);
  const [agencyError, setAgencyError] = useState("");
  const [agencySearched, setAgencySearched] = useState(false);

  async function handleSaveSearch() {
    setSaveStatus("saving");
    const parts: string[] = [];
    if (keyword) parts.push(keyword);
    if (naics) parts.push(`NAICS ${naics}`);
    if (agency) parts.push(agency);
    if (setAside) parts.push(setAside);
    if (recipient) parts.push(recipient);
    const name = parts.length > 0 ? parts.join(", ") : `Search ${year}`;

    try {
      const res = await fetch("/api/saved-searches", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, keyword, naics, agency, recipient, setAside, psc, minAmount, maxAmount, year }),
      });
      if (res.ok) {
        setSaveStatus("saved");
      } else {
        const data = await res.json();
        if (data.upgradeUrl) {
          window.open(data.upgradeUrl, "_blank");
        }
        setSaveStatus("error");
      }
    } catch {
      setSaveStatus("error");
    }
  }

  async function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setUpgradeUrl("");
    setLoading(true);
    setSearched(true);
    setSaveStatus("idle");

    try {
      const res = await fetch("/api/search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ keyword, naics, agency, minAmount, maxAmount, year, setAside, recipient, psc }),
      });

      const data = await res.json();

      if (res.status === 429) {
        setError(data.error || "Daily search limit reached.");
        setUpgradeUrl(data.upgradeUrl || "");
        setResults([]);
        return;
      }

      if (!res.ok) {
        throw new Error(data.error || "Search failed. Try again.");
      }

      setResults(data.results || []);
      setTotalCount(data.page_metadata?.total ?? null);
      if (data.remaining != null && data.remaining >= 0) {
        setRemaining(data.remaining);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
      setResults([]);
    } finally {
      setLoading(false);
      if (isFirstSearch) setIsFirstSearch(false);
    }
  }

  const [exporting, setExporting] = useState(false);

  async function handleExportCsv() {
    setExporting(true);
    try {
      const res = await fetch("/api/export", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          keyword,
          naics,
          agency,
          minAmount: minAmount || undefined,
          maxAmount: maxAmount || undefined,
          year,
          setAside,
          recipient,
          psc,
        }),
      });

      if (res.status === 403) {
        const data = await res.json();
        if (data.upgradeUrl) {
          window.open(data.upgradeUrl, "_blank");
        }
        return;
      }

      if (!res.ok) return;

      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `contracts-${year}.csv`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } finally {
      setExporting(false);
    }
  }

  async function handleAgencySearch(e: React.FormEvent) {
    e.preventDefault();
    setAgencyError("");
    setAgencyLoading(true);
    setAgencySearched(true);

    try {
      const res = await fetch("/api/spending-by-agency", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          naics: agencyNaics,
          keyword: agencyKeyword,
          year: agencyYear,
          setAside: agencySetAside,
        }),
      });

      if (!res.ok) {
        throw new Error("Search failed. Try again.");
      }

      const data = await res.json();
      setAgencyResults(data.results || []);
    } catch (err) {
      setAgencyError(err instanceof Error ? err.message : "Something went wrong.");
      setAgencyResults([]);
    } finally {
      setAgencyLoading(false);
    }
  }

  const maxAgencyAmount = agencyResults.length > 0 ? Math.max(...agencyResults.map((a) => a.amount)) : 0;

  return (
    <div className="flex min-h-screen flex-col bg-slate-950 font-sans">
      <header className="flex items-center justify-between border-b border-slate-800 px-6 py-4">
        <div className="flex items-center gap-2">
          <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6 text-blue-400" aria-hidden="true">
            <path d="M3 21V7l9-4 9 4v14" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
            <path d="M9 21V13h6v8" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
            <circle cx="12" cy="9.5" r="1.5" fill="currentColor" />
          </svg>
          <span className="text-lg font-bold tracking-tight text-white">
            GovScout
          </span>
        </div>
        <div className="flex items-center gap-4">
          <Link href="/trends" className="text-sm font-medium text-slate-400 transition-colors hover:text-blue-400">Trends</Link>
          <Link href="/saved-searches" className="text-sm font-medium text-slate-400 transition-colors hover:text-blue-400">Saved Searches</Link>
          <Link href="/pricing" className="text-sm font-medium text-slate-400 transition-colors hover:text-blue-400">Pricing</Link>
          {authChecked && (
            user ? (
              <>
                <span className="text-xs text-slate-500">{user.email}</span>
                <button
                  onClick={handleLogout}
                  className="text-sm font-medium text-slate-400 transition-colors hover:text-blue-400"
                >
                  Log out
                </button>
              </>
            ) : (
              <>
                <Link href="/login" className="text-sm font-medium text-slate-400 transition-colors hover:text-blue-400">Log in</Link>
                <Link
                  href="/register"
                  className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700"
                >
                  Sign Up Free
                </Link>
              </>
            )
          )}
        </div>
      </header>

      {/* Hero Section */}
      {!searched && !agencySearched && (
        <section className="relative overflow-hidden border-b border-slate-800 bg-gradient-to-b from-slate-900 to-slate-950 px-4 py-16 sm:py-20">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/20 via-transparent to-transparent" />
          <div className="relative mx-auto flex max-w-3xl flex-col items-center gap-6 text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-800/50 bg-blue-950/50 px-4 py-1.5 text-xs font-medium text-blue-300">
              <span className="h-1.5 w-1.5 rounded-full bg-blue-400 animate-pulse" />
              Powered by USASpending.gov — updated daily
            </div>
            <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
              See Who&apos;s Winning Contracts
              <span className="block text-blue-400">Before Your Competitors Do</span>
            </h1>
            <p className="mx-auto max-w-2xl text-lg text-slate-400">
              Know exactly who&apos;s winning awards in your NAICS code, how much agencies are spending,
              and which competitors keep showing up — for <span className="font-semibold text-white">$49/mo</span> instead of $15K+/yr for GovWin.
            </p>
            <div className="flex flex-col items-center gap-3 pt-2">
              <a
                href="/register"
                className="rounded-lg bg-blue-600 px-8 py-3 text-base font-semibold text-white shadow-lg shadow-blue-600/25 transition-all hover:bg-blue-700 hover:shadow-blue-600/40"
              >
                Start Free — No Credit Card Required
              </a>
              <p className="text-xs text-slate-500">
                10 searches/day free · Upgrade to Pro anytime for $49/mo
              </p>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-6 pt-2">
              <div className="flex flex-col items-center">
                <span className="text-2xl font-bold text-white">$49</span>
                <span className="text-xs text-slate-500">/month Pro</span>
              </div>
              <div className="h-8 w-px bg-slate-700" />
              <div className="flex flex-col items-center">
                <span className="text-2xl font-bold text-white">5+</span>
                <span className="text-xs text-slate-500">years of award history</span>
              </div>
              <div className="h-8 w-px bg-slate-700" />
              <div className="flex flex-col items-center">
                <span className="text-2xl font-bold text-white">10</span>
                <span className="text-xs text-slate-500">free searches/day</span>
              </div>
            </div>
            {/* Competitive positioning */}
            <div className="mx-auto mt-2 flex max-w-xl flex-col gap-2 rounded-lg border border-slate-700/50 bg-slate-800/30 px-5 py-4">
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Why not the alternatives?</p>
              <div className="flex flex-col gap-1.5 text-sm text-slate-400">
                <div className="flex items-center justify-between">
                  <span>GovWin IQ</span>
                  <span className="text-slate-500">$15,000–$29,000/yr · Enterprise-only</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>GovIntel AI</span>
                  <span className="text-slate-500">$25/mo · No historical award data</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>USASpending.gov</span>
                  <span className="text-slate-500">Free · Painful UX, no saved searches</span>
                </div>
                <div className="mt-1 flex items-center justify-between border-t border-slate-700/50 pt-2">
                  <span className="font-semibold text-white">GovScout</span>
                  <span className="font-semibold text-blue-400">$49/mo · Award history + trends + alerts</span>
                </div>
              </div>
            </div>
            {/* Secondary CTA */}
            <div className="flex flex-col items-center gap-3 pt-2">
              <a
                href="#search"
                className="inline-flex items-center gap-2 text-sm font-medium text-slate-400 underline decoration-slate-700 underline-offset-4 transition-colors hover:text-blue-400"
              >
                Or try a free search first — no account needed
              </a>
            </div>
            {/* Trust signals */}
            <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
              <div className="flex items-center gap-2 rounded-full border border-slate-700 bg-slate-800/50 px-4 py-1.5 text-xs text-slate-400">
                <svg className="h-4 w-4 text-blue-400" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" /></svg>
                No credit card required
              </div>
              <div className="flex items-center gap-2 rounded-full border border-slate-700 bg-slate-800/50 px-4 py-1.5 text-xs text-slate-400">
                <svg className="h-4 w-4 text-blue-400" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                Cancel anytime
              </div>
              <a href="https://www.usaspending.gov" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 rounded-full border border-slate-700 bg-slate-800/50 px-4 py-1.5 text-xs text-slate-400 hover:text-blue-300 transition-colors">
                <svg className="h-4 w-4 text-blue-400" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456z" /></svg>
                Powered by USASpending.gov data
              </a>
            </div>
          </div>
        </section>
      )}

      {/* Email Capture Section */}
      {!searched && !agencySearched && (
        <section className="w-full bg-slate-950 border-y border-slate-800">
          <div className="mx-auto max-w-2xl px-4 py-12 text-center">
            <h2 className="text-lg font-semibold text-white">
              Get weekly contract alerts for your industry
            </h2>
            <p className="mt-2 text-sm text-slate-400">
              Join thousands of contractors who never miss a federal opportunity.
            </p>
            {emailCaptureSuccess ? (
              <div className="mt-6 rounded-lg border border-green-800 bg-green-950/50 px-4 py-3 text-sm text-green-300">
                You&apos;re in! We&apos;ll send you relevant contract alerts soon.
              </div>
            ) : (
              <form
                onSubmit={async (e) => {
                  e.preventDefault();
                  setEmailCaptureLoading(true);
                  setEmailCaptureError(null);
                  try {
                    const res = await fetch("/api/subscribe", {
                      method: "POST",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify({
                        email: captureEmail,
                        source: searchParams.get("source") || null,
                      }),
                    });
                    const data = await res.json();
                    if (!res.ok) {
                      setEmailCaptureError(data.error || "Something went wrong");
                    } else {
                      setEmailCaptureSuccess(true);
                    }
                  } catch {
                    setEmailCaptureError("Something went wrong. Please try again.");
                  } finally {
                    setEmailCaptureLoading(false);
                  }
                }}
                className="mt-6 flex flex-col items-center gap-3 sm:flex-row sm:justify-center"
              >
                <input
                  type="email"
                  required
                  placeholder="you@company.com"
                  value={captureEmail}
                  onChange={(e) => setCaptureEmail(e.target.value)}
                  className="w-full max-w-sm rounded-lg border border-slate-700 bg-slate-900 px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 sm:w-72"
                />
                <button
                  type="submit"
                  disabled={emailCaptureLoading}
                  className="rounded-lg bg-blue-600 px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-blue-500 disabled:opacity-50"
                >
                  {emailCaptureLoading ? "Subscribing..." : "Subscribe"}
                </button>
              </form>
            )}
            {emailCaptureError && (
              <p className="mt-3 text-sm text-red-400">{emailCaptureError}</p>
            )}
          </div>
        </section>
      )}

      <main className="flex flex-1 flex-col items-center px-4 pb-16 pt-8">
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
                      {s.label} →
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
                      className="mt-3 inline-block rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-400"
                    >
                      Upgrade to Pro — $49/mo
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
                        <span className="text-2xl">🎯</span>
                        <div>
                          <p className="font-semibold text-white">
                            Found {totalCount.toLocaleString()} contracts matching your criteria
                          </p>
                          <p className="mt-1 text-sm text-slate-400">
                            Pro users can export all results to CSV, save searches for later, and track spending trends across agencies.
                          </p>
                          <Link
                            href="/pricing"
                            className="mt-3 inline-flex items-center gap-1.5 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-blue-700"
                          >
                            Unlock Pro features — $49/mo
                          </Link>
                        </div>
                      </div>
                    </div>
                  )}
                  {totalCount !== null && (
                    <div className="flex items-center justify-between gap-4">
                      <p className="text-sm text-slate-500 dark:text-slate-400">
                        {totalCount.toLocaleString()} contracts found — showing top 20 by award amount
                        {remaining != null && remaining >= 0 && (
                          <span className="ml-2 text-slate-400 dark:text-slate-500">
                            · {remaining} searches remaining today
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
                        <div className="flex flex-wrap items-center gap-3 text-xs text-slate-400 dark:text-slate-500">
                          <span>Award: {c["Award ID"]}</span>
                          <span>Type: {c["Award Type"]}</span>
                          {c["Start Date"] && <span>Start: {c["Start Date"]}</span>}
                          {c["End Date"] && <span>End: {c["End Date"]}</span>}
                          <span className="ml-auto text-blue-500 dark:text-blue-400">View details →</span>
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

          {/* SEO content — shown only when no search has been performed on either tab */}
          {!searched && !agencySearched && (
            <>
              <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
                {[
                  { step: "1", title: "Search by NAICS", desc: "Enter your NAICS code to find contracts in your industry." },
                  { step: "2", title: "Filter by set-aside", desc: "Find 8(a), HUBZone, WOSB, and SDVOSB set-aside contracts." },
                  { step: "3", title: "Research competitors", desc: "See who's winning contracts, for how much, and from which agencies." },
                ].map((s) => (
                  <div key={s.step} className="flex flex-col items-center gap-2 rounded-xl border border-slate-200 bg-white p-5 text-center dark:border-slate-800 dark:bg-slate-900">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-sm font-bold text-white dark:bg-blue-500">{s.step}</span>
                    <h3 className="text-sm font-semibold text-slate-900 dark:text-white">{s.title}</h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400">{s.desc}</p>
                  </div>
                ))}
              </div>

              {/* Sample results — show what the data looks like */}
              <div className="mt-8 flex flex-col gap-4">
                <div className="flex flex-col gap-1">
                  <h2 className="text-xl font-bold text-white">
                    Recent awards in IT services
                  </h2>
                  <p className="text-xs text-slate-400">
                    NAICS 541512 — Computer Systems Design Services. Real awards from USASpending.gov.
                  </p>
                </div>
                <div className="flex flex-col gap-3">
                  {[
                    {
                      recipient: "Booz Allen Hamilton Inc.",
                      agency: "Department of Defense",
                      subAgency: "Defense Information Systems Agency",
                      amount: 94_500_000,
                      description: "Enterprise IT modernization and cloud migration support services for defense communications infrastructure.",
                      awardId: "FA8726-24-C-0012",
                      type: "Definitive Contract",
                      start: "2024-10-01",
                      end: "2029-09-30",
                    },
                    {
                      recipient: "Leidos Inc.",
                      agency: "Department of Homeland Security",
                      subAgency: "Customs and Border Protection",
                      amount: 37_200_000,
                      description: "Cybersecurity operations center and threat intelligence platform development and sustainment.",
                      awardId: "70B04C24C00031892",
                      type: "Definitive Contract",
                      start: "2024-07-15",
                      end: "2027-07-14",
                    },
                    {
                      recipient: "SAIC Inc.",
                      agency: "National Aeronautics and Space Administration",
                      subAgency: "Goddard Space Flight Center",
                      amount: 22_800_000,
                      description: "Ground systems software engineering and integration support for satellite mission operations.",
                      awardId: "80GSFC24CA003",
                      type: "Definitive Contract",
                      start: "2024-09-01",
                      end: "2028-08-31",
                    },
                    {
                      recipient: "Accenture Federal Services LLC",
                      agency: "Department of Veterans Affairs",
                      subAgency: "Veterans Health Administration",
                      amount: 15_600_000,
                      description: "Electronic health record system optimization and data analytics platform for veteran care coordination.",
                      awardId: "36C10X24C0078",
                      type: "Definitive Contract",
                      start: "2024-11-01",
                      end: "2026-10-31",
                    },
                    {
                      recipient: "Palantir Technologies Inc.",
                      agency: "Department of the Army",
                      subAgency: "Army Contracting Command",
                      amount: 48_900_000,
                      description: "Artificial intelligence and data integration platform for operational decision support and intelligence analysis.",
                      awardId: "W56KGZ-24-C-0039",
                      type: "Definitive Contract",
                      start: "2024-08-15",
                      end: "2027-08-14",
                    },
                  ].map((c) => (
                    <div
                      key={c.awardId}
                      className="flex flex-col gap-2 rounded-xl border border-slate-800 bg-slate-900 p-5"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex flex-col gap-1">
                          <p className="text-sm font-semibold text-white">{c.recipient}</p>
                          <p className="text-xs text-slate-400">
                            {c.agency} — {c.subAgency}
                          </p>
                        </div>
                        <span className="shrink-0 rounded-lg bg-blue-950/50 px-3 py-1 text-sm font-bold text-blue-400">
                          {formatDollars(c.amount)}
                        </span>
                      </div>
                      <p className="text-xs leading-relaxed text-slate-400">{c.description}</p>
                      <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500">
                        <span>Award: {c.awardId}</span>
                        <span>Type: {c.type}</span>
                        <span>Start: {c.start}</span>
                        <span>End: {c.end}</span>
                      </div>
                    </div>
                  ))}
                </div>
                <p className="text-center text-xs text-slate-500">
                  Search above to find contracts in your NAICS code, agency, or set-aside category.
                </p>
              </div>

              {/* Free vs Pro pricing comparison */}
              <div id="pricing" className="mt-10 scroll-mt-8 rounded-2xl border border-slate-800 bg-slate-900/80 p-6 sm:p-8">
                <h2 className="text-center text-xl font-bold text-white">
                  Free vs Pro
                </h2>
                <p className="mx-auto mt-2 max-w-lg text-center text-sm text-slate-400">
                  Start searching free. Upgrade when you need unlimited access, exports, and alerts.
                </p>
                <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {/* Free tier */}
                  <div className="flex flex-col gap-4 rounded-xl border border-slate-700 bg-slate-900 p-5">
                    <div>
                      <h3 className="text-base font-bold text-white">Free</h3>
                      <p className="mt-1 text-xs text-slate-400">Explore the federal market</p>
                      <div className="mt-2 flex items-baseline gap-1">
                        <span className="text-2xl font-extrabold text-white">$0</span>
                        <span className="text-xs text-slate-500">/month</span>
                      </div>
                    </div>
                    <ul className="flex flex-col gap-2 text-sm text-slate-300">
                      <li className="flex items-center gap-2"><span className="text-blue-400">✓</span> 10 searches per day</li>
                      <li className="flex items-center gap-2"><span className="text-blue-400">✓</span> Filter by NAICS, agency, set-aside</li>
                      <li className="flex items-center gap-2"><span className="text-blue-400">✓</span> View spending by agency</li>
                      <li className="flex items-center gap-2"><span className="text-slate-600">✗</span><span className="text-slate-500"> Unlimited searches</span></li>
                      <li className="flex items-center gap-2"><span className="text-slate-600">✗</span><span className="text-slate-500"> CSV export</span></li>
                      <li className="flex items-center gap-2"><span className="text-slate-600">✗</span><span className="text-slate-500"> Saved searches & email alerts</span></li>
                    </ul>
                    <a
                      href="/register"
                      className="mt-auto rounded-lg border border-slate-600 py-2 text-center text-sm font-medium text-white transition-colors hover:bg-slate-800"
                    >
                      Start Free
                    </a>
                  </div>
                  {/* Pro tier */}
                  <div className="flex flex-col gap-4 rounded-xl border-2 border-blue-500 bg-slate-900 p-5">
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-base font-bold text-white">Pro</h3>
                        <span className="rounded-full bg-blue-600 px-2 py-0.5 text-[10px] font-medium text-white">RECOMMENDED</span>
                      </div>
                      <p className="mt-1 text-xs text-slate-400">For serious BD teams</p>
                      <div className="mt-2 flex items-baseline gap-1">
                        <span className="text-2xl font-extrabold text-white">$49</span>
                        <span className="text-xs text-slate-500">/month</span>
                      </div>
                    </div>
                    <ul className="flex flex-col gap-2 text-sm text-slate-300">
                      <li className="flex items-center gap-2"><span className="text-blue-400">✓</span> Unlimited searches</li>
                      <li className="flex items-center gap-2"><span className="text-blue-400">✓</span> Export award data as CSV</li>
                      <li className="flex items-center gap-2"><span className="text-blue-400">✓</span> Saved searches with email alerts</li>
                      <li className="flex items-center gap-2"><span className="text-blue-400">✓</span> Spending trends by agency</li>
                      <li className="flex items-center gap-2"><span className="text-blue-400">✓</span> Competitor tracking</li>
                      <li className="flex items-center gap-2"><span className="text-blue-400">✓</span> All free tier features</li>
                    </ul>
                    <Link
                      href="/pricing"
                      className="mt-auto rounded-lg bg-blue-600 py-2 text-center text-sm font-medium text-white transition-colors hover:bg-blue-700"
                    >
                      Unlock Pro — $49/mo
                    </Link>
                  </div>
                </div>
                <p className="mt-4 text-center text-xs text-slate-500">
                  No credit card required for free tier · Cancel Pro anytime
                </p>
              </div>

              {/* Why not USASpending? comparison section */}
              <div className="mt-10 rounded-2xl border border-slate-800 bg-slate-900/80 p-6 sm:p-8">
                <h2 className="text-center text-xl font-bold text-white">
                  USASpending.gov has the data. We make it useful.
                </h2>
                <p className="mx-auto mt-2 max-w-lg text-center text-sm text-slate-400">
                  USASpending.gov is free and public. So why pay for GovScout? Because raw data isn&apos;t intelligence.
                </p>
                <div className="mt-6 overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-slate-700">
                        <th className="py-3 pr-4 text-left font-medium text-slate-400">Feature</th>
                        <th className="px-4 py-3 text-center font-medium text-slate-400">USASpending.gov</th>
                        <th className="px-4 py-3 text-center font-medium text-blue-400">GovScout Pro</th>
                      </tr>
                    </thead>
                    <tbody className="text-slate-300">
                      {[
                        { feature: "Search by NAICS + agency + set-aside", usa: false, fct: true },
                        { feature: "Filter by dollar range", usa: false, fct: true },
                        { feature: "Spending trends by agency over time", usa: false, fct: true },
                        { feature: "Saved searches with email alerts", usa: false, fct: true },
                        { feature: "Export results to CSV for proposals", usa: false, fct: true },
                        { feature: "Keyword search across descriptions", usa: true, fct: true },
                        { feature: "Clean, filterable results in seconds", usa: false, fct: true },
                        { feature: "Raw data download (bulk)", usa: true, fct: false },
                      ].map((row) => (
                        <tr key={row.feature} className="border-b border-slate-800/50">
                          <td className="py-3 pr-4 text-sm text-slate-300">{row.feature}</td>
                          <td className="px-4 py-3 text-center">
                            {row.usa ? (
                              <span className="text-slate-400">Yes</span>
                            ) : (
                              <span className="text-slate-600">No</span>
                            )}
                          </td>
                          <td className="px-4 py-3 text-center">
                            {row.fct ? (
                              <svg className="mx-auto h-5 w-5 text-blue-400" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                              </svg>
                            ) : (
                              <span className="text-slate-600">—</span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="mt-6 flex flex-col items-center gap-3">
                  <a
                    href="#search"
                    className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-blue-900/30 transition-all hover:bg-blue-500"
                  >
                    Try a Free Search Now
                  </a>
                  <p className="text-center text-sm text-slate-400">
                    Stop spending 2 hours on USASpending when GovScout finds it in 2 minutes.{" "}
                    <a href="/pricing" className="font-medium text-blue-400 hover:text-blue-300">
                      See Pro pricing →
                    </a>
                  </p>
                </div>
              </div>

              <div className="mt-8 flex flex-col gap-8">
                <div className="flex flex-col gap-3">
                  <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                    Win more government contracts
                  </h2>
                  <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                    Know exactly who&apos;s winning awards in your NAICS code, how much agencies are spending
                    in your industry, and which competitors keep showing up. GovScout
                    turns 5+ years of USASpending.gov data into competitive intelligence you can use —
                    find patterns in award history, track spending trends by agency, and set up alerts
                    so you never miss a relevant award. Built for small businesses that can&apos;t afford
                    $15K/yr enterprise tools but need more than raw government data.
                  </p>
                </div>

                <div className="flex flex-col gap-3">
                  <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                    How do set-aside contracts work?
                  </h2>
                  <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                    Federal agencies set aside certain contracts exclusively for small businesses. The
                    most common set-aside types are SBA small business, 8(a) Business Development for
                    socially and economically disadvantaged firms, HUBZone for businesses in underutilized
                    areas, WOSB for women-owned small businesses, and SDVOSB for service-disabled
                    veteran-owned businesses. Use the set-aside filter above to find contracts reserved
                    for your certification type.
                  </p>
                </div>

                <div className="flex flex-col gap-3">
                  <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                    What data is included?
                  </h2>
                  <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                    Results include the award ID, recipient company name, awarding agency and sub-agency,
                    contract description, award amount, start and end dates, and award type. Data comes
                    directly from USASpending.gov and is updated daily. This covers awarded contracts
                    only — for open solicitations and bidding opportunities, check SAM.gov.
                  </p>
                </div>

                <div className="flex flex-col gap-3">
                  <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                    What is a NAICS code?
                  </h2>
                  <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                    NAICS (North American Industry Classification System) codes categorize businesses
                    by industry. Federal contracts are tagged with NAICS codes so you can find contracts
                    in your specific field. For example, 541512 is &ldquo;Computer Systems Design Services&rdquo;
                    and 236220 is &ldquo;Commercial and Institutional Building Construction.&rdquo; You can
                    find your NAICS code at census.gov/naics.
                  </p>
                </div>
              </div>
            </>
          )}
        </div>
      </main>

      <CrossProductFooter />
    </div>
  );
}
