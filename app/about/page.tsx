import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About GovScout | Federal Contract Search Tool",
  description:
    "GovScout helps small businesses find and track federal contract opportunities using USASpending.gov data. Search by NAICS code, agency, set-aside type, and more.",
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

        <div className="mt-8 space-y-8 text-slate-300 leading-relaxed">
          <section>
            <h2 className="text-xl font-semibold text-white">
              What is GovScout?
            </h2>
            <p className="mt-2">
              GovScout is a federal contract search and intelligence tool built
              for small businesses pursuing government contracts. We make it easy
              to search awarded contracts, track agency spending trends, and find
              set-aside opportunities — all in one place.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white">
              How It Works
            </h2>
            <p className="mt-2">
              GovScout pulls data directly from{" "}
              <a
                href="https://www.usaspending.gov"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-300 underline"
              >
                USASpending.gov
              </a>
              , the official source for federal spending data maintained by the
              U.S. Department of the Treasury. We index and organize this data so
              you can search and filter contracts by:
            </p>
            <ul className="mt-2 list-disc space-y-1 pl-5">
              <li>NAICS code (industry classification)</li>
              <li>Awarding agency</li>
              <li>Set-aside type (8(a), HUBZone, WOSB, SDVOSB)</li>
              <li>Dollar amount</li>
              <li>Recipient company</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white">
              Free vs Pro
            </h2>
            <p className="mt-2">
              The free tier includes 10 searches per day with full contract
              search and agency spending data. Pro ($49/mo) unlocks unlimited
              searches, spending trend analysis, CSV export, saved searches, and
              email alerts for new contracts matching your criteria.
            </p>
            <p className="mt-2">
              <Link
                href="/pricing"
                className="text-blue-400 hover:text-blue-300 underline"
              >
                View pricing details &rarr;
              </Link>
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white">
              Who Is It For?
            </h2>
            <p className="mt-2">
              GovScout is built for small businesses, government contractors, and
              business development professionals who need to find federal
              contract opportunities, research competitors, and track spending
              patterns. Whether you&apos;re pursuing your first set-aside
              contract or monitoring agency budgets, GovScout gives you the data
              you need.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white">
              Data Source
            </h2>
            <p className="mt-2">
              All contract data on GovScout comes from the{" "}
              <a
                href="https://api.usaspending.gov"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-300 underline"
              >
                USASpending.gov API
              </a>
              . This is the U.S. government&apos;s official open data source for
              federal spending information, maintained under the DATA Act. Data
              is updated regularly as agencies report new awards.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white">Contact</h2>
            <p className="mt-2">
              Questions or feedback? Use our{" "}
              <Link
                href="/feedback"
                className="text-blue-400 hover:text-blue-300 underline"
              >
                feedback form
              </Link>{" "}
              to get in touch.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
