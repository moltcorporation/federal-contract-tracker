"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import Link from "next/link";
import { CrossProductFooter } from "@/app/components/cross-product-footer";

interface NaicsSuggestion {
  code: string;
  description: string;
}

const topNaicsCodes = [
  { code: "541512", industry: "Computer Systems Design", description: "Custom computer programming and systems integration" },
  { code: "236220", industry: "Commercial Building Construction", description: "New construction of commercial and institutional buildings" },
  { code: "541330", industry: "Engineering Services", description: "Civil, mechanical, electrical, and environmental engineering" },
  { code: "541611", industry: "Management Consulting", description: "Administrative and general management consulting" },
  { code: "561210", industry: "Facilities Support Services", description: "Base maintenance, janitorial, and facility management" },
  { code: "541519", industry: "Other Computer Services", description: "IT infrastructure, hosting, and data processing" },
  { code: "541990", industry: "Professional Services", description: "Scientific and technical consulting not elsewhere classified" },
  { code: "236210", industry: "Industrial Building Construction", description: "New construction of manufacturing and warehouse facilities" },
  { code: "561612", industry: "Security Guards", description: "Guard and patrol services for buildings and facilities" },
  { code: "541715", industry: "R&D (Physical Sciences)", description: "Research and development in physical, engineering, and life sciences" },
  { code: "238220", industry: "Plumbing & HVAC", description: "Plumbing, heating, and air-conditioning contractors" },
  { code: "488190", industry: "Support Activities for Transport", description: "Airport operations, port services, and logistics support" },
];

const steps = [
  {
    title: "Identify Your Primary Business Activity",
    body: "Think about what your business does most of the time, not everything it could do. NAICS codes classify establishments by their primary activity. If you run a construction company that also does consulting, your primary NAICS code should reflect whichever activity generates the most revenue.",
  },
  {
    title: "Search by Keyword or Description",
    body: "Use the lookup tool above to search for your industry by keyword. Try multiple variations — 'software development' vs 'computer programming' vs 'IT services' may return different codes. The Census Bureau groups activities by what an establishment does, not what it calls itself.",
  },
  {
    title: "Check the Code Hierarchy",
    body: "NAICS codes are hierarchical: 2-digit (sector) → 3-digit (subsector) → 4-digit (industry group) → 5-digit (industry) → 6-digit (national). For government contracting, you need the full 6-digit code. A broader code (fewer digits) covers more activities but is less specific for contract matching.",
  },
  {
    title: "Verify Against Competitors",
    body: "Search for companies similar to yours on SAM.gov and note their NAICS codes. If your direct competitors all use 541512 (Computer Systems Design), that is likely your correct code too. GovScout lets you search contract awards by NAICS code to see who is winning work under each classification.",
  },
  {
    title: "Register Multiple Codes on SAM.gov",
    body: "You can list multiple NAICS codes on your SAM.gov registration — one primary and unlimited secondary codes. Your primary code determines your size standard (revenue or employee threshold). Choose secondary codes for any other work you are qualified to perform, as contracting officers search by NAICS code to find vendors.",
  },
];

