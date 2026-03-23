import type { Metadata } from "next";
import Link from "next/link";
import { CrossProductFooter } from "@/app/components/cross-product-footer";

export const metadata: Metadata = {
  title: "Free Capability Statement Template | GovScout",
  description:
    "Free capability statement template for government contractors. Step-by-step guide to writing a capability statement that wins federal contracts. Download-ready format with examples.",
  keywords: [
    "capability statement template",
    "capability statement template word",
    "template for capability statement",
    "capability statement template free",
    "business capability statement template",
    "capability statement for govt contractors",
    "government contractor capability statement",
  ],
};

const sections = [
  {
    title: "Company Overview",
    content:
      "Your company overview is the first thing a contracting officer reads. Lead with your legal business name, DUNS/UEI number, CAGE code, and SAM.gov registration status — these prove you are a legitimate federal contractor. Follow with a 2–3 sentence company description focused on what you do for government clients, not your general marketing pitch. Include your year founded, headquarters location, and number of employees. Contracting officers scan dozens of capability statements — make yours scannable in 10 seconds.",
    tips: [
      "Include your UEI number — contracting officers verify it immediately",
      "State your SBA size standard and whether you qualify as a small business",
      "List your primary and secondary NAICS codes",
      "Mention any GSA Schedule contracts you hold",
    ],
  },
  {
    title: "Core Competencies",
    content:
      "Core competencies are the 4–8 specific capabilities that differentiate your business. These should map directly to the services or products you want to sell to the federal government. Do not list generic skills like 'project management' or 'customer service' — every contractor claims those. Instead, be specific: 'FISMA-compliant cloud migration,' 'OSHA-certified asbestos abatement,' or 'Section 508 accessibility remediation.' Use the same language that appears in contract solicitations so your capability statement shows up when a contracting officer searches for keywords.",
    tips: [
      "Use 4–8 competencies — more than 8 dilutes your message",
      "Mirror the language from solicitations in your NAICS codes",
      "Include relevant certifications (ISO 9001, CMMI, etc.)",
      "Group competencies by service category if you serve multiple verticals",
    ],
  },
  {
    title: "Past Performance",
    content:
      "Past performance is the single most important section of your capability statement. Federal Acquisition Regulation (FAR) Part 15 makes past performance one of the most heavily weighted evaluation criteria in contract awards. List 3–5 completed contracts or projects with: client name (agency or prime contractor), contract value, period of performance, and a one-sentence description of what you delivered. If you are new to federal contracting, include relevant commercial work, state/local government contracts, or subcontracting experience. Even one successfully completed government subcontract is more credible than ten commercial references.",
    tips: [
      "Include contract numbers if available — makes verification easy",
      "Quantify results: 'Reduced processing time by 40%' beats 'Improved efficiency'",
      "Include both government and commercial references if you lack federal experience",
      "Add the agency POC name and phone if permitted by your contract",
    ],
  },
  {
    title: "Differentiators",
    content:
      "Differentiators answer the question: why should an agency choose you over the 50 other contractors who do the same thing? Strong differentiators include set-aside certifications (8(a), WOSB, SDVOSB, HUBZone), geographic proximity to the client site, specialized clearances (security clearances, ITAR compliance), proprietary technology or processes, and teaming arrangements with larger primes. If you hold a set-aside certification, make it prominent — it is your strongest competitive advantage and the primary reason many small businesses win their first contracts.",
    tips: [
      "Lead with set-aside certifications — they are your biggest advantage",
      "Mention security clearances held by key personnel",
      "Include geographic coverage areas relevant to the agency",
      "Reference any existing BPA, IDIQ, or GWACs you hold",
    ],
  },
  {
    title: "Contact Information",
    content:
      "Make it effortless for a contracting officer to reach you. Include: primary contact name and title, direct phone number (not a main line), email address, physical address, and website URL. If you have a dedicated contracts or business development contact, list that person. Contracting officers often reach out with short-turnaround opportunities — if they cannot find your phone number in 5 seconds, they move on to the next capability statement. Put contact information in the same location on every version of your capability statement so it becomes predictable.",
    tips: [
      "Use a direct phone number, not an 800 number or general line",
      "Include your website with a specific landing page for government clients",
      "Add a QR code linking to your SAM.gov profile or government services page",
      "Keep the same contact person across all outreach — relationships matter",
    ],
  },
];

