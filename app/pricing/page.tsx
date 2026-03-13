import Link from "next/link";
import { STRIPE_PAYMENT_LINK_URL } from "@/lib/stripe";

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
    question: "How many free searches do I get?",
    answer:
      "Free users get 10 contract searches per day. This resets every 24 hours. The Spending by Agency view is also included in the free tier.",
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "We accept all major credit cards through Stripe. Your subscription renews monthly and you can cancel anytime.",
  },
  {
    question: "Can I switch between plans?",
    answer:
      "Yes. You can upgrade from Free to Pro or Enterprise at any time. Downgrading takes effect at the end of your billing period.",
  },
  {
    question: "Where does the contract data come from?",
    answer:
      "All data comes from USASpending.gov, the official source for federal spending data. It is updated daily and covers all awarded federal contracts.",
  },
];

export default function PricingPage() {
  return (
    <div className="flex min-h-screen flex-col bg-slate-50 font-sans dark:bg-slate-950">
      <header className="flex items-center justify-between border-b border-slate-200 px-6 py-4 dark:border-slate-800">
        <Link href="/" className="flex items-center gap-2">
          <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6 text-blue-600 dark:text-blue-400" aria-hidden="true">
            <path d="M3 21V7l9-4 9 4v14" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
            <path d="M9 21V13h6v8" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
            <circle cx="12" cy="9.5" r="1.5" fill="currentColor" />
          </svg>
          <span className="text-lg font-bold tracking-tight text-slate-900 dark:text-white">
            Federal Contract Tracker
          </span>
        </Link>
        <Link href="/" className="text-sm text-slate-500 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400">
          Back to search
        </Link>
      </header>

      <main className="flex flex-1 flex-col items-center px-4 py-16">
        <div className="flex flex-col items-center gap-4 text-center">
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl dark:text-white">
            Simple, transparent pricing
          </h1>
          <p className="max-w-md text-lg text-slate-500 dark:text-slate-400">
            Start free. Upgrade when you need unlimited searches and advanced features.
          </p>
        </div>

        <div className="mt-12 grid w-full max-w-4xl grid-cols-1 gap-6 sm:grid-cols-3">
          {/* Free tier */}
          <div className="flex flex-col gap-6 rounded-xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
            <div className="flex flex-col gap-1">
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">Free</h2>
              <div className="flex items-baseline gap-1">
                <span className="text-3xl font-extrabold text-slate-900 dark:text-white">$0</span>
                <span className="text-sm text-slate-500 dark:text-slate-400">/month</span>
              </div>
            </div>
            <ul className="flex flex-col gap-3">
              {[
                { text: "10 searches per day", included: true },
                { text: "Contract search", included: true },
                { text: "Spending by agency", included: true },
                { text: "Set-aside filters", included: true },
                { text: "Unlimited searches", included: false },
                { text: "CSV export", included: false },
                { text: "Saved searches", included: false },
              ].map((item) => (
                <li key={item.text} className="flex items-center gap-2.5">
                  {item.included ? <CheckIcon /> : <XIcon />}
                  <span className={item.included ? "text-sm text-slate-900 dark:text-white" : "text-sm text-slate-400 dark:text-slate-500"}>
                    {item.text}
                  </span>
                </li>
              ))}
            </ul>
            <Link href="/" className="mt-auto w-full rounded-lg border border-slate-300 py-2.5 text-center text-sm font-medium text-slate-900 transition-colors hover:bg-slate-100 dark:border-slate-700 dark:text-white dark:hover:bg-slate-800">
              Get started free
            </Link>
          </div>

          {/* Pro tier */}
          <div className="flex flex-col gap-6 rounded-xl border-2 border-blue-600 bg-white p-6 dark:border-blue-400 dark:bg-slate-900">
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold text-slate-900 dark:text-white">Pro</h2>
                <span className="rounded-full bg-blue-600 px-2 py-0.5 text-xs font-medium text-white dark:bg-blue-500">
                  Popular
                </span>
              </div>
              <div className="flex items-baseline gap-1">
                <span className="text-3xl font-extrabold text-slate-900 dark:text-white">$49</span>
                <span className="text-sm text-slate-500 dark:text-slate-400">/month</span>
              </div>
            </div>
            <ul className="flex flex-col gap-3">
              {[
                "Unlimited searches",
                "Contract search",
                "Spending by agency",
                "Set-aside filters",
                "Spending trends",
                "CSV export",
                "Recipient search",
              ].map((text) => (
                <li key={text} className="flex items-center gap-2.5">
                  <CheckIcon />
                  <span className="text-sm text-slate-900 dark:text-white">{text}</span>
                </li>
              ))}
            </ul>
            <a href={STRIPE_PAYMENT_LINK_URL} className="mt-auto w-full rounded-lg bg-blue-600 py-2.5 text-center text-sm font-medium text-white transition-colors hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-400">
              Upgrade to Pro
            </a>
          </div>

          {/* Enterprise tier */}
          <div className="flex flex-col gap-6 rounded-xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
            <div className="flex flex-col gap-1">
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">Enterprise</h2>
              <div className="flex items-baseline gap-1">
                <span className="text-3xl font-extrabold text-slate-900 dark:text-white">$99</span>
                <span className="text-sm text-slate-500 dark:text-slate-400">/month</span>
              </div>
            </div>
            <ul className="flex flex-col gap-3">
              {[
                "Everything in Pro",
                "Saved searches",
                "Email alerts on new awards",
                "API access",
                "Priority support",
                "Team accounts (coming soon)",
              ].map((text) => (
                <li key={text} className="flex items-center gap-2.5">
                  <CheckIcon />
                  <span className="text-sm text-slate-900 dark:text-white">{text}</span>
                </li>
              ))}
            </ul>
            <a href={STRIPE_PAYMENT_LINK_URL} className="mt-auto w-full rounded-lg border border-slate-300 py-2.5 text-center text-sm font-medium text-slate-900 transition-colors hover:bg-slate-100 dark:border-slate-700 dark:text-white dark:hover:bg-slate-800">
              Contact us
            </a>
          </div>
        </div>

        {/* FAQ */}
        <div className="mt-16 flex w-full max-w-2xl flex-col gap-6">
          <h2 className="text-center text-2xl font-bold text-slate-900 dark:text-white">
            Frequently asked questions
          </h2>
          <div className="flex flex-col gap-4">
            {faqs.map((faq) => (
              <div key={faq.question} className="flex flex-col gap-2 rounded-xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
                <h3 className="text-sm font-semibold text-slate-900 dark:text-white">{faq.question}</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </main>

      <footer className="flex flex-col items-center gap-3 border-t border-slate-200 px-6 py-6 dark:border-slate-800">
        <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-slate-400 dark:text-slate-500">
          <span className="font-medium">Moltcorp Suite:</span>
          <span className="font-semibold text-blue-600 dark:text-blue-400">Federal Contract Tracker</span>
          <a href="https://statusping-moltcorporation.vercel.app" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-blue-600 dark:hover:text-blue-400">StatusPing</a>
          <a href="https://headerguard-moltcorporation.vercel.app" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-blue-600 dark:hover:text-blue-400">HeaderGuard</a>
          <a href="https://metashield-moltcorporation.vercel.app" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-blue-600 dark:hover:text-blue-400">MetaShield</a>
          <a href="https://ssl-certificate-checker-moltcorporation.vercel.app" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-blue-600 dark:hover:text-blue-400">SSL Checker</a>
          <a href="https://dns-lookup-moltcorporation.vercel.app" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-blue-600 dark:hover:text-blue-400">DNS Lookup</a>
          <a href="https://whois-lookup-moltcorporation.vercel.app" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-blue-600 dark:hover:text-blue-400">WHOIS Lookup</a>
        </div>
        <p className="text-xs text-slate-400 dark:text-slate-600">
          Data from{" "}
          <a href="https://usaspending.gov" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-blue-600 dark:hover:text-blue-400">USASpending.gov</a>
          {" "}· Built by agents at{" "}
          <a href="https://moltcorporation.com" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-blue-600 dark:hover:text-blue-400">Moltcorp</a>
        </p>
      </footer>
    </div>
  );
}
