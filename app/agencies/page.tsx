import type { Metadata } from "next";
import Link from "next/link";
import { getTopAgencies, slugify, formatDollars } from "@/lib/usaspending";

const baseUrl = "https://govscout-moltcorporation.vercel.app";

export const metadata: Metadata = {
  title: "Federal Agencies — Government Contract Spending | GovScout",
  description:
    "Browse federal agency contract spending data. See which agencies award the most contracts, top contractors, and spending trends. Powered by USASpending.gov data.",
  openGraph: {
    title: "Federal Agencies — Government Contract Spending | GovScout",
    description:
      "Browse federal agency contract spending data. See top agencies by contract volume and spending.",
    type: "website",
    siteName: "GovScout",
  },
  alternates: { canonical: `${baseUrl}/agencies` },
};

export const revalidate = 86400;

export default async function AgenciesIndexPage() {
  let agencies: Awaited<ReturnType<typeof getTopAgencies>> = [];
  try {
    agencies = await getTopAgencies(50);
  } catch {
    // Fail gracefully — show empty state
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Federal Agencies — Government Contract Spending",
    description: "Browse all federal agencies and their contract spending data.",
    url: `${baseUrl}/agencies`,
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: baseUrl },
        { "@type": "ListItem", position: 2, name: "Agencies", item: `${baseUrl}/agencies` },
      ],
    },
  };

  return (
    <div className="flex min-h-screen flex-col bg-slate-950 font-sans">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <header className="flex items-center justify-between border-b border-slate-800 px-6 py-4">
        <div className="flex items-center gap-2">
          <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6 text-blue-400" aria-hidden="true">
            <path d="M3 21V7l9-4 9 4v14" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
            <path d="M9 21V13h6v8" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
            <circle cx="12" cy="9.5" r="1.5" fill="currentColor" />
          </svg>
          <Link href="/" className="text-lg font-bold tracking-tight text-white hover:text-blue-400">
            GovScout
          </Link>
        </div>
        <div className="flex items-center gap-4">
          <Link href="/agencies" className="text-sm font-medium text-blue-400">Agencies</Link>
          <Link href="/naics" className="text-sm font-medium text-slate-400 transition-colors hover:text-blue-400">NAICS Codes</Link>
          <Link href="/trends" className="text-sm font-medium text-slate-400 transition-colors hover:text-blue-400">Trends</Link>
          <Link href="/pricing" className="text-sm font-medium text-slate-400 transition-colors hover:text-blue-400">Pricing</Link>
        </div>
      </header>

      <main className="flex flex-1 flex-col items-center px-4 pb-16 pt-8">
        <div className="flex w-full max-w-5xl flex-col gap-8">
          <div className="flex flex-col gap-2">
            <nav className="text-sm text-slate-500">
              <Link href="/" className="hover:text-blue-400">Home</Link>
              <span className="mx-2">›</span>
              <span className="text-slate-300">Agencies</span>
            </nav>
            <h1 className="text-3xl font-extrabold tracking-tight text-white">
              Federal Agency Contract Spending
            </h1>
            <p className="max-w-2xl text-sm text-slate-400">
              Explore contract spending by federal agency. Click any agency to see top contractors,
              recent awards, NAICS breakdown, and spending trends. Data from USASpending.gov.
            </p>
          </div>

          {agencies.length === 0 ? (
            <p className="text-sm text-slate-500">Unable to load agency data. Please try again later.</p>
          ) : (
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {agencies.map((agency) => (
                <Link
                  key={agency.code}
                  href={`/agencies/${slugify(agency.name)}`}
                  className="group flex flex-col gap-2 rounded-xl border border-slate-800 bg-slate-900 p-5 transition-colors hover:border-blue-500/50 hover:bg-slate-800/50"
                >
                  <span className="text-sm font-semibold text-white group-hover:text-blue-400 transition-colors">
                    {agency.name}
                  </span>
                  <span className="text-xl font-bold text-blue-400">
                    {formatDollars(agency.amount)}
                  </span>
                  <span className="text-xs text-slate-500">
                    Current fiscal year contract spending
                  </span>
                </Link>
              ))}
            </div>
          )}

          <div className="rounded-xl border border-slate-800 bg-slate-900 p-6">
            <h2 className="mb-3 text-lg font-bold text-white">Search Contracts by Agency</h2>
            <p className="mb-4 text-sm text-slate-400">
              Want to search for specific contracts? Use our search tool to filter by agency, NAICS code,
              set-aside type, dollar amount, and more.
            </p>
            <Link
              href="/"
              className="inline-flex rounded-lg bg-blue-500 px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-blue-400"
            >
              Search Contracts
            </Link>
          </div>
        </div>
      </main>

      <footer className="flex flex-col items-center gap-3 border-t border-slate-800 px-6 py-6">
        <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-slate-500">
          <span className="font-medium">Moltcorp Products:</span>
          <span className="font-semibold text-blue-400">GovScout</span>
          <a href="https://statusping-moltcorporation.vercel.app" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-blue-400">StatusPing</a>
          <a href="https://qr-code-tool-moltcorporation.vercel.app" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-blue-400">OneQR</a>
        </div>
        <p className="text-xs text-slate-600">
          Data from{" "}
          <a href="https://usaspending.gov" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-blue-400">USASpending.gov</a>
          {" "}· Built by agents at{" "}
          <a href="https://moltcorporation.com" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-blue-400">Moltcorp</a>
        </p>
      </footer>
    </div>
  );
}
