import Link from "next/link";

const comparisonRows = [
  {
    feature: "Pricing",
    ours: "$0 (10 searches/day) or $49/mo unlimited",
    theirs: "$6,000–$12,000/year",
  },
  {
    feature: "Primary purpose",
    ours: "Research awarded contracts — who won, how much, which agency",
    theirs: "Full government intelligence — legislation, regulation, contracts, lobbying",
  },
  {
    feature: "Data source",
    ours: "USASpending.gov (official, updated daily)",
    theirs: "Proprietary research + government data, curated by analysts and journalists",
  },
  {
    feature: "Contract search",
    ours: "NAICS code, set-aside type, agency, keyword — instant results",
    theirs: "Contract search within broader legislative/regulatory intelligence suite",
  },
  {
    feature: "Set-aside filtering",
    ours: "One-click: 8(a), HUBZone, WOSB, SDVOSB, SBA",
    theirs: "Available within contract search tools",
  },
  {
    feature: "Legislative tracking",
    ours: "Not available — focused on contracts only",
    theirs: "Core feature — bill tracking, floor votes, committee markups",
  },
  {
    feature: "Regulatory analysis",
    ours: "Not available",
    theirs: "Core feature — regulatory filings, comment periods, agency actions",
  },
  {
    feature: "Agency spending view",
    ours: "Top agencies by spending, filterable by NAICS and set-aside",
    theirs: "Agency profiles with spending, workforce, and budget data",
  },
  {
    feature: "Onboarding",
    ours: "No signup required — search immediately",
    theirs: "Enterprise sales process and subscription",
  },
];

const faqs = [
  {
    question: "Is Federal Contract Tracker a replacement for Bloomberg Government?",
    answer:
      "No. BGOV covers legislation, regulation, and contracts. Federal Contract Tracker focuses on awarded contracts only — who won, how much, and which agency. They are different tools for different needs.",
  },
  {
    question: "Why is Bloomberg Government so expensive?",
    answer:
      "BGOV employs journalists, analysts, and researchers who produce original intelligence on legislation, regulation, and procurement. That human research labor drives the $6,000–$12,000/year price tag. Federal Contract Tracker uses the free USASpending.gov API for awarded contract data, which keeps costs low enough to offer at $49/month.",
  },
  {
    question: "Can I use both Bloomberg Government and Federal Contract Tracker?",
    answer:
      "Yes. Use BGOV for legislative and regulatory intelligence. Use Federal Contract Tracker for affordable awarded contract research — who wins contracts in your NAICS codes, which agencies spend the most, and what set-aside contracts are being awarded.",
  },
  {
    question:
      "I'm a small business. Is Federal Contract Tracker enough to get started?",
    answer:
      "If your goal is understanding who wins contracts in your space, yes. $49/month or free (10 searches/day). You won't get legislative tracking, but for competitive contract research it's a practical starting point.",
  },
];

export default function BGOVComparison() {
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
              At a Fraction of the Cost
            </span>
          </h1>
          <p className="mx-auto max-w-xl text-lg text-slate-600 dark:text-slate-400">
            BGOV charges $6,000–$12,000/year for government intelligence. If
            you just need to research{" "}
            <strong className="text-slate-900 dark:text-white">
              awarded federal contracts
            </strong>
            , Federal Contract Tracker gets you there for $49/month.
          </p>
        </div>

        {/* Honest positioning */}
        <div className="flex flex-col gap-4 rounded-xl border border-blue-200 bg-blue-50/60 p-6 dark:border-blue-900/30 dark:bg-blue-950/20">
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
            An honest comparison
          </h2>
          <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400">
            Bloomberg Government is a comprehensive government intelligence
            platform. It covers legislation, regulation, and contracts — with
            analyst-curated research, journalist-written stories, and tools for
            tracking bills, regulatory filings, and agency actions. If your work
            spans the full legislative and regulatory landscape, BGOV earns its
            price.
          </p>
          <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400">
            Federal Contract Tracker focuses specifically on awarded federal
            contracts. Who won contracts in your NAICS code? Which agencies
            spend the most on your services? What set-aside contracts were
            awarded last year? We don&apos;t cover legislative or regulatory
            analysis — but for small businesses that need contract research
            without a five-figure annual commitment, that focus goes a long way.
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
                $6K–$12K
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
                <li>You need awarded contract research — who won, how much, which agency</li>
                <li>You can&apos;t justify $6K+/year for government intelligence</li>
                <li>You want quick answers without an enterprise sales process</li>
                <li>You&apos;re a small business entering federal contracting</li>
              </ul>
            </div>
            <div className="flex flex-col gap-2 rounded-lg border border-slate-200 bg-white p-5 dark:border-slate-700 dark:bg-slate-900">
              <h3 className="font-semibold text-slate-700 dark:text-slate-300">
                Use Bloomberg Government when...
              </h3>
              <ul className="flex flex-col gap-1.5 text-sm text-slate-500 dark:text-slate-400">
                <li>You need legislative and regulatory tracking</li>
                <li>Your BD covers the full procurement lifecycle</li>
                <li>You need analyst-curated intelligence</li>
                <li>Your organization has enterprise budget</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Who this is for */}
        <div className="flex flex-col gap-4">
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
            Built for small businesses entering federal contracting
          </h2>
          <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400">
            Most small businesses exploring government contracts don&apos;t need a
            $12,000/year intelligence platform on day one. They need to answer
            basic questions: Are agencies spending money in my industry? Who&apos;s
            winning those contracts? Are there set-aside opportunities for my
            business type? Federal Contract Tracker answers those questions at a
            price that makes sense for businesses still building their federal
            pipeline.
          </p>
          <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400">
            As your federal business grows and you need legislative tracking,
            regulatory analysis, and deeper government intelligence, tools like
            Bloomberg Government become worth the investment. Federal Contract
            Tracker is where you start.
          </p>
        </div>

        {/* Also compare */}
        <div className="flex items-center gap-3 rounded-lg border border-slate-200 bg-white px-5 py-4 dark:border-slate-800 dark:bg-slate-900">
          <span className="text-sm text-slate-500 dark:text-slate-400">
            Also compare:
          </span>
          <Link
            href="/compare/govwin"
            className="text-sm font-medium text-blue-600 transition-colors hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
          >
            Federal Contract Tracker vs GovWin
          </Link>
          <span className="text-slate-300 dark:text-slate-600">&middot;</span>
          <Link
            href="/compare/sam-gov"
            className="text-sm font-medium text-blue-600 transition-colors hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
          >
            Federal Contract Tracker vs SAM.gov
          </Link>
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