const faqs = [
  {
    question: "What is a NAICS code?",
    answer:
      "NAICS (North American Industry Classification System) is the standard used by the U.S., Canada, and Mexico to classify businesses by industry. Each business is assigned a 6-digit code based on its primary activity. NAICS codes are used for federal contracting, census data, tax reporting, and economic analysis. The system is updated every 5 years, with the current version being NAICS 2022.",
  },
  {
    question: "How do I look up my NAICS code by company name?",
    answer:
      "Search for your company on SAM.gov — if your business is registered, your NAICS codes are listed in your entity profile. If you are not yet registered, use the lookup tool above to search by keyword describing your business activity. You can also check what NAICS codes your competitors use by searching their names on SAM.gov or searching contract awards on GovScout.",
  },
  {
    question: "Can a business have more than one NAICS code?",
    answer:
      "Yes. On SAM.gov, you select one primary NAICS code and can add unlimited secondary codes. Your primary code determines your SBA size standard — the revenue or employee threshold that defines whether you qualify as a small business for that industry. Secondary codes let contracting officers find you when searching for vendors in related industries.",
  },
  {
    question: "What is the difference between NAICS and SIC codes?",
    answer:
      "NAICS replaced the Standard Industrial Classification (SIC) system in 1997. SIC codes are 4 digits; NAICS codes are 6 digits and more granular. Some government agencies and financial institutions still reference SIC codes, but federal contracting uses NAICS exclusively. The Census Bureau provides a NAICS-to-SIC crosswalk if you need to convert between systems.",
  },
  {
    question: "How do NAICS codes affect government contracting?",
    answer:
      "Every federal solicitation is assigned a NAICS code that determines which businesses can bid and what size standard applies. If a solicitation uses NAICS 541512 (Computer Systems Design), the small business size standard is $34 million in average annual revenue. Contracting officers search SAM.gov by NAICS code to find eligible vendors, so having the right codes on your registration directly affects which opportunities you see.",
  },
  {
    question: "How often are NAICS codes updated?",
    answer:
      "NAICS codes are revised every 5 years by the U.S. Census Bureau, Statistics Canada, and Mexico's INEGI. The current version is NAICS 2022. Updates add new industries (like cannabis-related codes added in 2022), retire obsolete ones, and reclassify activities as industries evolve. Check the Census Bureau website for the latest revision and any codes that may have changed since your last SAM.gov registration.",
  },
  {
    question: "What if I choose the wrong NAICS code?",
    answer:
      "Choosing the wrong primary NAICS code can affect your small business size determination — you might qualify as small under one code but not another. It can also mean you miss contract opportunities because contracting officers search by code. You can update your NAICS codes on SAM.gov at any time during your annual renewal or by editing your registration. If you are unsure, look at what codes your direct competitors use.",
  },
];

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  },
  {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "How to Find Your NAICS Code",
    description:
      "Step-by-step guide to finding the correct NAICS code for your business for government contracting and SAM.gov registration.",
    step: steps.map((s, i) => ({
      "@type": "HowToStep",
      position: i + 1,
      name: s.title,
      text: s.body,
    })),
  },
];

const inputClass =
  "w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-3 text-sm text-white placeholder-slate-500 outline-none transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-900/50";

