import Link from "next/link";
import { CrossProductFooter } from "@/app/components/cross-product-footer";

const comparisonRows = [
  {
    feature: "Free tier",
    ours: "10 searches/day — no signup, no expiration",
    theirs: "No free tier — 7-day trial only",
  },
  {
    feature: "Pro pricing",
    ours: "$49/mo — unlimited searches, trends, CSV export",
    theirs: "$50/mo Standard — AI search, AI profile, scheduled queries",
  },
  {
    feature: "Higher tiers",
    ours: "None — flat $49/mo covers everything",
    theirs: "$150/mo Professional, $500/mo Enterprise (5 seats)",
  },
  {
    feature: "Data source",
    ours: "USASpending.gov (official government data, updated daily)",
    theirs: "SAM.gov + USASpending (same public data sources)",
  },
  {
    feature: "Set-aside filters",
    ours: "One-click: 8(a), HUBZone, WOSB, SDVOSB, SBA — front and center",
    theirs: "Available in search filters",
  },
  {
    feature: "NAICS code search",
    ours: "Autocomplete — type a keyword, pick from matching codes",
    theirs: "Available in search",
  },
  {
    feature: "AI proposal tools",
    ours: "Not available — focused on contract research",
    theirs: "$150/mo tier — AI proposal outlines and editing",
  },
  {
    feature: "SLED coverage",
    ours: "Federal only",
    theirs: "$150/mo tier — state, local, and education contracts",
  },
  {
    feature: "Agency spending trends",
    ours: "Top agencies ranked by spending, filterable by NAICS and set-aside",
    theirs: "Not specifically highlighted",
  },
  {
    feature: "Onboarding",
    ours: "No signup required — start searching immediately",
    theirs: "Email signup required, 7-day trial",
  },
];

const faqs = [
  {
    question: "What is govscout.io?",
    answer:
      "govscout.io is an AI-powered federal contract search platform based in Greenville, SC. They offer Standard ($50/mo), Professional ($150/mo), and Enterprise ($500/mo) plans with features like AI opportunity search, proposal generation, and SLED (state/local/education) contract coverage. They offer a 7-day free trial.",
  },
  {
    question: "How is GovScout different from govscout.io?",
    answer:
      "Both tools search federal contract data from SAM.gov and USASpending.gov. GovScout offers a permanent free tier (10 searches/day) and flat $49/mo Pro pricing with no upsells. govscout.io has no free tier (7-day trial only) but offers AI proposal generation ($150/mo tier) and state/local/education search ($150/mo tier) that GovScout doesn't have.",
  },
  {
    question: "Which is better for small businesses?",
    answer:
      "For small businesses exploring government contracting, GovScout's free tier lets you research contracts without any commitment. If you need AI-generated proposals or state/local contract search, govscout.io's Professional plan ($150/mo) covers that. For pure federal contract research on a budget, GovScout at $49/mo vs govscout.io at $50/mo is essentially the same price — but GovScout includes a free tier to start.",
  },
  {
    question: "Does govscout.io have features GovScout doesn't?",
    answer:
      "Yes. govscout.io offers AI proposal outline generation and editing ($150/mo Professional tier), SLED (state/local/education) contract search, AI opportunity chat, and attachment summaries. GovScout focuses on federal awarded contract research with set-aside filters, NAICS autocomplete, and agency spending trends.",
  },
];

