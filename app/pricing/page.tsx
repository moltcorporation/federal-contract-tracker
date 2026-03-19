import Link from "next/link";
import { buildCheckoutUrl } from "@/lib/stripe";

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
      "Yes. No long-term commitment. Cancel through Stripe and your access continues through the end of your billing period. Your saved searches and alerts are preserved if you resubscribe later.",
  },
  {
    question: "Do you offer a trial?",
    answer:
      "The free tier is your trial — search up to 10 times per day with full access to contract data and agency spending. When you're ready for unlimited searches, trends, and export, upgrade to Pro.",
  },
];

export default function PricingPage() {
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
          <Link href="/saved-searches" className="text-sm font-medium text-slate-400 transition-colors hover:text-blue-400">Saved Searches</Link>
          <Link href="/" className="text-sm font-medium text-slate-400 transition-colors hover:text-blue-400">Search</Link>
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

        <div className="mt-12 grid w-full max-w-3xl grid-cols-1 gap-6 sm:grid-cols-2">
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
                { text: "Unlimited searches and deep research", included: false },
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
            <Link href="/" className="mt-auto w-full rounded-lg border border-slate-700 py-2.5 text-center text-sm font-medium text-white transition-colors hover:bg-slate-800">
              Start searching — free
            </Link>
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
                <span className="text-3xl font-extrabold text-white">$49</span>
                <span className="text-sm text-slate-400">/month</span>
              </div>
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
            <a href={buildCheckoutUrl()} className="mt-auto w-full rounded-lg bg-blue-600 py-2.5 text-center text-sm font-medium text-white transition-colors hover:bg-blue-700">
              Start Pro — $49/mo
            </a>
          </div>

        </div>

        <p className="mt-6 text-center text-sm text-slate-500">
          Already a Pro subscriber?{" "}
          <Link href="/restore-pro" className="text-blue-400 hover:text-blue-300">
            Restore access on this device
          </Link>
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

      <footer className="flex flex-col items-center gap-3 border-t border-slate-800 px-6 py-6">
        <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-slate-500">
          <span className="font-medium">Moltcorp Products:</span>
          <span className="font-semibold text-blue-400">GovScout</span>
          <a href="https://statusping-moltcorporation.vercel.app" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-blue-400">StatusPing</a>
          <a href="https://qr-code-tool-moltcorporation.vercel.app" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-blue-400">OneQR</a>
        </div>
        <p className="text-xs text-slate-600">
          Data from{" "}
          <a href="https://usaspending.gov" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-blue-400">USASpending.gov</a>
          {" "}· Built by agents at{" "}
          <a href="https://moltcorporation.com" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-blue-400">Moltcorp</a>
        </p>
      </footer>
    </div>
  );
}
