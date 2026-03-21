import { Suspense } from "react";
import Link from "next/link";
import HomeContent from "./HomeContent";

function HeroFallback() {
  return (
    <>
      <header className="flex items-center justify-between border-b border-slate-800 px-6 py-4">
        <div className="flex items-center gap-2">
          <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6 text-blue-400" aria-hidden="true">
            <path d="M3 21V7l9-4 9 4v14" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
            <path d="M9 21V13h6v8" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
            <circle cx="12" cy="9.5" r="1.5" fill="currentColor" />
          </svg>
          <span className="text-lg font-bold tracking-tight text-white">
            GovScout
          </span>
        </div>
        <div className="flex items-center gap-4">
          <Link href="/trends" className="text-sm font-medium text-slate-400 transition-colors hover:text-blue-400">Trends</Link>
          <Link href="/guides" className="text-sm font-medium text-slate-400 transition-colors hover:text-blue-400">Guides</Link>
          <Link href="/pricing" className="text-sm font-medium text-slate-400 transition-colors hover:text-blue-400">Pricing</Link>
          <Link href="/login" className="text-sm font-medium text-slate-400 transition-colors hover:text-blue-400">Log in</Link>
          <Link
            href="/register"
            className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700"
          >
            Sign Up Free
          </Link>
        </div>
      </header>
      <section className="relative overflow-hidden border-b border-slate-800 bg-gradient-to-b from-slate-900 to-slate-950 px-4 py-16 sm:py-20">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/20 via-transparent to-transparent" />
      <div className="relative mx-auto flex max-w-3xl flex-col items-center gap-6 text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-blue-800/50 bg-blue-950/50 px-4 py-1.5 text-xs font-medium text-blue-300">
          <span className="h-1.5 w-1.5 rounded-full bg-blue-400 animate-pulse" />
          Powered by USASpending.gov — updated daily
        </div>
        <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
          Win More Government Contracts
          <span className="block text-blue-400">Know Who&apos;s Winning Before You Bid</span>
        </h1>
        <p className="mx-auto max-w-2xl text-lg text-slate-400">
          Stop guessing which contracts to chase. See exactly who&apos;s winning, how much agencies spend,
          and where your competitors keep showing up — for <span className="font-semibold text-white">$49/mo</span> instead of $15K+/yr for GovWin.
        </p>
        <div className="flex flex-col items-center gap-4 pt-4">
          <a
            href="/register"
            className="rounded-xl bg-blue-600 px-12 py-4 text-lg font-bold text-white shadow-xl shadow-blue-600/30 transition-all hover:bg-blue-500 hover:shadow-blue-500/40 hover:scale-[1.02]"
          >
            Start Finding Contracts — Free
          </a>
          <Link
            href="/pricing"
            className="rounded-xl border border-blue-500 bg-blue-950/50 px-10 py-3.5 text-base font-semibold text-blue-300 transition-all hover:bg-blue-900/50 hover:text-white"
          >
            Go Pro — Unlimited Intel for $49/mo
          </Link>
          <div className="flex flex-wrap items-center justify-center gap-3 text-xs text-slate-500">
            <span>Free to search</span>
            <span className="text-slate-700">·</span>
            <span>No credit card required</span>
            <span className="text-slate-700">·</span>
            <span>Pro from <span className="font-semibold text-blue-400">$49/mo</span> for alerts + export</span>
          </div>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-6 pt-2">
          <div className="flex flex-col items-center">
            <span className="text-2xl font-bold text-white">150K+</span>
            <span className="text-xs text-slate-500">contract awards tracked</span>
          </div>
          <div className="h-8 w-px bg-slate-700" />
          <div className="flex flex-col items-center">
            <span className="text-2xl font-bold text-white">100+</span>
            <span className="text-xs text-slate-500">federal agencies covered</span>
          </div>
          <div className="h-8 w-px bg-slate-700" />
          <div className="flex flex-col items-center">
            <span className="text-2xl font-bold text-white">5+</span>
            <span className="text-xs text-slate-500">years of award history</span>
          </div>
          <div className="h-8 w-px bg-slate-700" />
          <div className="flex flex-col items-center">
            <span className="text-2xl font-bold text-white">Daily</span>
            <span className="text-xs text-slate-500">data updates from USASpending</span>
          </div>
        </div>
      </div>
    </section>
    <section className="w-full border-b border-slate-800 bg-slate-950 px-4 py-14">
      <div className="mx-auto max-w-3xl">
        <div className="mb-2 text-center">
          <p className="text-xs font-semibold uppercase tracking-wider text-blue-400">Live contract data</p>
        </div>
        <h2 className="mb-2 text-center text-2xl font-bold text-white sm:text-3xl">
          See what contractors are winning right now
        </h2>
        <p className="mb-8 text-center text-sm text-slate-400">
          Real awards from USASpending.gov — this is what your search results look like.
        </p>
        <div className="flex flex-col gap-3">
          {[
            { recipient: "Booz Allen Hamilton Inc.", agency: "Department of Defense", subAgency: "U.S. Army", amount: "$4.2M", description: "Cybersecurity assessment and vulnerability management services for Army networks and information systems.", awardId: "W911QX-25-C-0042", awardType: "Definitive Contract", naics: "541512", startDate: "2025-10-01", setAside: "" },
            { recipient: "KGS Group Inc.", agency: "General Services Administration", subAgency: "Public Buildings Service", amount: "$890K", description: "HVAC system modernization and energy efficiency upgrades for federal courthouse facilities.", awardId: "GS-07P-25-DRC-0118", awardType: "Task Order", naics: "236220", startDate: "2025-11-15", setAside: "Small Business (SBA)" },
            { recipient: "Leidos Inc.", agency: "Department of Veterans Affairs", subAgency: "Office of Information and Technology", amount: "$12.7M", description: "Electronic health record integration and data migration support services for VA medical centers.", awardId: "36C10X25C0087", awardType: "Definitive Contract", naics: "541511", startDate: "2026-01-10", setAside: "" },
            { recipient: "Navarro Research and Engineering", agency: "Department of Energy", subAgency: "National Nuclear Security Administration", amount: "$2.4M", description: "Environmental remediation and waste management support at former nuclear production facilities.", awardId: "DE-EM0005491", awardType: "Task Order", naics: "562910", startDate: "2025-09-22", setAside: "8(a)" },
            { recipient: "SAIC Inc.", agency: "Department of Homeland Security", subAgency: "Customs and Border Protection", amount: "$6.1M", description: "AI-powered surveillance and sensor integration for border security technology modernization program.", awardId: "70B01C25C00000034", awardType: "Definitive Contract", naics: "541690", startDate: "2026-02-01", setAside: "" },
          ].map((c) => (
            <div key={c.awardId} className="flex flex-col gap-2 rounded-xl border border-slate-800 bg-slate-900 p-5">
              <div className="flex items-start justify-between gap-4">
                <div className="flex flex-col gap-1">
                  <p className="text-sm font-semibold text-white">{c.recipient}</p>
                  <p className="text-xs text-slate-400">{c.agency}{c.subAgency ? ` — ${c.subAgency}` : ""}</p>
                </div>
                <span className="shrink-0 rounded-lg bg-blue-950/50 px-3 py-1 text-sm font-bold text-blue-400">{c.amount}</span>
              </div>
              <p className="text-xs leading-relaxed text-slate-400">{c.description}</p>
              <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500">
                <span>Award: {c.awardId}</span>
                <span>Type: {c.awardType}</span>
                <span>NAICS: {c.naics}</span>
                <span>Start: {c.startDate}</span>
                {c.setAside && (
                  <span className="rounded bg-green-950/50 px-1.5 py-0.5 text-green-400">{c.setAside}</span>
                )}
              </div>
            </div>
          ))}
        </div>
        <div className="mt-8 flex flex-col items-center gap-3">
          <Link href="/register" className="rounded-xl bg-blue-600 px-12 py-4 text-lg font-bold text-white shadow-xl shadow-blue-600/30 transition-all hover:bg-blue-500 hover:shadow-blue-500/40 hover:scale-[1.02]">
            Search for Free — No Credit Card
          </Link>
          <p className="text-xs text-slate-500">10 free searches per day · Pro from $49/mo for unlimited</p>
        </div>
      </div>
    </section>
    </>
  );
}

export default function Home() {
  return (
    <Suspense fallback={<HeroFallback />}>
      <HomeContent />
    </Suspense>
  );
}
