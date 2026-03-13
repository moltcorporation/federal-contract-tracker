import Link from "next/link";

const comparisonRows = [
  {
    feature: "Primary purpose",
    ours: "Research awarded contracts — who won, how much, which agency",
    theirs: "Entity registration, open solicitations, and award data",
  },
  {
    feature: "Search UX",
    ours: "Purpose-built filters: NAICS autocomplete, set-aside type, recipient, agency, dollar range",
    theirs: "Generic advanced search with many fields across different data types",
  },
  {
    feature: "Set-aside filtering",
    ours: "One-click: 8(a), HUBZone, WOSB, SDVOSB, SBA — front and center",
    theirs: "Available for solicitations; awarded contract filtering requires USASpending.gov",
  },
  {
    feature: "NAICS code entry",
    ours: "Autocomplete — type 'computer' and pick from matching codes",
    theirs: "Must know your exact NAICS code or look it up separately",
  },
  {
    feature: "Agency spending view",
    ours: "Top 10 agencies ranked by spending with visual bars, filterable by NAICS and set-aside",
    theirs: "No equivalent — must export data and analyze manually",
  },
  {
    feature: "Contract detail pages",
    ours: "Clean layout: financial summary, recipient info, business categories, competition status",
    theirs: "Data spread across multiple screens and tabs",
  },
  {
    feature: "Speed",
    ours: "Results in 1-3 seconds",
    theirs: "Varies — often 5-15 seconds with page loads between steps",
  },
  {
    feature: "Pricing",
    ours: "Free (10 searches/day), Pro $49/mo, Enterprise $99/mo",
    theirs: "Free — taxpayer funded",
  },
];

const faqs = [
  {
    question: "Is Federal Contract Tracker a replacement for SAM.gov?",
    answer:
      "No. SAM.gov is the official government system for entity registration, open solicitations, and contract opportunities. Federal Contract Tracker focuses specifically on awarded contracts — who won, for how much, and from which agency. Use SAM.gov to register and bid; use Federal Contract Tracker to research the competitive landscape.",
  },
  {
    question: "Where does Federal Contract Tracker get its data?",
    answer:
      "All data comes from USASpending.gov, the U.S. government's official source for federal spending data. It covers all awarded federal contracts and is updated daily. We don't scrape SAM.gov — we use the same underlying government data through the public API.",
  },
  {
    question: "Can I search by set-aside type on SAM.gov?",
    answer:
      "SAM.gov allows filtering by set-aside type for open solicitations, but researching awarded contracts by set-aside requires navigating to USASpending.gov and using its advanced search. Federal Contract Tracker puts set-aside filtering front and center — one click to see all 8(a), HUBZone, WOSB, or SDVOSB awards.",
  },
  {
    question: "How much does Federal Contract Tracker cost?",
    answer:
      "Free users get 10 searches per day with full access to all filters and features. Pro ($49/month) gives unlimited searches, spending trends, and CSV export. Enterprise ($99/month) adds saved searches, email alerts on new awards, and API access.",
  },
  {
    question:
      "Why would I pay for Federal Contract Tracker when SAM.gov is free?",
    answer:
      "SAM.gov is free but optimized for procurement officers, not small businesses doing competitive research. If you spend hours each week searching for contract awards, filtering by set-aside type, and analyzing agency spending patterns, Federal Contract Tracker saves you time with a purpose-built interface. The free tier covers casual use.",
  },
];