const faqs = [
  {
    question: "What is a capability statement?",
    answer:
      "A capability statement is a one-to-two page document that summarizes what your business does, who you have done it for, and why an agency should choose you. It is the standard marketing document for government contractors — the federal equivalent of a company brochure. Contracting officers request capability statements when evaluating potential vendors, and they are required for many small business matchmaking events, industry days, and subcontracting outreach. Every business pursuing federal contracts needs one.",
  },
  {
    question: "How long should a capability statement be?",
    answer:
      "One page is ideal, two pages maximum. Contracting officers receive dozens of capability statements and spend 30–60 seconds on each. A one-page format forces you to focus on what matters: your core competencies, past performance, certifications, and contact information. If you cannot fit everything on one page, you are including too much. Use the back of the page (page 2) only for an extended past performance list or detailed technical capabilities.",
  },
  {
    question: "How do I write a capability statement for government contracts?",
    answer:
      "Start with five sections: (1) Company Overview — name, UEI, CAGE code, NAICS codes, small business status; (2) Core Competencies — 4–8 specific capabilities using language from federal solicitations; (3) Past Performance — 3–5 completed contracts with agency name, value, and results; (4) Differentiators — set-aside certifications, clearances, geographic coverage; (5) Contact Information — direct name, phone, email, address. Format it as a single page with your company branding. Tailor it for each agency or opportunity — a generic capability statement is far less effective than one customized to the recipient's mission.",
  },
  {
    question: "Do I need a different capability statement for each agency?",
    answer:
      "Yes, ideally. A tailored capability statement outperforms a generic one by 3–5x in response rates. Keep a master template with all your information, then customize three sections for each target: (1) highlight the core competencies most relevant to that agency's mission, (2) lead with past performance from the same agency or similar work, (3) adjust differentiators to address the agency's known priorities (e.g., security clearances for DoD, 508 compliance for civilian agencies). This takes 15–20 minutes per version and dramatically increases your win rate.",
  },
  {
    question: "Where do I use my capability statement?",
    answer:
      "Use your capability statement everywhere: attach it to emails when reaching out to contracting officers, bring printed copies to industry days and matchmaking events, upload it to your SAM.gov profile, include it in subcontracting proposals to prime contractors, and hand it to contacts at networking events. Some agencies also accept capability statements through their OSDBU (Office of Small and Disadvantaged Business Utilization) online portals. The more places your capability statement appears, the more likely a contracting officer will find you when they need a vendor.",
  },
  {
    question: "What mistakes should I avoid in my capability statement?",
    answer:
      "The five most common mistakes: (1) Making it too long — more than two pages means nobody reads it; (2) Using generic language — 'we provide quality solutions' says nothing; (3) Missing past performance — even one reference is better than none; (4) Forgetting UEI/CAGE/NAICS — contracting officers need these to verify you; (5) No call to action — end with a specific ask, like 'Contact us for a teaming arrangement' or 'Available for sole-source 8(a) contracts up to $4.5M.' Also avoid stock photos, overly designed layouts, and marketing fluff — contracting officers want information, not graphic design.",
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
          <Link href="/saved-searches" className="text-sm font-medium text-slate-400 transition-colors hover:text-blue-400">Saved Searches</Link>
          <Link href="/guides/find-government-contracts" className="text-sm font-medium text-blue-400 transition-colors hover:text-blue-300">Guides</Link>
          <Link href="/pricing" className="text-sm font-medium text-slate-400 transition-colors hover:text-blue-400">Pricing</Link>
        </div>
      </header>

      <main className="mx-auto flex w-full max-w-3xl flex-col gap-10 px-4 py-12">
        {/* Hero */}
        <div className="flex flex-col gap-4">
          <p className="text-sm font-medium text-blue-400">Guide</p>
          <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            Free Capability Statement Template
            <span className="block text-blue-400">For Government Contractors</span>
          </h1>
          <p className="text-lg text-slate-400">
            A capability statement is your company&apos;s resume for federal contracting. It tells contracting officers who you are, what you do, and why they should work with you — all on one page. This guide walks you through every section with examples, tips, and a ready-to-use template structure.
          </p>
        </div>

        {/* What is a capability statement */}
        <div className="flex flex-col gap-4 rounded-lg border border-slate-800 bg-slate-900 p-6">
          <h2 className="text-xl font-semibold text-white">What is a capability statement?</h2>
          <div className="space-y-3 text-sm leading-relaxed text-slate-400">
            <p>
              A capability statement is a one-page marketing document that summarizes your business for government buyers. Think of it as a federal-focused elevator pitch in print. Every small business pursuing government contracts needs one — it is the first thing a contracting officer asks for when evaluating potential vendors.
            </p>
            <p>
              The federal government awards over $160 billion per year to small businesses. But contracting officers do not search Google for vendors — they review capability statements collected at industry days, stored in databases, and attached to emails from business development contacts. If you do not have a capability statement, you are invisible to the largest buyer in the world.
            </p>
            <p>
              A strong capability statement includes five sections: company overview, core competencies, past performance, differentiators, and contact information. Below, we break down each section with specific guidance on what to include, what to avoid, and how to tailor your statement for different agencies and opportunities.
            </p>
          </div>
        </div>

        {/* Section-by-section breakdown */}
        <div className="flex flex-col gap-6">
          <h2 className="text-xl font-semibold text-white">Section-by-section breakdown</h2>
          {sections.map((section, i) => (
            <div key={i} className="flex flex-col gap-4 rounded-lg border border-slate-800 bg-slate-900 p-5">
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-900/50 text-sm font-bold text-blue-300">
                  {i + 1}
                </div>
                <h3 className="text-lg font-semibold text-white">{section.title}</h3>
              </div>
              <p className="text-sm leading-relaxed text-slate-400">{section.content}</p>
              <div className="rounded-md bg-slate-950 p-4">
                <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-blue-400">Tips</p>
                <ul className="space-y-1.5 text-sm text-slate-400">
                  {section.tips.map((tip, j) => (
                    <li key={j} className="flex gap-2">
                      <span className="mt-0.5 text-blue-400">•</span>
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* Sample capability statement */}
        <div className="flex flex-col gap-4">
          <h2 className="text-xl font-semibold text-white">Sample capability statement layout</h2>
          <div className="rounded-lg border border-slate-800 bg-slate-900 p-6">
            <div className="border-b border-slate-800 pb-4 mb-4">
              <p className="text-lg font-bold text-white">Apex Technical Services LLC</p>
              <p className="text-xs text-slate-500 mt-1">UEI: XXXXXXXXX123 · CAGE: 5ABC1 · DUNS: 123456789</p>
              <p className="text-xs text-slate-500">NAICS: 541511, 541512, 541519 · SBA Certified Small Business</p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 text-sm">
              <div>
                <p className="font-semibold text-blue-400 text-xs uppercase tracking-wider mb-2">Core Competencies</p>
                <ul className="space-y-1 text-slate-400">
                  <li>• FISMA-compliant cloud migration (AWS GovCloud)</li>
                  <li>• Section 508 accessibility remediation</li>
                  <li>• Agile software development (SAFe certified)</li>
                  <li>• Cybersecurity assessment &amp; authorization (RMF)</li>
                  <li>• Legacy system modernization</li>
                </ul>
              </div>
              <div>
                <p className="font-semibold text-blue-400 text-xs uppercase tracking-wider mb-2">Differentiators</p>
                <ul className="space-y-1 text-slate-400">
                  <li>• 8(a) Certified (exp. 2028)</li>
                  <li>• Top Secret facility clearance</li>
                  <li>• ISO 27001 certified</li>
                  <li>• CMMI Level 3 appraised</li>
                  <li>• GSA IT Schedule 70 holder</li>
                </ul>
              </div>
            </div>

            <div className="mt-4 border-t border-slate-800 pt-4">
              <p className="font-semibold text-blue-400 text-xs uppercase tracking-wider mb-2">Past Performance</p>
              <div className="space-y-2 text-sm text-slate-400">
                <div className="flex justify-between">
                  <span>Dept. of Veterans Affairs — EHR migration</span>
                  <span className="text-slate-500">$2.4M · 2024–2025</span>
                </div>
                <div className="flex justify-between">
                  <span>USDA — Cloud infrastructure modernization</span>
                  <span className="text-slate-500">$1.8M · 2023–2024</span>
                </div>
                <div className="flex justify-between">
                  <span>DHS — Cybersecurity compliance audit</span>
                  <span className="text-slate-500">$890K · 2023</span>
                </div>
              </div>
            </div>

            <div className="mt-4 border-t border-slate-800 pt-4 text-xs text-slate-500">
              <p>Jane Chen, VP Business Development · (202) 555-0147 · jane@apextechservices.com</p>
              <p>1200 Wilson Blvd, Suite 400, Arlington, VA 22209 · www.apextechservices.com/government</p>
            </div>
          </div>
        </div>

        {/* Writing tips */}
        <div className="flex flex-col gap-4">
          <h2 className="text-xl font-semibold text-white">How to make your capability statement stand out</h2>
          <div className="space-y-4 text-sm leading-relaxed text-slate-400">
            <p>
              Most capability statements look identical — same layout, same generic language, same stock imagery. The ones that get results share three traits: they are specific, they are tailored, and they are short.
            </p>
            <h3 className="font-semibold text-white text-base">Be specific, not generic</h3>
            <p>
              &quot;We provide innovative solutions&quot; tells a contracting officer nothing. &quot;We migrated 14 VA hospitals to AWS GovCloud under FedRAMP High authorization in 18 months&quot; tells them everything. Replace every adjective with a number. Replace every claim with a reference. Specificity is credibility in government contracting — vague capability statements go straight to the recycling bin.
            </p>
            <h3 className="font-semibold text-white text-base">Tailor for every audience</h3>
            <p>
              A capability statement sent to the Department of Defense should emphasize security clearances and CMMI levels. The same company sending to the Department of Education should emphasize 508 compliance and data privacy. Keep a master document with all your capabilities, then create agency-specific versions that highlight the 4–5 most relevant competencies. This takes 15 minutes per version and dramatically increases your response rate.
            </p>
            <h3 className="font-semibold text-white text-base">Design for scanning, not reading</h3>
            <p>
              Contracting officers spend 30–60 seconds on each capability statement. Use clear section headers, bullet points, and white space. Put your set-aside certifications and NAICS codes where they can be found in 5 seconds — usually the top third of the page. Your company logo and branding should be professional but minimal — this is not a marketing brochure, it is a business credential.
            </p>
            <h3 className="font-semibold text-white text-base">Update quarterly</h3>
            <p>
              Your capability statement should reflect your most recent past performance and current certifications. Set a quarterly reminder to update it: add new contracts, remove expired certifications, update employee counts, and refresh your core competencies based on the types of contracts you are pursuing. An outdated capability statement with last year&apos;s contracts and a discontinued certification damages your credibility more than having no capability statement at all.
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="flex flex-col items-center gap-4 rounded-xl border border-blue-900/30 bg-blue-950/20 p-8 text-center">
          <h2 className="text-2xl font-bold text-white">
            Find contracts that match your capabilities
          </h2>
          <p className="max-w-md text-sm text-slate-400">
            Search awarded federal contracts by NAICS code, set-aside type, and agency. See who is winning, how much they are getting, and where the opportunities are in your industry.
          </p>
          <Link
            href="/"
            className="rounded-lg bg-blue-500 px-8 py-3 text-base font-semibold text-white shadow-sm transition-all hover:bg-blue-400"
          >
            Search contracts free
          </Link>
        </div>

        {/* Related guides */}
        <div className="flex flex-col gap-4">
          <h2 className="text-xl font-semibold text-white">Related guides</h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {[
              { name: "How to Find Government Contracts", desc: "Step-by-step from SAM.gov registration to winning bids", href: "/guides/find-government-contracts" },
              { name: "8(a) Set-Aside Contracts", desc: "Eligibility, certification, and sole-source thresholds", href: "/guides/8a-set-aside-contracts" },
              { name: "Small Business Set-Asides", desc: "SBA size standards and general small business reservations", href: "/guides/small-business-set-aside" },
              { name: "SDVOSB Contracts", desc: "Service-Disabled Veteran-Owned Small Business program guide", href: "/guides/sdvosb-contracts" },
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
