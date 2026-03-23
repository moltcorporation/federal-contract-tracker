import type { Metadata } from "next";
import Link from "next/link";
import { CrossProductFooter } from "@/app/components/cross-product-footer";

export const metadata: Metadata = {
  title: "How to Write a Government Proposal (7-Step Guide) | GovScout",
  description:
    "Free step-by-step guide to writing a winning government proposal. Learn the 7-step process from reading the solicitation to submission, with breakdowns of technical approach, past performance, pricing, and compliance matrix sections.",
  keywords: [
    "how to write a government proposal",
    "government proposal writing",
    "federal proposal template",
    "government contract proposal",
    "rfp response template",
    "government bid writing",
    "small business government proposal",
    "federal proposal writing guide",
  ],
};

const steps = [
  {
    title: "Read the Solicitation Cover to Cover",
    content:
      "Before writing a single word, read the entire solicitation — RFP, RFQ, or IFB — at least twice. The first read gives you the big picture: what the agency needs, the evaluation criteria, and whether your company is a realistic fit. The second read is for details: deadlines, formatting requirements, page limits, required certifications, and specific instructions that will disqualify you if missed. Pay special attention to Section L (Instructions to Offerors) and Section M (Evaluation Criteria) in FAR-based solicitations — these tell you exactly how your proposal will be scored. Many small businesses lose not because their solution was weak, but because they missed a formatting requirement or failed to address an evaluation criterion. Highlight every 'shall' and 'must' statement — these are mandatory requirements your proposal must explicitly address.",
    tips: [
      "Read the entire solicitation twice before writing anything",
      "Section L tells you how to format; Section M tells you how you'll be scored",
      "Highlight every 'shall' and 'must' — these are mandatory requirements",
      "Check for amendments — solicitations are frequently updated after release",
      "If anything is unclear, submit questions during the Q&A period before the deadline",
    ],
  },
  {
    title: "Build Your Compliance Matrix",
    content:
      "A compliance matrix is a spreadsheet that maps every solicitation requirement to where it is addressed in your proposal. This is the single most important planning document you will create. Go through the solicitation line by line and extract every requirement — from technical specifications to staffing qualifications to reporting deliverables. For each requirement, note the solicitation section, the requirement text, which volume of your proposal addresses it, the specific page number (filled in after writing), and your compliance status (compliant, partially compliant, or exception). The compliance matrix serves two purposes: it ensures you do not miss any requirement, and it gives evaluators a quick way to verify your proposal is complete. Some solicitations require you to submit a compliance matrix as part of your proposal. Even when not required, building one internally prevents the most common reason proposals are eliminated: non-responsiveness to a stated requirement.",
    tips: [
      "Extract every requirement from the solicitation into a spreadsheet",
      "Map each requirement to a specific section and page in your proposal",
      "Flag anything you cannot fully comply with — address exceptions honestly",
      "Update page numbers after your final draft is complete",
      "Some solicitations require a compliance matrix as a deliverable — check Section L",
    ],
  },
  {
    title: "Write Your Technical Approach",
    content:
      "The technical approach is where you explain how you will do the work. This is not a capabilities brochure — it is a specific, detailed plan that demonstrates you understand the agency's problem and have a proven method to solve it. Start by restating the problem in your own words to show you understand it. Then describe your approach step by step: methodology, tools, processes, staffing, timeline, and quality controls. Use the agency's language — mirror the terminology from the solicitation so evaluators can easily match your approach to their requirements. For each major task or deliverable, explain what you will do, how you will do it, who will do it, and how you will measure success. Include specific examples from past work (without naming clients if under NDA) to demonstrate that your approach is proven, not theoretical. Avoid generic statements like 'we will leverage our expertise' — evaluators read hundreds of proposals and can spot filler immediately.",
    tips: [
      "Restate the problem in your own words before presenting your solution",
      "Mirror the solicitation's terminology — make it easy for evaluators to score you",
      "Be specific: name tools, methodologies, and standards you will use",
      "Include a staffing plan with roles, qualifications, and hours per task",
      "Add a project timeline or Gantt chart showing major milestones and deliverables",
    ],
  },
  {
    title: "Document Past Performance",
    content:
      "Past performance is how the government predicts your future performance. You need 3–5 relevant contract references that demonstrate you have successfully done work similar to what the solicitation requires. For each reference, include: contract number, agency or client name, contract value, period of performance, brief description of work performed, and how it relates to the current requirement. Include the name, title, phone number, and email of a reference who can verify your performance. Choose references strategically — the most relevant work matters more than the largest contracts. A $50,000 contract doing exactly what the solicitation asks for is more valuable than a $5 million contract in a different area. If you are a new business without federal contract history, use relevant commercial contracts, subcontracting experience, or state/local government work. Some solicitations allow 'neutral' ratings for companies without past performance — check the evaluation criteria.",
    tips: [
      "Select 3–5 references most relevant to the specific solicitation requirements",
      "Contact your references before submitting — ensure they will respond positively",
      "Include contract numbers, values, and periods of performance for each reference",
      "Relevance matters more than size — a small relevant contract beats a large irrelevant one",
      "New businesses: use commercial, subcontracting, or state/local experience",
    ],
  },
  {
    title: "Develop Your Pricing Volume",
    content:
      "Government pricing is not about being the cheapest — it is about being the most realistic and reasonable. Evaluators look for pricing that demonstrates you understand the scope of work and can deliver without cutting corners or running out of money. For cost-reimbursement contracts, you will need detailed cost breakdowns: labor categories, hours, rates, materials, travel, subcontractor costs, overhead, G&A, and profit. For firm-fixed-price contracts, you submit a total price but should still develop internal cost estimates to ensure you can deliver profitably. Your pricing must be consistent with your technical approach — if your technical volume promises a senior engineer for 2,000 hours, your pricing must include a senior engineer for 2,000 hours at a defensible rate. Common pricing mistakes: underpricing to win (leads to performance problems), inconsistency between technical and price volumes, missing cost elements that are clearly required by the scope, and failing to account for escalation on multi-year contracts.",
    tips: [
      "Price realistically — unrealistically low pricing raises red flags with evaluators",
      "Ensure pricing is consistent with your technical approach and staffing plan",
      "Include all cost elements: labor, materials, travel, subcontractors, overhead, G&A, profit",
      "For multi-year contracts, account for annual rate escalation",
      "Research GSA Schedule rates and Bureau of Labor Statistics data to support your rates",
    ],
  },
  {
    title: "Review, Edit, and Verify Compliance",
    content:
      "Before submission, your proposal needs at least two review cycles. First, a technical review: does the proposal address every requirement? Is the approach specific and credible? Is the staffing plan realistic? Are past performance references relevant? Second, a compliance review: does the proposal meet every formatting requirement (font size, margins, page limits, file format)? Are all required sections included? Are certifications and representations complete? Is the proposal organized exactly as instructed in Section L? Run your compliance matrix one final time — every requirement should have a specific page reference in your proposal. Have someone who did not write the proposal read it for clarity and gaps. Many small businesses lose on technicalities: a proposal that exceeds the page limit by one page, uses 11-point font when 12-point was required, or submits a PDF when a Word document was specified. These are automatic disqualifications in many evaluation processes.",
    tips: [
      "Run at least two review cycles: technical accuracy and formatting compliance",
      "Have someone who did not write the proposal do a fresh read-through",
      "Verify every page limit, font requirement, and file format specification",
      "Run your compliance matrix one final time with page numbers filled in",
      "Check that your proposal is organized in the exact order specified in Section L",
    ],
  },
  {
    title: "Submit Before the Deadline",
    content:
      "Government proposal deadlines are absolute — there are no extensions and no exceptions. If the solicitation says proposals are due by 2:00 PM ET on March 15, a proposal received at 2:01 PM will not be evaluated. Plan to submit at least 24 hours before the deadline. For electronic submissions through SAM.gov, beta.SAM.gov, or agency-specific portals, test your access and upload process well in advance. Large file uploads can fail, portals can experience high traffic near deadlines, and technical issues take time to resolve. For email submissions, confirm the email was received — request a read receipt or follow up with a phone call. For physical submissions (rare but still required by some agencies), use tracked delivery and confirm receipt. After submission, save a complete copy of everything you submitted, including any confirmation receipts or tracking numbers. You may need these for debriefings, protests, or future reference when responding to similar solicitations.",
    tips: [
      "Submit at least 24 hours before the deadline — no exceptions are made for late proposals",
      "Test the submission portal in advance — uploads can fail near deadline",
      "Save a complete copy of your submitted proposal and all confirmation receipts",
      "For email submissions, request a read receipt or confirm by phone",
      "Document your submission timestamp — you may need it for protests or debriefings",
    ],
  },
];

