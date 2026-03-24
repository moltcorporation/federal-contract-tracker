import type { Metadata } from "next";
import Link from "next/link";
import { CrossProductFooter } from "@/app/components/cross-product-footer";

const baseUrl = "https://federal-contract-tracker-moltcorporation.vercel.app";

export const metadata: Metadata = {
  title: "SAM.gov Scams | Verify & Protect Your Business | GovScout",
  description:
    "Learn how to identify and avoid SAM.gov registration scams. The only official SAM.gov website is SAM.gov — never pay for registration. Protect your business from fraud.",
  keywords: [
    "sam.gov scams",
    "sam.gov registration scams",
    "sam.gov fraud",
    "fake sam.gov",
    "sam.gov registration fees",
    "sam.gov impersonation",
    "is sam.gov registration free",
  ],
  alternates: {
    canonical: `${baseUrl}/guides/sam-gov-scams`,
  },
  openGraph: {
    title: "Protect Your Business from SAM.gov Scams",
    description:
      "Identify SAM.gov registration scams and fraud. The official SAM.gov registration is 100% free.",
    type: "website",
    siteName: "GovScout",
  },
};

const faqs = [
  {
    question: "Is SAM.gov registration really free?",
    answer:
      "Yes, 100% free. The federal government does not charge any fee to register, renew, or maintain your SAM.gov entity registration. If anyone asks you to pay for SAM.gov registration, it is a scam.",
  },
  {
    question: "What is the official SAM.gov website?",
    answer:
      "The only official website is sam.gov (all lowercase). Scammers use URLs like sam.com, sam-gov.com, samgovregistration.com, or similar variations. Always type sam.gov directly into your browser, or bookmark it to avoid typos.",
  },
  {
    question: "How can I report a SAM.gov impersonation or scam?",
    answer:
      "Report suspected SAM.gov scams to the GSA at reportfraud@gsa.gov. Include details about the scam: the website URL, emails, phone numbers, or people involved. The GSA investigates all reports.",
  },
  {
    question: "What if I already paid someone for SAM.gov registration?",
    answer:
      "Contact your credit card issuer immediately to dispute the charge. Then report the scam to reportfraud@gsa.gov with evidence (emails, receipts, website screenshots). Also report it to your state attorney general's consumer protection office.",
  },
  {
    question: "Can I get my money back if I was scammed?",
    answer:
      "Dispute the charge with your credit card issuer — you have a right to a refund if the service was fraudulent. File a complaint with the FTC at reportfraud.ftc.gov. Your credit card company has stronger leverage with scammers than individuals do.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.question,
    acceptedAnswer: { "@type": "Answer", text: f.answer },
  })),
};

