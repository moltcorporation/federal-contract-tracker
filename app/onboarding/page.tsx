"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface NaicsSuggestion {
  code: string;
  description: string;
}

const POPULAR_NAICS = [
  { code: "541512", label: "IT Services", icon: "💻" },
  { code: "236220", label: "Construction", icon: "🏗️" },
  { code: "541330", label: "Engineering", icon: "⚙️" },
  { code: "541611", label: "Management Consulting", icon: "📊" },
  { code: "561720", label: "Janitorial Services", icon: "🧹" },
  { code: "541511", label: "Custom Software", icon: "🖥️" },
  { code: "562910", label: "Environmental", icon: "🌿" },
  { code: "336411", label: "Aerospace", icon: "✈️" },
  { code: "541690", label: "Scientific R&D", icon: "🔬" },
  { code: "561210", label: "Facilities Support", icon: "🏢" },
  { code: "541519", label: "Other IT Services", icon: "🔧" },
  { code: "541990", label: "Other Professional Services", icon: "💼" },
  { code: "561612", label: "Security Guards", icon: "🛡️" },
  { code: "238210", label: "Electrical", icon: "⚡" },
  { code: "541380", label: "Testing Laboratories", icon: "🧪" },
  { code: "488190", label: "Transportation Support", icon: "🚛" },
  { code: "541715", label: "R&D (Physical/Bio)", icon: "🧬" },
  { code: "238220", label: "Plumbing & HVAC", icon: "🔩" },
  { code: "517110", label: "Telecommunications", icon: "📡" },
  { code: "811310", label: "Machinery Repair", icon: "🔨" },
];

