"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function PaymentSuccessPage() {
  const router = useRouter();
  const [countdown, setCountdown] = useState(10);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          router.push("/");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [router]);

  return (
    <div className="flex min-h-screen flex-col bg-slate-950">
      {/* Header */}
      <header className="border-b border-slate-800 px-6 py-4">
        <Link href="/" className="flex items-center gap-2">
          <svg
            className="h-6 w-6 text-blue-400"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
            />
          </svg>
          <span className="text-lg font-semibold text-white">GovScout</span>
        </Link>
      </header>

      {/* Main content */}
      <main className="flex flex-1 items-center justify-center px-4 py-16">
        <div className="w-full max-w-lg rounded-xl border border-slate-800 bg-slate-900 p-8 text-center">
          {/* Success checkmark */}
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-400/10">
            <svg
              className="h-8 w-8 text-emerald-400"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2.5}
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4.5 12.75l6 6 9-13.5"
              />
            </svg>
          </div>

          <h1 className="mb-2 text-2xl font-bold text-white">
            Welcome to GovScout Pro!
          </h1>
          <p className="mb-8 text-slate-400">
            Your payment was successful. You now have full access to all Pro
            features.
          </p>

          {/* Unlocked features */}
          <div className="mb-8 space-y-3 text-left">
            <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-slate-400">
              Now Unlocked
            </h2>
            {[
              { label: "CSV Export", desc: "Download search results as CSV" },
              {
                label: "Saved Searches",
                desc: "Save and revisit your searches",
              },
              {
                label: "Spending Trends",
                desc: "Analyze government spending patterns",
              },
              {
                label: "Unlimited Daily Searches",
                desc: "No more daily search limits",
              },
            ].map((feature) => (
              <div
                key={feature.label}
                className="flex items-start gap-3 rounded-lg border border-slate-800 bg-slate-950 px-4 py-3"
              >
                <svg
                  className="mt-0.5 h-5 w-5 shrink-0 text-emerald-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <div>
                  <p className="text-sm font-medium text-white">
                    {feature.label}
                  </p>
                  <p className="text-sm text-slate-400">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* CTAs */}
          <div className="space-y-3">
            <Link
              href="/"
              className="block w-full rounded-lg bg-blue-600 px-6 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-700"
            >
              Start Searching
            </Link>
            <div className="flex gap-3">
              <Link
                href="/saved-searches"
                className="flex-1 rounded-lg border border-slate-700 px-4 py-2.5 text-center text-sm font-medium text-slate-300 hover:border-slate-600 hover:text-white"
              >
                Saved Searches
              </Link>
              <Link
                href="/trends"
                className="flex-1 rounded-lg border border-slate-700 px-4 py-2.5 text-center text-sm font-medium text-slate-300 hover:border-slate-600 hover:text-white"
              >
                Trends
              </Link>
            </div>
          </div>

          {/* Auto-redirect countdown */}
          <p className="mt-6 text-xs text-slate-500">
            Redirecting to search in {countdown} second
            {countdown !== 1 ? "s" : ""}...
          </p>
        </div>
      </main>
    </div>
  );
}
