import type { Metadata } from "next";
import Link from "next/link";
import { CrossProductFooter } from "@/app/components/cross-product-footer";

const baseUrl = "https://federal-contract-tracker-moltcorporation.vercel.app";

export const metadata: Metadata = {
  title: "Free Capability Statement Templates | GovScout",
  description:
    "Free capability statement templates for government contractors. Download in Word, PDF, or build from scratch. Step-by-step guide with examples for federal contracting.",
  keywords: [
    "capability statement template",
    "capability statement template word",
    "template for capability statement",
    "capability statement template free",
    "capability statement template pdf",
    "business capability statement template",
    "small business capability statement",
  ],
  alternates: {
    canonical: `${baseUrl}/capability-statement-templates`,
  },
  openGraph: {
    title: "Free Capability Statement Templates | GovScout",
    description:
      "Download free capability statement templates in Word and PDF. Build your federal contracting resume in minutes.",
    type: "website",
    siteName: "GovScout",
  },
};

const templates = [
  {
    title: "Word Template",
    description:
      "Editable .docx format — open in Microsoft Word, Google Docs, or LibreOffice. Best for teams that need to customize branding and layout.",
    href: "/capability-statement-template-word",
    format: "DOCX",
    icon: "M4 4v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6H6a2 2 0 00-2 2zm8-1v5h5",
  },
  {
    title: "PDF Template",
    description:
      "Print-ready PDF with fillable fields. Best for quick turnaround — fill in your details and send same day.",
    href: "/capability-statement-template-pdf",
    format: "PDF",
    icon: "M7 21h10a2 2 0 002-2V9l-5-5H7a2 2 0 00-2 2v13a2 2 0 002 2zm7-18v5h5M9 13h6M9 17h4",
  },
  {
    title: "Small Business Guide",
    description:
      "Complete beginner guide for small businesses new to federal contracting. Walks through every section with real examples.",
    href: "/small-business-capability-statement",
    format: "Guide",
    icon: "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253",
  },
  {
    title: "Detailed Section Breakdown",
    description:
      "In-depth guide covering every section of a capability statement — company overview, core competencies, past performance, and differentiators.",
    href: "/guides/capability-statement-template",
    format: "Guide",
    icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4",
  },
];

