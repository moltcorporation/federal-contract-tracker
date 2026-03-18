"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";

interface AwardLocation {
  addressLine1?: string;
  city?: string;
  state?: string;
  zip?: string;
  country?: string;
  congressionalDistrict?: string;
}

interface AwardDetail {
  id: number;
  generatedUniqueAwardId: string;
  category: string;
  type: string;
  typeDescription: string;
  description: string;
  piid: string;
  totalObligation: number;
  baseAndAllOptionsValue: number;
  baseExercisedOptionsVal: number;
  periodOfPerformance: {
    startDate: string;
    endDate: string;
    lastModifiedDate: string;
    potentialEndDate: string;
  } | null;
  recipient: {
    name: string;
    uei: string;
    parentName: string;
    parentUei: string;
    businessCategories: string[];
    location: AwardLocation | null;
  } | null;
  placeOfPerformance: AwardLocation | null;
  agency: {
    name: string;
    subAgency: string;
    officeName: string;
  } | null;
  fundingAgency: {
    name: string;
    subAgency: string;
  } | null;
  naics: string;
  naicsDescription: string;
  psc: string;
  pscDescription: string;
  contractType: string;
  contractTypeDescription: string;
  setAsideType: string;
  setAsideDescription: string;
  extentCompeted: string;
  parentAward: {
    id: number;
    piid: string;
    awardId: string;
  } | null;
  subawardCount: number;
  totalSubawardAmount: number;
}

function formatDollars(amount: number | null | undefined): string {
  if (amount == null) return "—";
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(amount);
}

function formatDate(dateStr: string | null | undefined): string {
  if (!dateStr) return "—";
  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

function formatLocation(loc: AwardLocation | null | undefined): string {
  if (!loc) return "—";
  const parts = [loc.city, loc.state, loc.zip].filter(Boolean);
  if (parts.length === 0) return loc.country || "—";
  return parts.join(", ") + (loc.country && loc.country !== "UNITED STATES" ? `, ${loc.country}` : "");
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="flex flex-col gap-4 rounded-xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
      <h2 className="text-lg font-bold text-slate-900 dark:text-white">{title}</h2>
      {children}
    </section>
  );
}

function Row({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-0.5 sm:flex-row sm:gap-4">
      <dt className="w-48 shrink-0 text-sm font-medium text-slate-500 dark:text-slate-400">
        {label}
      </dt>
      <dd className="text-sm text-slate-900 dark:text-white">{value || "—"}</dd>
    </div>
  );
}

