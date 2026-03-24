import type { Metadata } from "next";
import Link from "next/link";
import { CrossProductFooter } from "@/app/components/cross-product-footer";

const baseUrl = "https://federal-contract-tracker-moltcorporation.vercel.app";

export const metadata: Metadata = {
  title: "SAM.gov Registration Checklist | Complete Step-by-Step | GovScout",
  description:
    "Complete SAM.gov registration checklist. Get your UEI, gather documents, create Login.gov account, and register your business on SAM.gov. Printable checklist with step-by-step guide.",
  keywords: [
    "sam.gov registration checklist",
    "sam.gov registration steps",
    "sam.gov registration requirements",
    "sam.gov registration documents needed",
    "how to register on sam.gov",
    "sam.gov registration process",
  ],
  alternates: {
    canonical: `${baseUrl}/guides/sam-gov-registration-checklist`,
  },
  openGraph: {
    title: "SAM.gov Registration Checklist | Step-by-Step",
    description:
      "Printable checklist for SAM.gov registration. Never miss a document or requirement.",
    type: "website",
    siteName: "GovScout",
  },
};

const faqs = [
  {
    question: "What documents do I need for SAM.gov registration?",
    answer:
      "You need your UEI number, EIN/TIN from the IRS, business legal name (exactly as on IRS records), physical business address, NAICS codes, bank account routing and account numbers, and information about business size and ownership. Have all of this ready before you start.",
  },
  {
    question: "How long does SAM.gov registration take?",
    answer:
      "Registration takes 45–60 minutes if you have all documents ready. Validation takes 7–10 business days for new registrations, sometimes up to 25 days during peak periods.",
  },
  {
    question: "Can I save my SAM.gov registration progress?",
    answer:
      "Yes, you can save your progress using the Save button on each section. However, it is faster to complete all sections in one session if possible to avoid confusion.",
  },
  {
    question: "What happens if my SAM.gov registration is rejected?",
    answer:
      "SAM.gov will email your point of contact explaining why. Common reasons: business name does not match IRS records, incorrect EIN, invalid bank account, or unverifiable address. Fix the issue and resubmit.",
  },
  {
    question: "Is there a fee to register on SAM.gov?",
    answer:
      "No, SAM.gov registration is 100% free. Never pay a third party to register you — it is a scam. Report suspicious registration services to reportfraud@gsa.gov.",
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

export default function SamGovRegistrationChecklistPage() {
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
            SAM.gov Registration Checklist
          </h1>
          <p className="text-lg text-slate-400">
            Complete step-by-step checklist to register your business on SAM.gov. Never miss a document or requirement.
          </p>
        </div>

        {/* Before you start */}
        <div className="flex flex-col gap-4 rounded-lg border border-slate-800 bg-slate-900 p-6">
          <h2 className="text-xl font-semibold text-white">Before you start</h2>
          <div className="space-y-3 text-sm leading-relaxed text-slate-400">
            <p>
              Gather all required documents and information before starting. The registration process takes 45–60 minutes with everything ready, but can take hours if you stop to look for documents.
            </p>
            <p>
              <strong className="text-white">Time estimate:</strong> 45–60 minutes to complete registration, then 7–10 business days for validation.
            </p>
          </div>
        </div>

        {/* Documents & Information Checklist */}
        <div className="flex flex-col gap-4">
          <h2 className="text-xl font-semibold text-white">Documents & Information You Need</h2>
          <div className="space-y-2">
            {[
              { item: "Unique Entity Identifier (UEI)", note: "Request free from SAM.gov before registering (1-2 business days)" },
              { item: "Employer Identification Number (EIN) or Tax ID (TIN)", note: "From IRS — have this exact number ready" },
              { item: "Legal business name", note: "Must exactly match IRS records" },
              { item: "Physical business address", note: "Not a PO box — must be verified" },
              { item: "Primary NAICS codes", note: "Industry classification — use Census Bureau NAICS search" },
              { item: "Bank account information", note: "Routing number and account number for EFT payments" },
              { item: "CAGE code (optional)", note: "Can obtain during registration if you don't have one" },
              { item: "Electronic Business Point of Contact (EBiz POC) name", note: "Person who will manage the account — receives all emails" },
              { item: "Business size and ownership information", note: "Employee count, revenue, ownership structure, socio-economic status" },
              { item: "Login.gov account", note: "Create before starting SAM.gov registration — uses your EBiz POC email" },
            ].map((checklist, idx) => (
              <div key={idx} className="flex gap-3 rounded-lg border border-slate-800 bg-slate-950 p-3">
                <input type="checkbox" className="h-4 w-4 shrink-0 rounded border-slate-700 bg-slate-800 text-blue-500 cursor-pointer mt-0.5" />
                <div className="flex-1">
                  <p className="font-semibold text-white">{checklist.item}</p>
                  <p className="text-xs text-slate-500">{checklist.note}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Registration Process Checklist */}
        <div className="flex flex-col gap-4">
          <h2 className="text-xl font-semibold text-white">Registration Process Steps</h2>
          <div className="space-y-2">
            {[
              { step: 1, action: "Create/Confirm Login.gov Account", detail: "Go to login.gov, sign up with business email, set up multi-factor authentication (MFA)" },
              { step: 2, action: "Get Your UEI (if not already assigned)", detail: "Go to SAM.gov and select 'Get Started' → 'Get a Unique Entity ID' — takes 1-2 business days" },
              { step: 3, action: "Sign in to SAM.gov", detail: "Use your Login.gov credentials to access SAM.gov" },
              { step: 4, action: "Select 'Register Your Entity'", detail: "Click 'Get Started' then 'Register Your Entity'" },
              { step: 5, action: "Complete Core Data Section", detail: "Enter UEI, legal name, physical address, business start date" },
              { step: 6, action: "Complete Assertions Section", detail: "Select NAICS codes, Product Service Codes (PSCs), business type" },
              { step: 7, action: "Complete Representations & Certifications", detail: "Answer all questions about size, ownership, compliance, certifications (takes longest)" },
              { step: 8, action: "Add Points of Contact", detail: "Identify EBiz POC, government POC, accounts receivable contact" },
              { step: 9, action: "Review All Information", detail: "Double-check everything — errors cause rejection and delays" },
              { step: 10, action: "Submit Registration", detail: "Click Submit — SAM.gov will begin validation (7-10 business days)" },
              { step: 11, action: "Monitor Email for Status", detail: "EBiz POC will receive validation updates — check regularly" },
              { step: 12, action: "Receive Activation Confirmation", detail: "Once validated, you can search for contracts and receive payments" },
            ].map((checklist) => (
              <div key={checklist.step} className="flex gap-4 rounded-lg border border-slate-800 bg-slate-900 p-4">
                <input type="checkbox" className="h-5 w-5 shrink-0 rounded border-slate-700 bg-slate-800 text-blue-500 cursor-pointer flex-none mt-0.5" />
                <div className="flex-1">
                  <p className="font-semibold text-white">{checklist.step}. {checklist.action}</p>
                  <p className="text-sm text-slate-400 mt-1">{checklist.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* After Validation */}
        <div className="flex flex-col gap-4 rounded-lg border border-blue-900/30 bg-blue-950/20 p-6">
          <h2 className="text-xl font-semibold text-white">After Your Registration Is Validated</h2>
          <ul className="space-y-2 text-sm text-slate-400">
            <li className="flex gap-2">
              <span className="text-blue-400 font-bold shrink-0">✓</span>
              <span>You can search for and bid on federal contracts</span>
            </li>
            <li className="flex gap-2">
              <span className="text-blue-400 font-bold shrink-0">✓</span>
              <span>Contracting officers can find you when they search SAM.gov</span>
            </li>
            <li className="flex gap-2">
              <span className="text-blue-400 font-bold shrink-0">✓</span>
              <span>You can receive payments via electronic fund transfer (EFT)</span>
            </li>
            <li className="flex gap-2">
              <span className="text-blue-400 font-bold shrink-0">✓</span>
              <span>You must renew annually or your registration will lapse</span>
            </li>
          </ul>
        </div>

        {/* CTA */}
        <div className="flex flex-col items-center gap-4 rounded-xl border border-blue-900/30 bg-blue-950/20 p-8 text-center">
          <h2 className="text-2xl font-bold text-white">
            Ready to search for contracts?
          </h2>
          <p className="max-w-md text-sm text-slate-400">
            Once your SAM.gov registration is active, use GovScout to find federal contracts that match your NAICS codes and capabilities.
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
              { href: "/guides/sam-gov-registration", title: "Complete SAM.gov Registration Guide", desc: "Detailed step-by-step guide with FAQs and insider tips" },
              { href: "/guides/sam-gov-renewal", title: "SAM.gov Renewal Guide", desc: "How to renew your registration before it expires" },
              { href: "/guides/find-government-contracts", title: "Find Government Contracts", desc: "Search federal contracts by NAICS, agency, and set-aside" },
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