export default function SamGovComparison() {
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
            className="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-400"
          >
            Search contracts free
          </Link>
        </div>
      </header>

      <main className="mx-auto flex w-full max-w-3xl flex-col gap-10 px-4 py-12">
        <div className="flex flex-col items-center gap-5 text-center">
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl dark:text-white">
            SAM.gov Alternative
            <span className="block text-blue-600 dark:text-blue-400">
              For Contract Research
            </span>
          </h1>
          <p className="mx-auto max-w-xl text-lg text-slate-600 dark:text-slate-400">
            SAM.gov is the official system for federal procurement — registration,
            solicitations, and awards. But if you just need to research{" "}
            <strong className="text-slate-900 dark:text-white">
              who is winning contracts in your industry
            </strong>
            , Federal Contract Tracker gets you there faster.
          </p>
        </div>

        {/* Honest positioning */}
        <div className="flex flex-col gap-4 rounded-xl border border-blue-200 bg-blue-50/60 p-6 dark:border-blue-900/30 dark:bg-blue-950/20">
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
            An honest comparison
          </h2>
          <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400">
            SAM.gov is the authoritative source for federal procurement. You need
            it to register your business, find open solicitations, and submit bids.
            Nothing replaces it for that. We don&apos;t compete with SAM.gov —
            we complement it.
          </p>
          <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400">
            Federal Contract Tracker is built for one specific job: researching
            awarded contracts. Who won contracts in your NAICS code? Which agencies
            spend the most on your services? What set-aside contracts were awarded
            last year? That research takes 15+ clicks on SAM.gov and USASpending.gov.
            Here it takes one search.
          </p>
        </div>

        {/* Comparison table */}
        <div className="flex flex-col gap-4">
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
            Federal Contract Tracker vs SAM.gov
          </h2>
          <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-800">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-100/50 dark:border-slate-800 dark:bg-slate-900/50">
                  <th className="px-4 py-3 text-left font-medium text-slate-500 dark:text-slate-500">
                    Feature
                  </th>
                  <th className="px-4 py-3 text-left font-medium text-blue-700 dark:text-blue-400">
                    Contract Tracker
                  </th>
                  <th className="px-4 py-3 text-left font-medium text-slate-500 dark:text-slate-500">
                    SAM.gov
                  </th>
                </tr>
              </thead>
              <tbody>
                {comparisonRows.map((row, i) => (
                  <tr
                    key={i}
                    className="border-b border-slate-100 last:border-0 dark:border-slate-800/50"
                  >
                    <td className="px-4 py-3 font-medium text-slate-700 dark:text-slate-300">
                      {row.feature}
                    </td>
                    <td className="px-4 py-3 text-slate-700 dark:text-slate-300">
                      {row.ours}
                    </td>
                    <td className="px-4 py-3 text-slate-500 dark:text-slate-500">
                      {row.theirs}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* When to use each */}
        <div className="flex flex-col gap-4">
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
            When to use each tool
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="flex flex-col gap-2 rounded-lg border border-blue-200 bg-blue-50/50 p-5 dark:border-blue-900/30 dark:bg-blue-950/20">
              <h3 className="font-semibold text-blue-700 dark:text-blue-400">
                Use Federal Contract Tracker when...
              </h3>
              <ul className="flex flex-col gap-1.5 text-sm text-slate-600 dark:text-slate-400">
                <li>You want to see who won contracts in your NAICS code</li>
                <li>You need to filter awarded contracts by set-aside type</li>
                <li>You want agency spending breakdowns for business development</li>
                <li>You&apos;re researching competitor contract wins</li>
                <li>You need a quick answer, not a 15-minute navigation exercise</li>
              </ul>
            </div>
            <div className="flex flex-col gap-2 rounded-lg border border-slate-200 bg-white p-5 dark:border-slate-700 dark:bg-slate-900">
              <h3 className="font-semibold text-slate-700 dark:text-slate-300">
                Use SAM.gov when...
              </h3>
              <ul className="flex flex-col gap-1.5 text-sm text-slate-500 dark:text-slate-400">
                <li>You need to register your business for federal contracts</li>
                <li>You&apos;re looking for open solicitations to bid on</li>
                <li>You need to verify entity registration or CAGE codes</li>
                <li>You&apos;re a contracting officer managing procurements</li>
                <li>You need the official government record of a specific award</li>
              </ul>
            </div>
          </div>
        </div>

        {/* FAQ */}
        <div className="flex flex-col gap-5">
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
            Frequently asked questions
          </h2>
          <div className="flex flex-col gap-4">
            {faqs.map((faq, i) => (
              <div
                key={i}
                className="rounded-lg border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900"
              >
                <h3 className="font-semibold text-slate-900 dark:text-white">
                  {faq.question}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="flex flex-col items-center gap-4 rounded-xl border border-blue-200 bg-blue-50 p-8 text-center dark:border-blue-900/30 dark:bg-blue-950/20">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
            Search federal contracts now
          </h2>
          <p className="max-w-md text-sm text-slate-600 dark:text-slate-400">
            10 free searches per day. Set-aside filters, NAICS autocomplete,
            agency spending breakdowns. No registration required.
          </p>
          <Link
            href="/"
            className="rounded-lg bg-blue-600 px-8 py-3 text-base font-semibold text-white shadow-sm transition-all hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-400"
          >
            Search contracts free
          </Link>
        </div>
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
