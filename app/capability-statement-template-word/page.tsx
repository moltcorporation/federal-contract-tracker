import type { Metadata } from "next";
import Link from "next/link";
import { CrossProductFooter } from "@/app/components/cross-product-footer";

const baseUrl = "https://federal-contract-tracker-moltcorporation.vercel.app";

export const metadata: Metadata = {
  title: "Capability Statement Template Word (.docx) | GovScout",
  description:
    "Free capability statement template in Microsoft Word format. Editable .docx with all five required sections — company overview, core competencies, past performance, differentiators, and contact info.",
  keywords: [
    "capability statement template word",
    "capability statement template word free",
    "capability statement word document",
    "capability statement template docx",
    "government contractor capability statement word",
    "template for capability statement word",
  ],
  alternates: {
    canonical: `${baseUrl}/capability-statement-template-word`,
  },
  openGraph: {
    title: "Capability Statement Template Word | GovScout",
    description:
      "Free editable Word template for government contractor capability statements.",
    type: "website",
    siteName: "GovScout",
  },
};

const faqs = [
  {
    question: "Why use a Word template for capability statements?",
    answer:
      "Word (.docx) gives you full control over layout, fonts, colors, and branding. You can add your company logo, change the color scheme to match your brand, and rearrange sections as needed. Word files are also editable in Google Docs and LibreOffice, so you are not locked into Microsoft. This is the best format when you need to create multiple tailored versions for different agencies.",
  },
  {
    question: "Can I open this template in Google Docs?",
    answer:
      "Yes. Upload the .docx file to Google Drive, then open it with Google Docs. Most formatting will transfer cleanly. You can then share it with your team for collaborative editing. Some advanced formatting (custom margins, precise tab stops) may shift slightly — review the layout after importing.",
  },
  {
    question: "How do I customize the template for different agencies?",
    answer:
      "Keep a master copy with all your information. For each agency, duplicate the file and make three changes: (1) reorder your core competencies to match what that agency buys, (2) lead with past performance from the same agency or similar work, (3) adjust differentiators to address the agency's priorities (security clearances for DoD, 508 compliance for civilian agencies). Save each version with the agency name in the filename.",
  },
  {
    question: "What sections should I include in my capability statement?",
    answer:
      "Five sections are standard: (1) Company Overview — legal name, UEI, CAGE code, NAICS codes, and small business status; (2) Core Competencies — 4-8 specific capabilities; (3) Past Performance — 3-5 completed contracts with agency, value, and results; (4) Differentiators — set-aside certifications, clearances, and unique qualifications; (5) Contact Information — direct name, phone, email, and address.",
  },
  {
    question: "Should I use a one-page or two-page format?",
    answer:
      "One page is the standard. Contracting officers spend 30-60 seconds per capability statement. Everything important should be visible without scrolling or flipping. Use a second page only if you have 5+ past performance references that need detail. The Word template is pre-formatted for one page with optimal section sizing.",
  },
  {
    question: "What font and size should I use?",
    answer:
      "Use a professional sans-serif font (Calibri, Arial, or Helvetica) at 10-11pt for body text and 14-16pt for your company name. Avoid decorative fonts — contracting officers associate them with unprofessional submissions. The template uses Calibri, which is the default in Word and universally readable.",
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

const templateSections = [
  {
    title: "Header / Company Identity",
    content: "Company name, logo, tagline. Set-aside certifications displayed prominently (8(a), WOSB, SDVOSB, HUBZone badges). UEI, CAGE code, and DUNS number.",
    tip: "Put certifications in the top 1/3 of the page — this is what contracting officers scan first.",
  },
  {
    title: "Company Overview",
    content: "2-3 sentence description of what your business does for government clients. Year founded, headquarters, employee count, revenue range. Primary and secondary NAICS codes. SAM.gov registration status and any GSA Schedule numbers.",
    tip: "Lead with government-relevant experience, not your general marketing pitch.",
  },
  {
    title: "Core Competencies",
    content: "4-8 bullet points of specific capabilities. Use the same language that appears in contract solicitations. Group by service category if you serve multiple verticals.",
    tip: "Replace generic phrases like 'innovative solutions' with specific deliverables like 'FISMA-compliant cloud migration on AWS GovCloud.'",
  },
  {
    title: "Past Performance",
    content: "3-5 completed contracts. Each entry: agency or prime contractor name, contract value, period of performance, one-sentence description of deliverables and results.",
    tip: "Quantify everything: 'Reduced processing time by 40%' beats 'Improved efficiency.'",
  },
  {
    title: "Differentiators",
    content: "What makes you stand out: set-aside certifications, security clearances, ISO/CMMI certifications, geographic proximity, proprietary technology, teaming arrangements.",
    tip: "If you hold an 8(a) or other set-aside cert, make it the most prominent element on the page.",
  },
  {
    title: "Contact Block",
    content: "Primary contact name and title, direct phone (not a main line), email, physical address, website URL.",
    tip: "If a contracting officer cannot find your phone number in 5 seconds, they move to the next vendor.",
  },
];

export default function CapabilityStatementWordPage() {
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
            <span className="text-sm text-slate-400">Word</span>
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            Capability Statement Template
            <span className="block text-blue-400">Microsoft Word Format</span>
          </h1>
          <p className="text-lg text-slate-400">
            A fully editable capability statement template in .docx format.
            Open in Microsoft Word, Google Docs, or LibreOffice. Customize
            branding, layout, and content to match your business and target
            agency. Includes all five required sections with guidance text.
          </p>
        </div>

        {/* Template preview */}
        <div className="flex flex-col gap-4">
          <h2 className="text-xl font-semibold text-white">Template structure</h2>
          <p className="text-sm text-slate-400">
            The Word template includes these sections pre-formatted on a single page.
            Replace the placeholder text with your company&apos;s information.
          </p>
          <div className="flex flex-col gap-3">
            {templateSections.map((section, i) => (
              <div key={i} className="rounded-lg border border-slate-800 bg-slate-900 p-5">
                <div className="flex items-center gap-3">
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-blue-900/50 text-xs font-bold text-blue-300">
                    {i + 1}
                  </div>
                  <h3 className="font-semibold text-white">{section.title}</h3>
                </div>
                <p className="mt-2 text-sm text-slate-400">{section.content}</p>
                <div className="mt-3 rounded-md bg-slate-950 px-3 py-2">
                  <p className="text-xs text-blue-400">
                    <span className="font-semibold">Tip:</span> {section.tip}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Sample layout */}
        <div className="flex flex-col gap-4">
          <h2 className="text-xl font-semibold text-white">Sample Word template layout</h2>
          <div className="rounded-lg border border-slate-800 bg-white p-6 text-slate-900">
            <div className="border-b-2 border-blue-600 pb-3 mb-4">
              <p className="text-lg font-bold text-slate-900">APEX TECHNICAL SERVICES LLC</p>
              <p className="text-xs text-slate-500 mt-1">8(a) Certified · SDVOSB · Small Business</p>
              <p className="text-xs text-slate-500">UEI: XXXXXXXXX123 · CAGE: 5ABC1 · NAICS: 541511, 541512, 541519</p>
            </div>

            <div className="mb-3">
              <p className="text-xs font-bold uppercase tracking-wider text-blue-600 mb-1">Company Overview</p>
              <p className="text-xs text-slate-600">
                Apex Technical Services provides IT modernization, cybersecurity, and cloud migration services to federal agencies.
                Founded 2015 · Arlington, VA · 45 employees · GSA IT Schedule 70
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-2 mb-3">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-blue-600 mb-1">Core Competencies</p>
                <ul className="text-xs text-slate-600 space-y-0.5">
                  <li>• FISMA-compliant cloud migration</li>
                  <li>• Section 508 accessibility remediation</li>
                  <li>• Agile development (SAFe certified)</li>
                  <li>• Cybersecurity assessment (RMF)</li>
                </ul>
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-blue-600 mb-1">Differentiators</p>
                <ul className="text-xs text-slate-600 space-y-0.5">
                  <li>• 8(a) Certified (exp. 2028)</li>
                  <li>• Top Secret facility clearance</li>
                  <li>• ISO 27001 / CMMI Level 3</li>
                  <li>• GSA IT Schedule 70</li>
                </ul>
              </div>
            </div>

            <div className="mb-3">
              <p className="text-xs font-bold uppercase tracking-wider text-blue-600 mb-1">Past Performance</p>
              <div className="text-xs text-slate-600 space-y-1">
                <div className="flex justify-between">
                  <span>VA — EHR migration to AWS GovCloud</span>
                  <span className="text-slate-400">$2.4M · 2024-25</span>
                </div>
                <div className="flex justify-between">
                  <span>USDA — Cloud infrastructure modernization</span>
                  <span className="text-slate-400">$1.8M · 2023-24</span>
                </div>
                <div className="flex justify-between">
                  <span>DHS — Cybersecurity compliance audit</span>
                  <span className="text-slate-400">$890K · 2023</span>
                </div>
              </div>
            </div>

            <div className="border-t border-slate-200 pt-2 text-xs text-slate-500">
              Jane Chen, VP Business Development · (202) 555-0147 · jane@apex.com · Arlington, VA
            </div>
          </div>
          <p className="text-xs text-slate-600 text-center">
            Sample layout — your Word template will match this structure with editable fields.
          </p>
        </div>

        {/* Formatting tips */}
        <div className="flex flex-col gap-4">
          <h2 className="text-xl font-semibold text-white">Word formatting best practices</h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {[
              { title: "Font", detail: "Calibri or Arial, 10-11pt body, 14-16pt company name" },
              { title: "Margins", detail: "0.5 inch all sides — maximizes usable space on one page" },
              { title: "Colors", detail: "One accent color for headers. Match your brand. Navy, blue, or green are safe for government audiences" },
              { title: "Logo", detail: "Top-left corner, max 1.5 inches wide. Crop white space to save room" },
              { title: "File size", detail: "Keep under 2MB. Compress images before inserting. COs may reject large attachments" },
              { title: "File name", detail: "CompanyName_CapabilityStatement_2026.docx — professional and searchable" },
            ].map((item) => (
              <div key={item.title} className="rounded-md border border-slate-800 bg-slate-900 p-4">
                <p className="text-sm font-semibold text-blue-400">{item.title}</p>
                <p className="mt-1 text-xs text-slate-500">{item.detail}</p>
              </div>
            ))}
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
            <Link href="/capability-statement-template-pdf" className="text-blue-400 hover:underline">PDF Template</Link>
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
