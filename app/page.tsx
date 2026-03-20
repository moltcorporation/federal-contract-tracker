import { Suspense } from "react";
import Link from "next/link";
import { SearchProvider, HideOnSearch } from "./components/SearchContext";
import { AuthButtons } from "./components/AuthButtons";
import { EmailCaptureForm } from "./components/EmailCaptureForm";
import { ContractSearch } from "./components/ContractSearch";
import { CrossProductFooter } from "./components/cross-product-footer";

function formatDollars(amount: number) {
  if (amount >= 1_000_000_000) return `$${(amount / 1_000_000_000).toFixed(1)}B`;
  if (amount >= 1_000_000) return `$${(amount / 1_000_000).toFixed(1)}M`;
  if (amount >= 1_000) return `$${(amount / 1_000).toFixed(0)}K`;
  return `$${amount.toLocaleString()}`;
}

const SAMPLE_AWARDS = [
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
];

export default function Home() {
  return (
    <SearchProvider>
      <div className="flex min-h-screen flex-col bg-slate-950 font-sans">
        {/* Header */}
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
            <Suspense fallback={
              <>
                <Link href="/login" className="text-sm font-medium text-slate-400 transition-colors hover:text-blue-400">Log in</Link>
                <Link href="/register" className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700">Sign Up Free</Link>
              </>
            }>
              <AuthButtons />
            </Suspense>
          </div>
        </header>

        {/* Hero Section — server-rendered for SEO */}
        <HideOnSearch>
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
                <div className="flex flex-wrap items-center justify-center gap-3">
                  <a
                    href="/register"
                    className="rounded-lg bg-blue-600 px-8 py-3 text-base font-semibold text-white shadow-lg shadow-blue-600/25 transition-all hover:bg-blue-700 hover:shadow-blue-600/40"
                  >
                    Start Free — No Credit Card Required
                  </a>
                  <Link
                    href="/pricing"
                    className="rounded-lg border border-blue-500 bg-blue-950/50 px-8 py-3 text-base font-semibold text-blue-300 transition-all hover:bg-blue-900/50 hover:text-white"
                  >
                    Go Pro — $49/mo
                  </Link>
                </div>
                <p className="text-xs text-slate-500">
                  Your first 10 searches free today · No credit card required
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
                  Powered by USASpending.gov data, updated daily
                </a>
              </div>
            </div>
          </section>

          {/* Email Capture Section */}
          <section className="w-full bg-slate-950 border-y border-slate-800">
            <div className="mx-auto max-w-2xl px-4 py-12 text-center">
              <h2 className="text-lg font-semibold text-white">
                Get weekly contract alerts for your industry
              </h2>
              <p className="mt-2 text-sm text-slate-400">
                Join thousands of contractors who never miss a federal opportunity.
              </p>
              <Suspense>
                <EmailCaptureForm />
              </Suspense>
            </div>
          </section>
        </HideOnSearch>

        {/* Main content area */}
        <main className="flex flex-1 flex-col items-center px-4 pb-16 pt-8">
          <Suspense fallback={null}>
            <ContractSearch />
          </Suspense>

          {/* SEO content — server-rendered, hidden when search results showing */}
          <HideOnSearch>
            <div className="flex w-full max-w-3xl flex-col gap-8 mt-8">
              {/* How it works */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
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

              {/* Sample results */}
              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-1">
                  <h2 className="text-xl font-bold text-white">
                    Recent awards in IT services
                  </h2>
                  <p className="text-xs text-slate-400">
                    NAICS 541512 — Computer Systems Design Services. Real awards from USASpending.gov.
                  </p>
                </div>
                <div className="flex flex-col gap-3">
                  {SAMPLE_AWARDS.map((c) => (
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
              <div id="pricing" className="mt-2 scroll-mt-8 rounded-2xl border border-slate-800 bg-slate-900/80 p-6 sm:p-8">
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
              <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6 sm:p-8">
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

              {/* FAQ sections */}
              <div className="flex flex-col gap-8">
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
                    veteran-owned small businesses. Use the set-aside filter above to find contracts reserved
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
            </div>
          </HideOnSearch>
        </main>

        <CrossProductFooter />
      </div>
    </SearchProvider>
  );
}
