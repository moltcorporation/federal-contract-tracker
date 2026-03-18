"use client";

import { useState } from "react";
import Link from "next/link";

export default function RestoreProPage() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    try {
      const res = await fetch("/api/restore-pro", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (res.ok) {
        setStatus("success");
      } else {
        const data = await res.json();
        setErrorMessage(data.error || "Something went wrong");
        setStatus("error");
      }
    } catch {
      setErrorMessage("Could not connect. Please try again.");
      setStatus("error");
    }
  }

  return (
    <div className="flex min-h-screen flex-col bg-slate-950 font-sans">
      <header className="flex items-center justify-between border-b border-slate-800 px-6 py-4">
        <Link href="/" className="flex items-center gap-2">
          <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6 text-blue-400" aria-hidden="true">
            <path d="M3 21V7l9-4 9 4v14" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
            <path d="M9 21V13h6v8" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
            <circle cx="12" cy="9.5" r="1.5" fill="currentColor" />
          </svg>
          <span className="text-lg font-bold tracking-tight text-white">
            GovScout
          </span>
        </Link>
        <div className="flex items-center gap-4">
          <Link href="/trends" className="text-sm font-medium text-slate-400 transition-colors hover:text-blue-400">Trends</Link>
          <Link href="/pricing" className="text-sm font-medium text-slate-400 transition-colors hover:text-blue-400">Pricing</Link>
          <Link href="/" className="text-sm font-medium text-slate-400 transition-colors hover:text-blue-400">Search</Link>
        </div>
      </header>

      <main className="flex flex-1 flex-col items-center justify-center px-4 py-16">
        <div className="w-full max-w-md">
          {status === "success" ? (
            <div className="flex flex-col items-center gap-4 text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-900/50">
                <svg viewBox="0 0 16 16" className="h-6 w-6 text-emerald-400" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 8.5l3.5 3.5 6.5-7" />
                </svg>
              </div>
              <h1 className="text-2xl font-bold text-white">Pro access restored</h1>
              <p className="text-sm text-slate-400">
                You&apos;re all set. Unlimited searches, spending trends, and CSV export are active.
              </p>
              <Link
                href="/"
                className="mt-4 rounded-lg bg-blue-600 px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-blue-700"
              >
                Start searching
              </Link>
            </div>
          ) : (
            <div className="flex flex-col gap-6">
              <div className="text-center">
                <h1 className="text-2xl font-bold text-white">Restore Pro access</h1>
                <p className="mt-2 text-sm text-slate-400">
                  Enter the email you used when subscribing. We&apos;ll verify your subscription and restore access on this device.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-slate-300">
                    Subscription email
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@company.com"
                    className="mt-1 w-full rounded-lg border border-slate-700 bg-slate-900 px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>

                {status === "error" && (
                  <p className="text-sm text-red-400">{errorMessage}</p>
                )}

                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="w-full rounded-lg bg-blue-600 py-2.5 text-sm font-medium text-white transition-colors hover:bg-blue-700 disabled:opacity-50"
                >
                  {status === "loading" ? "Checking..." : "Restore access"}
                </button>
              </form>

              <p className="text-center text-xs text-slate-500">
                Don&apos;t have a subscription?{" "}
                <Link href="/pricing" className="text-blue-400 hover:text-blue-300">
                  See pricing
                </Link>
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
