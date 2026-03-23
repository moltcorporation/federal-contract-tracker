import type { Metadata } from "next";
import Link from "next/link";
import { CrossProductFooter } from "@/app/components/cross-product-footer";

export const metadata: Metadata = {
  title: "Free Government Contract Proposal Template | GovScout",
  description:
    "Free government contract proposal template with section-by-section guide. Cover letter, technical approach, past performance, management plan, and cost volume — everything you need to write a winning federal proposal.",
  keywords: [
    "government contract proposal template",
    "govt contract proposal example",
    "government contract proposal sample",
    "how to write a government contract proposal",
    "federal contract proposal template",
    "govt contract proposal writer",
    "government proposal template",
    "technical proposal template government",
  ],
};

const sections = [
  {
    title: "Cover Letter",
    content:
      "The cover letter is your first impression — a one-page summary that tells the contracting officer why your company is the right choice. Address it to the specific contracting officer named in the solicitation (never use 'To Whom It May Concern'). Open with the solicitation number, contract title, and your company name. In two paragraphs, summarize your understanding of the requirement and your unique qualifications. Close with your authorized representative's signature, title, and contact information. The cover letter is not scored, but it sets the tone — a sloppy cover letter signals a sloppy proposal.",
    tips: [
      "Reference the solicitation number and title in the first sentence",
      "Name the contracting officer directly — shows you read the solicitation",
      "Summarize your strongest differentiator in one sentence",
      "Include your UEI number and CAGE code for quick verification",
      "Keep it to one page — this is an introduction, not an executive summary",
    ],
  },
  {
    title: "Technical Approach",
    content:
      "The technical approach is typically the highest-weighted section in a federal proposal evaluation. It must demonstrate that you understand the problem, have a proven methodology to solve it, and can deliver measurable results. Structure it around the Statement of Work (SOW) or Performance Work Statement (PWS) — mirror the government's language and section numbering so evaluators can trace your approach to their requirements. For each task or deliverable, explain what you will do, how you will do it, and what tools or processes you will use. Include a work breakdown structure (WBS) and a timeline showing key milestones. The technical approach should be specific enough that another company could execute your plan if they read it.",
    tips: [
      "Mirror the SOW/PWS section numbering — evaluators score by section",
      "Include a work breakdown structure (WBS) with clear task-deliverable mapping",
      "Show methodology, not just promises — explain the 'how' for every task",
      "Reference specific tools, standards, and frameworks you will use",
      "Include a milestone timeline with go/no-go decision points",
    ],
  },
  {
    title: "Past Performance",
    content:
      "Past performance is the second most heavily weighted factor in most federal proposal evaluations (FAR 15.305). The government uses your track record to predict future performance — if you have delivered similar work successfully before, you are a lower-risk choice. For each reference, include: contract number, contracting agency, period of performance, contract value, a description of work performed, and the name and phone number of the Contracting Officer Representative (COR). Select references that are most similar in scope, size, and complexity to the work you are proposing. If you lack direct federal experience, include relevant state/local government contracts, subcontracting work under federal primes, or commercial contracts that demonstrate the same technical capabilities.",
    tips: [
      "Choose 3-5 references most similar to the current solicitation",
      "Include contract numbers — evaluators verify in CPARS/PPIRS",
      "Quantify results: cost savings, on-time delivery rate, performance metrics",
      "Contact your references before submitting — they may be called",
      "If you lack federal experience, include relevant commercial or state work",
    ],
  },
  {
    title: "Management Plan",
    content:
      "The management plan shows how you will organize, staff, and oversee the work. Include an organizational chart showing key personnel, their roles, and reporting relationships. For each key person, provide a brief bio (2-3 sentences) highlighting relevant experience and certifications. Describe your quality assurance process — how will you ensure deliverables meet requirements? Address risk management: identify the top 3-5 risks to the project and your mitigation strategies for each. Include your communication plan — how often will you report to the government, in what format, and who is the point of contact? The management plan should convince evaluators that you have the organizational capacity and oversight processes to deliver on time and within budget.",
    tips: [
      "Include an org chart with named key personnel, not just titles",
      "Provide 2-3 sentence bios for each key person emphasizing relevant experience",
      "Address staffing contingencies — what happens if a key person leaves",
      "Describe your quality assurance and inspection process",
      "Identify top risks and specific mitigation strategies for each",
    ],
  },
  {
    title: "Cost/Price Volume",
    content:
      "The cost volume is evaluated separately from the technical proposal — often by a different team. It must be complete, accurate, and traceable. Break costs into categories: direct labor (by labor category, hours, and rate), materials, travel, subcontracts, other direct costs, and indirect rates (overhead, G&A, profit). For each line item, show how you calculated the cost and reference the corresponding technical approach section. If the solicitation uses a specific cost format (e.g., SF 1411), use it exactly. The government evaluates cost realism (are your costs realistic for the work described?) and cost reasonableness (are your prices fair compared to the market?). Unrealistically low bids raise red flags — evaluators may conclude you do not understand the requirement.",
    tips: [
      "Use the exact cost format specified in the solicitation (SF 1411, etc.)",
      "Break down labor by category, hours, and fully-loaded rates",
      "Show your indirect rate calculations (overhead, G&A, fee/profit)",
      "Cross-reference every cost line to the technical approach section",
      "Price realistically — abnormally low bids trigger additional scrutiny",
    ],
  },
];

