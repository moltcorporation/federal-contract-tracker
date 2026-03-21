import { Suspense } from "react";
import Link from "next/link";
import HomeContent from "./HomeContent";

function HeroFallback() {
  return (
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
        <div className="flex flex-col items-center gap-3 pt-2">
          <div className="flex flex-wrap items-center justify-center gap-3">
            <a
              href="/register"
              className="rounded-lg bg-blue-600 px-8 py-3 text-base font-semibold text-white shadow-lg shadow-blue-600/25 transition-all hover:bg-blue-700 hover:shadow-blue-600/40"
            >
              Start Finding Contracts — Free
            </a>
            <Link
              href="/pricing"
              className="rounded-lg border border-blue-500 bg-blue-950/50 px-8 py-3 text-base font-semibold text-blue-300 transition-all hover:bg-blue-900/50 hover:text-white"
            >
              Go Pro — Unlimited Intel for $49/mo
            </Link>
          </div>
          <p className="text-xs text-slate-500">
            Your first 10 searches free today · No credit card required
          </p>
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
  );
}

export default function Home() {
  return (
    <Suspense fallback={<HeroFallback />}>
      <HomeContent />
    </Suspense>
  );
}
