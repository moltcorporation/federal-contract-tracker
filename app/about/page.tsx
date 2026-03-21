import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About | GovScout",
  description:
    "GovScout helps small businesses find and win government contracts using USASpending.gov data. Search awards, track spending trends, and research competitors.",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-slate-950">
      <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="mb-8 inline-block text-sm text-blue-400 hover:text-blue-300"
        >
          &larr; Back to GovScout
        </Link>

        <h1 className="text-3xl font-bold text-white">About GovScout</h1>
        <p className="mt-2 text-sm text-slate-500">
          Federal contract intelligence for small businesses
        </p>

        <div className="mt-8 space-y-8 text-slate-300 leading-relaxed">
          <section>
            <h2 className="text-xl font-semibold text-white">What We Do</h2>
            <p className="mt-3">
              GovScout makes federal contracting data accessible and actionable.
              We pull contract award data from{" "}
              <a
                href="https://www.usaspending.gov"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-300 underline"
              >
                USASpending.gov
              </a>{" "}
              and present it in a way that helps small businesses find
              opportunities, track spending trends, and research competitors.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white">Key Features</h2>
            <ul className="mt-3 list-disc space-y-2 pl-5">
              <li>
                <strong className="text-white">Contract Search</strong> — Filter
                awarded contracts by NAICS code, agency, dollar amount, set-aside
                type, and recipient.
              </li>
              <li>
                <strong className="text-white">Spending Trends</strong> — See how
                agency spending changes over time for your target sectors.
              </li>
              <li>
                <strong className="text-white">Competitor Intelligence</strong> —
                Find out who is winning contracts in your space and how much they
                are winning.
              </li>
              <li>
                <strong className="text-white">Set-Aside Tracking</strong> —
                Identify contracts reserved for small businesses, 8(a), HUBZone,
                WOSB, and SDVOSB firms.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white">Data Source</h2>
            <p className="mt-3">
              All contract data comes from the U.S. Department of the
              Treasury&apos;s USASpending.gov API. Data is updated daily and
              covers 100+ federal agencies and 5+ years of award history.
              GovScout is not affiliated with or endorsed by the U.S. government.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white">Built by Moltcorp</h2>
            <p className="mt-3">
              GovScout is built and operated by Moltcorp, a company where AI
              agents collaborate to build real software products. Our team of
              agents designs, develops, and ships products autonomously.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white">Pricing</h2>
            <p className="mt-3">
              GovScout offers a free tier with 10 searches per day. The Pro plan
              at $49/month includes unlimited searches, spending trend analysis,
              CSV export, saved searches, and email alerts.{" "}
              <Link
                href="/pricing"
                className="text-blue-400 hover:text-blue-300 underline"
              >
                View pricing details
              </Link>
              .
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white">Contact</h2>
            <p className="mt-3">
              Questions or feedback? Reach us at{" "}
              <a
                href="mailto:support@moltcorp.com"
                className="text-blue-400 hover:text-blue-300 underline"
              >
                support@moltcorp.com
              </a>
              .
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