const faqs = [
  {
    question: "What is a capability statement?",
    answer:
      "A capability statement is a one-page marketing document that summarizes your business for government buyers. It includes your company overview, core competencies, past performance, differentiators, and contact information. Every small business pursuing federal contracts needs one — it is the first document a contracting officer requests when evaluating potential vendors.",
  },
  {
    question: "Which template format should I choose?",
    answer:
      "Choose Word (.docx) if you need full control over layout, branding, and design — you can change fonts, colors, and add your logo. Choose PDF if you need a quick, professional result — fillable fields let you enter your details and send the same day. If you are new to federal contracting, start with our Small Business Guide to understand what goes in each section before picking a format.",
  },
  {
    question: "How long should a capability statement be?",
    answer:
      "One page is the standard. Contracting officers review dozens of capability statements and spend 30-60 seconds on each. A one-page format forces you to focus on what matters. Use a second page only for an extended past performance list. If you cannot fit everything on one page, you are including too much.",
  },
  {
    question: "Do I need a different capability statement for each agency?",
    answer:
      "Yes. A tailored capability statement outperforms a generic one by 3-5x in response rates. Keep a master template with all your information, then customize for each target: highlight competencies relevant to that agency, lead with similar past performance, and adjust differentiators to address the agency's known priorities.",
  },
  {
    question: "What NAICS codes should I include?",
    answer:
      "Include your primary NAICS code (the one that generates the most revenue) and 2-3 secondary codes for other services you offer. NAICS codes determine your size standard and which set-aside contracts you can pursue. Use our NAICS Code Lookup tool to find the right codes for your business.",
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

export default function CapabilityStatementTemplatesPage() {
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
          <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            Free Capability Statement Templates
            <span className="block text-blue-400">For Government Contractors</span>
          </h1>
          <p className="text-lg text-slate-400">
            Download a free capability statement template in Word or PDF format.
            Your capability statement is your company&apos;s resume for federal
            contracting — it tells contracting officers who you are, what you do,
            and why they should work with you.
          </p>
        </div>

        {/* Template cards */}
        <div className="grid gap-4 sm:grid-cols-2">
          {templates.map((t) => (
            <Link
              key={t.href}
              href={t.href}
              className="group flex flex-col gap-3 rounded-lg border border-slate-800 bg-slate-900 p-5 transition-colors hover:border-blue-600"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-900/40">
                  <svg className="h-5 w-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={t.icon} />
                  </svg>
                </div>
                <span className="rounded bg-slate-800 px-2 py-0.5 text-xs font-medium text-slate-300">{t.format}</span>
              </div>
              <h2 className="text-lg font-semibold text-white group-hover:text-blue-300">{t.title}</h2>
              <p className="text-sm text-slate-400">{t.description}</p>
            </Link>
          ))}
        </div>

        {/* What goes in a capability statement */}
        <div className="flex flex-col gap-4 rounded-lg border border-slate-800 bg-slate-900 p-6">
          <h2 className="text-xl font-semibold text-white">What goes in a capability statement?</h2>
          <div className="space-y-3 text-sm leading-relaxed text-slate-400">
            <p>
              Every capability statement includes five essential sections. These are
              the same whether you use Word, PDF, or build from scratch:
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {[
              { section: "Company Overview", detail: "Legal name, UEI, CAGE code, NAICS codes, small business status, year founded" },
              { section: "Core Competencies", detail: "4-8 specific capabilities using language from federal solicitations" },
              { section: "Past Performance", detail: "3-5 completed contracts with agency name, value, and quantified results" },
              { section: "Differentiators", detail: "Set-aside certifications (8(a), WOSB, SDVOSB, HUBZone), clearances, certifications" },
              { section: "Contact Information", detail: "Direct name, phone, email, physical address, website" },
            ].map((item) => (
              <div key={item.section} className="rounded-md border border-slate-800 bg-slate-950 p-4">
                <p className="text-sm font-semibold text-blue-400">{item.section}</p>
                <p className="mt-1 text-xs text-slate-500">{item.detail}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Why you need one */}
        <div className="flex flex-col gap-4">
          <h2 className="text-xl font-semibold text-white">Why every contractor needs a capability statement</h2>
          <div className="space-y-4 text-sm leading-relaxed text-slate-400">
            <p>
              The federal government awards over $160 billion per year to small
              businesses. But contracting officers do not search Google for
              vendors — they review capability statements collected at industry
              days, stored in OSDBU databases, and attached to emails from business
              development contacts.
            </p>
            <p>
              Without a capability statement, you are invisible to the largest
              buyer in the world. With one, you have a professional, scannable
              document that proves your qualifications in the 30-60 seconds a
              contracting officer spends evaluating each vendor.
            </p>
            <p>
              Our templates give you the structure and content guidance to create
              a capability statement that stands out. Choose Word for full design
              control, PDF for quick turnaround, or read our beginner guide if
              you are new to federal contracting.
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="flex flex-col items-center gap-4 rounded-xl border border-blue-900/30 bg-blue-950/20 p-8 text-center">
          <h2 className="text-2xl font-bold text-white">
            Find contracts that match your capabilities
          </h2>
          <p className="max-w-md text-sm text-slate-400">
            Once your capability statement is ready, use GovScout to find
            contracts by NAICS code, set-aside type, and agency. See who is
            winning work in your industry and where opportunities are.
          </p>
          <Link
            href="/register"
            className="rounded-lg bg-blue-500 px-8 py-3 text-base font-semibold text-white shadow-sm transition-all hover:bg-blue-400"
          >
            Search contracts free
          </Link>
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

        {/* Related */}
        <div className="flex flex-col gap-3">
          <p className="text-sm text-slate-600">
            Related:{" "}
            <Link href="/guides/naics-code-lookup" className="text-blue-400 hover:underline">NAICS Code Lookup</Link>
            {" · "}
            <Link href="/guides/sam-gov-registration" className="text-blue-400 hover:underline">SAM.gov Registration</Link>
            {" · "}
            <Link href="/guides/find-government-contracts" className="text-blue-400 hover:underline">Find Government Contracts</Link>
          </p>
        </div>
      </main>

      <CrossProductFooter />
    </div>
  );
}
