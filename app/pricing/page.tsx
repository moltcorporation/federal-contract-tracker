import type { Metadata } from "next";
import { STRIPE_PAYMENT_LINK_URL } from "@/lib/stripe";

export const metadata: Metadata = {
  title: "Pricing — Federal Contract Tracker | Government Contract Search",
  description:
    "Search government contracts for free or upgrade to Pro for unlimited searches, spending trends, and export to CSV. Starting at $49/mo.",
  keywords: [
    "government contract search pricing",
    "federal contract tracker",
    "USASpending search tool",
    "contract intelligence pricing",
  ],
};

const FAQ_ITEMS = [
  {
    question: "Where does the data come from?",
    answer:
      "All contract data comes from USASpending.gov, the official source for federal spending data maintained by the U.S. Department of the Treasury. Data is updated daily.",
  },
  {
    question: "How is this different from SAM.gov?",
    answer:
      "SAM.gov lists open solicitations (things to bid on). We focus on awarded contracts — who won, how much, and spending trends. This gives you competitive intelligence to win future bids.",
  },
  {
    question: "What's a NAICS code?",
    answer:
      'NAICS (North American Industry Classification System) codes categorize businesses by industry. For example, 541512 is "Computer Systems Design Services." The government uses NAICS codes on every contract.',
  },
  {
    question: "How many searches do I get on the free tier?",
    answer:
      "Free users get 10 searches per 24 hours with 25 results per search. Pro users get unlimited searches with 100 results per search, plus spending trends and CSV export.",
  },
];

export default function PricingPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ_ITEMS.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-slate-900 sm:text-4xl">
          Simple, transparent pricing
        </h1>
        <p className="mt-3 text-lg text-slate-600">
          Start free. Upgrade when you need unlimited searches, trends, and
          export.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 max-w-3xl mx-auto">
        {/* Free tier */}
        <div className="rounded-xl border border-slate-200 bg-white p-8">
          <h3 className="text-lg font-semibold text-slate-900">Free</h3>
          <div className="mt-2">
            <span className="text-4xl font-bold text-slate-900">$0</span>
            <span className="text-slate-500">/mo</span>
          </div>
          <p className="mt-3 text-sm text-slate-600">
            Search and explore federal contract data.
          </p>
          <ul className="mt-6 space-y-3 text-sm text-slate-700">
            <li className="flex items-start gap-2">
              <span className="text-green-600 mt-0.5">&#10003;</span>
              10 searches per day
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-600 mt-0.5">&#10003;</span>
              25 results per search
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-600 mt-0.5">&#10003;</span>
              Filter by agency, NAICS, state
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-600 mt-0.5">&#10003;</span>
              Basic results table
            </li>
          </ul>
          <a
            href="/"
            className="mt-8 block rounded-lg border border-slate-300 px-4 py-2.5 text-center text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors"
          >
            Start searching
          </a>
        </div>

        {/* Pro tier */}
        <div className="rounded-xl border-2 border-blue-600 bg-white p-8 relative">
          <div className="absolute -top-3 left-6 bg-blue-600 text-white text-xs font-medium px-3 py-1 rounded-full">
            Most Popular
          </div>
          <h3 className="text-lg font-semibold text-slate-900">Pro</h3>
          <div className="mt-2">
            <span className="text-4xl font-bold text-slate-900">$49</span>
            <span className="text-slate-500">/mo</span>
          </div>
          <p className="mt-3 text-sm text-slate-600">
            Unlimited searches, trends, and competitive intel.
          </p>
          <ul className="mt-6 space-y-3 text-sm text-slate-700">
            <li className="flex items-start gap-2">
              <span className="text-green-600 mt-0.5">&#10003;</span>
              Everything in Free
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-600 mt-0.5">&#10003;</span>
              Unlimited searches
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-600 mt-0.5">&#10003;</span>
              100 results per search
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-600 mt-0.5">&#10003;</span>
              Spending trends &amp; analytics
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-600 mt-0.5">&#10003;</span>
              Export to CSV
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-600 mt-0.5">&#10003;</span>
              Top contractors &amp; agencies
            </li>
            <li className="flex items-start gap-2">
              <span className="text-slate-400 mt-0.5">&#8987;</span>
              <span className="text-slate-500">
                Coming soon: Saved searches, alerts, SAM.gov opportunities
              </span>
            </li>
          </ul>
          <a
            href={STRIPE_PAYMENT_LINK_URL}
            className="mt-8 block rounded-lg bg-blue-600 px-4 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-700 transition-colors"
          >
            Get Pro
          </a>
        </div>
      </div>

      {/* FAQ */}
      <div className="mt-16 max-w-2xl mx-auto">
        <h2 className="text-2xl font-bold text-slate-900 text-center mb-8">
          Frequently Asked Questions
        </h2>
        <div className="space-y-6">
          {FAQ_ITEMS.map((item, i) => (
            <div key={i}>
              <h3 className="font-medium text-slate-900">{item.question}</h3>
              <p className="mt-1 text-sm text-slate-600">{item.answer}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
