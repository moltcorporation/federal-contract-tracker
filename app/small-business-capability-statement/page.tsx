import type { Metadata } from "next";
import Link from "next/link";
import { CrossProductFooter } from "@/app/components/cross-product-footer";

const baseUrl = "https://federal-contract-tracker-moltcorporation.vercel.app";

export const metadata: Metadata = {
  title: "Small Business Capability Statement Guide | GovScout",
  description:
    "Complete guide to writing a capability statement for small businesses pursuing government contracts. Step-by-step instructions, examples, and common mistakes to avoid.",
  keywords: [
    "small business capability statement",
    "capability statement for small business",
    "small business capability statement template",
    "capability statement for govt contractors",
    "how to write capability statement small business",
    "government contractor capability statement",
    "small business federal contracting",
  ],
  alternates: {
    canonical: `${baseUrl}/small-business-capability-statement`,
  },
  openGraph: {
    title: "Small Business Capability Statement Guide | GovScout",
    description:
      "Step-by-step guide to writing a capability statement that wins federal contracts for small businesses.",
    type: "website",
    siteName: "GovScout",
  },
};

const faqs = [
  {
    question: "What is a small business capability statement?",
    answer:
      "A capability statement is a one-page document that summarizes your small business for government buyers. It covers who you are (company overview, certifications), what you do (core competencies), who you have done it for (past performance), and why you stand out (differentiators). Think of it as your company's resume for federal contracting. Every small business pursuing government work needs one.",
  },
  {
    question: "Do I need a capability statement if I am just starting out?",
    answer:
      "Yes. A capability statement is essential from day one. Even if you have no federal past performance, you can highlight commercial experience, state and local government work, relevant certifications, and your set-aside status. Contracting officers expect to receive a capability statement when they meet you at an industry day or review your company. Without one, you are not taken seriously as a potential vendor.",
  },
  {
    question: "How is a small business capability statement different from a large business one?",
    answer:
      "Small businesses should emphasize set-aside certifications (8(a), WOSB, SDVOSB, HUBZone) prominently — these are your strongest competitive advantage and the reason many small businesses win their first contracts. Large businesses focus on past performance scale and technical depth. Small businesses should also highlight agility, direct access to leadership, and teaming arrangements with larger primes.",
  },
  {
    question: "What if I have no government past performance?",
    answer:
      "Use commercial experience, subcontracting work, state and local government contracts, or pro bono projects that demonstrate relevant capabilities. Frame the experience in government terms: use FAR-aligned language, mention compliance standards you already follow, and highlight any government-adjacent work (military, education, healthcare). One completed government subcontract is worth more than ten commercial references.",
  },
  {
    question: "How often should I update my capability statement?",
    answer:
      "Quarterly at minimum. Add new contracts, update employee counts, refresh NAICS codes based on current pursuits, and remove expired certifications. An outdated capability statement with last year's data damages your credibility more than having no capability statement. Set a calendar reminder for the first week of each quarter.",
  },
  {
    question: "Where do I use my capability statement?",
    answer:
      "Everywhere: attach it to emails when reaching out to contracting officers, bring printed copies to industry days, upload it to your SAM.gov profile, include it in subcontracting proposals, submit it through agency OSDBU portals, and hand it to contacts at networking events. The more places your capability statement appears, the more likely a contracting officer finds you when they need a vendor.",
  },
  {
    question: "What set-aside certifications help small businesses?",
    answer:
      "The SBA administers several programs: 8(a) Business Development for socially and economically disadvantaged individuals, WOSB (Women-Owned Small Business), SDVOSB (Service-Disabled Veteran-Owned Small Business), and HUBZone for businesses in underutilized areas. Each program has reserved contracts that only certified businesses can compete for. 8(a) also allows sole-source awards up to $4.5M, making it the single most powerful certification for small businesses.",
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

const mistakes = [
  {
    title: "Too long",
    wrong: "3-page capability statement with company history, team bios, and case studies",
    right: "One page. Everything important visible without flipping. Contracting officers spend 30-60 seconds per document.",
  },
  {
    title: "Generic language",
    wrong: "'We provide innovative, cutting-edge solutions to complex challenges'",
    right: "'FISMA-compliant cloud migration — 14 VA hospitals migrated to AWS GovCloud in 18 months'",
  },
  {
    title: "Missing identifiers",
    wrong: "No UEI, CAGE code, or NAICS codes listed anywhere",
    right: "UEI, CAGE, NAICS, and SAM.gov status in the header. Contracting officers verify these first.",
  },
  {
    title: "No past performance",
    wrong: "'Past performance available upon request'",
    right: "3-5 specific contracts with agency, dollar value, dates, and quantified results. Even commercial references are better than nothing.",
  },
  {
    title: "Buried certifications",
    wrong: "8(a) status mentioned in paragraph 3 of the company overview",
    right: "Set-aside certifications in the top 1/3 of the page as visual badges. This is your strongest competitive advantage.",
  },
];

const steps = [
  {
    num: 1,
    title: "Register on SAM.gov",
    body: "Before you create a capability statement, register your business on SAM.gov. This gives you a UEI (Unique Entity Identifier) and CAGE code — two numbers that every contracting officer expects to see on your capability statement. Registration is free and takes 7-10 business days. Avoid paid registration services — SAM.gov registration is always free.",
    link: { href: "/guides/sam-gov-registration", text: "SAM.gov registration guide" },
  },
  {
    num: 2,
    title: "Identify your NAICS codes",
    body: "NAICS codes classify your business by industry. You need at least one primary code and can list secondary codes for other services. Your primary NAICS code determines your small business size standard (revenue or employee threshold). Choose codes that match the types of contracts you want to pursue.",
    link: { href: "/guides/naics-code-lookup", text: "NAICS code lookup tool" },
  },
  {
    num: 3,
    title: "Gather your past performance",
    body: "List every relevant contract or project: government (federal, state, local), subcontracting to primes, and significant commercial work. For each, note the client, contract value, dates, and what you delivered. You will select the 3-5 strongest examples for your capability statement. Quantify results wherever possible.",
  },
  {
    num: 4,
    title: "Define your core competencies",
    body: "Write 4-8 specific capabilities that map to the services you sell. Use the same language that appears in federal solicitations — search for contracts in your NAICS codes to see what terms agencies use. Avoid generic phrases like 'project management' or 'customer service.' Be specific: 'Section 508 accessibility remediation' or 'OSHA 30-certified commercial roofing.'",
  },
  {
    num: 5,
    title: "Choose a template and fill it in",
    body: "Use our Word template for full design control or our PDF template for quick turnaround. Fill in every section: company overview, core competencies, past performance, differentiators, and contact information. Keep everything on one page.",
    link: { href: "/capability-statement-templates", text: "Download templates" },
  },
  {
    num: 6,
    title: "Tailor for your target agency",
    body: "Before sending your capability statement to any agency, customize it: reorder competencies to match what that agency buys, lead with past performance from similar work, and emphasize differentiators the agency cares about (clearances for DoD, compliance for civilian agencies). A tailored statement outperforms a generic one by 3-5x.",
  },
];

export default function SmallBusinessCapabilityStatementPage() {
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
            <span className="text-sm text-slate-400">Small Business Guide</span>
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            Small Business Capability Statement
            <span className="block text-blue-400">Complete Beginner Guide</span>
          </h1>
          <p className="text-lg text-slate-400">
            New to federal contracting? This guide walks you through creating
            your first capability statement from scratch — what to include, how
            to format it, and the mistakes that get small businesses ignored by
            contracting officers.
          </p>
        </div>

        {/* Why it matters */}
        <div className="flex flex-col gap-4 rounded-lg border border-slate-800 bg-slate-900 p-6">
          <h2 className="text-xl font-semibold text-white">Why small businesses need a capability statement</h2>
          <div className="space-y-3 text-sm leading-relaxed text-slate-400">
            <p>
              The federal government is required by law to award at least 23% of
              prime contract dollars to small businesses — over $160 billion per
              year. But contracting officers do not find vendors on Google. They
              collect capability statements at industry days, search OSDBU
              databases, and review documents attached to introduction emails.
            </p>
            <p>
              Your capability statement is your ticket into that system. Without
              one, you are invisible. With a strong one, you get meetings,
              subcontracting opportunities, and eventually prime contract awards.
              Most small businesses that break into federal contracting credit
              their capability statement as the document that opened the first door.
            </p>
            <p>
              Small businesses have a unique advantage: set-aside programs
              reserve billions in contracts exclusively for certified small
              businesses. Your capability statement should make your set-aside
              status the most prominent element on the page.
            </p>
          </div>
        </div>

        {/* Step by step */}
        <div className="flex flex-col gap-4">
          <h2 className="text-xl font-semibold text-white">Step-by-step: create your first capability statement</h2>
          <div className="flex flex-col gap-4">
            {steps.map((s) => (
              <div key={s.num} className="flex gap-4 rounded-lg border border-slate-800 bg-slate-900 p-5">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-blue-900/50 text-sm font-bold text-blue-300">
                  {s.num}
                </div>
                <div>
                  <h3 className="font-semibold text-white">{s.title}</h3>
                  <p className="mt-1 text-sm text-slate-400">{s.body}</p>
                  {s.link && (
                    <Link href={s.link.href} className="mt-2 inline-block text-sm text-blue-400 hover:underline">
                      {s.link.text} &rarr;
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Common mistakes */}
        <div className="flex flex-col gap-4">
          <h2 className="text-xl font-semibold text-white">5 mistakes that get small businesses ignored</h2>
          <div className="flex flex-col gap-4">
            {mistakes.map((m, i) => (
              <div key={i} className="rounded-lg border border-slate-800 bg-slate-900 p-5">
                <h3 className="font-semibold text-white">{m.title}</h3>
                <div className="mt-3 space-y-2">
                  <div className="flex gap-2 rounded-md bg-red-950/20 border border-red-900/30 px-3 py-2">
                    <span className="text-red-400 text-sm font-medium shrink-0">Wrong:</span>
                    <p className="text-sm text-slate-400">{m.wrong}</p>
                  </div>
                  <div className="flex gap-2 rounded-md bg-blue-950/20 border border-blue-900/30 px-3 py-2">
                    <span className="text-blue-400 text-sm font-medium shrink-0">Right:</span>
                    <p className="text-sm text-slate-400">{m.right}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Set-aside certifications */}
        <div className="flex flex-col gap-4">
          <h2 className="text-xl font-semibold text-white">Set-aside certifications for small businesses</h2>
          <p className="text-sm text-slate-400">
            If you qualify for any of these programs, your capability statement
            should make the certification the most visible element on the page.
            Set-aside status is the #1 reason small businesses win their first
            federal contracts.
          </p>
          <div className="grid gap-3 sm:grid-cols-2">
            {[
              {
                name: "8(a) Business Development",
                desc: "For socially and economically disadvantaged individuals. Allows sole-source awards up to $4.5M. The most powerful certification for small businesses.",
                href: "/guides/8a-set-aside-contracts",
              },
              {
                name: "WOSB / EDWOSB",
                desc: "Women-Owned and Economically Disadvantaged Women-Owned Small Business. Reserved contracts in 83 NAICS code categories.",
                href: "/guides/wosb-contracts",
              },
              {
                name: "SDVOSB",
                desc: "Service-Disabled Veteran-Owned Small Business. Sole-source threshold of $4.5M. Strongest demand in VA and DoD.",
                href: "/guides/sdvosb-contracts",
              },
              {
                name: "HUBZone",
                desc: "For businesses in Historically Underutilized Business Zones. Offers 10% price evaluation preference in competitive bids.",
                href: "/guides/hubzone-contracts",
              },
            ].map((cert) => (
              <Link key={cert.name} href={cert.href} className="rounded-lg border border-slate-800 bg-slate-900 p-4 transition-colors hover:border-blue-600">
                <h3 className="font-semibold text-white">{cert.name}</h3>
                <p className="mt-1 text-xs text-slate-500">{cert.desc}</p>
              </Link>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="flex flex-col items-center gap-4 rounded-xl border border-blue-900/30 bg-blue-950/20 p-8 text-center">
          <h2 className="text-2xl font-bold text-white">
            Ready to find your first contracts?
          </h2>
          <p className="max-w-md text-sm text-slate-400">
            Your capability statement is your introduction. GovScout helps you
            find what comes next — search federal contract awards by NAICS code,
            set-aside type, and agency to identify opportunities.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href="/register"
              className="rounded-lg bg-blue-500 px-6 py-3 text-sm font-semibold text-white shadow-sm transition-all hover:bg-blue-400"
            >
              Search contracts free
            </Link>
            <Link
              href="/capability-statement-templates"
              className="rounded-lg border border-slate-700 px-6 py-3 text-sm font-semibold text-slate-300 transition-all hover:border-blue-500 hover:text-white"
            >
              Download templates
            </Link>
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

        {/* Related */}
        <div className="flex flex-col gap-3">
          <p className="text-sm text-slate-600">
            Related:{" "}
            <Link href="/capability-statement-template-word" className="text-blue-400 hover:underline">Word Template</Link>
            {" · "}
            <Link href="/capability-statement-template-pdf" className="text-blue-400 hover:underline">PDF Template</Link>
            {" · "}
            <Link href="/guides/sam-gov-registration" className="text-blue-400 hover:underline">SAM.gov Registration</Link>
          </p>
        </div>
      </main>

      <CrossProductFooter />
    </div>
  );
}
