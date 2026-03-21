"use client";

import { useState } from "react";
import Link from "next/link";

const CATEGORIES = [
  { value: "billing", label: "Billing" },
  { value: "bug", label: "Bug report" },
  { value: "feature", label: "Feature request" },
  { value: "general", label: "General" },
];

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [category, setCategory] = useState("general");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle"
  );

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!message.trim() || !email.trim()) return;

    setStatus("sending");
    try {
      const res = await fetch("/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          category,
          intent: name || null,
          message: `[Contact Form — ${category}] From: ${name || "Anonymous"}\n\n${message}`,
        }),
      });
      if (!res.ok) throw new Error();
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  }

  const inputClass =
    "w-full rounded-lg border border-slate-700 bg-slate-800 px-3 py-2.5 text-sm text-white placeholder-slate-500 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-900/50";

  return (
    <div className="flex min-h-screen flex-col bg-slate-950 font-sans text-slate-100">
      <header className="border-b border-slate-800">
        <div className="mx-auto flex max-w-4xl w-full items-center justify-between px-6 py-4">
          <Link href="/" className="flex items-center gap-2">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              className="h-6 w-6 text-blue-400"
              aria-hidden="true"
            >
              <path
                d="M3 21V7l9-4 9 4v14"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinejoin="round"
              />
              <path
                d="M9 21V13h6v8"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinejoin="round"
              />
              <circle cx="12" cy="9.5" r="1.5" fill="currentColor" />
            </svg>
            <span className="text-lg font-bold tracking-tight text-white">
              GovScout
            </span>
          </Link>
          <Link
            href="/"
            className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-500"
          >
            Back to search
          </Link>
        </div>
      </header>

      <main className="flex-1 mx-auto max-w-lg px-6 py-16">
        <h1 className="text-2xl font-bold tracking-tight">Contact Support</h1>
        <p className="mt-2 text-sm text-slate-400">
          Have a question about your account, billing, or a feature? We
          respond to all inquiries within 48 hours on business days.
        </p>

        <div className="mt-6 rounded-xl border border-slate-800 bg-slate-900 p-5">
          <div className="flex items-start gap-3">
            <svg
              className="mt-0.5 h-5 w-5 shrink-0 text-blue-400"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
              />
            </svg>
            <div>
              <p className="text-sm font-medium text-white">Email us directly</p>
              <a
                href="mailto:support@moltcorporation.com"
                className="text-sm text-blue-400 hover:text-blue-300"
              >
                support@moltcorporation.com
              </a>
            </div>
          </div>
        </div>

        <div className="mt-4 rounded-xl border border-slate-800 bg-slate-900 p-5">
          <div className="flex items-start gap-3">
            <svg
              className="mt-0.5 h-5 w-5 shrink-0 text-blue-400"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>
            <div>
              <p className="text-sm font-medium text-white">Response time</p>
              <p className="text-sm text-slate-400">
                We respond to all inquiries within 48 hours on business days.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-4 rounded-xl border border-slate-800 bg-slate-900 p-5">
          <div className="flex items-start gap-3">
            <svg
              className="mt-0.5 h-5 w-5 shrink-0 text-blue-400"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 5.25h.008v.008H12v-.008Z"
              />
            </svg>
            <div>
              <p className="text-sm font-medium text-white">
                Check our FAQ first
              </p>
              <p className="text-sm text-slate-400">
                Many common questions are answered on our{" "}
                <Link
                  href="/pricing#faq"
                  className="text-blue-400 hover:text-blue-300"
                >
                  pricing page FAQ
                </Link>
                .
              </p>
            </div>
          </div>
        </div>

        <hr className="my-8 border-slate-800" />

        <h2 className="text-lg font-semibold text-white">Send a message</h2>

        {status === "sent" ? (
          <div className="mt-6 rounded-xl border border-blue-800 bg-blue-950/50 p-8 text-center">
            <p className="text-lg font-semibold text-blue-400">
              Message received!
            </p>
            <p className="mt-2 text-sm text-slate-400">
              We&apos;ll get back to you within 48 hours.
            </p>
            <Link
              href="/"
              className="mt-6 inline-block rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-bold text-white hover:bg-blue-500"
            >
              Back to search
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-4 flex flex-col gap-5">
            <div>
              <label htmlFor="name" className="text-xs font-medium text-slate-400">
                Name
              </label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
                className={inputClass + " mt-1.5"}
              />
            </div>

            <div>
              <label htmlFor="email" className="text-xs font-medium text-slate-400">
                Email <span className="text-red-400">*</span>
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
                className={inputClass + " mt-1.5"}
              />
            </div>

            <div>
              <label className="text-xs font-medium text-slate-400">
                Category
              </label>
              <div className="mt-2 flex flex-wrap gap-2">
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
              <label
                htmlFor="message"
                className="text-xs font-medium text-slate-400"
              >
                Message <span className="text-red-400">*</span>
              </label>
              <textarea
                id="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="How can we help?"
                rows={4}
                required
                className={inputClass + " mt-1.5 resize-none"}
              />
            </div>

            <button
              type="submit"
              disabled={
                !message.trim() || !email.trim() || status === "sending"
              }
              className="w-full rounded-lg bg-blue-600 px-4 py-3 text-sm font-bold text-white hover:bg-blue-500 disabled:opacity-50"
            >
              {status === "sending" ? "Sending..." : "Send message"}
            </button>

            {status === "error" && (
              <p className="text-center text-sm text-red-400">
                Something went wrong. Please try again.
              </p>
            )}
          </form>
        )}
      </main>

      <footer className="border-t border-slate-800 px-6 py-8 mt-12">
        <div className="mx-auto max-w-4xl flex flex-col gap-6">
          <div>
            <p className="text-xs font-medium uppercase tracking-wider text-slate-500 mb-3">
              More from Moltcorp
            </p>
            <div className="grid grid-cols-3 gap-3">
              <a
                href="https://qr-code-tool-moltcorporation.vercel.app"
                className="rounded-lg border border-slate-800 bg-slate-900/50 px-4 py-3 text-sm transition-colors hover:border-blue-700 hover:bg-slate-800/80"
              >
                <p className="font-semibold text-white">OneQR</p>
                <p className="text-xs text-slate-400">Dynamic QR codes</p>
              </a>
              <a
                href="https://trades-quoting-tool-moltcorporation.vercel.app"
                className="rounded-lg border border-slate-800 bg-slate-900/50 px-4 py-3 text-sm transition-colors hover:border-blue-700 hover:bg-slate-800/80"
              >
                <p className="font-semibold text-white">TradeQuote</p>
                <p className="text-xs text-slate-400">Professional quotes</p>
              </a>
              <a
                href="https://breeder-platform-moltcorporation.vercel.app"
                className="rounded-lg border border-slate-800 bg-slate-900/50 px-4 py-3 text-sm transition-colors hover:border-blue-700 hover:bg-slate-800/80"
              >
                <p className="font-semibold text-white">PawPage</p>
                <p className="text-xs text-slate-400">Breeder galleries</p>
              </a>
            </div>
          </div>
          <div className="flex flex-col gap-2 border-t border-slate-800 pt-6">
            <Link
              href="/"
              className="text-sm text-slate-400 transition-colors hover:text-blue-400"
            >
              ← Back to GovScout
            </Link>
            <a
              href="mailto:support@moltcorporation.com"
              className="text-sm text-slate-400 transition-colors hover:text-blue-400"
            >
              Email us: support@moltcorporation.com
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
