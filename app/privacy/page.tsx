import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy | GovScout",
  description:
    "GovScout privacy policy — how we collect, use, and protect your data on our federal contract tracking platform.",
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-slate-950">
      <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="mb-8 inline-block text-sm text-blue-400 hover:text-blue-300"
        >
          &larr; Back to GovScout
        </Link>

        <h1 className="text-3xl font-bold text-white">Privacy Policy</h1>
        <p className="mt-2 text-sm text-slate-500">
          Last updated: March 19, 2026
        </p>

        <div className="mt-8 space-y-8 text-slate-300 leading-relaxed">
          <section>
            <h2 className="text-xl font-semibold text-white">
              1. Information We Collect
            </h2>

            <h3 className="mt-4 font-medium text-white">
              Account Information
            </h3>
            <p className="mt-1">
              When you create an account, we collect your name, email address,
              and password (stored in hashed form). You may optionally provide
              NAICS codes and industry preferences during onboarding.
            </p>

            <h3 className="mt-4 font-medium text-white">
              Search and Saved Search Data
            </h3>
            <p className="mt-1">
              We store your contract search queries, saved searches, email alert
              preferences, and spending trend filters to provide the service and
              improve your experience.
            </p>

            <h3 className="mt-4 font-medium text-white">
              Payment Information
            </h3>
            <p className="mt-1">
              If you upgrade to Pro, payment processing is handled by Stripe. We
              do not store full credit card numbers. We retain subscription
              status and billing history.
            </p>

            <h3 className="mt-4 font-medium text-white">
              Government Contract Data
            </h3>
            <p className="mt-1">
              Contract data displayed on GovScout is sourced from the public
              USASpending.gov API. This data is publicly available and not
              personal information.
            </p>

            <h3 className="mt-4 font-medium text-white">Usage Data</h3>
            <p className="mt-1">
              We automatically collect basic usage data such as pages visited,
              browser type, and IP address to improve the service and diagnose
              issues.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white">
              2. How We Use Your Information
            </h2>
            <ul className="mt-2 list-disc space-y-1 pl-5">
              <li>
                To provide and maintain the GovScout service, including contract
                search, saved searches, and email alerts.
              </li>
              <li>
                To process Pro tier payments through our payment provider.
              </li>
              <li>
                To send transactional emails (account verification, password
                resets, saved search alerts).
              </li>
              <li>To improve the service based on usage patterns.</li>
              <li>
                To enforce our{" "}
                <Link
                  href="/terms"
                  className="text-blue-400 hover:text-blue-300 underline"
                >
                  Terms of Service
                </Link>
                .
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white">
              3. How We Share Your Information
            </h2>
            <p className="mt-2">
              We do not sell your personal information. We share data only in
              these cases:
            </p>
            <ul className="mt-2 list-disc space-y-1 pl-5">
              <li>
                <strong>Payment processing:</strong> We share necessary payment
                information with Stripe to process subscriptions.
              </li>
              <li>
                <strong>Email delivery:</strong> We use third-party email
                services to send transactional emails and saved search alerts.
              </li>
              <li>
                <strong>Legal requirements:</strong> We may disclose information
                if required by law or to protect the rights and safety of our
                users.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white">
              4. Data Retention
            </h2>
            <p className="mt-2">
              We retain your account data for as long as your account is active.
              If you delete your account, we will delete your personal data
              within 30 days, except where retention is required by law or for
              legitimate business purposes (such as resolving disputes or
              maintaining financial records).
            </p>
            <p className="mt-2">
              Saved searches and alert configurations are deleted when your
              account is deleted.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white">
              5. Data Security
            </h2>
            <p className="mt-2">
              We use industry-standard security measures to protect your data,
              including encrypted connections (HTTPS), hashed passwords, and
              secure database hosting. However, no method of transmission or
              storage is 100% secure, and we cannot guarantee absolute security.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white">
              6. Your Rights
            </h2>
            <p className="mt-2">You have the right to:</p>
            <ul className="mt-2 list-disc space-y-1 pl-5">
              <li>Access the personal data we hold about you.</li>
              <li>Request correction of inaccurate data.</li>
              <li>
                Request deletion of your account and associated data.
              </li>
              <li>
                Export your data (saved searches, alert configurations).
              </li>
            </ul>
            <p className="mt-2">
              To exercise these rights, use the{" "}
              <Link
                href="/feedback"
                className="text-blue-400 hover:text-blue-300 underline"
              >
                feedback form
              </Link>{" "}
              or contact us through your account settings.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white">
              7. Cookies
            </h2>
            <p className="mt-2">
              We use essential cookies to maintain your login session and
              remember your preferences. We do not use third-party advertising or
              tracking cookies.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white">
              8. Children&apos;s Privacy
            </h2>
            <p className="mt-2">
              GovScout is not intended for use by anyone under the age of 18. We
              do not knowingly collect personal information from children.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white">
              9. Changes to This Policy
            </h2>
            <p className="mt-2">
              We may update this policy from time to time. We will notify you of
              material changes via email or through the service. Continued use
              after changes constitutes acceptance of the updated policy.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white">
              10. Contact
            </h2>
            <p className="mt-2">
              Questions about this policy? Use the{" "}
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
