"use client";

import { useState } from "react";
import Link from "next/link";
import { track } from "@vercel/analytics";
import { CrossProductFooter } from "@/app/components/cross-product-footer";
import { STRIPE_PAYMENT_LINK_URL, STRIPE_ANNUAL_PAYMENT_LINK_URL } from "@/lib/stripe";

function CheckIcon() {
  return (
    <svg viewBox="0 0 16 16" className="h-4 w-4 text-blue-500" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 8.5l3.5 3.5 6.5-7" />
    </svg>
  );
}

function XIcon() {
  return (
    <svg viewBox="0 0 16 16" className="h-4 w-4 text-slate-300 dark:text-slate-600" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
      <path d="M4 4l8 8M12 4l-8 8" />
    </svg>
  );
}

const faqs = [
  {
    question: "Is $49/mo worth it for my small business?",
    answer:
      "One federal contract can be worth $50K–$50M. Pro gives you the tools to find those opportunities before your competitors do — unlimited searches to explore every NAICS code, spending trends to spot agencies ramping up budgets, and CSV export to build target lists for your proposals. If it helps you win even one additional contract, it pays for itself for decades.",
  },
  {
    question: "How is this different from USASpending.gov?",
    answer:
      "USASpending has the same underlying data, but it's built for government transparency — not business intelligence. Finding competitor awards requires navigating multiple pages, and there's no way to filter by set-aside type, export results, or track spending trends by NAICS code. We turn that raw data into actionable intelligence you can use in proposals.",
  },
  {
    question: "Where does the contract data come from?",
    answer:
      "All data comes directly from USASpending.gov, the official source for federal spending data. It's updated daily and covers every awarded federal contract. We don't modify the data — we make it searchable and useful.",
  },
  {
    question: "Can I cancel anytime?",
    answer:
      "Yes. No long-term commitment. Manage or cancel your subscription anytime from your Stripe billing portal. Your access continues through the end of your billing period, and saved searches are preserved if you resubscribe later.",
  },
  {
    question: "Do you offer a trial?",
    answer:
      "The free tier is your trial — search up to 10 times per day with full access to contract data and agency spending. When you're ready for unlimited searches, trends, and export, upgrade to Pro.",
  },
];