const faqs = [
  {
    question: "What is a government contract proposal?",
    answer:
      "A government contract proposal is a formal response to a federal solicitation (RFP, RFQ, or IFB) that describes what your company will deliver, how you will deliver it, your qualifications, and your price. It is the primary document the government uses to evaluate and select contractors. Proposals typically include a technical volume, past performance volume, management plan, and cost/price volume. The evaluation criteria and their relative weights are published in the solicitation — your proposal must address each criterion directly.",
  },
  {
    question: "How long should a government contract proposal be?",
    answer:
      "Follow the page limits in the solicitation — they are mandatory, and excess pages will be removed or your proposal may be rejected. If no page limit is specified, a typical small business proposal runs 20-50 pages for the technical volume, 5-10 pages for past performance, and 10-20 pages for the cost volume. Do not pad proposals with filler content to appear thorough. Evaluators score based on responsiveness to requirements, not page count. A 25-page proposal that directly addresses every evaluation criterion beats a 60-page proposal with generic content.",
  },
  {
    question: "How do I write a government contract proposal?",
    answer:
      "Start by reading the entire solicitation — especially Section L (Instructions to Offerors) and Section M (Evaluation Criteria). Section L tells you exactly what to include and how to format it. Section M tells you what the evaluators care about most. Build your proposal outline around Section M: if technical approach is worth 40% and past performance is worth 30%, allocate your time and pages proportionally. For each section, answer: what will you do, how will you do it, what evidence proves you can do it, and what makes your approach better than alternatives. Use the government's language — mirror terms from the solicitation so evaluators see direct alignment.",
  },
  {
    question: "What is the difference between an RFP, RFQ, and IFB?",
    answer:
      "An RFP (Request for Proposal) is used for competitive negotiated procurements where the government evaluates proposals based on multiple factors (technical, past performance, price). An RFQ (Request for Quotation) is used for simplified acquisitions — typically under the micro-purchase or simplified acquisition threshold — where the government selects based primarily on price and delivery. An IFB (Invitation for Bid) is a sealed bidding process where the lowest-price technically acceptable bid wins. Most federal opportunities above $250,000 use the RFP process.",
  },
  {
    question: "Can a small business win government contracts without past performance?",
    answer:
      "Yes. FAR 15.305(a)(2)(iv) states that a proposal cannot be rated unacceptable solely because the offeror has no relevant past performance record. New businesses receive a 'neutral' past performance rating — not negative, but not positive either. To compete effectively without federal past performance, include relevant commercial work, state/local government contracts, and subcontracting experience. Start with smaller contracts (under $250K) and set-aside programs (8(a), SDVOSB, HUBZone) where competition is limited. One successfully completed small contract builds the past performance record you need for larger opportunities.",
  },
  {
    question: "What are common mistakes in government contract proposals?",
    answer:
      "The five most common proposal mistakes: (1) Not following the solicitation instructions — if Section L says 'submit in Times New Roman 12pt with 1-inch margins,' deviating risks rejection. (2) Failing to address every evaluation criterion — unanswered criteria receive the lowest possible score. (3) Generic content that could apply to any solicitation — evaluators recognize recycled boilerplate immediately. (4) Missing compliance requirements — certifications, representations, and signed forms must be complete. (5) Submitting late — even one minute past the deadline means automatic rejection with no exceptions. The fix for all five: start early, build a compliance matrix, and have someone check every requirement before submission.",
  },
  {
    question: "Where do I find government contract solicitations?",
    answer:
      "The primary source is SAM.gov (formerly FedBizOpps / FBO). All federal opportunities above $25,000 must be posted there. You can search by NAICS code, set-aside type, agency, and keyword. Other sources include agency-specific procurement portals (e.g., Army CHESS, NASA SEWP), GovWin IQ (paid intelligence platform), and USASpending.gov for researching awarded contracts and identifying upcoming recompetes. GovScout aggregates federal spending data so you can find agencies and contracts in your industry without searching multiple sites.",
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

export default function GovernmentContractProposalTemplatePage() {
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
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 text-sm text-slate-500">
          <Link href="/guides" className="transition-colors hover:text-blue-400">Guides</Link>
          <span>/</span>
          <span className="text-slate-400">Proposal Template</span>
        </nav>

        {/* Hero */}
        <div className="flex flex-col gap-4">
          <p className="text-sm font-medium text-blue-400">Template</p>
          <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            Free Government Contract Proposal Template
            <span className="block text-blue-400">Win Federal Contracts</span>
          </h1>
          <p className="text-lg text-slate-400">
            Writing a government contract proposal is different from any commercial bid you have ever submitted. Federal proposals follow strict formatting rules, must address specific evaluation criteria, and compete against companies that have been doing this for decades. This guide breaks down every section of a winning proposal — from cover letter to cost volume — with tips, compliance checklists, and a ready-to-use structure.
          </p>
        </div>

        {/* Overview */}
        <div className="flex flex-col gap-4 rounded-lg border border-slate-800 bg-slate-900 p-6">
          <h2 className="text-xl font-semibold text-white">What makes a winning federal proposal?</h2>
          <div className="space-y-3 text-sm leading-relaxed text-slate-400">
            <p>
              The federal government awards over $700 billion in contracts annually. Every dollar goes through a formal evaluation process defined by the Federal Acquisition Regulation (FAR). Your proposal is scored against published criteria — typically technical approach, past performance, management capability, and price. The highest-rated offeror wins.
            </p>
            <p>
              Most losing proposals fail for the same reason: they do not directly address the evaluation criteria. Evaluators use a compliance matrix to check every requirement in the solicitation against your proposal. If a requirement is not addressed, that section scores zero. A winning proposal maps every paragraph back to a specific requirement in the solicitation — nothing is included unless it earns points.
            </p>
            <p>
              Below, we break down the five standard volumes of a government contract proposal. Not every solicitation requires all five — always follow the specific instructions in Section L of your solicitation. But understanding the full structure prepares you for any federal opportunity.
            </p>
          </div>
        </div>

        {/* Section-by-section breakdown */}
        <div className="flex flex-col gap-6">
          <h2 className="text-xl font-semibold text-white">Proposal structure: section-by-section</h2>
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

        {/* Compliance checklist */}
        <div className="flex flex-col gap-4">
          <h2 className="text-xl font-semibold text-white">FAR/DFARS compliance checklist</h2>
          <div className="rounded-lg border border-slate-800 bg-slate-900 p-6">
            <p className="mb-4 text-sm text-slate-400">
              Before submitting any federal proposal, verify compliance with these requirements. Missing any item can result in immediate rejection.
            </p>
            <div className="space-y-3 text-sm text-slate-400">
              {[
                "Section L compliance — format, page limits, font size, margins match solicitation requirements exactly",
                "Section M traceability — every evaluation criterion is addressed with a clear, traceable response",
                "Representations and certifications — all required certs (FAR 52.204-8) completed in SAM.gov",
                "Required forms signed — SF 1449, SF 33, or other forms specified in the solicitation",
                "Cost/price format — uses exact template or format specified (SF 1411, CLIN structure, etc.)",
                "Past performance references — CPARS/PPIRS records verified, contact info current",
                "Small business subcontracting plan — required for contracts over $750K if you are a large business",
                "Key personnel resumes — included for all positions named in the solicitation",
                "Organizational conflict of interest (OCI) statement — disclose any potential conflicts",
                "Submission deadline — electronic (via SAM.gov or agency portal) or physical delivery confirmed on time",
              ].map((item, i) => (
                <div key={i} className="flex gap-3">
                  <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded border border-slate-700 bg-slate-950 text-xs text-blue-400">
                    {i + 1}
                  </div>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sample proposal outline */}
        <div className="flex flex-col gap-4">
          <h2 className="text-xl font-semibold text-white">Sample proposal outline</h2>
          <div className="rounded-lg border border-slate-800 bg-slate-900 p-6">
            <div className="border-b border-slate-800 pb-4 mb-4">
              <p className="text-lg font-bold text-white">IT Modernization Services — Sample Outline</p>
              <p className="text-xs text-slate-500 mt-1">Response to Solicitation No. GS-35F-XXXX · Department of Interior</p>
            </div>

            <div className="space-y-4 text-sm">
              <div>
                <p className="font-semibold text-blue-400 text-xs uppercase tracking-wider mb-2">Volume I: Technical Approach</p>
                <ul className="space-y-1 text-slate-400">
                  <li>• 1.0 Executive Summary (1 page)</li>
                  <li>• 2.0 Understanding of Requirements (2 pages)</li>
                  <li>• 3.0 Technical Approach &amp; Methodology (8 pages)</li>
                  <li>• 4.0 Work Breakdown Structure &amp; Schedule (3 pages)</li>
                  <li>• 5.0 Quality Assurance Plan (2 pages)</li>
                  <li>• 6.0 Transition Plan (1 page)</li>
                </ul>
              </div>
              <div>
                <p className="font-semibold text-blue-400 text-xs uppercase tracking-wider mb-2">Volume II: Management</p>
                <ul className="space-y-1 text-slate-400">
                  <li>• 1.0 Organizational Structure &amp; Key Personnel (3 pages)</li>
                  <li>• 2.0 Staffing Plan &amp; Labor Categories (2 pages)</li>
                  <li>• 3.0 Risk Management Plan (2 pages)</li>
                  <li>• 4.0 Communication &amp; Reporting Plan (1 page)</li>
                </ul>
              </div>
              <div>
                <p className="font-semibold text-blue-400 text-xs uppercase tracking-wider mb-2">Volume III: Past Performance</p>
                <ul className="space-y-1 text-slate-400">
                  <li>• 3-5 contract references with contract number, agency, value, scope, and COR contact</li>
                  <li>• Relevancy narrative for each reference</li>
                </ul>
              </div>
              <div>
                <p className="font-semibold text-blue-400 text-xs uppercase tracking-wider mb-2">Volume IV: Cost/Price</p>
                <ul className="space-y-1 text-slate-400">
                  <li>• Cost summary by CLIN</li>
                  <li>• Labor rate build-up (base + fringe + overhead + G&amp;A + profit)</li>
                  <li>• Basis of estimate for ODCs, travel, and materials</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Writing advice */}
        <div className="flex flex-col gap-4">
          <h2 className="text-xl font-semibold text-white">How to write a winning proposal</h2>
          <div className="space-y-4 text-sm leading-relaxed text-slate-400">
            <h3 className="font-semibold text-white text-base">Build a compliance matrix first</h3>
            <p>
              Before writing a single word, create a compliance matrix. List every requirement from Section L and every evaluation criterion from Section M in a spreadsheet. For each item, note: the requirement, the proposal section where you will address it, and the page limit. This matrix becomes your writing guide and your final QA check. If any row is empty when you finish writing, your proposal has a gap that will cost you points.
            </p>
            <h3 className="font-semibold text-white text-base">Use the government&apos;s language</h3>
            <p>
              Federal evaluators score proposals against specific criteria using specific terminology from the solicitation. If the SOW says &quot;the contractor shall provide help desk support,&quot; your proposal should say &quot;we will provide help desk support&quot; — not &quot;we offer customer service assistance.&quot; Mirroring the government&apos;s language makes it easy for evaluators to find and score your responses. It also demonstrates that you read and understand the requirement.
            </p>
            <h3 className="font-semibold text-white text-base">Quantify everything</h3>
            <p>
              &quot;We have extensive experience&quot; is meaningless. &quot;We have delivered 14 IT modernization projects for 6 federal agencies totaling $23M over the past 5 years&quot; is evidence. Replace every adjective with a number. Replace every claim with a verifiable fact. Evaluators are trained to discount unsupported claims — the proposals that win are the ones where every statement is backed by data.
            </p>
            <h3 className="font-semibold text-white text-base">Start 30 days before the deadline</h3>
            <p>
              A competitive federal proposal takes 3-4 weeks for a small business. Week 1: read the solicitation, build the compliance matrix, assign writing tasks, contact past performance references. Week 2: write first drafts of all volumes. Week 3: internal review, revisions, red team review. Week 4: final edits, formatting, compliance check, submission. Starting later than 30 days before the deadline means cutting corners — and evaluators can tell when a proposal was rushed.
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="flex flex-col items-center gap-4 rounded-xl border border-blue-900/30 bg-blue-950/20 p-8 text-center">
          <h2 className="text-2xl font-bold text-white">
            Find contracts to bid on
          </h2>
          <p className="max-w-md text-sm text-slate-400">
            Search awarded federal contracts by NAICS code, agency, and set-aside type. Identify upcoming recompetes, track spending trends, and find agencies that buy what you sell.
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
              { name: "Capability Statement Template", desc: "One-page marketing document for contracting officers — section-by-section guide", href: "/guides/capability-statement-template" },
              { name: "SAM.gov Registration Guide", desc: "Step-by-step registration — UEI, documents, entity validation", href: "/guides/sam-gov-registration" },
              { name: "How to Find Government Contracts", desc: "From SAM.gov search to competitive intelligence", href: "/guides/find-government-contracts" },
              { name: "8(a) Set-Aside Contracts", desc: "Eligibility, certification, and sole-source thresholds", href: "/guides/8a-set-aside-contracts" },
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
