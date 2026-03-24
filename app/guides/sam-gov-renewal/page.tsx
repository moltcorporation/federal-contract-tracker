import type { Metadata } from "next";
import Link from "next/link";
import { CrossProductFooter } from "@/app/components/cross-product-footer";

const baseUrl = "https://federal-contract-tracker-moltcorporation.vercel.app";

export const metadata: Metadata = {
  title: "SAM.gov Renewal Guide | Annual Registration Renewal | GovScout",
  description:
    "Complete guide to renewing your SAM.gov registration before expiration. SAM.gov registrations expire annually — learn how to renew, avoid lapses, and stay eligible for federal contracts.",
  keywords: [
    "sam.gov renewal",
    "sam.gov registration renewal",
    "sam.gov registration expiration",
    "sam.gov renew registration",
    "when does sam.gov expire",
    "sam.gov renewal deadline",
  ],
  alternates: {
    canonical: `${baseUrl}/guides/sam-gov-renewal`,
  },
  openGraph: {
    title: "SAM.gov Renewal Guide | Renew Before Expiration",
    description:
      "How to renew your SAM.gov registration annually. Avoid penalties and keep your business eligible for federal contracts.",
    type: "website",
    siteName: "GovScout",
  },
};

const faqs = [
  {
    question: "When does my SAM.gov registration expire?",
    answer:
      "Your SAM.gov registration expires exactly one year after it was activated. For example, if you were activated on March 15, 2024, your registration expires on March 15, 2025. SAM.gov sends reminder emails to your point of contact 60, 30, and 15 days before expiration. Set a calendar reminder 90 days before expiration to give yourself time to renew.",
  },
  {
    question: "What happens if my SAM.gov registration lapses?",
    answer:
      "If your registration expires without renewal, you cannot: receive new federal contract awards, bid on solicitations, receive payments on existing contracts, or appear in SAM.gov searches. You must renew to restore eligibility. If your registration has already lapsed, update your information immediately and resubmit to be reactivated.",
  },
  {
    question: "How long does SAM.gov renewal take?",
    answer:
      "Renewal takes 10–20 minutes if nothing has changed. Validation is typically 3–5 business days, much faster than new registration. However, if you make substantial changes (address, legal name, ownership), validation can take longer. Start the renewal 60+ days before expiration to allow buffer time.",
  },
  {
    question: "What information do I need to update during renewal?",
    answer:
      "Review and confirm everything: business address, NAICS codes, bank account information, business size, certifications, and points of contact. Update anything that has changed since your last renewal. Common updates: new NAICS codes, refreshed certifications, updated bank account, address change, or staffing changes affecting ownership structure.",
  },
  {
    question: "Can I renew my SAM.gov registration early?",
    answer:
      "Yes, you can renew your registration up to 90 days before expiration. Many contractors renew 60 days before expiration to ensure validation completes before the deadline. Never wait until the last week — if validation encounters issues, you risk lapsing while the problem is being resolved.",
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

export default function SamGovRenewalPage() {
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
          <p className="text-sm font-medium text-blue-400">Guides</p>
          <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            SAM.gov Annual Renewal Guide
          </h1>
          <p className="text-lg text-slate-400">
            Your SAM.gov registration expires after one year. Learn how to renew before the deadline and stay eligible for federal contracts.
          </p>
        </div>

        {/* Key Dates */}
        <div className="flex flex-col gap-4 rounded-lg border border-blue-900/30 bg-blue-950/20 p-6">
          <h2 className="text-xl font-semibold text-white">Key Dates for Renewal</h2>
          <div className="space-y-3">
            {[
              { days: "90 days before", action: "SET A REMINDER", note: "Calendar reminder for renewal start — buffer for unexpected issues" },
              { days: "60 days before", action: "START RENEWAL", note: "SAM.gov sends first reminder email to your point of contact" },
              { days: "30 days before", action: "SECOND REMINDER", note: "Verification should be nearly complete — most renewals validate in 3-5 days" },
              { days: "15 days before", action: "FINAL REMINDER", note: "Complete renewal immediately if not yet done" },
              { days: "Expiration date", action: "REGISTRATION LAPSES", note: "You cannot receive new awards or bid on contracts" },
            ].map((timeline, idx) => (
              <div key={idx} className="flex gap-4 rounded-md bg-slate-950 p-3">
                <div className="flex-1">
                  <p className="font-semibold text-white">{timeline.days}</p>
                  <p className="text-sm text-blue-400 font-medium">{timeline.action}</p>
                </div>
                <p className="text-sm text-slate-400 text-right">{timeline.note}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Renewal Process */}
        <div className="flex flex-col gap-4">
          <h2 className="text-xl font-semibold text-white">How to Renew Your SAM.gov Registration</h2>
          <div className="space-y-3">
            {[
              { step: 1, action: "Sign in to SAM.gov", detail: "Use your Login.gov credentials. You will see a 'Renewal Required' or 'Expires On' notice on your dashboard" },
              { step: 2, action: "Click Renew", detail: "Select the option to begin renewal. SAM.gov will show you all current information from your last registration" },
              { step: 3, action: "Review Core Data", detail: "Legal name, UEI, address, business start date. Update if anything has changed (moved, legal name changed, etc.)" },
              { step: 4, action: "Review Assertions", detail: "NAICS codes, business type, goods/services. Add or remove NAICS codes if your business has evolved" },
              { step: 5, action: "Review Representations & Certifications", detail: "Update ownership, size, socio-economic status, trade compliance. These answers have legal weight — be accurate" },
              { step: 6, action: "Review Points of Contact", detail: "Confirm your EBiz POC, government POC, and accounts receivable contact. Ensure emails are current" },
              { step: 7, action: "Submit Renewal", detail: "Review everything one final time, then submit. SAM.gov begins validation immediately" },
              { step: 8, action: "Monitor Email", detail: "Your point of contact will receive validation status updates. Validation typically completes in 3-5 business days" },
              { step: 9, action: "Confirm Activation", detail: "You will receive an email confirming your renewal is complete. Your registration remains active" },
            ].map((step) => (
              <div key={step.step} className="flex gap-4 rounded-lg border border-slate-800 bg-slate-900 p-4">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-900/50 text-sm font-bold text-blue-300 flex-none">
                  {step.step}
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-white">{step.action}</p>
                  <p className="text-sm text-slate-400 mt-1">{step.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* What Changed */}
        <div className="flex flex-col gap-4 rounded-lg border border-slate-800 bg-slate-900 p-6">
          <h2 className="text-xl font-semibold text-white">What to Update During Renewal</h2>
          <div className="space-y-2 text-sm">
            {[
              "✓ Business address (if you moved)",
              "✓ NAICS codes (if you added or removed services)",
              "✓ Bank account or EFT information (if you changed banks)",
              "✓ Certifications (expired or new ones obtained)",
              "✓ Employee count or business size (if you grew)",
              "✓ Ownership or structure changes (new owners, LLC formation, etc.)",
              "✓ Points of contact (if staff changed roles)",
              "✓ Business name (if you rebranded or legally changed it)",
            ].map((item, idx) => (
              <p key={idx} className="text-slate-400">{item}</p>
            ))}
          </div>
        </div>

        {/* Common Issues */}
        <div className="flex flex-col gap-4">
          <h2 className="text-xl font-semibold text-white">Common Renewal Issues & How to Fix Them</h2>
          <div className="space-y-3">
            {[
              {
                problem: "Renewal rejected: Address cannot be verified",
                solution: "Update your physical address exactly as it appears on official business documents or property records. Never use a PO Box.",
              },
              {
                problem: "Bank account information rejected during validation",
                solution: "Confirm your routing number and account number are correct. Bank changes sometimes cause delays. Contact your bank if needed.",
              },
              {
                problem: "Received rejection email 2 weeks before expiration",
                solution: "Fix the issue immediately and resubmit. Do not wait. Validation typically completes in 3-5 days, but allow buffer time.",
              },
              {
                problem: "Did not receive reminder emails",
                solution: "Check your email spam folder. Verify your point of contact email is correct in your SAM.gov profile. Update it if needed.",
              },
              {
                problem: "Registration already lapsed — what do I do?",
                solution: "Update your information and resubmit immediately as a new registration. Include a note explaining the lapse.",
              },
            ].map((issue, idx) => (
              <div key={idx} className="rounded-lg border border-slate-800 bg-slate-900 p-4">
                <p className="font-semibold text-white">{issue.problem}</p>
                <p className="text-sm text-slate-400 mt-2">{issue.solution}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="flex flex-col items-center gap-4 rounded-xl border border-blue-900/30 bg-blue-950/20 p-8 text-center">
          <h2 className="text-2xl font-bold text-white">
            Set a renewal reminder today
          </h2>
          <p className="max-w-md text-sm text-slate-400">
            Add your SAM.gov expiration date to your calendar 90 days before it expires. Most contractors miss renewals due to distraction — a simple reminder prevents lapses.
          </p>
          <Link
            href="/register"
            className="rounded-lg bg-blue-500 px-8 py-3 text-base font-semibold text-white shadow-sm transition-all hover:bg-blue-400"
          >
            Search contracts free
          </Link>
        </div>

        {/* Related */}
        <div className="flex flex-col gap-4">
          <h2 className="text-xl font-semibold text-white">Related guides</h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {[
              { href: "/guides/sam-gov-registration", title: "Complete SAM.gov Registration Guide", desc: "Step-by-step guide for new registration" },
              { href: "/guides/sam-gov-registration-checklist", title: "SAM.gov Registration Checklist", desc: "Document checklist for the registration process" },
              { href: "/guides/find-government-contracts", title: "Find Government Contracts", desc: "Search federal contracts after registration" },
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
