import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pricing — Federal Contract Tracker",
  description:
    "Track federal contracts and get competitive intelligence. Free tier available, Pro at $49/mo.",
};

export default function PricingPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-slate-900 sm:text-4xl">
          Simple, transparent pricing
        </h1>
        <p className="mt-3 text-lg text-slate-600">
          Start free. Upgrade when you need saved searches, alerts, and deeper
          competitive intel.
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
              Contract award search
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-600 mt-0.5">&#10003;</span>
              Filter by agency, NAICS, state
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-600 mt-0.5">&#10003;</span>
              Spending trends (quarterly)
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-600 mt-0.5">&#10003;</span>
              Top contractors &amp; agencies
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-600 mt-0.5">&#10003;</span>
              25 results per search
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
            Competitive intelligence and opportunity alerts.
          </p>
          <ul className="mt-6 space-y-3 text-sm text-slate-700">
            <li className="flex items-start gap-2">
              <span className="text-green-600 mt-0.5">&#10003;</span>
              Everything in Free
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-600 mt-0.5">&#10003;</span>
              100 results per search
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-600 mt-0.5">&#10003;</span>
              Saved searches (up to 20)
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-600 mt-0.5">&#10003;</span>
              Email alerts on new awards
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-600 mt-0.5">&#10003;</span>
              Contractor deep profiles
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-600 mt-0.5">&#10003;</span>
              Export to CSV
            </li>
            <li className="flex items-start gap-2">
              <span className="text-slate-400 mt-0.5">&#8987;</span>
              <span className="text-slate-500">
                Coming soon: Open opportunity search (SAM.gov)
              </span>
            </li>
          </ul>
          <a
            href="#"
            className="mt-8 block rounded-lg bg-blue-600 px-4 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-700 transition-colors"
          >
            Coming soon
          </a>
        </div>
      </div>

      {/* FAQ */}
      <div className="mt-16 max-w-2xl mx-auto">
        <h2 className="text-2xl font-bold text-slate-900 text-center mb-8">
          Frequently Asked Questions
        </h2>
        <div className="space-y-6">
          <div>
            <h3 className="font-medium text-slate-900">
              Where does the data come from?
            </h3>
            <p className="mt-1 text-sm text-slate-600">
              All contract data comes from USASpending.gov, the official source
              for federal spending data maintained by the U.S. Department of the
              Treasury. Data is updated daily.
            </p>
          </div>
          <div>
            <h3 className="font-medium text-slate-900">
              How is this different from SAM.gov?
            </h3>
            <p className="mt-1 text-sm text-slate-600">
              SAM.gov lists open solicitations (things to bid on). We focus on
              awarded contracts — who won, how much, and spending trends. This
              gives you competitive intelligence to win future bids.
            </p>
          </div>
          <div>
            <h3 className="font-medium text-slate-900">
              What&apos;s a NAICS code?
            </h3>
            <p className="mt-1 text-sm text-slate-600">
              NAICS (North American Industry Classification System) codes
              categorize businesses by industry. For example, 541512 is
              &quot;Computer Systems Design Services.&quot; The government uses
              NAICS codes on every contract.
            </p>
          </div>
          <div>
            <h3 className="font-medium text-slate-900">
              How much does the free tier include?
            </h3>
            <p className="mt-1 text-sm text-slate-600">
              The free tier gives you full access to contract award search with
              all filters, spending trend analysis, and top contractor/agency
              breakdowns. You get 25 results per search with no daily limit.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
