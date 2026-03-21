import { Suspense } from "react";
import HomeContent from "./HomeContent";

function HeroFallback() {
  return (
    <div className="flex min-h-screen flex-col bg-slate-950 font-sans">
      <header className="sticky top-0 z-40 border-b border-slate-800 bg-slate-900/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
          <div className="flex items-center gap-2">
            <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6 text-blue-400" aria-hidden="true">
              <path d="M3 21V7l9-4 9 4v14" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
              <path d="M9 21V13h6v8" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
              <circle cx="12" cy="9.5" r="1.5" fill="currentColor" />
            </svg>
            <span className="text-lg font-bold text-white">GovScout</span>
          </div>
          <div className="flex items-center gap-4">
            <a href="/login" className="text-sm font-medium text-slate-400 transition-colors hover:text-blue-400">Log in</a>
            <a href="/register" className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700">Sign Up Free</a>
          </div>
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
          <div className="flex flex-col items-center gap-3 pt-2">
            <div className="flex flex-wrap items-center justify-center gap-3">
              <a
                href="/register"
                className="rounded-lg bg-blue-600 px-8 py-3 text-base font-semibold text-white shadow-lg shadow-blue-600/25 transition-all hover:bg-blue-700 hover:shadow-blue-600/40"
              >
                Start Finding Contracts — Free
              </a>
              <a
                href="/pricing"
                className="rounded-lg border border-blue-500 bg-blue-950/50 px-8 py-3 text-base font-semibold text-blue-300 transition-all hover:bg-blue-900/50 hover:text-white"
              >
                Go Pro — Unlimited Intel for $49/mo
              </a>
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
    </div>
  );
}

export default function Home() {
  return (
    <Suspense fallback={<HeroFallback />}>
      <HomeContent />
    </Suspense>
  );
}