const proposalSections = [
  {
    section: "Technical Approach",
    purpose: "Demonstrates how you will perform the work",
    weight: "Often 40–50% of evaluation score",
  },
  {
    section: "Past Performance",
    purpose: "Proves you have successfully done similar work",
    weight: "Often 20–30% of evaluation score",
  },
  {
    section: "Pricing / Cost",
    purpose: "Shows your price is fair, realistic, and complete",
    weight: "Often 20–30% of evaluation score",
  },
  {
    section: "Management Approach",
    purpose: "Explains your team, org structure, and oversight plan",
    weight: "Sometimes combined with Technical",
  },
  {
    section: "Compliance Matrix",
    purpose: "Maps every requirement to your proposal response",
    weight: "Sometimes required as a separate volume",
  },
  {
    section: "Certifications & Reps",
    purpose: "Confirms eligibility, set-aside status, and compliance",
    weight: "Pass/fail — incomplete = disqualified",
  },
];

const commonMistakes = [
  {
    title: "Not answering the question that was asked",
    description:
      "The most common mistake is writing about your company's capabilities instead of addressing the specific requirements in the solicitation. Evaluators score your response against the evaluation criteria in Section M — if your proposal does not explicitly address each criterion, you will score poorly regardless of how qualified you are. Use the solicitation's language and structure your response to match the evaluation criteria.",
  },
  {
    title: "Generic boilerplate language",
    description:
      "Evaluators read hundreds of proposals. Phrases like 'industry-leading solutions,' 'unparalleled expertise,' and 'we will leverage our team' are filler that adds no value. Replace every generic statement with a specific one: instead of 'our experienced team,' write 'our team of 3 PMP-certified project managers with an average of 12 years of federal IT experience.'",
  },
  {
    title: "Inconsistency between volumes",
    description:
      "If your technical volume promises a senior analyst working 1,500 hours but your pricing volume budgets for 800 hours, evaluators will flag the inconsistency. Cross-check every staffing reference, deliverable, and timeline between your technical, management, and pricing volumes before submission.",
  },
  {
    title: "Missing the deadline",
    description:
      "Late proposals are not evaluated — period. Plan to submit 24 hours early. If using an online portal, test your access and upload capability days in advance. Portal crashes and upload failures near deadlines are common and will not be accepted as excuses.",
  },
];

