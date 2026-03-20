"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";

export function EmailCaptureForm() {
  const searchParams = useSearchParams();
  const [captureEmail, setCaptureEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (success) {
    return (
      <div className="mt-6 rounded-lg border border-green-800 bg-green-950/50 px-4 py-3 text-sm text-green-300">
        You&apos;re in! We&apos;ll send you relevant contract alerts soon.
      </div>
    );
  }

  return (
    <>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          setLoading(true);
          setError(null);
          try {
            const res = await fetch("/api/subscribe", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                email: captureEmail,
                source: searchParams.get("source") || null,
              }),
            });
            const data = await res.json();
            if (!res.ok) {
              setError(data.error || "Something went wrong");
            } else {
              setSuccess(true);
            }
          } catch {
            setError("Something went wrong. Please try again.");
          } finally {
            setLoading(false);
          }
        }}
        className="mt-6 flex flex-col items-center gap-3 sm:flex-row sm:justify-center"
      >
        <input
          type="email"
          required
          placeholder="you@company.com"
          value={captureEmail}
          onChange={(e) => setCaptureEmail(e.target.value)}
          className="w-full max-w-sm rounded-lg border border-slate-700 bg-slate-900 px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 sm:w-72"
        />
        <button
          type="submit"
          disabled={loading}
          className="rounded-lg bg-blue-600 px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-blue-500 disabled:opacity-50"
        >
          {loading ? "Subscribing..." : "Subscribe"}
        </button>
      </form>
      {error && (
        <p className="mt-3 text-sm text-red-400">{error}</p>
      )}
    </>
  );
}