export default function SamGovScamsPage() {
  return (
    <div className="flex min-h-screen flex-col bg-slate-950 font-sans">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <header className="flex items-center justify-between border-b border-slate-800 px-6 py-4">
        <Link href="/" className="flex items-center gap-2">
          <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6 text-blue-400" aria-hidden="true">
            <path d="M3 21V7l9-4 9 4v14" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
            <path d="M9 21V13h6v8" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
            <circle cx="12" cy="9.5" r="1.5" fill="currentColor" />
          </svg>
          <span className="text-lg font-bold tracking-tight text-white">GovScout</span>
        </Link>
        <div className="flex items-center gap-4">
          <Link href="/trends" className="text-sm font-medium text-slate-400 transition-colors hover:text-blue-400">Trends</Link>
          <Link href="/guides" className="text-sm font-medium text-blue-400 transition-colors hover:text-blue-300">Guides</Link>
          <Link href="/pricing" className="text-sm font-medium text-slate-400 transition-colors hover:text-blue-400">Pricing</Link>
          <Link href="/register" className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700">Sign Up Free</Link>
        </div>
      </header>

      <main className="mx-auto flex w-full max-w-3xl flex-col gap-10 px-4 py-12">
        {/* Hero */}
        <div className="flex flex-col gap-4">
          <p className="text-sm font-medium text-red-400">Protect Your Business</p>
          <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            Avoid SAM.gov Registration Scams
          </h1>
          <p className="text-lg text-slate-400">
            SAM.gov registration is 100% free. If someone charges you, it is a scam. Learn how to identify fraud and protect your business.
          </p>
        </div>

        {/* Golden Rule */}
        <div className="flex flex-col gap-4 rounded-lg border border-red-900/30 bg-red-950/20 p-6">
          <h2 className="text-xl font-semibold text-white">The Golden Rule</h2>
          <p className="text-lg text-red-200 font-semibold">
            SAM.gov registration is 100% free. Never pay anyone to register you.
          </p>
          <p className="text-sm text-slate-400">
            The federal government does not charge for SAM.gov registration, renewal, or maintenance. If someone claims SAM.gov requires a fee, they are lying.
          </p>
        </div>

        {/* Common Scams */}
        <div className="flex flex-col gap-4">
          <h2 className="text-xl font-semibold text-white">Common SAM.gov Scams to Watch For</h2>
          <div className="space-y-4">
            {[
              {
                scam: "Paid registration services",
                detail: "Scammers offer to 'register you on SAM.gov' for $100–$500. They take your money, use your information to register themselves, then disappear. You lose money and may face identity issues.",
                red_flags: [
                  "Promises to register you 'instantly' (real SAM.gov registration takes 7–10 days)",
                  "Charges an upfront fee before starting",
                  "Cannot provide a government website or official SAM.gov reference",
                  "Uses unofficial website (sam.com, samgovregistration.com, etc.)",
                ],
              },
              {
                scam: "Fake SAM.gov websites",
                detail: "Scammers create lookalike websites (sam.com, sam-gov.net, samtax.gov) that collect your UEI, EIN, and personal information. They steal your identity or sell it to other criminals.",
                red_flags: [
                  "URL is not exactly sam.gov (check for sam.com, samtax.gov, sam-web.gov, etc.)",
                  "Poor grammar or spelling (federal websites are professionally maintained)",
                  "Requests for credit card or upfront payment",
                  "Unsolicited calls/emails directing you to a website",
                ],
              },
              {
                scam: "Unsolicited calls and emails",
                detail: "Scammers call or email claiming they are 'GSA representatives' offering to expedite your SAM.gov registration for a fee. The real GSA does not call businesses offering services.",
                red_flags: [
                  "Unexpected call claiming to be from 'SAM.gov' or 'GSA'",
                  "Pressure to 'act now' or 'register immediately'",
                  "Asks for payment via wire transfer, gift cards, or cryptocurrency",
                  "Cannot provide a government phone number to verify",
                ],
              },
              {
                scam: "Fake renewal notices",
                detail: "Scammers send fake renewal notices claiming your SAM.gov registration is about to expire (when it is not). They ask you to click a link and 'verify' your information on a fake website.",
                red_flags: [
                  "Email claims registration expires 'immediately' without mentioning your actual expiration date",
                  "Link goes to non-official website",
                  "Requests password or personal financial information",
                  "Sender email is not from sam.gov or gsa.gov",
                ],
              },
            ].map((scam, idx) => (
              <div key={idx} className="rounded-lg border border-slate-800 bg-slate-900 p-5">
                <h3 className="font-semibold text-white">{scam.scam}</h3>
                <p className="text-sm text-slate-400 mt-2">{scam.detail}</p>
                <div className="mt-3">
                  <p className="text-xs font-semibold uppercase text-red-400">Red Flags:</p>
                  <ul className="mt-2 space-y-1">
                    {scam.red_flags.map((flag, fidx) => (
                      <li key={fidx} className="text-xs text-slate-400 flex gap-2">
                        <span className="text-red-400 shrink-0">⚠</span>
                        <span>{flag}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* How to Verify */}
        <div className="flex flex-col gap-4">
          <h2 className="text-xl font-semibold text-white">How to Verify You Are on the Real SAM.gov</h2>
          <div className="space-y-3">
            {[
              { check: "Check the URL carefully", detail: "Type sam.gov directly into your browser. Bookmark it. The URL must be exactly sam.gov with https:// (secure connection)" },
              { check: "Look for the government seal", detail: "Real SAM.gov pages display the official GSA seal and security indicators. Fake sites often copy the seal poorly or do not have it at all" },
              { check: "Check for HTTPS and lock icon", detail: "Your browser should show a lock icon next to the URL, indicating a secure connection. If not, do not enter any information" },
              { check: "Verify the sender of emails", detail: "Real SAM.gov emails come from @sam.gov, @gsa.gov, or @login.gov domains. If an email claims to be SAM.gov but comes from @gmail.com or other free email, it is fake" },
              { check: "Official phone numbers", detail: "GSA SAM.gov help desk: 1-866-606-8220 (toll-free, published on sam.gov). Scammers give different numbers" },
              { check: "Never click email links", detail: "Do not click links in unsolicited emails. Type sam.gov directly into your browser instead" },
            ].map((check, idx) => (
              <div key={idx} className="rounded-lg border border-blue-900/30 bg-blue-950/20 p-4">
                <p className="font-semibold text-white">{check.check}</p>
                <p className="text-sm text-slate-400 mt-1">{check.detail}</p>
              </div>
            ))}
          </div>
        </div>

        {/* If Scammed */}
        <div className="flex flex-col gap-4 rounded-lg border border-slate-800 bg-slate-900 p-6">
          <h2 className="text-xl font-semibold text-white">If You Were Scammed</h2>
          <div className="space-y-3 text-sm">
            <div className="flex gap-3">
              <span className="font-bold text-blue-400 shrink-0">1.</span>
              <div>
                <p className="font-semibold text-white">Dispute the charge immediately</p>
                <p className="text-slate-400">Contact your credit card issuer and report it as fraud. You have rights under federal law.</p>
              </div>
            </div>
            <div className="flex gap-3">
              <span className="font-bold text-blue-400 shrink-0">2.</span>
              <div>
                <p className="font-semibold text-white">Report to GSA</p>
                <p className="text-slate-400">Email reportfraud@gsa.gov with details: website URL, emails, phone numbers, amount paid, and dates</p>
              </div>
            </div>
            <div className="flex gap-3">
              <span className="font-bold text-blue-400 shrink-0">3.</span>
              <div>
                <p className="font-semibold text-white">Report to FTC</p>
                <p className="text-slate-400">File a complaint at reportfraud.ftc.gov. The FTC tracks patterns and can take action against serial scammers</p>
              </div>
            </div>
            <div className="flex gap-3">
              <span className="font-bold text-blue-400 shrink-0">4.</span>
              <div>
                <p className="font-semibold text-white">Check your identity</p>
                <p className="text-slate-400">Review your credit reports at annualcreditreport.com. Consider placing a fraud alert with credit bureaus</p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="flex flex-col items-center gap-4 rounded-xl border border-blue-900/30 bg-blue-950/20 p-8 text-center">
          <h2 className="text-2xl font-bold text-white">
            Register safely on the official SAM.gov
          </h2>
          <p className="max-w-md text-sm text-slate-400">
            Type sam.gov into your browser and register for free. Start winning federal contracts legally and securely.
          </p>
          <Link
            href="/guides/sam-gov-registration"
            className="rounded-lg bg-blue-500 px-8 py-3 text-base font-semibold text-white shadow-sm transition-all hover:bg-blue-400"
          >
            SAM.gov Registration Guide
          </Link>
        </div>

        {/* Related */}
        <div className="flex flex-col gap-4">
          <h2 className="text-xl font-semibold text-white">Related guides</h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {[
              { href: "/guides/sam-gov-registration", title: "Complete SAM.gov Registration Guide", desc: "Free step-by-step guide for legitimate registration" },
              { href: "/guides/sam-gov-registration-checklist", title: "SAM.gov Registration Checklist", desc: "Checklist to ensure you have everything needed" },
              { href: "/guides/sam-gov-renewal", title: "SAM.gov Renewal Guide", desc: "How to renew your registration annually" },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-lg border border-slate-800 bg-slate-900 p-4 transition-colors hover:border-blue-600"
              >
                <h3 className="font-semibold text-white hover:text-blue-300">{item.title}</h3>
                <p className="mt-1 text-xs text-slate-500">{item.desc}</p>
              </Link>
            ))}
          </div>
        </div>

        {/* FAQ */}
        <div className="flex flex-col gap-6">
          <h2 className="text-xl font-semibold text-white">Frequently asked questions</h2>
          {faqs.map((faq) => (
            <div key={faq.question} className="border-b border-slate-800 pb-6">
              <h3 className="font-semibold text-white">{faq.question}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-400">{faq.answer}</p>
            </div>
          ))}
        </div>
      </main>

      <CrossProductFooter />
    </div>
  );
}
