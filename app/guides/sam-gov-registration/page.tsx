import type { Metadata } from "next";
import Link from "next/link";
import { CrossProductFooter } from "@/app/components/cross-product-footer";

export const metadata: Metadata = {
  title: "SAM.gov Registration Guide (Free, Step-by-Step) | GovScout",
  description:
    "Free step-by-step guide to registering on SAM.gov. Get your UEI, gather required documents, complete your entity registration, and start winning federal contracts. SAM.gov registration is 100% free.",
  keywords: [
    "sam.gov registration",
    "sam.gov registration renewal",
    "free sam.gov registration",
    "is sam.gov registration free",
    "sam.gov registration requirements",
    "sam.gov registration checklist",
    "how to register on sam.gov",
    "sam.gov registration step by step",
  ],
};

const steps = [
  {
    title: "Get Your Unique Entity Identifier (UEI)",
    content:
      "Before you can register on SAM.gov, you need a Unique Entity Identifier (UEI). As of April 2022, DUNS numbers are no longer required — the UEI replaced them entirely. You can request your UEI directly through SAM.gov during the registration process, or get one in advance at SAM.gov by selecting 'Get Started' and then 'Get a Unique Entity ID.' The UEI is assigned by the federal government at no cost. It typically takes 1–2 business days to receive your UEI, though it can take up to 2 weeks during peak periods. You will need your legal business name, physical address, and EIN (Employer Identification Number) or TIN (Taxpayer Identification Number) to request a UEI. If your business was previously registered with a DUNS number, your UEI was automatically assigned — check your SAM.gov account to find it.",
    tips: [
      "Your UEI is free — never pay a third party for one",
      "Have your EIN/TIN ready before starting the process",
      "If you had a DUNS number, your UEI was assigned automatically",
      "Allow 1–2 business days for UEI assignment, up to 2 weeks during peak periods",
    ],
  },
  {
    title: "Gather Required Documents",
    content:
      "SAM.gov registration requires specific information and documents. Prepare these before starting so you can complete the process in one session. You will need: your UEI number, EIN/TIN from the IRS, your bank account information (routing number and account number for EFT payments), your business legal name exactly as it appears on IRS records, your physical business address (not a PO Box), your NAICS codes (the industry classification codes that describe what your business does), your CAGE code (you can get one during SAM.gov registration if you do not already have one), the name of an Electronic Business Point of Contact (EBiz POC) who will serve as the primary administrator, and information about your business size, ownership, and socio-economic status. Having all of this ready prevents the most common cause of stalled registrations: missing information that requires you to leave the form and come back later.",
    tips: [
      "Your legal business name must exactly match IRS records",
      "Use a physical address, not a PO box",
      "Know your NAICS codes — use the Census Bureau NAICS search tool to find them",
      "Your bank account info is needed for electronic fund transfers from the government",
      "Identify your EBiz POC before starting — they will receive a confirmation email",
    ],
  },
  {
    title: "Create a Login.gov Account",
    content:
      "SAM.gov uses Login.gov for authentication. If you do not already have a Login.gov account, you will need to create one. Go to login.gov and sign up with your government email or business email address. You will set up multi-factor authentication (MFA) — Login.gov requires either a phone number for SMS codes, an authentication app, or a security key. After creating your Login.gov account, go to SAM.gov and click 'Sign In' in the top right corner. This will redirect you to Login.gov to authenticate. Once signed in, SAM.gov will prompt you to start a new entity registration. Important: the email address you use for Login.gov should belong to the person who will serve as the EBiz POC — this person will receive all SAM.gov correspondence and will be responsible for maintaining the registration.",
    tips: [
      "Use your business email, not a personal one",
      "Set up MFA during account creation — it is required",
      "The Login.gov email should belong to your designated EBiz POC",
      "Bookmark both login.gov and sam.gov — you will return frequently",
    ],
  },
  {
    title: "Complete Your Entity Registration",
    content:
      "Once signed in to SAM.gov, select 'Get Started' then 'Register Your Entity.' The registration process has several sections: Core Data (legal name, address, UEI), Assertions (business types, goods/services, size), Representations and Certifications (socio-economic status, trade agreements), and Points of Contact (EBiz POC, government POC, accounts receivable). Each section must be completed before you can submit. The Core Data section is where you enter your UEI, legal business name, physical address, and business start date. In Assertions, you will select your NAICS codes, Product Service Codes (PSCs), and business type (corporation, LLC, sole proprietorship, etc.). Representations and Certifications is the longest section — it includes questions about ownership, size, trade compliance, and socio-economic certifications. Answer every question carefully — inaccurate representations can result in penalties under federal law. The entire process takes 45–60 minutes if you have all your documents ready.",
    tips: [
      "Complete all sections in one session if possible to avoid losing progress",
      "Select all relevant NAICS codes — you can add up to 5 primary and unlimited secondary",
      "Representations and Certifications answers have legal weight — be accurate",
      "Save your progress frequently using the 'Save' button at the bottom of each page",
    ],
  },
  {
    title: "Submit and Wait for Validation",
    content:
      "After completing all sections, review your registration carefully and click 'Submit.' SAM.gov will validate your information against IRS and other federal databases. This validation process takes 7–10 business days for new registrations, and can take up to 25 business days during peak periods or if there are issues with your submission. Common reasons for validation delays: your business name does not match IRS records exactly, your EIN is incorrect, your bank account information cannot be verified, or your physical address cannot be confirmed. If your registration is rejected, SAM.gov will send an email to your EBiz POC explaining the issue — fix it and resubmit. Once validated, your entity will appear in SAM.gov searches and you will be eligible to bid on federal contracts, receive government purchase orders, and get paid via electronic fund transfer.",
    tips: [
      "New registrations take 7–10 business days, sometimes up to 25",
      "Check your EBiz POC email regularly for validation status updates",
      "If rejected, the email will explain why — fix the issue and resubmit",
      "You cannot bid on contracts until validation is complete",
      "Once active, your registration is public and searchable by contracting officers",
    ],
  },
  {
    title: "Renew Annually",
    content:
      "SAM.gov registrations expire after one year. You must renew your registration annually to remain eligible for federal contracts. SAM.gov sends reminder emails to your EBiz POC 60, 30, and 15 days before expiration. Renewal requires you to review and confirm all your information — update anything that has changed (address, bank account, NAICS codes, business size, certifications). The renewal process takes 10–20 minutes if nothing has changed. Validation of renewals is typically faster than new registrations, usually 3–5 business days. If your registration lapses, you cannot receive new contract awards or payments on existing contracts until it is renewed and revalidated. Set a calendar reminder 90 days before your expiration date to give yourself plenty of buffer. Many contractors set a recurring annual reminder to avoid the risk of lapsing.",
    tips: [
      "Registration expires exactly one year after activation",
      "Start renewal 60+ days before expiration to allow for validation time",
      "Update all changed information during renewal — outdated info causes delays",
      "A lapsed registration halts payments on existing contracts",
      "Set a calendar reminder 90 days before expiration as a safety buffer",
    ],
  },
];

