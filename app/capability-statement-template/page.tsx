import type { Metadata } from "next";
import Link from "next/link";
import { CrossProductFooter } from "@/app/components/cross-product-footer";

const baseUrl = "https://federal-contract-tracker-moltcorporation.vercel.app";

export const metadata: Metadata = {
  title: "Capability Statement Template | Free Downloads & Guide | GovScout",
  description:
    "Download a free, editable capability statement template in Word or PDF. Use our step-by-step guide to write a capability statement that wins federal contracts.",
  keywords: [
    "capability statement template",
    "capability statement template word",
    "capability statement template free",
    "capability statement template pdf",
    "template for capability statement",
    "capability statement example",
  ],
  alternates: {
    canonical: `${baseUrl}/capability-statement-template`,
  },
  openGraph: {
    title: "Capability Statement Template | Download Free Word & PDF",
    description:
      "Get a free, ready-to-use capability statement template. Download in Word or PDF and fill in your details — start winning federal contracts today.",
    type: "website",
    siteName: "GovScout",
  },
};

const faqs = [
  {
    question: "What is a capability statement?",
    answer:
      "A capability statement is a one-page document that markets your company to federal contracting officers. It includes your company overview, core competencies, past performance, certifications, and contact information. Every small business pursuing government contracts needs one — it is the first document contracting officers request when evaluating vendors.",
  },
  {
    question: "Is this template free to use?",
    answer:
      "Yes, completely free. Download the Word or PDF template and customize it for your business. No signup, no watermarks, no hidden fees. Use it for unlimited versions of your capability statement.",
  },
  {
    question: "Can I edit the Word template?",
    answer:
      "Yes. The Word template is fully editable in Microsoft Word, Google Docs, and LibreOffice. Change fonts, colors, layouts, and branding to match your company. The PDF version has fillable fields for quick turnaround.",
  },
  {
    question: "How long should my capability statement be?",
    answer:
      "One page is ideal. Contracting officers spend 30–60 seconds on each capability statement. Keep it concise — everything important should be visible without scrolling. Use a second page only for an extended past performance list.",
  },
  {
    question: "Can I use the same statement for all agencies?",
    answer:
      "Not if you want to win. A tailored capability statement outperforms a generic one by 3–5x. Use our template as a master, then customize it for each agency: reorder competencies, highlight relevant past performance, and emphasize differentiators that matter to that specific buyer.",
  },
  {
    question: "Should I include my company logo?",
    answer:
      "Yes, keep it professional but minimal. Use your logo in the header, but do not let design overshadow content. Contracting officers want information — company name, NAICS codes, core competencies, past performance. A fancy design is less effective than clear, scannable content.",
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

export default function CapabilityStatementTemplatePage() {
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
          <p className="text-sm font-medium text-blue-400">Templates</p>
          <h1 className="text-4xl font-extrabold tracking-tight text-white">
            Capability Statement Template
          </h1>
          <p className="text-lg text-slate-400">
            Download a free, ready-to-use capability statement template. Choose Word for full design control or PDF for quick turnaround. Fill in your details and send to contracting officers today.
          </p>
        </div>

        {/* CTA: Download templates */}
        <div className="grid gap-4 sm:grid-cols-2">
          <Link
            href="/capability-statement-template-word"
            className="group flex flex-col gap-3 rounded-lg border border-slate-800 bg-blue-950/20 border-blue-900/30 p-6 transition-colors hover:border-blue-600"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-blue-900/40">
                <svg className="h-6 w-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <div>
                <span className="rounded bg-blue-900/50 px-2 py-0.5 text-xs font-medium text-blue-300">WORD</span>
              </div>
            </div>
            <h2 className="text-xl font-semibold text-white group-hover:text-blue-300">Word Template</h2>
            <p className="text-sm text-slate-400">Fully editable. Customize fonts, colors, layout, and branding. Best for teams with design control.</p>
            <p className="text-xs text-blue-400 font-medium">Download free</p>
          </Link>

          <Link
            href="/capability-statement-template-pdf"
            className="group flex flex-col gap-3 rounded-lg border border-slate-800 bg-slate-900 p-6 transition-colors hover:border-blue-600"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-blue-900/40">
                <svg className="h-6 w-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <span className="rounded bg-slate-800 px-2 py-0.5 text-xs font-medium text-slate-300">PDF</span>
              </div>
            </div>
            <h2 className="text-xl font-semibold text-white group-hover:text-blue-300">PDF Template</h2>
            <p className="text-sm text-slate-400">Print-ready with fillable fields. Get a professional result in minutes. Best for quick turnaround.</p>
            <p className="text-xs text-blue-400 font-medium">Download free</p>
          </Link>
        </div>

        {/* What goes in it */}
        <div className="flex flex-col gap-4 rounded-lg border border-slate-800 bg-slate-900 p-6">
          <h2 className="text-xl font-semibold text-white">What goes in a capability statement?</h2>
          <div className="space-y-4">
            {[
              { title: "Company Overview", detail: "Legal name, UEI, CAGE code, NAICS codes, small business status, employee count" },
              { title: "Core Competencies", detail: "4–8 specific capabilities using language from federal solicitations" },
              { title: "Past Performance", detail: "3–5 completed contracts with agency name, value, and quantified results" },
              { title: "Differentiators", detail: "Set-aside certifications (8(a), WOSB, SDVOSB, HUBZone), clearances, awards" },
              { title: "Contact Information", detail: "Direct contact name, phone, email, physical address, website" },
            ].map((item) => (
              <div key={item.title} className="flex gap-3">
                <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-900/50 text-xs font-bold text-blue-300">✓</div>
                <div>
                  <p className="font-semibold text-white">{item.title}</p>
                  <p className="text-sm text-slate-400">{item.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Why it matters */}
        <div className="flex flex-col gap-4">
          <h2 className="text-xl font-semibold text-white">Why you need a capability statement</h2>
          <div className="space-y-4 text-sm leading-relaxed text-slate-400">
            <p>
              The federal government awards over <strong className="text-white">$160 billion per year</strong> to small businesses. But contracting officers do not find vendors on Google — they review capability statements submitted at industry days, stored in government databases, and attached to networking emails.
            </p>
            <p>
              <strong className="text-white">Without a capability statement, you are invisible to the largest buyer in the world.</strong> With one, you have a professional document that proves your qualifications in the 30–60 seconds a contracting officer spends evaluating each vendor.
            </p>
            <p>
              Our free template gives you the exact structure and format that contracting officers expect. Download it, fill in your details, and use it to reach hundreds of government buyers.
            </p>
          </div>
        </div>

        {/* How to use it */}
        <div className="flex flex-col gap-4">
          <h2 className="text-xl font-semibold text-white">How to use your capability statement</h2>
          <div className="space-y-3 text-sm">
            {[
              { step: 1, action: "Email", detail: "Attach it when reaching out to contracting officers and agency procurement contacts" },
              { step: 2, action: "Industry Days", detail: "Bring printed copies to networking events, matchmaking conferences, and agency outreach" },
              { step: 3, action: "SAM.gov", detail: "Upload it to your SAM.gov profile so federal buyers can find it during searches" },
              { step: 4, action: "Subcontracting", detail: "Include it in proposals to prime contractors looking for qualified subcontractors" },
              { step: 5, action: "Database Uploads", detail: "Submit it through agency OSDBU portals and small business databases" },
            ].map((item) => (
              <div key={item.step} className="flex gap-4 rounded-lg border border-slate-800 bg-slate-900 p-4">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-900/50 text-sm font-bold text-blue-300">
                  {item.step}
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-white">{item.action}</p>
                  <p className="text-sm text-slate-400">{item.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="flex flex-col items-center gap-4 rounded-xl border border-blue-900/30 bg-blue-950/20 p-8 text-center">
          <h2 className="text-2xl font-bold text-white">
            Ready to get your first contract?
          </h2>
          <p className="max-w-md text-sm text-slate-400">
            Once your capability statement is done, use GovScout to find contracts that match your capabilities. Search by NAICS code, set-aside type, and agency.
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
          <h2 className="text-xl font-semibold text-white">Learn more</h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {[
              { href: "/small-business-capability-statement", title: "Beginner's Guide", desc: "Step-by-step walkthrough for small businesses new to federal contracting" },
              { href: "/guides/capability-statement-template", title: "Detailed Template Guide", desc: "Section-by-section breakdown with examples and insider tips" },
              { href: "/guides/sam-gov-registration", title: "SAM.gov Registration", desc: "Get your UEI and CAGE code — required for every capability statement" },
              { href: "/guides/find-government-contracts", title: "Find Government Contracts", desc: "Search federal contract awards and identify your next opportunity" },
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