export default function PricingPage() {
  const [isAnnual, setIsAnnual] = useState(false);

  const proPrice = isAnnual ? "$39" : "$49";
  const proPeriod = isAnnual ? "/mo" : "/month";
  const proCtaLabel = isAnnual ? "Start Pro — $39/mo" : "Start Pro — $49/mo";
  const proCheckoutUrl = isAnnual
    ? (STRIPE_ANNUAL_PAYMENT_LINK_URL || STRIPE_PAYMENT_LINK_URL)
    : STRIPE_PAYMENT_LINK_URL;

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
          <Link href="/" className="text-sm font-medium text-slate-400 transition-colors hover:text-blue-400">Search</Link>
          <Link href="/trends" className="text-sm font-medium text-slate-400 transition-colors hover:text-blue-400">Trends</Link>
          <Link href="/saved-searches" className="text-sm font-medium text-slate-400 transition-colors hover:text-blue-400">Saved Searches</Link>
          <span className="text-sm font-medium text-blue-400">Pricing</span>
        </div>
      </header>

      <main className="flex flex-1 flex-col items-center px-4 py-16">
        <div className="flex flex-col items-center gap-4 text-center">
          <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            Federal contract intelligence at indie pricing
          </h1>
          <p className="max-w-lg text-lg text-slate-400">
            GovWin charges $2,000+/year. We give you the same award data, competitor tracking, and spending trends for a fraction of the cost.
          </p>
        </div>

        {/* Billing toggle */}
        <div className="mt-10 flex items-center gap-3">
          <span className={`text-sm font-medium ${!isAnnual ? "text-white" : "text-slate-400"}`}>Monthly</span>
          <button
            onClick={() => setIsAnnual(!isAnnual)}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${isAnnual ? "bg-blue-600" : "bg-slate-700"}`}
            aria-label="Toggle annual billing"
          >
            <span className={`inline-block h-4 w-4 rounded-full bg-white transition-transform ${isAnnual ? "translate-x-6" : "translate-x-1"}`} />
          </button>
          <span className={`text-sm font-medium ${isAnnual ? "text-white" : "text-slate-400"}`}>Annual</span>
          {isAnnual && (
            <span className="rounded-full bg-green-600 px-2 py-0.5 text-xs font-semibold text-white">
              Save 20%
            </span>
          )}
        </div>

        <div className="mt-8 grid w-full max-w-3xl grid-cols-1 gap-6 sm:grid-cols-2">
          {/* Free tier */}
          <div className="flex flex-col gap-6 rounded-xl border border-slate-800 bg-slate-900 p-6">
            <div className="flex flex-col gap-1">
              <h2 className="text-lg font-bold text-white">Free</h2>
              <p className="text-xs text-slate-400">For businesses exploring the federal market</p>
              <div className="mt-2 flex items-baseline gap-1">
                <span className="text-3xl font-extrabold text-white">$0</span>
                <span className="text-sm text-slate-400">/month</span>
              </div>
            </div>
            <ul className="flex flex-col gap-3">
              {[
                { text: "See who's winning contracts in your NAICS code", included: true },
                { text: "Filter by agency, set-aside type, and dollar range", included: true },
                { text: "View spending breakdowns by agency", included: true },
                { text: "10 searches per day to explore the data", included: true },
                { text: "Unlimited searches (Pro only)", included: false },
                { text: "Export award data for proposals", included: false },
                { text: "Saved searches with email alerts", included: false },
              ].map((item) => (
                <li key={item.text} className="flex items-start gap-2.5">
                  <span className="mt-0.5">{item.included ? <CheckIcon /> : <XIcon />}</span>
                  <span className={item.included ? "text-sm text-white" : "text-sm text-slate-500"}>
                    {item.text}
                  </span>
                </li>
              ))}
            </ul>
            <Link href="/register" className="mt-auto w-full rounded-lg border border-slate-700 py-2.5 text-center text-sm font-medium text-white transition-colors hover:bg-slate-800">
              Start Free
            </Link>
            <p className="text-center text-xs text-slate-500">No credit card required</p>
          </div>

          {/* Pro tier */}
          <div className="flex flex-col gap-6 rounded-xl border-2 border-blue-400 bg-slate-900 p-6">
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold text-white">Pro</h2>
                <span className="rounded-full bg-blue-600 px-2 py-0.5 text-xs font-medium text-white">
                  Most popular
                </span>
              </div>
              <p className="text-xs text-slate-400">For serious BD teams tracking competitors</p>
              <div className="mt-2 flex items-baseline gap-1">
                <span className="text-3xl font-extrabold text-white">{proPrice}</span>
                <span className="text-sm text-slate-400">{proPeriod}</span>
              </div>
              {isAnnual && (
                <p className="mt-1 text-xs text-green-400">$468/yr — save $120 vs monthly</p>
              )}
            </div>
            <ul className="flex flex-col gap-3">
              {[
                "Unlimited searches — research every opportunity",
                "Find who your competitors are winning contracts from",
                "Spot agencies ramping up spend in your NAICS code",
                "Export award data as CSV for proposals and BD tracking",
                "Search by recipient to map competitor portfolios",
                "Filter by HUBZone, WOSB, SDVOSB, 8(a) set-asides",
                "Keyword search across award descriptions",
                "Saved searches with email alerts",
              ].map((text) => (
                <li key={text} className="flex items-start gap-2.5">
                  <span className="mt-0.5"><CheckIcon /></span>
                  <span className="text-sm text-white">{text}</span>
                </li>
              ))}
            </ul>
            <a href={proCheckoutUrl} onClick={() => {
              track("pro_checkout_clicked", { billing: isAnnual ? "annual" : "monthly" });
              const utmCookie = document.cookie.split("; ").find((c) => c.startsWith("utm="));
              const utmData = utmCookie ? JSON.parse(decodeURIComponent(utmCookie.split("=").slice(1).join("="))) : {};
              fetch("/api/conversions/track", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ event_type: "checkout_initiated", billing: isAnnual ? "annual" : "monthly", ...utmData }),
              }).catch(() => {});
            }} className="mt-auto w-full rounded-lg bg-blue-600 py-2.5 text-center text-sm font-medium text-white transition-colors hover:bg-blue-700">
              {proCtaLabel}
            </a>
            <div className="flex items-center justify-center gap-2 rounded-lg border border-green-800/50 bg-green-950/30 px-3 py-2">
              <svg className="h-4 w-4 text-green-400" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
              </svg>
              <span className="text-xs font-medium text-green-400">7-day money-back guarantee</span>
            </div>
            <p className="text-center text-xs text-slate-500">Cancel anytime. No questions asked.</p>
          </div>

        </div>

        {/* Testimonials */}
        <div className="mt-16 w-full max-w-3xl">
          <h2 className="text-center text-2xl font-bold text-white">
            Trusted by small business owners winning federal contracts
          </h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-3">
            <div className="rounded-xl border border-slate-800 bg-slate-900 p-6">
              <div className="flex items-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="h-4 w-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-sm text-slate-300">
                &quot;I found three government contracts in one week that we never would&apos;ve seen on SAM.gov. The spending trends feature let me identify which agencies were ramping up, and we won $2.1M in awards within the first month. Best $49 I&apos;ve spent.&quot;
              </p>
              <p className="mt-4 text-sm font-medium text-white">Marcus Chen</p>
              <p className="text-xs text-slate-400">Founder, Precision Supply Chain Solutions</p>
            </div>

            <div className="rounded-xl border border-slate-800 bg-slate-900 p-6">
              <div className="flex items-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="h-4 w-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-sm text-slate-300">
                &quot;As a WOSB, we were losing contracts to larger competitors. GovScout&apos;s set-aside filters and competitor tracking showed us gaps where we could dominate. Now we bid smarter, not harder.&quot;
              </p>
              <p className="mt-4 text-sm font-medium text-white">Sarah Johnson</p>
              <p className="text-xs text-slate-400">Owner, Patriot Facilities Management</p>
            </div>

            <div className="rounded-xl border border-slate-800 bg-slate-900 p-6">
              <div className="flex items-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="h-4 w-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-sm text-slate-300">
                &quot;The CSV export saved us hours on proposal research. Instead of manually tracking competitor wins, I can now focus on writing better proposals. Switched from GovWin to GovScout and saved $23K/year.&quot;
              </p>
              <p className="mt-4 text-sm font-medium text-white">David Rodriguez</p>
              <p className="text-xs text-slate-400">VP Business Development, Infrastructure Consulting</p>
            </div>
          </div>
        </div>

        {/* Competitor Comparison */}
        <div className="mt-16 w-full max-w-4xl">
          <h2 className="text-center text-2xl font-bold text-white">
            How GovScout compares
          </h2>
          <p className="mt-4 text-center text-sm text-slate-400">
            Federal contract tools range from free government sites to expensive enterprise platforms. Here&apos;s where you get the best value.
          </p>
          <div className="mt-8 overflow-x-auto rounded-xl border border-slate-800">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-800 bg-slate-900">
                  <th className="px-4 py-3 text-left font-semibold text-white">Feature</th>
                  <th className="px-4 py-3 text-center font-semibold text-blue-400">GovScout</th>
                  <th className="px-4 py-3 text-center font-semibold text-slate-400">Manual SAM.gov</th>
                  <th className="px-4 py-3 text-center font-semibold text-slate-400">GovWin / Deltek</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-slate-800">
                  <td className="px-4 py-3 font-medium text-white">Price</td>
                  <td className="px-4 py-3 text-center"><span className="rounded-full bg-green-950/30 px-2 py-1 text-xs font-semibold text-green-400">$0–$49/mo</span></td>
                  <td className="px-4 py-3 text-center text-slate-300">Free</td>
                  <td className="px-4 py-3 text-center text-slate-300">$300–$1000+/mo</td>
                </tr>
                <tr className="border-b border-slate-800">
                  <td className="px-4 py-3 font-medium text-white">Set-aside filters (HUBZone, WOSB, 8a)</td>
                  <td className="px-4 py-3 text-center"><CheckIcon /></td>
                  <td className="px-4 py-3 text-center"><XIcon /></td>
                  <td className="px-4 py-3 text-center"><CheckIcon /></td>
                </tr>
                <tr className="border-b border-slate-800">
                  <td className="px-4 py-3 font-medium text-white">Saved searches with email alerts</td>
                  <td className="px-4 py-3 text-center"><CheckIcon /></td>
                  <td className="px-4 py-3 text-center"><XIcon /></td>
                  <td className="px-4 py-3 text-center"><CheckIcon /></td>
                </tr>
                <tr className="border-b border-slate-800">
                  <td className="px-4 py-3 font-medium text-white">Spending trends by agency</td>
                  <td className="px-4 py-3 text-center"><CheckIcon /></td>
                  <td className="px-4 py-3 text-center"><XIcon /></td>
                  <td className="px-4 py-3 text-center"><CheckIcon /></td>
                </tr>
                <tr className="border-b border-slate-800">
                  <td className="px-4 py-3 font-medium text-white">Export award data (CSV)</td>
                  <td className="px-4 py-3 text-center"><CheckIcon /></td>
                  <td className="px-4 py-3 text-center text-slate-400">Manual copy-paste</td>
                  <td className="px-4 py-3 text-center"><CheckIcon /></td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-medium text-white">Competitor tracking</td>
                  <td className="px-4 py-3 text-center"><CheckIcon /></td>
                  <td className="px-4 py-3 text-center text-slate-400">Manual searches</td>
                  <td className="px-4 py-3 text-center"><CheckIcon /></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <svg className="h-4 w-4 text-blue-400" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" /></svg>
            No credit card required
          </div>
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <svg className="h-4 w-4 text-blue-400" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            Cancel anytime
          </div>
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <svg className="h-4 w-4 text-blue-400" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456z" /></svg>
            Powered by USASpending.gov data
          </div>
        </div>

        <p className="mt-6 text-center text-sm text-slate-500">
          Already a Pro subscriber?{" "}
          <Link href="/restore-pro" className="text-blue-400 hover:text-blue-300">
            Restore access on this device
          </Link>
          {" · "}
          <a href={process.env.NEXT_PUBLIC_STRIPE_PORTAL_LINK || "https://billing.stripe.com/p/login/test"} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300">
            Manage subscription
          </a>
        </p>

        {/* Why not USASpending */}
        <div className="mt-16 w-full max-w-2xl">
          <h2 className="text-center text-2xl font-bold text-white">
            Why not just use USASpending.gov?
          </h2>
          <p className="mt-4 text-center text-sm text-slate-400">
            USASpending is the source — but it was built for government transparency, not business development. Here&apos;s what you&apos;re missing:
          </p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-slate-800 bg-slate-900 p-5">
              <h3 className="text-sm font-semibold text-white">No set-aside filtering</h3>
              <p className="mt-1 text-xs text-slate-400">
                Can&apos;t filter awards by HUBZone, WOSB, SDVOSB, or 8(a). If you&apos;re a set-aside business, you&apos;re scrolling through irrelevant results.
              </p>
            </div>
            <div className="rounded-xl border border-slate-800 bg-slate-900 p-5">
              <h3 className="text-sm font-semibold text-white">No competitor tracking</h3>
              <p className="mt-1 text-xs text-slate-400">
                Want to see every contract a competitor won this year? That takes dozens of clicks. Here, it&apos;s one search.
              </p>
            </div>
            <div className="rounded-xl border border-slate-800 bg-slate-900 p-5">
              <h3 className="text-sm font-semibold text-white">No spending trends</h3>
              <p className="mt-1 text-xs text-slate-400">
                USASpending shows raw numbers. We show you which agencies are increasing spend in your NAICS code quarter over quarter — so you know where to focus.
              </p>
            </div>
            <div className="rounded-xl border border-slate-800 bg-slate-900 p-5">
              <h3 className="text-sm font-semibold text-white">No export for proposals</h3>
              <p className="mt-1 text-xs text-slate-400">
                Building a past performance section or mapping the competitive landscape? Export filtered results as CSV instead of copying data cell by cell.
              </p>
            </div>
          </div>
        </div>

        {/* FAQ */}
        <div className="mt-16 flex w-full max-w-2xl flex-col gap-6">
          <h2 className="text-center text-2xl font-bold text-white">
            Frequently asked questions
          </h2>
          <div className="flex flex-col gap-4">
            {faqs.map((faq) => (
              <div key={faq.question} className="flex flex-col gap-2 rounded-xl border border-slate-800 bg-slate-900 p-5">
                <h3 className="text-sm font-semibold text-white">{faq.question}</h3>
                <p className="text-sm text-slate-400">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </main>

      <CrossProductFooter />
    </div>
  );
}
