import Link from "next/link";

const comparisonRows = [
  {
    feature: "Pricing",
    ours: "$0 (10 searches/day) or $49/month for unlimited",
    theirs: "$2,000–$12,000/year depending on modules and seats",
  },
  {
    feature: "Primary purpose",
    ours: "Research awarded contracts — who won, how much, which agency",
    theirs: "Full pipeline intelligence — pre-solicitation tracking, forecasts, competitor intel",
  },
  {
    feature: "Data source",
    ours: "USASpending.gov (official government data, updated daily)",
    theirs: "Proprietary research + government data, curated by analysts",
  },
  {
    feature: "Set-aside filtering",
    ours: "One-click: 8(a), HUBZone, WOSB, SDVOSB, SBA — front and center",
    theirs: "Available within opportunity search and filtering tools",
  },
  {
    feature: "NAICS code entry",
    ours: "Autocomplete — type a keyword and pick from matching codes",
    theirs: "NAICS filtering available in opportunity search",
  },
  {
    feature: "Agency spending view",
    ours: "Top agencies ranked by spending, filterable by NAICS and set-aside",
    theirs: "Agency profiles and spending data available in higher tiers",
  },
  {
    feature: "Pre-solicitation tracking",
    ours: "Not available — focused on awarded contracts only",
    theirs: "Core feature — tracks opportunities from forecast through award",
  },
  {
    feature: "Competitor intelligence",
    ours: "See who wins contracts in your NAICS codes and set-aside categories",
    theirs: "Detailed competitor profiles, win rates, teaming relationships",
  },
  {
    feature: "Onboarding",
    ours: "No signup required — start searching immediately",
    theirs: "Enterprise sales process, demos, and contract negotiation",
  },
  {
    feature: "Contract detail pages",
    ours: "Financial summary, recipient info, business categories, competition status — one page",
    theirs: "Detailed opportunity and award records with analyst annotations",
  },
];

const faqs = [
  {
    question: "Is Federal Contract Tracker a replacement for GovWin?",
    answer:
      "Not entirely. GovWin is a full pipeline intelligence platform — it tracks pre-solicitation opportunities, agency forecasts, and competitor intel across the entire procurement lifecycle. Federal Contract Tracker focuses on awarded contracts: who won, for how much, and from which agency. If you need pipeline tracking and bid intelligence, GovWin is the more complete tool. If you need affordable awarded contract research, Federal Contract Tracker does that job at 1/40th the price.",
  },
  {
    question: "Why is GovWin so expensive?",
    answer:
      "GovWin employs analysts who manually research and curate opportunity intelligence, agency forecasts, and competitive landscape reports. That human research labor is what drives the $2,000–$12,000/year price tag. Federal Contract Tracker uses the free USASpending.gov API for awarded contract data, which keeps costs low enough to offer at $49/month.",
  },
  {
    question: "Where does Federal Contract Tracker get its data?",
    answer:
      "All data comes from USASpending.gov, the U.S. government's official source for federal spending data. It covers all awarded federal contracts and is updated daily. We use the public API — no scraping, no proprietary data sources.",
  },
  {
    question: "Can I use both GovWin and Federal Contract Tracker?",
    answer:
      "Yes, and many small businesses should. Use GovWin (or a similar pipeline tool) to find and track upcoming opportunities. Use Federal Contract Tracker to research the competitive landscape — who's winning contracts in your NAICS codes, which agencies are spending, and what set-aside contracts are being awarded. The awarded contract research from Federal Contract Tracker complements GovWin's forward-looking pipeline intelligence.",
  },
  {
    question:
      "I'm a small business and can't afford GovWin. Is Federal Contract Tracker enough?",
    answer:
      "It depends on what you need. If your primary goal is understanding who wins contracts in your space — which agencies spend the most, what set-aside awards look like, and who your competitors are — Federal Contract Tracker covers that for $49/month or even free (10 searches/day). You won't get pre-solicitation tracking or bid intelligence, but for competitive research on awarded contracts, it's a practical starting point.",
  },
];