const faqs = [
  {
    question: "How do I write a government proposal with no experience?",
    answer:
      "Start with smaller contracts — micro-purchases under $10,000 and simplified acquisitions under $250,000 have less complex requirements. Use your commercial experience as past performance. Consider subcontracting to a prime contractor first to build your federal track record. Focus on set-aside contracts for small businesses where competition is limited. The SBA also offers free proposal writing workshops and the Procurement Technical Assistance Center (PTAC) provides free one-on-one counseling.",
  },
  {
    question: "How long does it take to write a government proposal?",
    answer:
      "Simple proposals (5–15 pages) take 40–80 hours. Complex proposals (50–100+ pages) take 200–500+ hours across a team. Plan for at least 2–3 weeks for a straightforward proposal and 6–8 weeks for a major RFP. The biggest time sinks are gathering past performance references, developing detailed pricing, and the review/revision cycles. Start immediately when the solicitation drops — the 30-day response window goes fast.",
  },
  {
    question: "What is a compliance matrix?",
    answer:
      "A compliance matrix is a spreadsheet that maps every requirement from the solicitation to where it is addressed in your proposal. It typically has columns for: solicitation section, requirement text, proposal volume, proposal section/page, and compliance status (compliant, partially compliant, exception). Building one ensures you do not miss any requirement and gives evaluators a quick way to verify completeness. Some solicitations require you to submit it as part of your proposal.",
  },
  {
    question: "What are the most common reasons proposals are rejected?",
    answer:
      "The top reasons: non-responsiveness to solicitation requirements (missed a mandatory item), late submission, formatting violations (wrong font, exceeded page limits), incomplete pricing, failure to include required certifications, past performance that does not demonstrate relevant experience, and pricing that is unrealistically low or inconsistent with the technical approach. Most of these are preventable with a thorough compliance review before submission.",
  },
  {
    question: "Do I need a proposal writer or can I do it myself?",
    answer:
      "You can write proposals yourself, especially for smaller contracts. Many successful small businesses write their own proposals using the solicitation requirements as an outline. For large, complex RFPs ($10M+), professional proposal writers or consultants can be valuable — they know evaluation patterns, common pitfalls, and how to structure responses for maximum score. If you hire help, choose someone with experience in your specific agency and contract type.",
  },
  {
    question: "What is a set-aside contract and how does it help?",
    answer:
      "Set-aside contracts are reserved exclusively for specific categories of small businesses: general small business, 8(a), women-owned (WOSB), service-disabled veteran-owned (SDVOSB), and HUBZone. When a contract is set aside, only eligible businesses can compete — reducing your competition significantly. The federal government sets aside roughly 23% of all contract dollars for small businesses. Check your eligibility and get certified through SBA.gov to access these opportunities.",
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

export default function ProposalWritingGuidePage() {
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
            How to Write a Government Proposal
            <span className="block text-blue-400">7-Step Guide for Small Businesses</span>
          </h1>
          <p className="text-lg text-slate-400">
            Most small businesses lose government proposals not because they lack
            capability, but because they miss requirements, use generic language, or
            submit late. This guide walks you through the 7-step process from reading
            the solicitation to submission — with specific advice for businesses new
            to federal contracting.
          </p>
        </div>

        {/* Key sections overview */}
        <div className="flex flex-col gap-4 rounded-lg border border-slate-800 bg-slate-900 p-6">
          <h2 className="text-xl font-semibold text-white">Key proposal sections at a glance</h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {proposalSections.map((item) => (
              <div key={item.section} className="rounded-md bg-slate-950 p-3">
                <p className="text-sm font-semibold text-white">{item.section}</p>
                <p className="mt-0.5 text-xs text-slate-500">{item.purpose}</p>
                <p className="mt-0.5 text-xs text-blue-400">{item.weight}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Step-by-step */}
        <div className="flex flex-col gap-6">
          <h2 className="text-xl font-semibold text-white">7-step proposal writing process</h2>
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

        {/* Small business advantages */}
        <div className="flex flex-col gap-4 rounded-lg border border-slate-800 bg-slate-900 p-6">
          <h2 className="text-xl font-semibold text-white">Small business advantages in federal proposals</h2>
          <div className="space-y-3 text-sm leading-relaxed text-slate-400">
            <p>
              The federal government is required by law to award at least 23% of all contract dollars to small businesses. This means there are dedicated programs and set-aside contracts that limit competition to small businesses only — giving you a significant advantage over large primes.
            </p>
            <p>
              <strong className="text-white">Set-aside programs:</strong> If you qualify as a small business under your NAICS code&apos;s size standard, you can compete for small business set-aside contracts where large businesses are excluded. Additional programs exist for 8(a) businesses, women-owned small businesses (WOSB), service-disabled veteran-owned small businesses (SDVOSB), and HUBZone businesses — each with their own sole-source and set-aside thresholds.
            </p>
            <p>
              <strong className="text-white">SBA resources:</strong> The Small Business Administration offers free resources for proposal writing, including Procurement Technical Assistance Centers (PTACs) in every state that provide one-on-one counseling, proposal review, and bid matching at no cost. SCORE mentors — retired executives who volunteer through SBA — can also review your proposals and provide feedback.
            </p>
            <p>
              <strong className="text-white">Mentor-Protégé Program:</strong> The SBA&apos;s Mentor-Protégé program pairs small businesses with experienced government contractors who provide guidance on proposal writing, teaming arrangements, and business development. As a protégé, you can joint-venture with your mentor on contracts that would otherwise be too large for your company alone.
            </p>
          </div>
        </div>

        {/* Common mistakes */}
        <div className="flex flex-col gap-4">
          <h2 className="text-xl font-semibold text-white">Common proposal mistakes to avoid</h2>
          <div className="space-y-4 text-sm leading-relaxed text-slate-400">
            {commonMistakes.map((mistake) => (
              <div key={mistake.title}>
                <h3 className="font-semibold text-white text-base">{mistake.title}</h3>
                <p className="mt-1">{mistake.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="flex flex-col items-center gap-4 rounded-xl border border-blue-900/30 bg-blue-950/20 p-8 text-center">
          <h2 className="text-2xl font-bold text-white">
            Find contracts to bid on
          </h2>
          <p className="max-w-md text-sm text-slate-400">
            Search federal contract awards by NAICS code, set-aside type, and agency. See who is winning in your industry, what they&apos;re being paid, and where opportunities match your capabilities.
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
              { name: "Capability Statement Template", desc: "Free template with section-by-section breakdown", href: "/guides/capability-statement-template" },
              { name: "SAM.gov Registration Guide", desc: "Step-by-step registration — required before bidding", href: "/guides/sam-gov-registration" },
              { name: "NAICS Code Lookup", desc: "Find your industry codes for contract searches", href: "/guides/naics-code-lookup" },
              { name: "How to Find Government Contracts", desc: "Where to search and how to evaluate opportunities", href: "/guides/find-government-contracts" },
              { name: "Small Business Set-Asides", desc: "SBA size standards and reserved contract programs", href: "/guides/small-business-set-aside" },
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
