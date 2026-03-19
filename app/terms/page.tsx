import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms of Service | GovScout",
  description:
    "GovScout terms of service — acceptable use, data handling, accounts, and liability for our federal contract tracking platform.",
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-slate-950">
      <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="mb-8 inline-block text-sm text-blue-400 hover:text-blue-300"
        >
          &larr; Back to GovScout
        </Link>

        <h1 className="text-3xl font-bold text-white">Terms of Service</h1>
        <p className="mt-2 text-sm text-slate-500">
          Last updated: March 19, 2026
        </p>

        <div className="mt-8 space-y-8 text-slate-300 leading-relaxed">
          <section>
            <h2 className="text-xl font-semibold text-white">
              1. Acceptance of Terms
            </h2>
            <p className="mt-2">
              By creating an account or using GovScout, you agree to these Terms
              of Service. If you do not agree, do not use the service. GovScout
              is operated by Moltcorp.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white">
              2. Description of Service
            </h2>
            <p className="mt-2">
              GovScout provides tools to search federal contract awards, track
              government spending trends, save searches with email alerts, and
              export contract data. Data is sourced from the public
              USASpending.gov API. The service includes a free tier and a paid
              Pro subscription.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white">
              3. Account Responsibilities
            </h2>
            <ul className="mt-2 list-disc space-y-1 pl-5">
              <li>
                You must provide accurate information when creating your account.
              </li>
              <li>
                You are responsible for maintaining the confidentiality of your
                login credentials.
              </li>
              <li>
                You are responsible for all activity that occurs under your
                account.
              </li>
              <li>
                You must be at least 18 years old to create an account.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white">
              4. Acceptable Use
            </h2>
            <p className="mt-2">You agree not to:</p>
            <ul className="mt-2 list-disc space-y-1 pl-5">
              <li>Use the service for any unlawful purpose.</li>
              <li>
                Use automated tools to scrape or bulk-download data beyond
                normal search usage.
              </li>
              <li>
                Misrepresent contract data or use it to mislead others in
                government procurement processes.
              </li>
              <li>
                Attempt to interfere with or disrupt the service or its
                infrastructure.
              </li>
              <li>
                Resell or redistribute access to the service without
                authorization.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white">
              5. Data Sources and Accuracy
            </h2>
            <p className="mt-2">
              Contract data is sourced from USASpending.gov and is provided as-is.
              While we strive to present accurate information, GovScout does not
              guarantee the completeness or accuracy of government data. Always
              verify critical contract details through official government
              sources before making business decisions.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white">
              6. Payments and Subscriptions
            </h2>
            <p className="mt-2">
              Pro subscriptions are billed monthly unless otherwise stated. You
              may cancel at any time; your access continues until the end of the
              current billing period. Refunds are not provided for partial
              billing periods. GovScout reserves the right to change pricing
              with 30 days&apos; notice.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white">
              7. Data Handling
            </h2>
            <p className="mt-2">
              You retain ownership of any data you input, including saved
              searches and alert configurations. By using GovScout, you grant us
              a license to process this data as necessary to provide the service.
              See our{" "}
              <Link
                href="/privacy"
                className="text-blue-400 hover:text-blue-300 underline"
              >
                Privacy Policy
              </Link>{" "}
              for details on how we handle personal data.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white">
              8. Account Termination
            </h2>
            <p className="mt-2">
              You may delete your account at any time through your account
              settings. We may suspend or terminate your account if you violate
              these terms or engage in abusive behavior. Upon termination, your
              saved searches and data will be deleted in accordance with our
              Privacy Policy.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white">
              9. Limitation of Liability
            </h2>
            <p className="mt-2">
              GovScout is provided &quot;as is&quot; without warranties of any
              kind. To the maximum extent permitted by law, Moltcorp shall not be
              liable for any indirect, incidental, special, or consequential
              damages arising from your use of the service, including but not
              limited to lost profits, data loss, or business interruption.
              GovScout is not responsible for business decisions made based on
              contract data displayed on the platform.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white">
              10. Changes to Terms
            </h2>
            <p className="mt-2">
              We may update these terms from time to time. We will notify you of
              material changes via email or through the service. Continued use
              after changes constitutes acceptance of the updated terms.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white">
              11. Contact
            </h2>
            <p className="mt-2">
              Questions about these terms? Use the{" "}
              <Link
                href="/feedback"
                className="text-blue-400 hover:text-blue-300 underline"
              >
                feedback form
              </Link>{" "}
              to reach us.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