export default function AwardDetailPage() {
  const params = useParams();
  const id = params.id as string;
  const [award, setAward] = useState<AwardDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!id) return;

    async function fetchAward() {
      try {
        const res = await fetch(`/api/award/${encodeURIComponent(id)}`);
        if (!res.ok) {
          const data = await res.json().catch(() => null);
          throw new Error(data?.error ?? `Failed to load award (${res.status})`);
        }
        const data = await res.json();
        setAward(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load award");
      } finally {
        setLoading(false);
      }
    }

    fetchAward();
  }, [id]);

  return (
    <div className="flex min-h-screen flex-col bg-slate-50 font-sans dark:bg-slate-950">
      <header className="flex items-center justify-between border-b border-slate-200 px-6 py-4 dark:border-slate-800">
        <div className="flex items-center gap-2">
          <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6 text-blue-600 dark:text-blue-400" aria-hidden="true">
            <path d="M3 21V7l9-4 9 4v14" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
            <path d="M9 21V13h6v8" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
            <circle cx="12" cy="9.5" r="1.5" fill="currentColor" />
          </svg>
          <Link href="/" className="text-lg font-bold tracking-tight text-slate-900 hover:text-blue-600 dark:text-white dark:hover:text-blue-400">
            Federal Contract Tracker
          </Link>
        </div>
        <div className="flex items-center gap-4">
          <Link href="/trends" className="text-sm font-medium text-slate-600 transition-colors hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400">
            Trends
          </Link>
          <Link href="/pricing" className="text-sm font-medium text-blue-600 transition-colors hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300">
            Pricing
          </Link>
        </div>
      </header>

      <main className="flex flex-1 flex-col items-center px-4 pb-16 pt-8">
        <div className="flex w-full max-w-3xl flex-col gap-6">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-sm text-slate-500 transition-colors hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            Back to search
          </Link>

          {loading && (
            <div className="flex items-center justify-center gap-3 py-16">
              <div className="h-5 w-5 animate-spin rounded-full border-2 border-blue-200 border-t-blue-600 dark:border-blue-800 dark:border-t-blue-400" />
              <p className="text-sm text-slate-500 dark:text-slate-400">Loading award details...</p>
            </div>
          )}

          {error && (
            <div className="rounded-xl border border-red-200 bg-red-50 p-6 text-center dark:border-red-800 dark:bg-red-900/20">
              <p className="text-sm text-red-700 dark:text-red-400">{error}</p>
              <Link href="/" className="mt-3 inline-block text-sm font-medium text-blue-600 hover:underline dark:text-blue-400">
                Return to search
              </Link>
            </div>
          )}

          {award && (
            <>
              {/* Hero */}
              <div className="flex flex-col gap-3">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded-md bg-blue-100 px-2 py-0.5 text-xs font-medium text-blue-700 dark:bg-blue-950/50 dark:text-blue-400">
                    {award.typeDescription || award.type}
                  </span>
                  {award.setAsideDescription && (
                    <span className="rounded-md bg-amber-100 px-2 py-0.5 text-xs font-medium text-amber-700 dark:bg-amber-950/50 dark:text-amber-400">
                      {award.setAsideDescription}
                    </span>
                  )}
                </div>
                <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                  {award.recipient?.name || "Undisclosed Recipient"}
                </h1>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Award {award.piid || award.generatedUniqueAwardId}
                  {award.agency ? ` · ${award.agency.name}` : ""}
                </p>
              </div>

              {/* Financial summary */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <div className="flex flex-col gap-1 rounded-xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
                  <span className="text-xs font-medium text-slate-500 dark:text-slate-400">Total Obligation</span>
                  <span className="text-xl font-bold text-slate-900 dark:text-white">
                    {formatDollars(award.totalObligation)}
                  </span>
                </div>
                <div className="flex flex-col gap-1 rounded-xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
                  <span className="text-xs font-medium text-slate-500 dark:text-slate-400">Base + Options Value</span>
                  <span className="text-xl font-bold text-slate-900 dark:text-white">
                    {formatDollars(award.baseAndAllOptionsValue)}
                  </span>
                </div>
                <div className="flex flex-col gap-1 rounded-xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
                  <span className="text-xs font-medium text-slate-500 dark:text-slate-400">Subawards</span>
                  <span className="text-xl font-bold text-slate-900 dark:text-white">
                    {award.subawardCount > 0 ? `${award.subawardCount} (${formatDollars(award.totalSubawardAmount)})` : "None"}
                  </span>
                </div>
              </div>

              {/* Description */}
              {award.description && (
                <Section title="Description">
                  <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                    {award.description}
                  </p>
                </Section>
              )}

              {/* Period of Performance */}
              <Section title="Period of Performance">
                <dl className="flex flex-col gap-3">
                  <Row label="Start Date" value={formatDate(award.periodOfPerformance?.startDate)} />
                  <Row label="End Date" value={formatDate(award.periodOfPerformance?.endDate)} />
                  <Row label="Potential End Date" value={formatDate(award.periodOfPerformance?.potentialEndDate)} />
                  <Row label="Last Modified" value={formatDate(award.periodOfPerformance?.lastModifiedDate)} />
                </dl>
              </Section>

              {/* Recipient */}
              <Section title="Recipient">
                <dl className="flex flex-col gap-3">
                  <Row label="Name" value={award.recipient?.name} />
                  <Row label="UEI" value={award.recipient?.uei} />
                  {award.recipient?.parentName && (
                    <Row label="Parent Company" value={award.recipient.parentName} />
                  )}
                  <Row label="Location" value={formatLocation(award.recipient?.location)} />
                  {award.recipient?.location?.congressionalDistrict && (
                    <Row label="Congressional District" value={`${award.recipient.location.state}-${award.recipient.location.congressionalDistrict}`} />
                  )}
                  {award.recipient?.businessCategories && award.recipient.businessCategories.length > 0 && (
                    <Row
                      label="Business Categories"
                      value={
                        <div className="flex flex-wrap gap-1.5">
                          {award.recipient.businessCategories.map((cat) => (
                            <span key={cat} className="rounded-md bg-slate-100 px-2 py-0.5 text-xs text-slate-600 dark:bg-slate-800 dark:text-slate-400">
                              {cat.replace(/_/g, " ")}
                            </span>
                          ))}
                        </div>
                      }
                    />
                  )}
                </dl>
              </Section>

              {/* Awarding & Funding Agency */}
              <Section title="Agencies">
                <dl className="flex flex-col gap-3">
                  <Row label="Awarding Agency" value={award.agency?.name} />
                  {award.agency?.subAgency && award.agency.subAgency !== award.agency.name && (
                    <Row label="Sub-Agency" value={award.agency.subAgency} />
                  )}
                  {award.agency?.officeName && (
                    <Row label="Office" value={award.agency.officeName} />
                  )}
                  {award.fundingAgency && award.fundingAgency.name !== award.agency?.name && (
                    <>
                      <Row label="Funding Agency" value={award.fundingAgency.name} />
                      {award.fundingAgency.subAgency && (
                        <Row label="Funding Sub-Agency" value={award.fundingAgency.subAgency} />
                      )}
                    </>
                  )}
                </dl>
              </Section>

              {/* Contract Details */}
              <Section title="Contract Details">
                <dl className="flex flex-col gap-3">
                  {award.naics && (
                    <Row label="NAICS" value={`${award.naics}${award.naicsDescription ? ` — ${award.naicsDescription}` : ""}`} />
                  )}
                  {award.psc && (
                    <Row label="PSC" value={`${award.psc}${award.pscDescription ? ` — ${award.pscDescription}` : ""}`} />
                  )}
                  {award.contractTypeDescription && (
                    <Row label="Pricing Type" value={award.contractTypeDescription} />
                  )}
                  {award.extentCompeted && (
                    <Row label="Competition" value={award.extentCompeted} />
                  )}
                  {award.setAsideDescription && (
                    <Row label="Set-Aside" value={award.setAsideDescription} />
                  )}
                  {award.parentAward && (
                    <Row
                      label="Parent Award"
                      value={
                        <Link
                          href={`/award/${award.parentAward.awardId}`}
                          className="text-blue-600 hover:underline dark:text-blue-400"
                        >
                          {award.parentAward.piid || award.parentAward.awardId}
                        </Link>
                      }
                    />
                  )}
                </dl>
              </Section>

              {/* Place of Performance */}
              {award.placeOfPerformance && (
                <Section title="Place of Performance">
                  <dl className="flex flex-col gap-3">
                    <Row label="Location" value={formatLocation(award.placeOfPerformance)} />
                    {award.placeOfPerformance.congressionalDistrict && (
                      <Row
                        label="Congressional District"
                        value={`${award.placeOfPerformance.state}-${award.placeOfPerformance.congressionalDistrict}`}
                      />
                    )}
                  </dl>
                </Section>
              )}

              {/* USASpending link */}
              <div className="text-center">
                <a
                  href={`https://www.usaspending.gov/award/${award.generatedUniqueAwardId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm text-blue-600 transition-colors hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                >
                  View on USASpending.gov
                  <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </div>
            </>
          )}
        </div>
      </main>

      <footer className="flex flex-col items-center gap-3 border-t border-slate-200 px-6 py-6 dark:border-slate-800">
        <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-slate-400 dark:text-slate-500">
          <span className="font-medium">Moltcorp Products:</span>
          <span className="font-semibold text-blue-600 dark:text-blue-400">Federal Contract Tracker</span>
          <a href="https://statusping-moltcorporation.vercel.app" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-blue-600 dark:hover:text-blue-400">StatusPing</a>
        </div>
        <p className="text-xs text-slate-400 dark:text-slate-600">
          Data from{" "}
          <a href="https://usaspending.gov" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-blue-600 dark:hover:text-blue-400">USASpending.gov</a>
          {" "}· Built by agents at{" "}
          <a href="https://moltcorporation.com" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-blue-600 dark:hover:text-blue-400">Moltcorp</a>
        </p>
      </footer>
    </div>
  );
}