export default function GovScoutIoComparison() {
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
            GovScout
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
            GovScout vs govscout.io
            <span className="block text-blue-400">
              Same Name, Different Tools
            </span>
          </h1>
          <p className="mx-auto max-w-xl text-lg text-slate-400">
            Both tools search federal contracts using the same government data
            sources. GovScout starts{" "}
            <strong className="text-white">free</strong> with 10 searches/day
            and Pro at{" "}
            <strong className="text-white">$49/mo</strong> — flat, no upsells.
            govscout.io starts at{" "}
            <strong className="text-white">$50/mo</strong> with tiers up to
            $500/mo for proposal tools and SLED coverage.
          </p>
        </div>

        {/* Honest positioning */}
        <div className="flex flex-col gap-4 rounded-xl border border-blue-900/30 bg-blue-950/20 p-6">
          <h2 className="text-xl font-semibold text-white">
            An honest comparison
          </h2>
          <p className="text-sm leading-relaxed text-slate-400">
            govscout.io is a more mature product with additional features. Their
            Professional tier ($150/mo) includes AI proposal generation and
            state/local/education contract search that GovScout does not offer.
            They have published testimonials, an active blog, and social media
            presence. If you need proposal writing assistance or SLED coverage,
            govscout.io has those capabilities.
          </p>
          <p className="text-sm leading-relaxed text-slate-400">
            GovScout is built for small businesses that need affordable federal
            contract research without tiered upsells. You get a permanent free
            tier — not a 7-day trial — and a single $49/mo plan that covers
            everything we offer: unlimited searches, spending trends, set-aside
            filters, NAICS autocomplete, and CSV export. No sales call, no
            feature gating.
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
                /month (everything included)
              </span>
            </div>
            <span className="text-sm text-slate-500">
              vs
            </span>
            <div className="flex flex-col">
              <span className="text-3xl font-extrabold text-slate-500">
                $50–$500
              </span>
              <span className="text-xs text-slate-400">
                /month (tiered)
              </span>
            </div>
          </div>
          <p className="text-xs text-slate-400">
            GovScout: free tier (10 searches/day, no expiration) &bull; govscout.io: 7-day trial only
          </p>
        </div>

        {/* Comparison table */}
        <div className="flex flex-col gap-4">
          <h2 className="text-xl font-semibold text-white">
            Feature comparison
          </h2>
          <div className="overflow-x-auto rounded-xl border border-slate-800">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-800 bg-slate-900/50">
                  <th className="px-4 py-3 text-left font-medium text-slate-500">
                    Feature
                  </th>
                  <th className="px-4 py-3 text-left font-medium text-blue-400">
                    GovScout
                  </th>
                  <th className="px-4 py-3 text-left font-medium text-slate-500">
                    govscout.io
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
                Use GovScout when...
              </h3>
              <ul className="flex flex-col gap-1.5 text-sm text-slate-400">
                <li>You want to try federal contract search for free first</li>
                <li>You need flat pricing with no tiered upsells</li>
                <li>Set-aside filtering is your primary use case</li>
                <li>You want agency spending trends and NAICS autocomplete</li>
                <li>You don&apos;t need proposal writing tools</li>
              </ul>
            </div>
            <div className="flex flex-col gap-2 rounded-lg border bg-slate-900 p-5">
              <h3 className="font-semibold text-slate-300">
                Use govscout.io when...
              </h3>
              <ul className="flex flex-col gap-1.5 text-sm text-slate-400">
                <li>You need AI proposal generation and editing</li>
                <li>You search state, local, and education contracts</li>
                <li>You want AI-powered opportunity chat</li>
                <li>Your team needs multiple seats ($500/mo Enterprise)</li>
                <li>You prefer a product with established testimonials</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Also compare */}
        <div className="flex flex-wrap items-center gap-3 rounded-lg border border-slate-800 bg-slate-900 px-5 py-4">
          <span className="text-sm text-slate-400">
            Also compare:
          </span>
          <Link
            href="/compare/govwin"
            className="text-sm font-medium text-blue-400 transition-colors hover:text-blue-300"
          >
            vs GovWin
          </Link>
          <span className="text-slate-600">&middot;</span>
          <Link
            href="/compare/bgov"
            className="text-sm font-medium text-blue-400 transition-colors hover:text-blue-300"
          >
            vs Bloomberg Government
          </Link>
          <span className="text-slate-600">&middot;</span>
          <Link
            href="/compare/sam-gov"
            className="text-sm font-medium text-blue-400 transition-colors hover:text-blue-300"
          >
            vs SAM.gov
          </Link>
          <span className="text-slate-600">&middot;</span>
          <Link
            href="/compare/usaspending"
            className="text-sm font-medium text-blue-400 transition-colors hover:text-blue-300"
          >
            vs USASpending
          </Link>
          <span className="text-slate-600">&middot;</span>
          <Link
            href="/compare/manual-tracking"
            className="text-sm font-medium text-blue-400 transition-colors hover:text-blue-300"
          >
            vs Spreadsheets
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
            Start researching federal contracts — free
          </h2>
          <p className="max-w-md text-sm text-slate-400">
            10 free searches per day. Set-aside filters, NAICS autocomplete,
            agency spending breakdowns. No registration, no credit card.
          </p>
          <Link
            href="/"
            className="rounded-lg bg-blue-500 px-8 py-3 text-base font-semibold text-white shadow-sm transition-all hover:bg-blue-400"
          >
            Search contracts free
          </Link>
        </div>
      </main>

      <CrossProductFooter />
    </div>
  );
}
