import Link from "next/link";

const comparisonRows = [
  {
    feature: "Pricing",
    ours: "$0 (10 searches/day) or $49/month for unlimited",
    theirs: "$6,000+/year per seat (enterprise pricing, requires sales call)",
  },
  {
    feature: "Primary purpose",
    ours: "Research awarded contracts — who won, how much, which agency",
    theirs: "Full government intelligence — contracts, legislation, regulation, budgets",
  },
  {
    feature: "Data source",
    ours: "USASpending.gov (official government data, updated daily)",
    theirs: "Proprietary Bloomberg data + government sources, curated by analysts",
  },
  {
    feature: "Set-aside filtering",
    ours: "One-click: 8(a), HUBZone, WOSB, SDVOSB, SBA — front and center",
    theirs: "Available within contract search tools",
  },
  {
    feature: "NAICS code entry",
    ours: "Autocomplete — type a keyword and pick from matching codes",
    theirs: "NAICS filtering available in contract intelligence module",
  },
  {
    feature: "Agency spending view",
    ours: "Top agencies ranked by spending, filterable by NAICS and set-aside",
    theirs: "Comprehensive agency profiles with budget and spending analysis",
  },
  {
    feature: "Legislative tracking",
    ours: "Not available — focused on awarded contracts only",
    theirs: "Core feature — tracks bills, amendments, and committee activity",
  },
  {
    feature: "Regulatory intelligence",
    ours: "Not available",
    theirs: "Core feature — tracks proposed and final rules across agencies",
  },
  {
    feature: "Onboarding",
    ours: "No signup required — start searching immediately",
    theirs: "Enterprise sales process with demos and annual contracts",
  },
  {
    feature: "Target user",
    ours: "Small businesses researching awarded contracts and competitors",
    theirs: "Large firms, lobbyists, and policy teams needing full government intelligence",
  },
];

export default function BgovComparison() {
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
            Bloomberg Government Alternative
            <span className="block text-blue-600 dark:text-blue-400">
              For Federal Contract Research
            </span>
          </h1>
          <p className="mx-auto max-w-xl text-lg text-slate-600 dark:text-slate-400">
            Bloomberg Government (BGOV) is an enterprise platform covering
            contracts, legislation, and regulation — starting at $6,000+/year.
            If you just need to research{" "}
            <strong className="text-slate-900 dark:text-white">
              who is winning awarded federal contracts
            </strong>
            , Federal Contract Tracker does that for $49/month.
          </p>
        </div>

        {/* Honest positioning */}
        <div className="flex flex-col gap-4 rounded-xl border border-blue-200 bg-blue-50/60 p-6 dark:border-blue-900/30 dark:bg-blue-950/20">
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
            An honest comparison
          </h2>
          <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400">
            BGOV is a full government intelligence platform built for large
            firms, lobbyists, and policy teams. It tracks legislation,
            regulation, federal budgets, and contracts in a single terminal —
            powered by Bloomberg&apos;s data infrastructure and editorial team.
            If your organization needs that breadth, BGOV delivers.
          </p>
          <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400">
            Federal Contract Tracker does one thing: awarded contract research.
            Who won contracts in your NAICS code? Which agencies spend the most
            on your services? What set-aside contracts were awarded? For small
            businesses that need competitive intelligence on federal awards
            without an enterprise commitment, that focus is a strength.
          </p>
        </div>

        {/* Pricing callout */}
        <div className="flex flex-col items-center gap-3 rounded-xl border border-emerald-200 bg-emerald-50/60 p-6 text-center dark:border-emerald-900/30 dark:bg-emerald-950/20">
          <p className="text-sm font-medium text-emerald-700 dark:text-emerald-400">
            Price comparison
          </p>
          <div className="flex items-baseline gap-3">
            <div className="flex flex-col">
              <span className="text-3xl font-extrabold text-slate-900 dark:text-white">
                $49
              </span>
              <span className="text-xs text-slate-500 dark:text-slate-400">
                /month
              </span>
            </div>
            <span className="text-sm text-slate-400 dark:text-slate-500">
              vs
            </span>
            <div className="flex flex-col">
              <span className="text-3xl font-extrabold text-slate-400 line-through dark:text-slate-500">
                $6,000+
              </span>
              <span className="text-xs text-slate-500 dark:text-slate-400">
                /year
              </span>
            </div>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Free tier available — 10 searches/day, no signup required
          </p>
        </div>

        {/* Comparison table */}
        <div className="flex flex-col gap-4">
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
            Federal Contract Tracker vs Bloomberg Government
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
                    Bloomberg Government
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
                <li>You need set-aside filters for 8(a), WOSB, SDVOSB, HUBZone</li>
                <li>You want agency spending data for business development</li>
                <li>You&apos;re a small business that can&apos;t justify $6K+/year</li>
                <li>You want to start searching immediately without a sales call</li>
              </ul>
            </div>
            <div className="flex flex-col gap-2 rounded-lg border border-slate-200 bg-white p-5 dark:border-slate-700 dark:bg-slate-900">
              <h3 className="font-semibold text-slate-700 dark:text-slate-300">
                Use Bloomberg Government when...
              </h3>
              <ul className="flex flex-col gap-1.5 text-sm text-slate-500 dark:text-slate-400">
                <li>You need legislative and regulatory tracking alongside contracts</li>
                <li>Your policy team monitors bills and agency rulemaking</li>
                <li>You need Bloomberg-grade data infrastructure and analytics</li>
                <li>You&apos;re a large firm or lobbying organization</li>
                <li>You need a single platform for all government intelligence</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Who this is for */}
        <div className="flex flex-col gap-4">
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
            Built for small businesses, not enterprises
          </h2>
          <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400">
            Bloomberg Government is designed for organizations that need
            comprehensive government intelligence across contracts, legislation,
            and regulation. That breadth comes with enterprise pricing and
            enterprise complexity. Most small businesses pursuing federal
            contracts don&apos;t need a Bloomberg terminal — they need to know
            who&apos;s winning contracts in their space.
          </p>
          <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400">
            Federal Contract Tracker answers the questions that matter for
            business development: Which agencies spend money in my industry? Who
            are my competitors winning contracts from? Are there set-aside
            opportunities for my business type? All at a price point that makes
            sense before you&apos;ve won your first contract.
          </p>
        </div>

        {/* Also compare */}
        <div className="flex flex-wrap items-center gap-3 rounded-lg border border-slate-200 bg-white px-5 py-4 dark:border-slate-800 dark:bg-slate-900">
          <span className="text-sm text-slate-500 dark:text-slate-400">
            Also compare:
          </span>
          <Link
            href="/compare/govwin"
            className="text-sm font-medium text-blue-600 transition-colors hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
          >
            FCT vs GovWin
          </Link>
          <Link
            href="/compare/sam-gov"
            className="text-sm font-medium text-blue-600 transition-colors hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
          >
            FCT vs SAM.gov
          </Link>
          <Link
            href="/compare/usaspending"
            className="text-sm font-medium text-blue-600 transition-colors hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
          >
            FCT vs USASpending
          </Link>
        </div>

        {/* CTA */}
        <div className="flex flex-col items-center gap-4 rounded-xl border border-blue-200 bg-blue-50 p-8 text-center dark:border-blue-900/30 dark:bg-blue-950/20">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
            Start researching federal contracts
          </h2>
          <p className="max-w-md text-sm text-slate-600 dark:text-slate-400">
            10 free searches per day. Set-aside filters, NAICS autocomplete,
            agency spending breakdowns. No registration, no sales call.
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