function NaicsLookup() {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<NaicsSuggestion[]>([]);
  const [open, setOpen] = useState(false);
  const [highlightIndex, setHighlightIndex] = useState(-1);
  const [selected, setSelected] = useState<NaicsSuggestion | null>(null);
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
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
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
      setHighlightIndex((prev) =>
        prev < suggestions.length - 1 ? prev + 1 : 0
      );
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlightIndex((prev) =>
        prev > 0 ? prev - 1 : suggestions.length - 1
      );
    } else if (e.key === "Enter" && highlightIndex >= 0) {
      e.preventDefault();
      const s = suggestions[highlightIndex];
      setSelected(s);
      setQuery(`${s.code} — ${s.description}`);
      setOpen(false);
    } else if (e.key === "Escape") {
      setOpen(false);
    }
  }

  return (
    <div className="flex flex-col gap-4">
      <div ref={containerRef} className="relative">
        <label
          htmlFor="naics-lookup"
          className="mb-2 block text-sm font-medium text-slate-300"
        >
          Search by keyword, industry, or NAICS code
        </label>
        <input
          id="naics-lookup"
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setSelected(null);
            fetchSuggestions(e.target.value);
          }}
          onFocus={() => {
            if (suggestions.length > 0) setOpen(true);
          }}
          onKeyDown={handleKeyDown}
          placeholder="e.g. 541512, computer systems, plumbing, consulting..."
          className={inputClass}
          autoComplete="off"
          role="combobox"
          aria-expanded={open}
          aria-autocomplete="list"
          aria-controls="naics-lookup-listbox"
        />
        {open && suggestions.length > 0 && (
          <ul
            id="naics-lookup-listbox"
            role="listbox"
            className="absolute left-0 right-0 top-full z-50 mt-1 max-h-64 overflow-auto rounded-lg border border-slate-700 bg-slate-800 shadow-lg"
          >
            {suggestions.map((s, i) => (
              <li
                key={s.code}
                role="option"
                aria-selected={i === highlightIndex}
                className={`cursor-pointer px-4 py-3 text-sm ${
                  i === highlightIndex
                    ? "bg-blue-950/50 text-blue-200"
                    : "text-white hover:bg-slate-700/50"
                }`}
                onMouseDown={() => {
                  setSelected(s);
                  setQuery(`${s.code} — ${s.description}`);
                  setOpen(false);
                }}
              >
                <span className="font-mono font-semibold text-blue-400">
                  {s.code}
                </span>
                <span className="ml-2 text-slate-300">— {s.description}</span>
              </li>
            ))}
          </ul>
        )}
      </div>

      {selected && (
        <div className="rounded-lg border border-blue-900/50 bg-blue-950/20 p-5">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-xs font-medium uppercase tracking-wider text-blue-400">
                Selected NAICS Code
              </p>
              <p className="mt-1 text-2xl font-bold text-white">
                {selected.code}
              </p>
              <p className="mt-1 text-sm text-slate-300">
                {selected.description}
              </p>
            </div>
            <Link
              href={`/?naics=${selected.code}`}
              className="shrink-0 rounded-lg bg-blue-500 px-4 py-2 text-sm font-semibold text-white transition-all hover:bg-blue-400"
            >
              Search contracts
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

export default function NaicsCodeLookupPage() {
  return (
    <div className="flex min-h-screen flex-col bg-slate-950 font-sans">
      {jsonLd.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}

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
            href="/trends"
            className="text-sm font-medium text-slate-400 transition-colors hover:text-blue-400"
          >
            Trends
          </Link>
          <Link
            href="/saved-searches"
            className="text-sm font-medium text-slate-400 transition-colors hover:text-blue-400"
          >
            Saved Searches
          </Link>
          <Link
            href="/guides"
            className="text-sm font-medium text-blue-400 transition-colors hover:text-blue-300"
          >
            Guides
          </Link>
          <Link
            href="/pricing"
            className="text-sm font-medium text-slate-400 transition-colors hover:text-blue-400"
          >
            Pricing
          </Link>
        </div>
      </header>

      <main className="mx-auto flex w-full max-w-3xl flex-col gap-10 px-4 py-12">
        {/* Hero */}
        <div className="flex flex-col gap-4">
          <p className="text-sm font-medium text-blue-400">Guide</p>
          <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            NAICS Code Lookup
            <span className="block text-blue-400">
              Find Your Code by Company Name or Industry
            </span>
          </h1>
          <p className="text-lg text-slate-400">
            Every federal contract solicitation is assigned a NAICS code that
            determines who can bid and what size standard applies. Use the free
            lookup tool below to find the right NAICS code for your business —
            essential for SAM.gov registration and winning government contracts.
          </p>
        </div>

        {/* Lookup Tool */}
        <div className="rounded-lg border border-slate-800 bg-slate-900 p-6">
          <h2 className="mb-4 text-xl font-semibold text-white">
            NAICS Code Search Tool
          </h2>
          <NaicsLookup />
        </div>

        {/* What are NAICS codes */}
        <div className="flex flex-col gap-4 rounded-lg border border-slate-800 bg-slate-900 p-6">
          <h2 className="text-xl font-semibold text-white">
            What are NAICS codes?
          </h2>
          <div className="space-y-3 text-sm leading-relaxed text-slate-400">
            <p>
              NAICS (North American Industry Classification System) is the
              standard framework used by the United States, Canada, and Mexico to
              classify businesses by their primary economic activity. The system
              uses a 6-digit hierarchical code structure that groups similar
              businesses together for statistical and regulatory purposes.
            </p>
            <p>
              For government contractors, NAICS codes are critical. Every
              federal solicitation is tagged with a NAICS code that determines
              the applicable small business size standard — the revenue or
              employee threshold that decides whether your business qualifies as
              &quot;small&quot; for that contract. Contracting officers also
              search SAM.gov by NAICS code to find eligible vendors, so having
              the right codes on your registration directly affects which
              opportunities you see.
            </p>
            <p>
              The current version is NAICS 2022, maintained by the U.S. Census
              Bureau. It contains over 1,000 unique 6-digit codes organized into
              20 sectors covering every industry from agriculture to information
              technology.
            </p>
          </div>
        </div>

        {/* NAICS code structure */}
        <div className="flex flex-col gap-4 rounded-lg border border-slate-800 bg-slate-900 p-6">
          <h2 className="text-xl font-semibold text-white">
            How NAICS codes are structured
          </h2>
          <div className="space-y-3 text-sm text-slate-400">
            {[
              {
                digits: "2-digit",
                level: "Sector",
                example: "54 — Professional, Scientific, and Technical Services",
              },
              {
                digits: "3-digit",
                level: "Subsector",
                example: "541 — Professional, Scientific, and Technical Services",
              },
              {
                digits: "4-digit",
                level: "Industry Group",
                example: "5415 — Computer Systems Design and Related Services",
              },
              {
                digits: "5-digit",
                level: "Industry",
                example: "54151 — Computer Systems Design and Related Services",
              },
              {
                digits: "6-digit",
                level: "National Industry",
                example: "541512 — Computer Systems Design Services",
              },
            ].map((item) => (
              <div
                key={item.digits}
                className="flex items-start gap-4 border-b border-slate-800 pb-3 last:border-0 last:pb-0"
              >
                <span className="shrink-0 rounded bg-blue-900/50 px-2 py-1 font-mono text-xs font-bold text-blue-300">
                  {item.digits}
                </span>
                <div>
                  <p className="font-medium text-white">{item.level}</p>
                  <p className="text-slate-500">{item.example}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* How to find your NAICS code */}
        <div className="flex flex-col gap-6">
          <h2 className="text-xl font-semibold text-white">
            How to find your NAICS code
          </h2>
          {steps.map((step, i) => (
            <div
              key={i}
              className="flex flex-col gap-3 rounded-lg border border-slate-800 bg-slate-900 p-5"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-900/50 text-sm font-bold text-blue-300">
                  {i + 1}
                </div>
                <h3 className="text-lg font-semibold text-white">
                  {step.title}
                </h3>
              </div>
              <p className="text-sm leading-relaxed text-slate-400">
                {step.body}
              </p>
            </div>
          ))}
        </div>

        {/* Top NAICS codes table */}
        <div className="flex flex-col gap-4">
          <h2 className="text-xl font-semibold text-white">
            Top NAICS codes for government contractors
          </h2>
          <p className="text-sm text-slate-400">
            These are among the most commonly used NAICS codes in federal
            contracting, based on contract award volume.
          </p>
          <div className="overflow-hidden rounded-lg border border-slate-800">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-800 bg-slate-900">
                  <th className="px-4 py-3 text-left font-semibold text-white">
                    Code
                  </th>
                  <th className="px-4 py-3 text-left font-semibold text-white">
                    Industry
                  </th>
                  <th className="hidden px-4 py-3 text-left font-semibold text-white sm:table-cell">
                    Description
                  </th>
                </tr>
              </thead>
              <tbody>
                {topNaicsCodes.map((item) => (
                  <tr
                    key={item.code}
                    className="border-b border-slate-800/50 last:border-0"
                  >
                    <td className="px-4 py-3">
                      <Link
                        href={`/naics/${item.code}`}
                        className="font-mono font-semibold text-blue-400 hover:text-blue-300"
                      >
                        {item.code}
                      </Link>
                    </td>
                    <td className="px-4 py-3 text-white">{item.industry}</td>
                    <td className="hidden px-4 py-3 text-slate-400 sm:table-cell">
                      {item.description}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* CTA */}
        <div className="flex flex-col items-center gap-4 rounded-xl border border-blue-900/30 bg-blue-950/20 p-8 text-center">
          <h2 className="text-2xl font-bold text-white">
            Know your NAICS code? Find contracts in your industry
          </h2>
          <p className="max-w-md text-sm text-slate-400">
            Search federal contract awards by NAICS code to see who is winning
            in your industry, how much they are getting, and where the
            opportunities are. Save searches to get email alerts on new awards.
          </p>
          <Link
            href="/"
            className="rounded-lg bg-blue-500 px-8 py-3 text-base font-semibold text-white shadow-sm transition-all hover:bg-blue-400"
          >
            Search contracts free
          </Link>
          <Link
            href="/pricing"
            className="text-sm text-blue-400 transition-colors hover:text-blue-300"
          >
            See GovScout Pro features
          </Link>
        </div>

        {/* Related guides */}
        <div className="flex flex-col gap-4">
          <h2 className="text-xl font-semibold text-white">Related guides</h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {[
              {
                name: "SAM.gov Registration Guide",
                desc: "Step-by-step guide to registering your business — NAICS codes are required",
                href: "/guides/sam-gov-registration",
              },
              {
                name: "Capability Statement Template",
                desc: "Free template — your NAICS codes belong in the core competencies section",
                href: "/guides/capability-statement-template",
              },
              {
                name: "How to Find Government Contracts",
                desc: "From registration to winning bids — search by your NAICS code",
                href: "/guides/find-government-contracts",
              },
              {
                name: "Small Business Set-Asides",
                desc: "Size standards are determined by your primary NAICS code",
                href: "/guides/small-business-set-aside",
              },
            ].map((guide) => (
              <Link
                key={guide.href}
                href={guide.href}
                className="rounded-lg border border-slate-800 bg-slate-900 p-4 transition-colors hover:border-blue-900"
              >
                <h3 className="font-semibold text-white">{guide.name}</h3>
                <p className="mt-1 text-sm text-slate-400">{guide.desc}</p>
              </Link>
            ))}
          </div>
        </div>

        {/* FAQ */}
        <div className="flex flex-col gap-6">
          <h2 className="text-xl font-semibold text-white">
            Frequently asked questions
          </h2>
          {faqs.map((faq) => (
            <div key={faq.question} className="border-b border-slate-800 pb-6">
              <h3 className="font-semibold text-white">{faq.question}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-400">
                {faq.answer}
              </p>
            </div>
          ))}
        </div>
      </main>

      <CrossProductFooter />
    </div>
  );
}
