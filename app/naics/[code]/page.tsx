import type { Metadata } from "next";
import Link from "next/link";
import {
  getTopNaicsCodes,
  getNaicsContracts,
  getNaicsTopAgencies,
  getNaicsTopContractors,
  formatDollars,
  formatFullDollars,
  slugify,
} from "@/lib/usaspending";
import type { NaicsSummary } from "@/lib/usaspending";
import { notFound } from "next/navigation";

const baseUrl = "https://govscout-moltcorporation.vercel.app";

export const revalidate = 86400;

async function resolveNaics(code: string): Promise<NaicsSummary | null> {
  const all = await getTopNaicsCodes(50);
  return all.find((n) => n.code === code) ?? null;
}

export async function generateStaticParams() {
  try {
    const codes = await getTopNaicsCodes(50);
    return codes.map((n) => ({ code: n.code }));
  } catch {
    return [];
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ code: string }>;
}): Promise<Metadata> {
  const { code } = await params;
  const naics = await resolveNaics(code);
  if (!naics) return { title: "NAICS Code Not Found | GovScout" };

  const title = `NAICS ${naics.code}: ${naics.name} — ${formatDollars(naics.amount)} in Government Contracts | GovScout`;
  const description = `Federal contracts for NAICS ${naics.code} (${naics.name}). ${formatDollars(naics.amount)} in current fiscal year spending. See top agencies, contractors, and recent awards.`;

  return {
    title,
    description,
    openGraph: { title, description, type: "website", siteName: "GovScout" },
    twitter: { card: "summary_large_image", title, description },
    alternates: { canonical: `${baseUrl}/naics/${code}` },
  };
}

