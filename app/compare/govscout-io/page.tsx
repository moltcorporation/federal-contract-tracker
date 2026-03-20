import Link from "next/link";
import { CrossProductFooter } from "@/app/components/cross-product-footer";

const pricingRows = [
  {
    feature: "Federal contract search",
    ours: "Included",
    standard: "Included",
    pro: "Included",
    enterprise: "Included",
  },
  {
    feature: "Set-aside filters (8(a), HUBZone, WOSB, SDVOSB)",
    ours: "Included",
    standard: "Included",
    pro: "Included",
    enterprise: "Included",
  },
  {
    feature: "Spending trends & analytics",
    ours: "Included",
    standard: "—",
    pro: "—",
    enterprise: "—",
  },
  {
    feature: "Saved searches with email alerts",
    ours: "Included",
    standard: "Scheduled queries",
    pro: "Scheduled queries",
    enterprise: "Scheduled queries",
  },
  {
    feature: "CSV export",
    ours: "Included",
    standard: "—",
    pro: "—",
    enterprise: "—",
  },
  {
    feature: "AI opportunity chat",
    ours: "—",
    standard: "Included",
    pro: "Included",
    enterprise: "Included",
  },
  {
    feature: "AI proposal outline generator",
    ours: "—",
    standard: "—",
    pro: "Included",
    enterprise: "Included",
  },
  {
    feature: "AI proposal editor",
    ours: "—",
    standard: "—",
    pro: "Included",
    enterprise: "Included",
  },
  {
    feature: "SLED (state/local/edu) search",
    ours: "—",
    standard: "—",
    pro: "Included",
    enterprise: "Included",
  },
  {
    feature: "Team seats",
    ours: "—",
    standard: "1",
    pro: "1",
    enterprise: "5",
  },
  {
    feature: "Free tier / trial",
    ours: "10 searches/day, no signup",
    standard: "7-day trial",
    pro: "7-day trial",
    enterprise: "7-day trial",
  },
  {
    feature: "Price",
    ours: "$49/mo",
    standard: "$50/mo",
    pro: "$150/mo",
    enterprise: "$500/mo",
  },
];

const advantages = [
  {
    title: "One plan, everything included",
    description:
      "GovScout has one Pro plan at $49/mo. No feature gating, no upsell tiers. Spending trends, CSV export, saved searches, and email alerts are all included. govscout.io splits features across three plans — proposal tools require $150/mo, multi-seat access costs $500/mo.",
  },
  {
    title: "Free tier without signup",
    description:
      "Try GovScout with 10 searches per day — no registration, no credit card, no time limit. govscout.io offers a 7-day trial that requires creating an account first.",
  },
  {
    title: "Transparent pricing",
    description:
      "GovScout's pricing is public on the website. One plan, one price. No sales calls, no \"contact us\" for enterprise pricing. You know exactly what you pay before you start.",
  },
];

const faqs = [
  {
    question: "Do GovScout and govscout.io use the same data?",
    answer:
      "Both products pull from the same federal data sources — SAM.gov and USASpending.gov. The difference is in how the data is presented, what tools are built on top of it, and what you pay for access.",
  },
  {
    question: "Why is GovScout cheaper than govscout.io?",
    answer:
      "GovScout offers one plan at $49/month that includes everything: unlimited searches, set-aside filters, spending trends, saved searches with email alerts, and CSV export. govscout.io splits features across three tiers ($50, $150, $500/mo), locking proposal tools and SLED search behind higher plans.",
  },
  {
    question: "Does govscout.io have features GovScout doesn't?",
    answer:
      "Yes. govscout.io's Professional ($150/mo) and Enterprise ($500/mo) tiers include AI proposal outline generation, AI proposal editing, and state/local/education (SLED) contract search. GovScout focuses on federal contract search and competitive intelligence at a single price point.",
  },
  {
    question: "Can I try GovScout before paying?",
    answer:
      "Yes. GovScout offers a free tier with 10 searches per day and full access to all filters — no signup or credit card required. govscout.io offers a 7-day free trial that requires registration.",
  },
  {
    question: "Which tool is better for small businesses?",
    answer:
      "If you need federal contract search, set-aside filtering, and spending trends, GovScout gives you all of that for $49/month with no upsell. If you also need AI proposal generation or state/local contract coverage, govscout.io's higher tiers offer those — at 3-10x the price.",
  },
];