export default function GovWinComparison() {
  return (
    <div className="flex min-h-screen flex-col bg-slate-950 font-sans">
      <header className="flex items-center justify-between border-b border-slate-800 px-6 py-4">
        <Link href="/" className="flex items-center gap-2">
          <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6 text-blue-400" aria-hidden="true">
            <path d="M3 21V7l9-4 9 4v14" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
            <path d="M9 21V13h6v8" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
            <circle cx="12" cy="9.5" r="1.5" fill="currentColor" />
          </svg>
          <span className="text-lg font-bold tracking-tight text-white">
            Federal Contract Tracker
          </span>
        </Link>
        <div className="flex items-center gap-4">
          <Link href="/trends" className="text-sm font-medium text-slate-400 transition-colors hover:text-blue-400">Trends</Link>
          <Link href="/saved-searches" className="text-sm font-medium text-slate-400 transition-colors hover:text-blue-400">Saved Searches</Link>
          <Link href="/pricing" className="text-sm font-medium text-blue-400 transition-colors hover:text-blue-300">Pricing</Link>
        </div>
      </header>

      <main className="mx-auto flex w-full max-w-3xl flex-col gap-10 px-4 py-12">
        <div className="flex flex-col items-center gap-5 text-center">
          <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            GovWin Alternative
            <span className="block text-blue-400">
              At 1/40th the Price
            </span>
          </h1>
          <p className="mx-auto max-w-xl text-lg text-slate-400">
            GovWin by Deltek is the gold standard for federal pipeline
            intelligence — and it costs $2,000–$12,000 per year. If you just
            need to research{" "}
            <strong className="text-white">
              who is winning awarded contracts
            </strong>
            , Federal Contract Tracker gets you there for $49/month.
          </p>
        </div>

        {/* Honest positioning */}
        <div className="flex flex-col gap-4 rounded-xl border border-blue-900/30 bg-blue-950/20 p-6">
          <h2 className="text-xl font-semibold text-white">
            An honest comparison
          </h2>
          <p className="text-sm leading-relaxed text-slate-400">
            GovWin is a comprehensive business development platform. It tracks
            opportunities from agency forecast through solicitation to award,
            with analyst-curated intelligence, competitor profiling, and teaming
            partner discovery. If your BD team relies on pipeline tracking,
            GovWin earns its price.
          </p>
          <p className="text-sm leading-relaxed text-slate-400">
            Federal Contract Tracker does one thing: awarded contract research.
            Who won contracts in your NAICS code? Which agencies spend the most
            on your services? What set-aside contracts were awarded last year?
            For small businesses that need competitive intelligence without a
            five-figure annual commitment, that one thing goes a long way.
          </p>
        </div>

        {/* Pricing callout */}
        <div className="flex flex-col items-center gap-3 rounded-xl border border-emerald-900/30 bg-emerald-950/20 p-6 text-center">
          <p className="text-sm font-medium text-emerald-400">
            Price comparison
          </p>
          <div className="flex items-baseline gap-3">
            <div className="flex flex-col">
              <span className="text-3xl font-extrabold text-white">
                $49
              </span>
              <span className="text-xs text-slate-400">
                /month
              </span>
            </div>
            <span className="text-sm text-slate-500">
              vs
            </span>
            <div className="flex flex-col">
              <span className="text-3xl font-extrabold text-slate-500 line-through">
                $2K–$12K
              </span>
              <span className="text-xs text-slate-400">
                /year
              </span>
            </div>
          </div>
          <p className="text-xs text-slate-400">
            Free tier available — 10 searches/day, no signup required
          </p>
        </div>

        {/* Comparison table */}
        <div className="flex flex-col gap-4">
          <h2 className="text-xl font-semibold text-white">
            Federal Contract Tracker vs GovWin
          </h2>
          <div className="overflow-x-auto rounded-xl border border-slate-800">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-800 bg-slate-900/50">
                  <th className="px-4 py-3 text-left font-medium text-slate-500">
                    Feature
                  </th>
                  <th className="px-4 py-3 text-left font-medium text-blue-400">
                    Contract Tracker
                  </th>
                  <th className="px-4 py-3 text-left font-medium text-slate-500">
                    GovWin by Deltek
                  </th>
                </tr>
              </thead>
              <tbody>
                {comparisonRows.map((row, i) => (
                  <tr
                    key={i}
                    className="border-b border-slate-800/50 last:border-0"
                  >
                    <td className="px-4 py-3 font-medium text-slate-300">
                      {row.feature}
                    </td>
                    <td className="px-4 py-3 text-slate-300">
                      {row.ours}
                    </td>
                    <td className="px-4 py-3 text-slate-500">
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
          <h2 className="text-xl font-semibold text-white">
            When to use each tool
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="flex flex-col gap-2 rounded-lg border border-blue-900/30 bg-blue-950/20 p-5">
              <h3 className="font-semibold text-blue-400">
                Use Federal Contract Tracker when...
              </h3>
              <ul className="flex flex-col gap-1.5 text-sm text-slate-400">
                <li>You want to see who won contracts in your NAICS code</li>
                <li>You need to filter awarded contracts by set-aside type</li>
                <li>You want agency spending breakdowns for business development</li>
                <li>You&apos;re a small business that can&apos;t justify $2K+/year</li>
                <li>You need a quick answer without an enterprise sales process</li>
              </ul>
            </div>
            <div className="flex flex-col gap-2 rounded-lg border bg-slate-900 p-5">
              <h3 className="font-semibold text-slate-300">
                Use GovWin when...
              </h3>
              <ul className="flex flex-col gap-1.5 text-sm text-slate-400">
                <li>You need to track opportunities before they&apos;re solicited</li>
                <li>Your BD team manages a pipeline of upcoming bids</li>
                <li>You need analyst-curated competitive intelligence</li>
                <li>You&apos;re looking for teaming partners on large contracts</li>
                <li>Your organization has the budget for enterprise tools</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Who this is for */}
        <div className="flex flex-col gap-4">
          <h2 className="text-xl font-semibold text-white">
            Built for small businesses entering federal contracting
          </h2>
          <p className="text-sm leading-relaxed text-slate-400">
            Most small businesses exploring government contracts don&apos;t need a
            $12,000/year intelligence platform on day one. They need to answer
            basic questions: Are agencies spending money in my industry? Who&apos;s
            winning those contracts? Are there set-aside opportunities for my
            business type? Federal Contract Tracker answers those questions at a
            price that makes sense for businesses still building their federal
            pipeline.
          </p>
          <p className="text-sm leading-relaxed text-slate-400">
            As your federal business grows and you need pre-solicitation
            tracking, bid management, and deeper competitive intelligence, tools
            like GovWin become worth the investment. Federal Contract Tracker is
            where you start.
          </p>
        </div>

        {/* Also compare */}
        <div className="flex items-center gap-3 rounded-lg border border-slate-800 bg-slate-900 px-5 py-4">
          <span className="text-sm text-slate-400">
            Also compare:
          </span>
          <Link
            href="/compare/bgov"
            className="text-sm font-medium text-blue-400 transition-colors hover:text-blue-300"
          >
            Federal Contract Tracker vs Bloomberg Government
          </Link>
          <span className="text-slate-600">&middot;</span>
          <Link
            href="/compare/sam-gov"
            className="text-sm font-medium text-blue-400 transition-colors hover:text-blue-300"
          >
            Federal Contract Tracker vs SAM.gov
          </Link>
        </div>

        {/* FAQ */}
        <div className="flex flex-col gap-5">
          <h2 className="text-xl font-semibold text-white">
            Frequently asked questions
          </h2>
          <div className="flex flex-col gap-4">
            {faqs.map((faq, i) => (
              <div
                key={i}
                className="rounded-lg border border-slate-800 bg-slate-900 p-5"
              >
                <h3 className="font-semibold text-white">
                  {faq.question}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-400">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="flex flex-col items-center gap-4 rounded-xl border border-blue-900/30 bg-blue-950/20 p-8 text-center">
          <h2 className="text-2xl font-bold text-white">
            Start researching federal contracts
          </h2>
          <p className="max-w-md text-sm text-slate-400">
            10 free searches per day. Set-aside filters, NAICS autocomplete,
            agency spending breakdowns. No registration, no sales call.
          </p>
          <Link
            href="/"
            className="rounded-lg bg-blue-500 px-8 py-3 text-base font-semibold text-white shadow-sm transition-all hover:bg-blue-400"
          >
            Search contracts free
          </Link>
        </div>
      </main>

      <footer className="flex flex-col items-center gap-3 border-t border-slate-800 px-6 py-6">
        <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-slate-500">
          <span className="font-medium">Moltcorp Products:</span>
          <span className="font-semibold text-blue-400">Federal Contract Tracker</span>
          <a href="https://statusping-moltcorporation.vercel.app" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-blue-400">StatusPing</a>
          <a href="https://qr-code-tool-moltcorporation.vercel.app" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-blue-400">Qdot</a>
        </div>
        <p className="text-xs text-slate-600">
          Data from{" "}
          <a href="https://usaspending.gov" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-blue-400">USASpending.gov</a>
          {" "}&middot; Built by agents at{" "}
          <a href="https://moltcorporation.com" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-blue-400">Moltcorp</a>
        </p>
      </footer>
    </div>
  );
}
