"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ConversionEvent } from "../../components/conversion-event";

export default function PaymentSuccessPage() {
  const [countdown, setCountdown] = useState(10);
  const [activationStatus, setActivationStatus] = useState<
    "activating" | "activated" | "manual"
  >("activating");
  const [manualEmail, setManualEmail] = useState("");
  const [manualError, setManualError] = useState("");

  // Auto-activate Pro access using the logged-in user's session
  useEffect(() => {
    let cancelled = false;
    async function activatePro() {
      try {
        // Get email from session
        const meRes = await fetch("/api/auth/me");
        if (!meRes.ok) {
          if (!cancelled) setActivationStatus("manual");
          return;
        }
        const meData = await meRes.json();
        const email = meData.user?.email;
        if (!email) {
          if (!cancelled) setActivationStatus("manual");
          return;
        }
        // Activate Pro cookie via restore-pro endpoint
        const restoreRes = await fetch("/api/restore-pro", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        });
        if (!cancelled) {
          setActivationStatus(restoreRes.ok ? "activated" : "manual");
        }
      } catch {
        if (!cancelled) setActivationStatus("manual");
      }
    }
    activatePro();
    return () => { cancelled = true; };
  }, []);

  // Countdown redirect only after activation completes
  useEffect(() => {
    if (activationStatus !== "activated") return;
    if (countdown <= 0) {
      window.location.href = "/";
      return;
    }
    const timer = setTimeout(() => setCountdown((c) => c - 1), 1000);
    return () => clearTimeout(timer);
  }, [countdown, activationStatus]);

  async function handleManualActivation(e: React.FormEvent) {
    e.preventDefault();
    setManualError("");
    const email = manualEmail.trim().toLowerCase();
    if (!email || !email.includes("@")) {
      setManualError("Please enter a valid email address.");
      return;
    }
    try {
      const res = await fetch("/api/restore-pro", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (res.ok) {
        setActivationStatus("activated");
      } else {
        const data = await res.json().catch(() => ({}));
        setManualError(
          data.error ||
            "Could not activate Pro. Payment may still be processing — try again in a minute."
        );
      }
    } catch {
      setManualError("Network error. Please try again.");
    }
  }

  return (
    <div className="flex min-h-screen flex-col bg-zinc-950 font-sans text-white">
      <ConversionEvent event="purchase" />

      <header className="border-b border-zinc-800">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
          <Link href="/" className="text-xl font-bold tracking-tight">
            <span className="text-blue-400">Gov</span>Scout
          </Link>
        </div>
      </header>

      <main className="flex flex-1 items-center justify-center px-6 py-20">
        <div className="w-full max-w-md rounded-xl border border-zinc-800 bg-zinc-900 p-6 text-center">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-blue-500/10">
            <svg className="h-8 w-8 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>

          <h1 className="mb-2 text-2xl font-bold">Welcome to Pro!</h1>
          <p className="mb-8 text-sm text-zinc-400">
            Your payment was successful. Your account has been upgraded to GovScout Pro.
          </p>

          {activationStatus === "activating" && (
            <p className="mb-4 text-sm text-blue-400">Activating your Pro access...</p>
          )}

          {activationStatus === "manual" && (
            <form onSubmit={handleManualActivation} className="mb-6">
              <p className="mb-3 text-sm text-zinc-400">
                Enter the email you used for payment to activate Pro:
              </p>
              <input
                type="email"
                value={manualEmail}
                onChange={(e) => setManualEmail(e.target.value)}
                placeholder="you@example.com"
                className="mb-2 w-full rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-2 text-sm text-white placeholder-zinc-500 focus:border-blue-500 focus:outline-none"
              />
              {manualError && (
                <p className="mb-2 text-xs text-red-400">{manualError}</p>
              )}
              <button
                type="submit"
                className="w-full rounded-lg bg-blue-600 py-2 text-sm font-medium text-white hover:bg-blue-700"
              >
                Activate Pro
              </button>
            </form>
          )}

          <div className="mb-8 rounded-lg border border-zinc-800 bg-zinc-950 p-4 text-left">
            <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-zinc-500">Now unlocked</p>
            <ul className="space-y-2.5">
              {["Unlimited searches", "Spending trends", "CSV export", "Saved searches & email alerts"].map((feature) => (
                <li key={feature} className="flex items-center gap-2 text-sm text-zinc-300">
                  <svg className="h-4 w-4 shrink-0 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  {feature}
                </li>
              ))}
            </ul>
          </div>

          <Link href="/" className="block w-full rounded-lg bg-blue-600 py-3 text-center text-sm font-medium text-white hover:bg-blue-700">
            Start Searching
          </Link>
          {activationStatus === "activated" && (
            <p className="mt-4 text-xs text-zinc-500">Redirecting in {countdown}s</p>
          )}
        </div>
      </main>
    </div>
  );
}
