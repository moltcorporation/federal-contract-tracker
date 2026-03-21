"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { track } from "@vercel/analytics";

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    // Read UTM data from cookie (set by UtmTracker component)
    const utmCookie = document.cookie
      .split("; ")
      .find((c) => c.startsWith("utm="));
    const utmData: Record<string, string> = utmCookie
      ? JSON.parse(decodeURIComponent(utmCookie.split("=").slice(1).join("=")))
      : {};

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email, password, name,
          ...(utmData.utm_source && { utm_source: utmData.utm_source }),
          ...(utmData.utm_medium && { utm_medium: utmData.utm_medium }),
          ...(utmData.utm_campaign && { utm_campaign: utmData.utm_campaign }),
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Registration failed");
        return;
      }

      track("signup_completed");

      // Record server-side conversion event
      fetch("/api/conversions/track", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          event_type: "signup_completed",
          user_id: data.id,
          ...utmData,
        }),
      }).catch(() => {});

      router.push("/onboarding");
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  const inputClass =
    "mt-1 w-full rounded-lg border border-slate-700 bg-slate-800 px-3 py-2.5 text-sm text-white placeholder-slate-500 outline-none transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-900/50";

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-950 px-4">
      <div className="w-full max-w-sm">
        <Link
          href="/"
          className="mb-8 block text-center text-xl font-bold tracking-tight text-white"
        >
          Gov<span className="text-blue-400">Scout</span>
        </Link>

        <h1 className="text-center text-2xl font-bold text-white">
          Create your account
        </h1>
        <p className="mt-2 text-center text-sm text-slate-400">
          Start searching federal contracts for free
        </p>
        <p className="mt-1 text-center text-xs text-slate-500">
          After signup you&apos;ll immediately search 150K+ contract awards by agency, NAICS code, and set-aside type
        </p>

        <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-4">
          {error && (
            <div className="rounded-lg bg-red-950/50 border border-red-800/50 px-4 py-3 text-sm text-red-300">
              {error}
            </div>
          )}

          <div>
            <label
              htmlFor="name"
              className="block text-xs font-medium text-slate-300"
            >
              Name (optional)
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={inputClass}
              placeholder="Your name"
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-xs font-medium text-slate-300"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={inputClass}
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-xs font-medium text-slate-300"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              required
              minLength={6}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={inputClass}
              placeholder="At least 6 characters"
            />
            <p className="mt-1 text-xs text-slate-500">Minimum 6 characters</p>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? "Creating account..." : "Create free account"}
          </button>

          <p className="text-center text-xs text-slate-500">
            No credit card required. 10 free searches per day.
          </p>
        </form>

        <p className="mt-6 text-center text-sm text-slate-500">
          Already have an account?{" "}
          <Link
            href="/login"
            className="font-medium text-blue-400 hover:text-blue-300"
          >
            Sign in
          </Link>
        </p>

        {/* Dashboard preview */}
        <div className="mt-8 rounded-xl border border-slate-800 bg-slate-900 p-4">
          <p className="mb-3 text-center text-xs font-medium text-slate-400">
            After signup you&apos;ll immediately access:
          </p>
          <div className="space-y-2">
            <div className="rounded-lg bg-slate-800/50 p-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <svg className="h-4 w-4 text-blue-400" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" /></svg>
                  <span className="text-xs font-medium text-white">Contract Search</span>
                </div>
                <span className="text-xs text-slate-500">150K+ awards</span>
              </div>
            </div>
            <div className="rounded-lg bg-slate-800/50 p-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <svg className="h-4 w-4 text-blue-400" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" /></svg>
                  <span className="text-xs font-medium text-white">Agency Spending</span>
                </div>
                <span className="text-xs text-slate-500">100+ agencies</span>
              </div>
            </div>
            <div className="rounded-lg bg-slate-800/50 p-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <svg className="h-4 w-4 text-blue-400" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 01-.659 1.591l-5.432 5.432a2.25 2.25 0 00-.659 1.591v2.927a2.25 2.25 0 01-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 00-.659-1.591L3.659 7.409A2.25 2.25 0 013 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0112 3z" /></svg>
                  <span className="text-xs font-medium text-white">Set-Aside Filters</span>
                </div>
                <span className="text-xs text-slate-500">HUBZone, 8(a), WOSB</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
