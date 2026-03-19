import type { Metadata } from "next";
import Link from "next/link";
import { CrossProductFooter } from "@/app/components/cross-product-footer";
import { getTopNaicsCodes, formatDollars } from "@/lib/usaspending";

const baseUrl = "https://govscout-moltcorporation.vercel.app";

export const metadata: Metadata = {
  title: "NAICS Codes — Federal Contract Spending by Industry | GovScout",
  description:
    "Browse federal contract spending by NAICS industry code. See which industries receive the most government contracts, top agencies, and contractors. Powered by USASpending.gov data.",
  openGraph: {
    title: "NAICS Codes — Federal Contract Spending by Industry | GovScout",
    description: "Browse federal contract spending by NAICS industry code.",
    type: "website",
    siteName: "GovScout",
  },
  alternates: { canonical: `${baseUrl}/naics` },
};

export const revalidate = 86400;

export default async function NaicsIndexPage() {
  let naicsCodes: Awaited<ReturnType<typeof getTopNaicsCodes>> = [];
  try {
    naicsCodes = await getTopNaicsCodes(50);
  } catch {
    // Fail gracefully
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "NAICS Codes — Federal Contract Spending by Industry",
    description: "Browse all NAICS industry codes and their federal contract spending.",
    url: `${baseUrl}/naics`,
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: baseUrl },
        { "@type": "ListItem", position: 2, name: "NAICS Codes", item: `${baseUrl}/naics` },
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
          <Link href="/agencies" className="text-sm font-medium text-slate-400 transition-colors hover:text-blue-400">Agencies</Link>
          <Link href="/naics" className="text-sm font-medium text-blue-400">NAICS Codes</Link>
          <Link href="/trends" className="text-sm font-medium text-slate-400 transition-colors hover:text-blue-400">Trends</Link>
          <Link href="/pricing" className="text-sm font-medium text-slate-400 transition-colors hover:text-blue-400">Pricing</Link>
          <Link
            href="/register"
            className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700"
          >
            Sign Up Free
          </Link>
        </div>
      </header>

      <main className="flex flex-1 flex-col items-center px-4 pb-16 pt-8">
        <div className="flex w-full max-w-5xl flex-col gap-8">
          <div className="flex flex-col gap-2">
            <nav className="text-sm text-slate-500">
              <Link href="/" className="hover:text-blue-400">Home</Link>
              <span className="mx-2">›</span>
              <span className="text-slate-300">NAICS Codes</span>
            </nav>
            <h1 className="text-3xl font-extrabold tracking-tight text-white">
              Federal Contracts by NAICS Industry Code
            </h1>
            <p className="max-w-2xl text-sm text-slate-400">
              NAICS (North American Industry Classification System) codes categorize federal contracts by industry.
              Click any code to see top agencies, contractors, and recent awards. Data from USASpending.gov.
            </p>
          </div>

          {naicsCodes.length === 0 ? (
            <p className="text-sm text-slate-500">Unable to load NAICS data. Please try again later.</p>
          ) : (
            <div className="flex flex-col gap-2">
              {naicsCodes.map((naics) => (
                <Link
                  key={naics.code}
                  href={`/naics/${naics.code}`}
                  className="group flex items-center justify-between rounded-xl border border-slate-800 bg-slate-900 px-5 py-4 transition-colors hover:border-blue-500/50 hover:bg-slate-800/50"
                >
                  <div className="flex items-center gap-4">
                    <span className="rounded-md bg-slate-800 px-2.5 py-1 font-mono text-xs text-slate-400 group-hover:bg-blue-950/50 group-hover:text-blue-400">
                      {naics.code}
                    </span>
                    <span className="text-sm font-semibold text-white group-hover:text-blue-400 transition-colors">
                      {naics.name}
                    </span>
                  </div>
                  <span className="text-lg font-bold text-blue-400">
                    {formatDollars(naics.amount)}
                  </span>
                </Link>
              ))}
            </div>
          )}

          <div className="rounded-xl border border-slate-800 bg-slate-900 p-6">
            <h2 className="mb-3 text-lg font-bold text-white">Search Contracts by NAICS Code</h2>
            <p className="mb-4 text-sm text-slate-400">
              Use our search tool to find contracts in your specific industry. Filter by NAICS code, agency,
              set-aside type, and dollar amount.
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

      <CrossProductFooter />
    </div>
  );
}