export default async function NaicsPage({
  params,
}: {
  params: Promise<{ code: string }>;
}) {
  const { code } = await params;
  const naics = await resolveNaics(code);
  if (!naics) notFound();

  const [contracts, agencies, contractors] = await Promise.all([
    getNaicsContracts(code, 10).catch(() => []),
    getNaicsTopAgencies(code, 10).catch(() => []),
    getNaicsTopContractors(code, 10).catch(() => []),
  ]);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: `NAICS ${naics.code}: ${naics.name} Government Contracts`,
    description: `Federal contracts classified under NAICS ${naics.code} (${naics.name}). ${formatDollars(naics.amount)} in current fiscal year.`,
    url: `${baseUrl}/naics/${code}`,
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: baseUrl },
        { "@type": "ListItem", position: 2, name: "NAICS Codes", item: `${baseUrl}/naics` },
        { "@type": "ListItem", position: 3, name: `${naics.code}: ${naics.name}`, item: `${baseUrl}/naics/${code}` },
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
          {/* Breadcrumb */}
          <nav className="text-sm text-slate-500">
            <Link href="/" className="hover:text-blue-400">Home</Link>
            <span className="mx-2">›</span>
            <Link href="/naics" className="hover:text-blue-400">NAICS Codes</Link>
            <span className="mx-2">›</span>
            <span className="text-slate-300">{naics.code}</span>
          </nav>

          {/* Hero */}
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <span className="rounded-md bg-blue-950/50 px-3 py-1 font-mono text-sm font-semibold text-blue-400">
                {naics.code}
              </span>
            </div>
            <h1 className="text-3xl font-extrabold tracking-tight text-white">
              {naics.name}
            </h1>
            <p className="text-sm text-slate-400">
              Federal contracts classified under NAICS code {naics.code}. Data from USASpending.gov.
            </p>
            <div className="mt-2 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="flex flex-col gap-1 rounded-xl border border-slate-800 bg-slate-900 p-5">
                <span className="text-xs font-medium text-slate-400">Current FY Contract Spending</span>
                <span className="text-2xl font-bold text-blue-400">{formatFullDollars(naics.amount)}</span>
              </div>
              <div className="flex flex-col gap-1 rounded-xl border border-slate-800 bg-slate-900 p-5">
                <span className="text-xs font-medium text-slate-400">NAICS Code</span>
                <span className="text-2xl font-bold font-mono text-white">{naics.code}</span>
              </div>
            </div>
          </div>

          {/* Top Agencies */}
          {agencies.length > 0 && (
            <section className="flex flex-col gap-4 rounded-xl border border-slate-800 bg-slate-900 p-6">
              <h2 className="text-lg font-bold text-white">Top Awarding Agencies</h2>
              <div className="flex flex-col gap-2">
                {agencies.map((a, i) => {
                  const maxAmt = agencies[0]?.amount || 1;
                  return (
                    <Link
                      key={i}
                      href={`/agencies/${slugify(a.name)}`}
                      className="group flex flex-col gap-1"
                    >
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-slate-300 group-hover:text-blue-400">{a.name}</span>
                        <span className="font-semibold text-white">{formatDollars(a.amount)}</span>
                      </div>
                      <div className="h-1.5 rounded-full bg-slate-800">
                        <div
                          className="h-1.5 rounded-full bg-blue-500"
                          style={{ width: `${(a.amount / maxAmt) * 100}%` }}
                        />
                      </div>
                    </Link>
                  );
                })}
              </div>
            </section>
          )}

          {/* Top Contractors */}
          {contractors.length > 0 && (
            <section className="flex flex-col gap-4 rounded-xl border border-slate-800 bg-slate-900 p-6">
              <h2 className="text-lg font-bold text-white">Top Contractors</h2>
              <div className="flex flex-col gap-2">
                {contractors.map((c, i) => {
                  const maxAmt = contractors[0]?.amount || 1;
                  return (
                    <div key={i} className="flex flex-col gap-1">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-slate-300">{c.name}</span>
                        <span className="font-semibold text-white">{formatDollars(c.amount)}</span>
                      </div>
                      <div className="h-1.5 rounded-full bg-slate-800">
                        <div
                          className="h-1.5 rounded-full bg-blue-500"
                          style={{ width: `${(c.amount / maxAmt) * 100}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
          )}

          {/* Recent Awards */}
          {contracts.length > 0 && (
            <section className="flex flex-col gap-4 rounded-xl border border-slate-800 bg-slate-900 p-6">
              <h2 className="text-lg font-bold text-white">Recent Large Awards</h2>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-slate-800 text-left text-xs text-slate-500">
                      <th className="pb-2 pr-4">Recipient</th>
                      <th className="pb-2 pr-4">Agency</th>
                      <th className="pb-2 pr-4 text-right">Amount</th>
                      <th className="pb-2 text-right">Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {contracts.map((c, i) => (
                      <tr key={i} className="border-b border-slate-800/50">
                        <td className="py-2.5 pr-4 text-slate-300">{c.recipientName}</td>
                        <td className="py-2.5 pr-4 text-slate-500">{c.awardingAgency}</td>
                        <td className="py-2.5 pr-4 text-right font-semibold text-white">
                          {formatDollars(c.amount)}
                        </td>
                        <td className="py-2.5 text-right text-slate-500">{c.startDate}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          )}

          {/* CTA */}
          <div className="rounded-xl border border-blue-900/50 bg-gradient-to-b from-slate-900 to-slate-950 p-6 text-center">
            <h2 className="mb-2 text-lg font-bold text-white">Track {naics.name} Contracts</h2>
            <p className="mb-5 text-sm text-slate-400">
              Search by agency, set-aside type, dollar range, and more. Save searches and get email alerts when new NAICS {naics.code} contracts are awarded.
            </p>
            <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
              <Link
                href={`/?naics=${encodeURIComponent(naics.code)}`}
                className="inline-flex rounded-lg bg-blue-600 px-6 py-2.5 text-sm font-semibold text-white shadow-lg shadow-blue-600/25 transition-all hover:bg-blue-700"
              >
                Search NAICS {naics.code} Contracts Free
              </Link>
              <Link
                href="/register"
                className="inline-flex rounded-lg border border-slate-700 px-6 py-2.5 text-sm font-medium text-slate-300 transition-colors hover:border-blue-500 hover:text-white"
              >
                Sign Up Free
              </Link>
            </div>
            <p className="mt-4 text-xs text-slate-500">
              Free: 10 searches/day · <Link href="/pricing" className="text-blue-400 hover:text-blue-300">Pro $49/mo</Link>: unlimited searches, CSV export, saved searches with alerts
            </p>
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
