import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Contact & Support | GovScout",
  description:
    "Get help with your GovScout account. Email support for government contract search, alerts, and CSV exports.",
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="mb-8 inline-block text-sm text-blue-600 hover:text-blue-700"
        >
          &larr; Back to GovScout
        </Link>

        <h1 className="text-3xl font-bold text-slate-800">Support & Contact</h1>
        <p className="mt-2 text-sm text-slate-500">
          Questions about GovScout? We're here to help.
        </p>

        <div className="mt-8 space-y-8 text-slate-700 leading-relaxed">
          {/* Primary Support */}
          <section>
            <h2 className="text-xl font-semibold text-slate-800">
              Email Support
            </h2>
            <p className="mt-3">
              Have a question about contract search, saved alerts, CSV exports, or your account? Reach out to us at:
            </p>
            <div className="mt-3 rounded-lg bg-blue-50 p-4 border border-blue-200">
              <p className="text-center">
                <a
                  href="mailto:support@govscout.io"
                  className="text-blue-700 font-semibold hover:underline"
                >
                  support@govscout.io
                </a>
              </p>
              <p className="mt-2 text-center text-sm text-slate-600">
                Response time: <strong>48 hours</strong> (usually faster)
              </p>
            </div>
            <p className="mt-4 text-sm text-slate-600">
              We respond to all support emails within 48 hours during business days. Most inquiries are answered within 24 hours.
            </p>
          </section>

          {/* Common Issues */}
          <section>
            <h2 className="text-xl font-semibold text-slate-800">
              Common Questions
            </h2>
            <div className="mt-4 space-y-4">
              <div>
                <h3 className="font-medium text-slate-800">
                  How do I set up saved search alerts?
                </h3>
                <p className="mt-1 text-sm text-slate-600">
                  Create a search with your filters, then click "Save this search." Pro members receive email alerts when matching contracts appear in the USASpending database.
                </p>
              </div>
              <div>
                <h3 className="font-medium text-slate-800">
                  How do I export results to CSV?
                </h3>
                <p className="mt-1 text-sm text-slate-600">
                  CSV export is available on the Pro plan. From your search results, click the Export button to download a CSV file with all matching contracts.
                </p>
              </div>
              <div>
                <h3 className="font-medium text-slate-800">
                  How current is the contract data?
                </h3>
                <p className="mt-1 text-sm text-slate-600">
                  We pull data from USASpending.gov, which is updated daily. Most contracts appear in our search within 24 hours of publication.
                </p>
              </div>
              <div>
                <h3 className="font-medium text-slate-800">
                  Can I cancel my subscription?
                </h3>
                <p className="mt-1 text-sm text-slate-600">
                  Yes! Go to your account Settings and click "Manage Subscription." You can cancel anytime. No questions asked.
                </p>
              </div>
              <div>
                <h3 className="font-medium text-slate-800">
                  How secure is my data?
                </h3>
                <p className="mt-1 text-sm text-slate-600">
                  Your data is encrypted in transit and at rest. We use Stripe for payment processing (we never see credit card numbers). See our{" "}
                  <Link
                    href="/privacy"
                    className="text-blue-600 hover:underline"
                  >
                    Privacy Policy
                  </Link>{" "}
                  for details.
                </p>
              </div>
            </div>
          </section>

          {/* Support by Tier */}
          <section>
            <h2 className="text-xl font-semibold text-slate-800">
              Support Included with Your Plan
            </h2>
            <div className="mt-4 space-y-3">
              <div className="rounded-lg border border-slate-200 bg-white p-4">
                <h3 className="font-medium text-slate-800">Free Plan</h3>
                <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-slate-600">
                  <li>Email support</li>
                  <li>Response time: 48 hours</li>
                  <li>Contract search limited to 10/day</li>
                </ul>
              </div>
              <div className="rounded-lg border border-blue-200 bg-blue-50 p-4">
                <h3 className="font-medium text-slate-800">Pro Plan ($49/month)</h3>
                <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-slate-600">
                  <li>Email support</li>
                  <li>Response time: 48 hours</li>
                  <li>Unlimited contract searches</li>
                  <li>Saved search email alerts</li>
                  <li>CSV export for offline analysis</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Feedback */}
          <section>
            <h2 className="text-xl font-semibold text-slate-800">
              Share Feedback
            </h2>
            <p className="mt-3">
              Have a feature request? Found a bug? Help us improve GovScout.
            </p>
            <div className="mt-3">
              <Link
                href="/feedback"
                className="inline-block rounded-lg bg-blue-600 px-6 py-2 font-medium text-white transition hover:bg-blue-700"
              >
                Send Feedback
              </Link>
            </div>
          </section>

          {/* Response Times */}
          <section>
            <h2 className="text-xl font-semibold text-slate-800">
              Support Hours
            </h2>
            <p className="mt-3">
              We respond to support emails Monday–Friday, 9 AM–5 PM EST. During weekends and holidays, responses may take longer.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