export default function GovscoutIoComparison() {
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

      <main className="mx-auto flex w-full max-w-4xl flex-col gap-10 px-4 py-12">
        {/* Hero */}
        <div className="flex flex-col items-center gap-5 text-center">
          <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            GovScout vs govscout.io
          </h1>
          <p className="mx-auto max-w-xl text-lg text-slate-400">
            Same federal contract data. Same market. Different approach to
            pricing. Compare features and decide which tool fits your business.
          </p>
        </div>

        {/* Pricing at a glance */}
        <div className="flex flex-col gap-4 rounded-xl border border-blue-900/30 bg-blue-950/20 p-6">
          <h2 className="text-xl font-semibold text-white">
            Pricing at a glance
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-lg border border-blue-500/30 bg-blue-950/30 p-5">
              <p className="text-sm font-medium text-blue-400">GovScout</p>
              <p className="mt-1 text-3xl font-extrabold text-white">$49<span className="text-base font-normal text-slate-400">/mo</span></p>
              <p className="mt-2 text-sm text-slate-400">One plan. Everything included. Free tier available with no signup.</p>
            </div>
            <div className="rounded-lg border border-slate-700 bg-slate-900 p-5">
              <p className="text-sm font-medium text-slate-400">govscout.io</p>
              <p className="mt-1 text-3xl font-extrabold text-slate-300">$50–$500<span className="text-base font-normal text-slate-500">/mo</span></p>
              <p className="mt-2 text-sm text-slate-500">Three tiers. Proposal tools and SLED search locked behind $150+/mo.</p>
            </div>
          </div>
        </div>

        {/* Feature comparison table */}
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
                    GovScout — $49/mo
                  </th>
                  <th className="px-4 py-3 text-left font-medium text-slate-500">
                    govscout.io Standard — $50/mo
                  </th>
                  <th className="px-4 py-3 text-left font-medium text-slate-500">
                    govscout.io Pro — $150/mo
                  </th>
                  <th className="px-4 py-3 text-left font-medium text-slate-500">
                    govscout.io Enterprise — $500/mo
                  </th>
                </tr>
              </thead>
              <tbody>
                {pricingRows.map((row, i) => (
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
                      {row.standard}
                    </td>
                    <td className="px-4 py-3 text-slate-500">
                      {row.pro}
                    </td>
                    <td className="px-4 py-3 text-slate-500">
                      {row.enterprise}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-slate-500">
            Feature information based on govscout.io public pricing page as of March 2026. Both products use SAM.gov and USASpending.gov as data sources.
          </p>
        </div>

        {/* Why GovScout */}
        <div className="flex flex-col gap-4">
          <h2 className="text-xl font-semibold text-white">
            Where GovScout wins
          </h2>
          <div className="grid gap-4 sm:grid-cols-3">
            {advantages.map((adv, i) => (
              <div
                key={i}
                className="flex flex-col gap-2 rounded-lg border border-blue-900/30 bg-blue-950/20 p-5"
              >
                <h3 className="font-semibold text-blue-400">{adv.title}</h3>
                <p className="text-sm text-slate-400">{adv.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Where govscout.io wins — honesty */}
        <div className="flex flex-col gap-4">
          <h2 className="text-xl font-semibold text-white">
            Where govscout.io has more
          </h2>
          <div className="rounded-lg border border-slate-800 bg-slate-900 p-5">
            <ul className="flex flex-col gap-3 text-sm text-slate-400">
              <li>
                <span className="font-medium text-slate-300">AI proposal tools</span> — govscout.io&apos;s Professional tier ($150/mo) includes AI-powered proposal outline generation and editing. GovScout does not offer proposal writing tools.
              </li>
              <li>
                <span className="font-medium text-slate-300">SLED coverage</span> — govscout.io&apos;s Professional and Enterprise tiers include state, local, and education contract search. GovScout focuses exclusively on federal contracts.
              </li>
              <li>
                <span className="font-medium text-slate-300">Multi-seat plans</span> — govscout.io&apos;s Enterprise tier ($500/mo) includes 5 seats with dedicated support. GovScout currently offers individual accounts only.
              </li>
            </ul>
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
            GovScout vs GovWin
          </Link>
          <span className="text-slate-600">&middot;</span>
          <Link
            href="/compare/sam-gov"
            className="text-sm font-medium text-blue-400 transition-colors hover:text-blue-300"
          >
            GovScout vs SAM.gov
          </Link>
          <span className="text-slate-600">&middot;</span>
          <Link
            href="/compare/bgov"
            className="text-sm font-medium text-blue-400 transition-colors hover:text-blue-300"
          >
            GovScout vs Bloomberg Government
          </Link>
          <span className="text-slate-600">&middot;</span>
          <Link
            href="/compare/manual-tracking"
            className="text-sm font-medium text-blue-400 transition-colors hover:text-blue-300"
          >
            GovScout vs Spreadsheets
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
            Start free — no signup required
          </h2>
          <p className="max-w-md text-sm text-slate-400">
            10 free searches per day with full access to set-aside filters,
            NAICS autocomplete, and agency spending data. No credit card, no
            trial period.
          </p>
          <Link
            href="/"
            className="rounded-lg bg-blue-500 px-8 py-3 text-base font-semibold text-white shadow-sm transition-all hover:bg-blue-400"
          >
            Start Free
          </Link>
        </div>
      </main>

      <CrossProductFooter />
    </div>
  );
}
