import type { Metadata } from "next";
import Link from "next/link";
import { CrossProductFooter } from "@/app/components/cross-product-footer";

const baseUrl = "https://federal-contract-tracker-moltcorporation.vercel.app";

export const metadata: Metadata = {
  title: "Capability Statement Template PDF | GovScout",
  description:
    "Free capability statement template in PDF format. Print-ready with fillable fields for government contractors. Download, fill in your details, and send to contracting officers the same day.",
  keywords: [
    "capability statement template pdf",
    "capability statement pdf",
    "capability statement template pdf free",
    "government contractor capability statement pdf",
    "fillable capability statement template",
    "capability statement printable",
  ],
  alternates: {
    canonical: `${baseUrl}/capability-statement-template-pdf`,
  },
  openGraph: {
    title: "Capability Statement Template PDF | GovScout",
    description:
      "Free print-ready PDF template for government contractor capability statements.",
    type: "website",
    siteName: "GovScout",
  },
};

const faqs = [
  {
    question: "Why use a PDF template for capability statements?",
    answer:
      "PDF is the standard format for submitting documents to government agencies. A PDF capability statement looks the same on every device, cannot be accidentally reformatted, and prints reliably. Fillable PDF fields let you enter your details directly without needing Word or design software. This is the best format when you need a professional result quickly.",
  },
  {
    question: "Can I edit the PDF after filling it out?",
    answer:
      "Fillable PDFs let you type into designated fields and save your entries. However, you cannot change the underlying layout, fonts, or section arrangement like you can with a Word template. If you need full design control, use our Word template instead. The PDF is best for quick turnaround — fill, save, and send.",
  },
  {
    question: "How do I print the capability statement PDF?",
    answer:
      "Print at 100% scale (do not 'fit to page') on letter-size paper (8.5 x 11 inches). Use a color printer for the best result — the section headers and accent colors help contracting officers scan the document. If printing in black and white, the template is designed to remain legible without color.",
  },
  {
    question: "Can I email the PDF to contracting officers?",
    answer:
      "Yes — PDF is the preferred attachment format for government communications. Keep the file under 2MB to avoid email filters. Name the file professionally: CompanyName_CapabilityStatement_2026.pdf. Many contracting officers store received capability statements in databases searchable by filename, so a clear name increases your visibility.",
  },
  {
    question: "What if I need to create multiple versions for different agencies?",
    answer:
      "Save a separate copy of the filled PDF for each agency. Change three things in each version: (1) reorder core competencies to match the agency's mission, (2) lead with past performance from similar agencies, (3) adjust differentiators to highlight what that specific agency cares about (clearances for DoD, compliance for civilian). For frequent customization, the Word template may be more efficient.",
  },
  {
    question: "Should I include my company logo in the PDF?",
    answer:
      "Yes. A logo makes your capability statement look professional and recognizable. The PDF template includes a placeholder area in the header for your logo. Use a high-resolution version (300 DPI minimum) so it prints cleanly. Keep the logo compact — it should not dominate the page.",
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

const advantages = [
  {
    title: "Universal compatibility",
    description: "Opens identically on Windows, Mac, iPhone, and Android. No font substitution, no layout shifts. What you see is what the contracting officer sees.",
  },
  {
    title: "Print-ready",
    description: "Pre-formatted for standard letter paper (8.5 x 11). Margins, fonts, and spacing are optimized for clean printing on any office printer.",
  },
  {
    title: "Quick turnaround",
    description: "Fill in your details using any PDF reader (Adobe Reader, Preview, Chrome). Save and email within minutes. No design software required.",
  },
  {
    title: "Professional appearance",
    description: "Fixed layout ensures consistent formatting. Your capability statement looks polished whether viewed on screen or printed — no accidental reformatting.",
  },
];

export default function CapabilityStatementPdfPage() {
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
          <div className="flex items-center gap-2">
            <Link href="/capability-statement-templates" className="text-sm text-blue-400 hover:underline">Templates</Link>
            <span className="text-sm text-slate-600">/</span>
            <span className="text-sm text-slate-400">PDF</span>
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            Capability Statement Template
            <span className="block text-blue-400">Print-Ready PDF Format</span>
          </h1>
          <p className="text-lg text-slate-400">
            A professional capability statement template in PDF format. Fill in
            your company details, save, and send to contracting officers the same
            day. Print-ready with pre-formatted sections for all five required
            components of a government contractor capability statement.
          </p>
        </div>

        {/* Why PDF */}
        <div className="flex flex-col gap-4">
          <h2 className="text-xl font-semibold text-white">Why PDF for capability statements</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {advantages.map((a) => (
              <div key={a.title} className="rounded-lg border border-slate-800 bg-slate-900 p-5">
                <h3 className="font-semibold text-white">{a.title}</h3>
                <p className="mt-2 text-sm text-slate-400">{a.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* What's included */}
        <div className="flex flex-col gap-4 rounded-lg border border-slate-800 bg-slate-900 p-6">
          <h2 className="text-xl font-semibold text-white">What the PDF template includes</h2>
          <div className="space-y-3">
            {[
              { section: "Header with logo placeholder", detail: "Drop in your company logo. Pre-formatted with company name, tagline, and certification badges area." },
              { section: "Company overview block", detail: "Fillable fields for UEI, CAGE code, NAICS codes, small business status, year founded, and company description." },
              { section: "Core competencies section", detail: "Bulleted list format for 4-8 specific capabilities. Pre-styled with professional formatting." },
              { section: "Past performance table", detail: "Structured format for 3-5 contract references: agency, contract description, value, and period of performance." },
              { section: "Differentiators sidebar", detail: "Highlighted area for set-aside certifications, security clearances, ISO/CMMI certifications, and unique qualifications." },
              { section: "Contact information footer", detail: "Contact name, title, phone, email, address, and website. Positioned for quick access at the bottom of the page." },
            ].map((item) => (
              <div key={item.section} className="flex gap-3 rounded-md bg-slate-950 p-4">
                <svg className="mt-0.5 h-5 w-5 shrink-0 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <div>
                  <p className="text-sm font-semibold text-white">{item.section}</p>
                  <p className="mt-0.5 text-xs text-slate-500">{item.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* How to use */}
        <div className="flex flex-col gap-4">
          <h2 className="text-xl font-semibold text-white">How to use the PDF template</h2>
          <div className="flex flex-col gap-4">
            {[
              { step: 1, title: "Open in any PDF reader", body: "Adobe Reader (free), Mac Preview, or Chrome all support fillable PDFs. Click on any field to start typing your information." },
              { step: 2, title: "Fill in your company details", body: "Replace placeholder text with your actual company information. Start with company overview, then core competencies, past performance, differentiators, and contact info." },
              { step: 3, title: "Add your logo", body: "Most PDF editors let you insert an image into the header placeholder area. Use a high-resolution version (300 DPI) of your company logo." },
              { step: 4, title: "Save and distribute", body: "Save a master copy, then create agency-specific versions by adjusting competencies and past performance emphasis. Email as an attachment or print for industry days." },
            ].map((s) => (
              <div key={s.step} className="flex gap-4 rounded-lg border border-slate-800 bg-slate-900 p-5">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-900/50 text-sm font-bold text-blue-300">
                  {s.step}
                </div>
                <div>
                  <h3 className="font-semibold text-white">{s.title}</h3>
                  <p className="mt-1 text-sm text-slate-400">{s.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* PDF vs Word comparison */}
        <div className="flex flex-col gap-4">
          <h2 className="text-xl font-semibold text-white">PDF vs. Word — which format?</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-blue-800/50 bg-blue-950/20 p-5">
              <h3 className="text-lg font-bold text-white">PDF</h3>
              <ul className="mt-3 space-y-2 text-sm text-slate-400">
                <li className="flex gap-2"><span className="text-blue-400">+</span> Looks identical everywhere</li>
                <li className="flex gap-2"><span className="text-blue-400">+</span> Print-ready, no formatting issues</li>
                <li className="flex gap-2"><span className="text-blue-400">+</span> Quick to fill and send</li>
                <li className="flex gap-2"><span className="text-slate-600">-</span> Limited layout customization</li>
              </ul>
              <p className="mt-3 text-xs text-blue-400/60">Best for: quick turnaround, print, email attachments</p>
            </div>
            <div className="rounded-xl border border-slate-800 bg-slate-900 p-5">
              <h3 className="text-lg font-bold text-white">Word</h3>
              <ul className="mt-3 space-y-2 text-sm text-slate-400">
                <li className="flex gap-2"><span className="text-blue-400">+</span> Full design control</li>
                <li className="flex gap-2"><span className="text-blue-400">+</span> Easy to create agency-specific versions</li>
                <li className="flex gap-2"><span className="text-blue-400">+</span> Team collaboration via Google Docs</li>
                <li className="flex gap-2"><span className="text-slate-600">-</span> May reformat on different devices</li>
              </ul>
              <p className="mt-3 text-xs text-slate-600">Best for: custom branding, frequent updates, team editing</p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="flex flex-col items-center gap-4 rounded-xl border border-blue-900/30 bg-blue-950/20 p-8 text-center">
          <h2 className="text-2xl font-bold text-white">
            Find contracts that match your capabilities
          </h2>
          <p className="max-w-md text-sm text-slate-400">
            Your capability statement is ready — now find the right opportunities.
            Search federal contract awards by NAICS code, set-aside type, and agency.
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
            <Link href="/capability-statement-template-word" className="text-blue-400 hover:underline">Word Template</Link>
            {" · "}
            <Link href="/small-business-capability-statement" className="text-blue-400 hover:underline">Small Business Guide</Link>
            {" · "}
            <Link href="/capability-statement-templates" className="text-blue-400 hover:underline">All Templates</Link>
          </p>
        </div>
      </main>

      <CrossProductFooter />
    </div>
  );
}