export default function OnboardingPage() {
  const router = useRouter();
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  // Search state
  const [searchText, setSearchText] = useState("");
  const [suggestions, setSuggestions] = useState<NaicsSuggestion[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [highlightIndex, setHighlightIndex] = useState(-1);
  const debounceRef = useRef<ReturnType<typeof setTimeout>>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const fetchSuggestions = useCallback((text: string) => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    if (text.length < 2) {
      setSuggestions([]);
      setShowSuggestions(false);
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
        setShowSuggestions((data.results || []).length > 0);
        setHighlightIndex(-1);
      } catch {
        setSuggestions([]);
        setShowSuggestions(false);
      }
    }, 300);
  }, []);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setShowSuggestions(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function toggleCode(code: string) {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(code)) {
        next.delete(code);
      } else {
        next.add(code);
      }
      return next;
    });
  }

  function addFromSearch(code: string) {
    setSelected((prev) => new Set(prev).add(code));
    setSearchText("");
    setSuggestions([]);
    setShowSuggestions(false);
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (!showSuggestions || suggestions.length === 0) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlightIndex((prev) => (prev < suggestions.length - 1 ? prev + 1 : 0));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlightIndex((prev) => (prev > 0 ? prev - 1 : suggestions.length - 1));
    } else if (e.key === "Enter" && highlightIndex >= 0) {
      e.preventDefault();
      addFromSearch(suggestions[highlightIndex].code);
    } else if (e.key === "Escape") {
      setShowSuggestions(false);
    }
  }

  async function handleContinue() {
    setError("");
    setSaving(true);
    try {
      const res = await fetch("/api/onboarding", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ naicsCodes: Array.from(selected) }),
      });
      if (!res.ok) {
        const data = await res.json();
        setError(data.error || "Failed to save");
        return;
      }
      // Redirect to home with first selected NAICS pre-filled
      const firstCode = Array.from(selected)[0];
      router.push(firstCode ? `/?naics=${firstCode}` : "/");
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setSaving(false);
    }
  }

  async function handleSkip() {
    setSaving(true);
    try {
      await fetch("/api/onboarding", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ skip: true }),
      });
    } catch {
      // Skip failure is non-critical
    }
    router.push("/");
  }

  // Get label for a code
  function getLabel(code: string) {
    const popular = POPULAR_NAICS.find((n) => n.code === code);
    return popular?.label || code;
  }

  return (
    <div className="flex min-h-screen flex-col items-center bg-slate-950 px-4 py-12">
      <div className="w-full max-w-2xl">
        <Link
          href="/"
          className="mb-6 block text-center text-xl font-bold tracking-tight text-white"
        >
          Gov<span className="text-blue-400">Scout</span>
        </Link>

        <div className="flex flex-col items-center gap-2 text-center">
          <h1 className="text-2xl font-bold text-white">
            What does your business do?
          </h1>
          <p className="max-w-md text-sm text-slate-400">
            Select your industries so we can show you relevant federal contracts
            right away. You can change these later.
          </p>
        </div>

        {/* Selected codes */}
        {selected.size > 0 && (
          <div className="mt-6 flex flex-wrap items-center gap-2">
            <span className="text-xs font-medium text-slate-500">Selected:</span>
            {Array.from(selected).map((code) => (
              <button
                key={code}
                onClick={() => toggleCode(code)}
                className="inline-flex items-center gap-1 rounded-full border border-blue-500 bg-blue-950/50 px-3 py-1 text-xs font-medium text-blue-300 transition-colors hover:bg-blue-900/50"
              >
                {code} — {getLabel(code)}
                <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            ))}
          </div>
        )}

        {/* Search */}
        <div ref={containerRef} className="relative mt-6">
          <input
            type="text"
            value={searchText}
            onChange={(e) => {
              setSearchText(e.target.value);
              fetchSuggestions(e.target.value);
            }}
            onFocus={() => { if (suggestions.length > 0) setShowSuggestions(true); }}
            onKeyDown={handleKeyDown}
            placeholder="Search by keyword or NAICS code (e.g. 'plumbing' or '238220')"
            className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-3 text-sm text-white placeholder-slate-500 outline-none transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-900/50"
            autoComplete="off"
          />
          {showSuggestions && suggestions.length > 0 && (
            <ul className="absolute left-0 right-0 top-full z-50 mt-1 max-h-56 overflow-auto rounded-lg border border-slate-700 bg-slate-800 shadow-lg">
              {suggestions.map((s, i) => (
                <li
                  key={s.code}
                  className={`cursor-pointer px-4 py-2.5 text-sm ${
                    i === highlightIndex
                      ? "bg-blue-950/50 text-blue-200"
                      : "text-white hover:bg-slate-700/50"
                  } ${selected.has(s.code) ? "opacity-50" : ""}`}
                  onMouseDown={() => addFromSearch(s.code)}
                >
                  <span className="font-mono font-medium">{s.code}</span>
                  <span className="ml-2 text-slate-400">— {s.description}</span>
                  {selected.has(s.code) && (
                    <span className="ml-2 text-xs text-blue-400">(selected)</span>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Popular NAICS grid */}
        <div className="mt-6">
          <p className="mb-3 text-xs font-medium uppercase tracking-wider text-slate-600">
            Popular industries in government contracting
          </p>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
            {POPULAR_NAICS.map((cat) => (
              <button
                key={cat.code}
                type="button"
                onClick={() => toggleCode(cat.code)}
                className={`flex items-center gap-2 rounded-lg border px-3 py-2.5 text-left text-sm font-medium transition-all ${
                  selected.has(cat.code)
                    ? "border-blue-500 bg-blue-950/50 text-blue-300"
                    : "border-slate-700 bg-slate-800/50 text-slate-300 hover:border-blue-600 hover:text-blue-300"
                }`}
              >
                <span className="text-base">{cat.icon}</span>
                <div className="flex flex-col">
                  <span className="text-xs leading-tight">{cat.label}</span>
                  <span className="text-[10px] text-slate-500">{cat.code}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {error && (
          <div className="mt-4 rounded-lg border border-red-800/50 bg-red-950/50 px-4 py-3 text-sm text-red-300">
            {error}
          </div>
        )}

        {/* Actions */}
        <div className="mt-8 flex flex-col gap-3">
          <button
            onClick={handleContinue}
            disabled={saving || selected.size === 0}
            className="rounded-lg bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-600/25 transition-all hover:bg-blue-700 disabled:opacity-50"
          >
            {saving
              ? "Saving..."
              : selected.size > 0
              ? `Show me contracts (${selected.size} ${selected.size === 1 ? "industry" : "industries"} selected)`
              : "Select at least one industry"}
          </button>
          <button
            onClick={handleSkip}
            disabled={saving}
            className="text-sm font-medium text-slate-500 transition-colors hover:text-slate-300"
          >
            Skip for now — I&apos;ll explore on my own
          </button>
        </div>
      </div>
    </div>
  );
}
