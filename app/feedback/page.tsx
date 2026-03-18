"use client";

import { useState } from "react";
import Link from "next/link";

const CATEGORIES = [
  { value: "general", label: "General" },
  { value: "bug", label: "Bug report" },
  { value: "feature", label: "Feature request" },
];

export default function FeedbackPage() {
  const [email, setEmail] = useState("");
  const [category, setCategory] = useState("general");
  const [intent, setIntent] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!message.trim()) return;

    setStatus("sending");
    try {
      const res = await fetch("/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email || null, category, intent: intent || null, message }),
      });
      if (!res.ok) throw new Error();
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  }

  const inputClass = "w-full rounded-lg border border-slate-700 bg-slate-800 px-3 py-2.5 text-sm text-white placeholder-slate-500 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-900/50";

  return (
    <div className="min-h-screen bg-slate-950 font-sans text-slate-100">
      <header className="border-b border-slate-800">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-6 py-4">
          <Link href="/" className="text-xl font-bold tracking-tight text-white">
            Federal Contract Tracker
          </Link>
          <Link
            href="/"
            className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-500"
          >
            Search Contracts
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-lg px-6 py-16">
        <h1 className="text-2xl font-bold tracking-tight">Send us feedback</h1>
        <p className="mt-2 text-sm text-slate-400">
          Are you a govcon professional? Tell us what you need. We read every submission.
        </p>

        {status === "sent" ? (
          <div className="mt-8 rounded-xl border border-blue-800 bg-blue-950/50 p-8 text-center">
            <p className="text-lg font-semibold text-blue-400">Thanks for your feedback!</p>
            <p className="mt-2 text-sm text-slate-400">We read every submission. It helps us build a better tool for govcon professionals.</p>
            <Link
              href="/"
              className="mt-6 inline-block rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-bold text-white hover:bg-blue-500"
            >
              Back to search
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-5">
            <div>
              <label className="text-xs font-medium text-slate-400">Category</label>
              <div className="mt-2 flex gap-3">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat.value}
                    type="button"
                    onClick={() => setCategory(cat.value)}
                    className={`rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${
                      category === cat.value
                        ? "bg-blue-600 text-white"
                        : "border border-slate-700 text-slate-400 hover:border-slate-500"
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label htmlFor="intent" className="text-xs font-medium text-slate-400">
                What were you looking for?
              </label>
              <input
                id="intent"
                type="text"
                value={intent}
                onChange={(e) => setIntent(e.target.value)}
                placeholder="e.g. 8(a) contracts in cybersecurity for my small business"
                className={inputClass + " mt-1.5"}
              />
            </div>

            <div>
              <label htmlFor="message" className="text-xs font-medium text-slate-400">
                Your feedback <span className="text-slate-600">*</span>
              </label>
              <textarea
                id="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="What's on your mind?"
                rows={4}
                required
                className={inputClass + " mt-1.5 resize-none"}
              />
            </div>

            <div>
              <label htmlFor="email" className="text-xs font-medium text-slate-400">
                Email <span className="text-slate-600">(optional — so we can follow up)</span>
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className={inputClass + " mt-1.5"}
              />
            </div>

            <button
              type="submit"
              disabled={!message.trim() || status === "sending"}
              className="w-full rounded-lg bg-blue-600 px-4 py-3 text-sm font-bold text-white hover:bg-blue-500 disabled:opacity-50"
            >
              {status === "sending" ? "Sending..." : "Send feedback"}
            </button>

            {status === "error" && (
              <p className="text-center text-sm text-red-400">
                Something went wrong. Please try again.
              </p>
            )}
          </form>
        )}
      </main>
    </div>
  );
}
