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

const SET_ASIDE_OPTIONS = [
  { value: "", label: "All contracts" },
  { value: "SBA", label: "Small Business (SBA)" },
  { value: "8A", label: "8(a) Business Development" },
  { value: "HZC", label: "HUBZone" },
  { value: "WOSB", label: "Women-Owned Small Business" },
  { value: "SDVOSBC", label: "Service-Disabled Veteran" },
  { value: "ESB", label: "Economically Disadvantaged WOSB" },
];

const inputClass = "rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 placeholder-slate-400 outline-none transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-100 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:placeholder-slate-500 dark:focus:ring-blue-900/50";
const selectClass = "rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-100 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:focus:ring-blue-900/50";
const labelClass = "text-xs font-medium text-slate-700 dark:text-slate-300";

export default function Home() {
  const [activeTab, setActiveTab] = useState<"search" | "agency">("search");

  // Contract search state
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
  const [searched, setSearched] = useState(false);

  // Spending by agency state
  const [agencyNaics, setAgencyNaics] = useState("");
  const [agencyKeyword, setAgencyKeyword] = useState("");
  const [agencyYear, setAgencyYear] = useState(new Date().getFullYear().toString());
  const [agencySetAside, setAgencySetAside] = useState("");
  const [agencyResults, setAgencyResults] = useState<AgencySpending[]>([]);
  const [agencyLoading, setAgencyLoading] = useState(false);
  const [agencyError, setAgencyError] = useState("");
  const [agencySearched, setAgencySearched] = useState(false);

  async function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    setSearched(true);

    try {
      const res = await fetch("/api/search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ naics, agency, minAmount, maxAmount, year, setAside, recipient, psc }),
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
        <div className="flex items-center gap-4">
          <a
            href="/pricing"
            className="text-sm font-medium text-blue-600 transition-colors hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
          >
            Pricing
          </a>
          <a
            href="https://moltcorporation.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-slate-500 transition-colors hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400"
          >
            by Moltcorp
          </a>
        </div>
      </header>

      <main className="flex flex-1 flex-col items-center px-4 pb-16 pt-12">
        <div className="flex w-full max-w-3xl flex-col gap-8">
          <div className="flex flex-col gap-3 text-center">
            <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl dark:text-white">
              Search Federal Contract
              <span className="block text-blue-600 dark:text-blue-400">Awards</span>
            </h1>
            <p className="mx-auto max-w-lg text-base text-slate-600 dark:text-slate-400">
              Search awarded federal contracts by NAICS code, agency, set-aside type,
              recipient, and dollar amount. Powered by USASpending.gov data, updated daily.
            </p>
          </div>

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
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="naics" className={labelClass}>NAICS Code</label>
                    <input id="naics" type="text" value={naics} onChange={(e) => setNaics(e.target.value)} placeholder="e.g. 541512" className={inputClass} />
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
                <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
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
            </>
          )}

          {/* Spending by Agency Tab */}
          {activeTab === "agency" && (
            <>
              <form onSubmit={handleAgencySearch} className="flex flex-col gap-4 rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="agencyNaics" className={labelClass}>NAICS Code</label>
                    <input id="agencyNaics" type="text" value={agencyNaics} onChange={(e) => setAgencyNaics(e.target.value)} placeholder="e.g. 541512" className={inputClass} />
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

              <div className="mt-8 flex flex-col gap-8">
                <div className="flex flex-col gap-3">
                  <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                    What is the Federal Contract Tracker?
                  </h2>
                  <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                    The Federal Contract Tracker lets you search awarded federal contracts using data from
                    USASpending.gov. Filter by NAICS code, awarding agency, dollar amount, set-aside type,
                    and recipient company. Whether you&apos;re a small business pursuing government contracts
                    or a researcher tracking federal spending, this tool gives you fast access to contract
                    award data without navigating the complex USASpending interface.
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
