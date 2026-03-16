import Link from "next/link";

const comparisonRows = [
  {
    feature: "Search UX",
    ours: "Purpose-built: type a contractor name, pick a NAICS code, select a set-aside — results in seconds",
    theirs: "Powerful but complex — Advanced Search has 30+ fields across spending types, steep learning curve",
  },
  {
    feature: "Set-aside filtering",
    ours: "One-click dropdown: 8(a), HUBZone, WOSB, SDVOSB, SBA — front and center on every search",
    theirs: "Available in Award Search but buried under multiple filter panels",
  },
  {
    feature: "NAICS code entry",
    ours: "Autocomplete — type a keyword and pick from matching industry codes",
    theirs: "Must enter exact NAICS codes or navigate a separate code lookup",
  },
  {
    feature: "Agency spending view",
    ours: "Top agencies ranked by contract spending with visual bars, filterable by NAICS and set-aside",
    theirs: "Agency profiles exist but aren't filterable by NAICS or set-aside together",
  },
  {
    feature: "Data scope",
    ours: "Awarded contracts only — focused on who won, how much, and from whom",
    theirs: "Everything: contracts, grants, loans, direct payments, sub-awards, and more",
  },
  {
    feature: "Speed",
    ours: "Results in 1-3 seconds with a single search form",
    theirs: "Results vary — complex queries and page transitions can take 5-15 seconds",
  },
  {
    feature: "Export",
    ours: "CSV export of search results (Pro)",
    theirs: "Full data downloads in CSV/TSV with Custom Award Data downloads",
  },
  {
    feature: "Pricing",
    ours: "Free (10 searches/day), Pro $49/mo for unlimited",
    theirs: "Completely free — taxpayer funded, no limits",
  },
];

const faqs = [
  {
    question: "Does Federal Contract Tracker use USASpending data?",
    answer:
      "Yes. All contract data comes directly from the USASpending.gov API, the official U.S. government source for federal spending data. We display the same awarded contract records — we just make them easier to search and filter.",
  },
  {
    question: "Why not just use USASpending.gov directly?",
    answer:
      "USASpending.gov covers all federal spending — contracts, grants, loans, direct payments, and more. That breadth means the interface serves many audiences. If you specifically need to research awarded contracts by NAICS code, set-aside type, or agency, Federal Contract Tracker gives you a focused, faster path to those answers.",
  },
  {
    question: "What data does USASpending have that you don't?",
    answer:
      "USASpending.gov covers grants, loans, direct payments, other financial assistance, and sub-awards in addition to contracts. It also provides geographic spending maps, agency profiles, and federal account data. We focus exclusively on contract awards — the segment most relevant to government contractors.",
  },
  {
    question: "How fresh is the data compared to USASpending?",
    answer:
      "Our data comes from the same USASpending.gov API, so freshness is identical. USASpending updates daily from agency submissions. When a new contract award appears on USASpending.gov, it appears in Federal Contract Tracker at the same time.",
  },
  {
    question: "Is Federal Contract Tracker free?",
    answer:
      "Free users get 10 searches per day with access to all filters and features. Pro ($49/month) adds unlimited searches, spending trends, and CSV export. USASpending.gov is completely free with no limits — the trade-off is usability.",
  },
];

export default function USASpendingComparison() {
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
            href="/trends"
            className="text-sm font-medium text-slate-600 transition-colors hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400"
          >
            Trends
          </Link>
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
            USASpending.gov Alternative
            <span className="block text-blue-600 dark:text-blue-400">
              For Contract Research
            </span>
          </h1>
          <p className="mx-auto max-w-xl text-lg text-slate-600 dark:text-slate-400">
            USASpending.gov is the definitive source for federal spending data —
            but its interface serves everyone from journalists to auditors. If you
            just need to research{" "}
            <strong className="text-slate-900 dark:text-white">
              awarded contracts in your industry
            </strong>
            , Federal Contract Tracker gets you there in one search.
          </p>
        </div>

        {/* Honest positioning */}
        <div className="flex flex-col gap-4 rounded-xl border border-blue-200 bg-blue-50/60 p-6 dark:border-blue-900/30 dark:bg-blue-950/20">
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
            An honest comparison
          </h2>
          <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400">
            USASpending.gov is the gold standard for federal spending
            transparency. It tracks every dollar the government spends —
            contracts, grants, loans, direct payments, and sub-awards across
            every agency. Nothing we build will match that breadth, and we
            don&apos;t try to.
          </p>
          <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400">
            Federal Contract Tracker uses the same data (via the USASpending API)
            but focuses entirely on one use case: helping government contractors
            research awarded contracts. We trade breadth for speed — fewer data
            types, but faster answers to the questions small businesses actually
            ask: &ldquo;Who won contracts in my NAICS code?&rdquo; &ldquo;Which
            agencies spend the most on my services?&rdquo; &ldquo;What set-aside
            awards were made last quarter?&rdquo;
          </p>
        </div>

        {/* Comparison table */}
        <div className="flex flex-col gap-4">
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
            Federal Contract Tracker vs USASpending.gov
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
                    USASpending.gov
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
                <li>You need to quickly find who won contracts in your NAICS code</li>
                <li>You want one-click set-aside filtering (8(a), HUBZone, WOSB)</li>
                <li>You need agency spending breakdowns for business development</li>
                <li>You&apos;re researching competitors&apos; contract wins</li>
                <li>You want answers in seconds, not minutes of navigation</li>
              </ul>
            </div>
            <div className="flex flex-col gap-2 rounded-lg border border-slate-200 bg-white p-5 dark:border-slate-700 dark:bg-slate-900">
              <h3 className="font-semibold text-slate-700 dark:text-slate-300">
                Use USASpending.gov when...
              </h3>
              <ul className="flex flex-col gap-1.5 text-sm text-slate-500 dark:text-slate-400">
                <li>You need grant, loan, or direct payment data — not just contracts</li>
                <li>You want geographic spending maps or state/district breakdowns</li>
                <li>You need bulk data downloads for analysis or reporting</li>
                <li>You&apos;re an auditor, journalist, or researcher needing full spending context</li>
                <li>You need agency profile pages with budget authority details</li>
              </ul>
            </div>
          </div>
        </div>

        {/* More comparisons */}
        <div className="flex flex-col gap-3">
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
            More comparisons
          </h2>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/compare/sam-gov"
              className="rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 transition-colors hover:border-blue-300 hover:text-blue-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:border-blue-600 dark:hover:text-blue-400"
            >
              vs SAM.gov
            </Link>
            <Link
              href="/compare/govwin"
              className="rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 transition-colors hover:border-blue-300 hover:text-blue-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:border-blue-600 dark:hover:text-blue-400"
            >
              vs GovWin
            </Link>
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
            Same data as USASpending.gov. Purpose-built search for government
            contractors. 10 free searches per day, no registration required.
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
          <span className="font-medium">Moltcorp Products:</span>
          <span className="font-semibold text-blue-600 dark:text-blue-400">
            Federal Contract Tracker
          </span>
          <a href="https://statusping-moltcorporation.vercel.app" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-blue-600 dark:hover:text-blue-400">StatusPing</a>
          <a href="https://domain-audit-tool-moltcorporation.vercel.app" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-blue-600 dark:hover:text-blue-400">Recon</a>
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