const faqs = [
  {
    question: "Is SAM.gov registration free?",
    answer:
      "Yes, SAM.gov registration is 100% free. The federal government does not charge any fee to register, renew, or maintain your SAM.gov entity registration. Any website, service, or individual that asks you to pay for SAM.gov registration is a scam. The only official website for registration is SAM.gov — not sam.com, sam-gov.com, or any other variation. If you receive unsolicited calls, emails, or letters offering to register you on SAM.gov for a fee, report them to the GSA at reportfraud@gsa.gov.",
  },
  {
    question: "How long does SAM.gov registration take?",
    answer:
      "The registration form itself takes 45–60 minutes to complete if you have all required documents ready. After submission, validation by the federal government takes 7–10 business days for new registrations. During peak periods (especially around the federal fiscal year end in September), validation can take up to 25 business days. Renewals are faster, typically 3–5 business days for validation. To minimize delays, ensure your legal business name matches IRS records exactly and your bank account information is accurate.",
  },
  {
    question: "What documents do I need for SAM.gov registration?",
    answer:
      "You need: your Unique Entity Identifier (UEI), EIN or TIN from the IRS, bank account information (routing and account numbers for EFT), your legal business name as it appears on IRS records, physical business address, NAICS codes for your industry, and the name and email of your Electronic Business Point of Contact (EBiz POC). You will also need to know your business type (LLC, corporation, sole proprietorship), ownership details, and any socio-economic certifications you hold (8(a), WOSB, SDVOSB, HUBZone).",
  },
  {
    question: "What is SAM.gov registration checklist?",
    answer:
      "Your SAM.gov registration checklist: (1) Get a UEI number at SAM.gov — free, takes 1–2 business days; (2) Gather your EIN/TIN, bank account details, and business documents; (3) Identify your NAICS codes using the Census Bureau NAICS search; (4) Create a Login.gov account with your business email; (5) Designate an Electronic Business POC; (6) Complete all four registration sections: Core Data, Assertions, Representations and Certifications, and Points of Contact; (7) Review and submit; (8) Wait 7–10 business days for validation; (9) Set an annual renewal reminder.",
  },
  {
    question: "What happens if my SAM.gov registration expires?",
    answer:
      "If your SAM.gov registration expires, you cannot receive new federal contract awards, respond to solicitations, or receive payments on existing contracts until the registration is renewed and revalidated. Contracting officers check SAM.gov status before awarding contracts — an expired registration automatically disqualifies you. Renewal validation takes 3–5 business days, so you could lose weeks of contracting eligibility if you let it lapse. SAM.gov sends reminders 60, 30, and 15 days before expiration to your EBiz POC email.",
  },
  {
    question: "Can I register on SAM.gov as a sole proprietor?",
    answer:
      "Yes. Sole proprietors, LLCs, corporations, nonprofits, and other entity types can all register on SAM.gov. Sole proprietors use their Social Security Number (SSN) as their TIN if they do not have an EIN, though getting an EIN from the IRS is recommended to avoid sharing your SSN. The registration process is the same regardless of business structure. Sole proprietors should pay special attention to the Representations and Certifications section, as some questions about ownership and business size apply differently to single-person businesses.",
  },
  {
    question: "How do I avoid SAM.gov registration scams?",
    answer:
      "Only use the official website: SAM.gov. Never pay anyone to register you — registration is free. Ignore unsolicited calls, emails, or mailings offering SAM.gov registration services for a fee. Common scam signs: urgent deadlines, threats of losing your registration, requests for payment by wire or gift card, and websites that look like SAM.gov but have different URLs (sam-gov.com, sams.gov, etc.). Report suspected scams to the GSA Office of Inspector General at reportfraud@gsa.gov or call 1-800-424-5210.",
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

export default function SamGovRegistrationGuidePage() {
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
          <Link href="/saved-searches" className="text-sm font-medium text-slate-400 transition-colors hover:text-blue-400">Saved Searches</Link>
          <Link href="/guides" className="text-sm font-medium text-blue-400 transition-colors hover:text-blue-300">Guides</Link>
          <Link href="/pricing" className="text-sm font-medium text-slate-400 transition-colors hover:text-blue-400">Pricing</Link>
        </div>
      </header>

      <main className="mx-auto flex w-full max-w-3xl flex-col gap-10 px-4 py-12">
        {/* Hero */}
        <div className="flex flex-col gap-4">
          <p className="text-sm font-medium text-blue-400">Guide</p>
          <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            SAM.gov Registration Guide
            <span className="block text-blue-400">Free, Step-by-Step</span>
          </h1>
          <p className="text-lg text-slate-400">
            SAM.gov (System for Award Management) is the official government database for businesses that want to work with the federal government. Every business must register on SAM.gov before it can bid on contracts, receive purchase orders, or get paid. This guide walks you through the entire process — from getting your UEI to annual renewal.
          </p>
        </div>

        {/* Scam Warning */}
        <div className="rounded-lg border border-red-900/50 bg-red-950/30 p-6">
          <div className="flex items-start gap-3">
            <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-red-900/50 text-red-300">
              <svg viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5">
                <path fillRule="evenodd" d="M8.485 2.495c.673-1.167 2.357-1.167 3.03 0l6.28 10.875c.673 1.167-.17 2.625-1.516 2.625H3.72c-1.347 0-2.189-1.458-1.515-2.625L8.485 2.495zM10 5a.75.75 0 01.75.75v3.5a.75.75 0 01-1.5 0v-3.5A.75.75 0 0110 5zm0 9a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
              </svg>
            </div>
            <div>
              <h2 className="text-lg font-bold text-red-300">SAM.gov Registration is 100% FREE</h2>
              <p className="mt-2 text-sm leading-relaxed text-red-200/80">
                The federal government does not charge any fee to register on SAM.gov. <strong className="text-red-200">Any website, company, or individual asking you to pay for SAM.gov registration is a scam.</strong> The only official registration website is <strong className="text-red-200">SAM.gov</strong> — not sam.com, sam-gov.com, sams.gov, or any other variation. If you receive unsolicited calls, emails, or letters offering to register you for a fee, report them to the GSA at reportfraud@gsa.gov.
              </p>
            </div>
          </div>
        </div>

        {/* What is SAM.gov */}
        <div className="flex flex-col gap-4 rounded-lg border border-slate-800 bg-slate-900 p-6">
          <h2 className="text-xl font-semibold text-white">What is SAM.gov?</h2>
          <div className="space-y-3 text-sm leading-relaxed text-slate-400">
            <p>
              SAM.gov (System for Award Management) is the official U.S. government website where businesses register to do business with the federal government. It consolidated several legacy systems including CCR (Central Contractor Registration), ORCA, and EPLS into a single platform managed by the General Services Administration (GSA).
            </p>
            <p>
              Registration on SAM.gov is mandatory for any business that wants to receive federal contracts, grants, or assistance awards. Contracting officers search SAM.gov to find eligible vendors, verify business information, and confirm that entities are not suspended or debarred. Over 900,000 entities are currently registered on SAM.gov, and the federal government awards over $700 billion in contracts and grants annually through entities found in this system.
            </p>
            <p>
              SAM.gov registration serves multiple purposes: it assigns you a CAGE code (Commercial and Government Entity code), validates your business against IRS and banking records, establishes your socio-economic certifications for set-aside programs, and makes your business visible to every contracting officer in the federal government. Without an active SAM.gov registration, you simply cannot participate in federal procurement — no exceptions.
            </p>
          </div>
        </div>

        {/* Requirements overview */}
        <div className="flex flex-col gap-4 rounded-lg border border-slate-800 bg-slate-900 p-6">
          <h2 className="text-xl font-semibold text-white">SAM.gov registration requirements</h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {[
              { label: "Unique Entity Identifier (UEI)", detail: "Free — obtained through SAM.gov" },
              { label: "EIN or TIN", detail: "From IRS — SSN ok for sole proprietors" },
              { label: "Bank account info", detail: "Routing + account number for EFT" },
              { label: "Legal business name", detail: "Must match IRS records exactly" },
              { label: "Physical address", detail: "No PO boxes accepted" },
              { label: "NAICS codes", detail: "Your industry classification codes" },
              { label: "EBiz POC", detail: "Person who manages the registration" },
              { label: "Login.gov account", detail: "With multi-factor authentication" },
            ].map((item) => (
              <div key={item.label} className="rounded-md bg-slate-950 p-3">
                <p className="text-sm font-semibold text-white">{item.label}</p>
                <p className="mt-0.5 text-xs text-slate-500">{item.detail}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Step-by-step */}
        <div className="flex flex-col gap-6">
          <h2 className="text-xl font-semibold text-white">Step-by-step registration process</h2>
          {steps.map((step, i) => (
            <div key={i} className="flex flex-col gap-4 rounded-lg border border-slate-800 bg-slate-900 p-5">
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-900/50 text-sm font-bold text-blue-300">
                  {i + 1}
                </div>
                <h3 className="text-lg font-semibold text-white">{step.title}</h3>
              </div>
              <p className="text-sm leading-relaxed text-slate-400">{step.content}</p>
              <div className="rounded-md bg-slate-950 p-4">
                <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-blue-400">Tips</p>
                <ul className="space-y-1.5 text-sm text-slate-400">
                  {step.tips.map((tip, j) => (
                    <li key={j} className="flex gap-2">
                      <span className="mt-0.5 text-blue-400">&bull;</span>
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* Registration timeline */}
        <div className="flex flex-col gap-4 rounded-lg border border-slate-800 bg-slate-900 p-6">
          <h2 className="text-xl font-semibold text-white">Registration timeline</h2>
          <div className="space-y-3 text-sm text-slate-400">
            {[
              { phase: "Get UEI", time: "1–2 business days (up to 2 weeks peak)" },
              { phase: "Gather documents", time: "30 minutes if organized" },
              { phase: "Create Login.gov account", time: "5–10 minutes" },
              { phase: "Complete registration form", time: "45–60 minutes" },
              { phase: "Government validation", time: "7–10 business days (up to 25 peak)" },
              { phase: "Total time to active registration", time: "2–4 weeks typical" },
            ].map((item) => (
              <div key={item.phase} className="flex items-center justify-between border-b border-slate-800 pb-2 last:border-0 last:pb-0">
                <span className="font-medium text-white">{item.phase}</span>
                <span className="text-slate-500">{item.time}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Common mistakes */}
        <div className="flex flex-col gap-4">
          <h2 className="text-xl font-semibold text-white">Common registration mistakes to avoid</h2>
          <div className="space-y-4 text-sm leading-relaxed text-slate-400">
            <h3 className="font-semibold text-white text-base">Business name mismatch</h3>
            <p>
              The number one cause of registration rejection is a business name that does not match IRS records exactly. If the IRS has your business as &quot;Smith Consulting LLC&quot; and you register as &quot;Smith Consulting&quot; (without LLC), your registration will be rejected. Check your EIN confirmation letter from the IRS to find your exact legal name. Even differences in punctuation, spacing, or capitalization can cause issues.
            </p>
            <h3 className="font-semibold text-white text-base">Using a PO box</h3>
            <p>
              SAM.gov requires a physical business address — PO boxes are not accepted. If you work from home, use your home address. If you use a virtual office service, make sure it provides a physical suite address, not just a mailbox number. The address must be verifiable against postal service records.
            </p>
            <h3 className="font-semibold text-white text-base">Wrong bank information</h3>
            <p>
              Your bank account information is validated during the registration process. If your routing number or account number is incorrect, your registration will be delayed. Double-check these numbers against a voided check or your bank&apos;s online portal. The account must be in the same legal name as your entity registration.
            </p>
            <h3 className="font-semibold text-white text-base">Forgetting to renew</h3>
            <p>
              SAM.gov registrations expire after exactly one year. A lapsed registration means you cannot receive contract awards or payments. Many businesses lose weeks of eligibility because they forgot to renew. Set a calendar reminder 90 days before expiration and begin the renewal process at least 60 days early to allow for validation.
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="flex flex-col items-center gap-4 rounded-xl border border-blue-900/30 bg-blue-950/20 p-8 text-center">
          <h2 className="text-2xl font-bold text-white">
            Already registered? Find contracts that match your NAICS codes
          </h2>
          <p className="max-w-md text-sm text-slate-400">
            Search federal contract awards by NAICS code, set-aside type, and agency. See who is winning in your industry, how much they are getting, and where the opportunities are.
          </p>
          <Link
            href="/"
            className="rounded-lg bg-blue-500 px-8 py-3 text-base font-semibold text-white shadow-sm transition-all hover:bg-blue-400"
          >
            Search contracts free
          </Link>
          <Link
            href="/pricing"
            className="text-sm text-blue-400 transition-colors hover:text-blue-300"
          >
            See GovScout Pro features
          </Link>
        </div>

        {/* Related guides */}
        <div className="flex flex-col gap-4">
          <h2 className="text-xl font-semibold text-white">Related guides</h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {[
              { name: "How to Find Government Contracts", desc: "Step-by-step from registration to winning bids", href: "/guides/find-government-contracts" },
              { name: "Capability Statement Template", desc: "Free template with section-by-section breakdown", href: "/guides/capability-statement-template" },
              { name: "8(a) Set-Aside Contracts", desc: "Eligibility, certification, and sole-source thresholds", href: "/guides/8a-set-aside-contracts" },
              { name: "Small Business Set-Asides", desc: "SBA size standards and general small business reservations", href: "/guides/small-business-set-aside" },
            ].map((guide) => (
              <Link
                key={guide.href}
                href={guide.href}
                className="rounded-lg border border-slate-800 bg-slate-900 p-4 transition-colors hover:border-blue-900"
              >
                <h3 className="font-semibold text-white">{guide.name}</h3>
                <p className="mt-1 text-sm text-slate-400">{guide.desc}</p>
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
