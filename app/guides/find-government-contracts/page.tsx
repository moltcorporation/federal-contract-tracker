import Link from "next/link";
import { CrossProductFooter } from "@/app/components/cross-product-footer";

const steps = [
  {
    title: "Register on SAM.gov",
    body: "Every business that wants to bid on federal contracts must register in the System for Award Management (SAM.gov). Registration is free but takes 7–10 business days to process. You'll need your EIN, DUNS/UEI number, bank account information, and NAICS codes. Keep your registration active — it must be renewed annually.",
  },
  {
    title: "Find your NAICS codes",
    body: "Federal contracts are categorized by North American Industry Classification System (NAICS) codes. These 6-digit codes describe what your business does — for example, 541511 is Custom Computer Programming Services. Most businesses qualify under 2–5 NAICS codes. Use the GovScout's autocomplete to search by keyword and find the codes that match your services.",
  },
  {
    title: "Understand set-aside programs",
    body: "The federal government reserves a percentage of contracts for qualifying small businesses through set-aside programs. If your business qualifies for any of these, you'll face less competition on set-aside contracts. The main programs are 8(a) Business Development, WOSB (Women-Owned Small Business), SDVOSB (Service-Disabled Veteran-Owned Small Business), and HUBZone. Each has different eligibility requirements and certification processes.",
  },
  {
    title: "Research who is winning contracts",
    body: "Before you bid on anything, study the competitive landscape. Use the GovScout to search awarded contracts by your NAICS code. See which companies are winning, which agencies are buying, how much they're spending, and whether contracts are set aside for small businesses. This research tells you where the opportunities are and who you're competing against.",
  },
  {
    title: "Identify your target agencies",
    body: "Not all agencies buy the same services. Use the Spending by Agency view to see which agencies spend the most in your NAICS codes. Focus your business development on agencies that consistently award contracts in your space. Some agencies have stronger small business programs than others — look for agencies that frequently use set-aside contracts.",
  },
  {
    title: "Track spending trends",
    body: "Federal spending fluctuates by quarter and fiscal year. Use the Trends page to see whether spending in your NAICS codes is growing, shrinking, or seasonal. Many agencies increase spending at the end of the fiscal year (September) to use remaining budget. Understanding these patterns helps you time your outreach.",
  },
];

const faqs = [
  {
    question: "How do I find government contracts for my small business?",
    answer:
      "Start by registering on SAM.gov (free, required for all federal contractors). Then identify your NAICS codes — these determine which contracts match your services. Use the GovScout to research awarded contracts in your NAICS codes, see which agencies are buying, and identify set-aside opportunities. If you qualify for a set-aside program (8(a), WOSB, SDVOSB, HUBZone), get certified to access reserved contracts with less competition.",
  },
  {
    question: "What are the main set-aside programs for small businesses?",
    answer:
      "The four main set-aside programs are: 8(a) Business Development (for socially and economically disadvantaged businesses), WOSB (Women-Owned Small Business), SDVOSB (Service-Disabled Veteran-Owned Small Business), and HUBZone (businesses in Historically Underutilized Business Zones). There are also general small business set-asides that any SBA-certified small business can compete for. Each program has its own eligibility criteria and certification process.",
  },
  {
    question: "Is it free to bid on government contracts?",
    answer:
      "Yes. SAM.gov registration is free. Accessing contract opportunities on SAM.gov is free. There is no fee to submit a bid or proposal. Be cautious of any service that charges for basic access to government contract listings — the data is publicly available. Tools like the GovScout charge for enhanced research features, but basic contract search is free (10 searches/day).",
  },
  {
    question: "What is a NAICS code and how do I find mine?",
    answer:
      "NAICS (North American Industry Classification System) codes are 6-digit codes that describe business activities. They determine which contracts you can bid on and which SBA size standards apply to your business. To find yours, search by keyword on the GovScout — type your industry (e.g., 'janitorial', 'IT consulting', 'construction') and the autocomplete will show matching codes with descriptions.",
  },
  {
    question: "How much are government contracts worth?",
    answer:
      "Federal contracts range from a few thousand dollars (micro-purchases under $10,000 don't even require competitive bidding) to billions for major defense programs. Most small business contracts fall in the $25,000 to $250,000 range. Set-aside sole-source contracts can go up to $4.5 million for services or $8 million for manufacturing. Use the GovScout to see actual award amounts in your NAICS codes — this gives you realistic expectations for your industry.",
  },
  {
    question: "What is the difference between SAM.gov and the GovScout?",
    answer:
      "SAM.gov is the government's official system — you register there and can search for upcoming solicitations (opportunities to bid). The GovScout searches awarded contracts — contracts that have already been won. SAM.gov tells you what's available to bid on. The GovScout tells you who's winning, how much they're getting, and from which agencies. Both are useful for different stages of business development.",
  },
];

export default function FindGovernmentContractsGuide() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "How to Find Government Contracts for Small Business",
    description:
      "Step-by-step guide to finding federal government contracts for small businesses, including SAM.gov registration, NAICS codes, set-aside programs, and competitive research.",
    step: steps.map((s, i) => ({
      "@type": "HowToStep",
      position: i + 1,
      name: s.title,
      text: s.body,
    })),
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: f.answer,
      },
    })),
  };

  return (
    <div className="flex min-h-screen flex-col bg-slate-950 font-sans">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <header className="flex items-center justify-between border-b border-slate-800 px-6 py-4">
        <Link href="/" className="flex items-center gap-2">
          <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6 text-blue-400" aria-hidden="true">
            <path d="M3 21V7l9-4 9 4v14" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
            <path d="M9 21V13h6v8" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
            <circle cx="12" cy="9.5" r="1.5" fill="currentColor" />
          </svg>
          <span className="text-lg font-bold tracking-tight text-white">
            GovScout
          </span>
        </Link>
        <div className="flex items-center gap-4">
          <Link href="/trends" className="text-sm font-medium text-slate-400 transition-colors hover:text-blue-400">Trends</Link>
          <Link href="/saved-searches" className="text-sm font-medium text-slate-400 transition-colors hover:text-blue-400">Saved Searches</Link>
          <Link href="/pricing" className="text-sm font-medium text-blue-400 transition-colors hover:text-blue-300">Pricing</Link>
        </div>
      </header>

      <main className="mx-auto flex w-full max-w-3xl flex-col gap-10 px-4 py-12">
        <div className="flex flex-col gap-4">
          <p className="text-sm font-medium text-blue-400">
            Guide
          </p>
          <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            How to Find Government Contracts
            <span className="block text-blue-400">
              For Small Business
            </span>
          </h1>
          <p className="text-lg text-slate-400">
            The federal government spends over $700 billion per year on
            contracts, and by law a percentage is reserved for small businesses.
            Here&apos;s how to find contracts in your industry, understand the
            set-aside programs, and research your competition — step by step.
          </p>
        </div>

        {/* Steps */}
        <div className="flex flex-col gap-6">
          {steps.map((step, i) => (
            <div
              key={i}
              className="flex gap-4 rounded-lg border border-slate-800 bg-slate-900 p-5"
            >
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-900/50 text-sm font-bold text-blue-300">
                {i + 1}
              </div>
              <div className="flex flex-col gap-1.5">
                <h2 className="text-lg font-semibold text-white">
                  {step.title}
                </h2>
                <p className="text-sm leading-relaxed text-slate-400">
                  {step.body}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="flex flex-col items-center gap-4 rounded-xl border border-blue-900/30 bg-blue-950/20 p-8 text-center">
          <h2 className="text-2xl font-bold text-white">
            Start researching government contracts
          </h2>
          <p className="max-w-md text-sm text-slate-400">
            Enter your NAICS code, filter by set-aside type, and see every
            awarded contract in your industry. Free — 10 searches per day, no
            registration.
          </p>
          <Link
            href="/"
            className="rounded-lg bg-blue-500 px-8 py-3 text-base font-semibold text-white shadow-sm transition-all hover:bg-blue-400"
          >
            Search contracts free
          </Link>
        </div>

        {/* Set-aside program guides */}
        <div className="flex flex-col gap-4">
          <h2 className="text-xl font-semibold text-white">
            Set-aside program guides
          </h2>
          <p className="text-sm text-slate-400">
            If your business qualifies for a set-aside program, you can compete
            for contracts reserved for your category. Read the detailed guide
            for each program:
          </p>
          <div className="grid gap-3 sm:grid-cols-2">
            {[
              {
                name: "8(a) Business Development",
                desc: "For socially and economically disadvantaged businesses",
                href: "/guides/8a-set-aside-contracts",
              },
              {
                name: "WOSB",
                desc: "Women-Owned Small Businesses",
                href: "/guides/wosb-contracts",
              },
              {
                name: "SDVOSB",
                desc: "Service-Disabled Veteran-Owned Small Businesses",
                href: "/guides/sdvosb-contracts",
              },
              {
                name: "HUBZone",
                desc: "Businesses in Historically Underutilized Business Zones",
                href: "/guides/hubzone-contracts",
              },
            ].map((type) => (
              <Link
                key={type.name}
                href={type.href}
                className="rounded-lg border border-slate-800 bg-slate-900 p-4 transition-colors hover:border-blue-600"
              >
                <span className="font-semibold text-blue-400">
                  {type.name}
                </span>
                <p className="mt-1 text-xs text-slate-400">
                  {type.desc}
                </p>
              </Link>
            ))}
          </div>
        </div>

        {/* Compare tools */}
        <div className="flex flex-col gap-4">
          <h2 className="text-xl font-semibold text-white">
            Compare contract research tools
          </h2>
          <p className="text-sm text-slate-400">
            See how the GovScout compares to other platforms:
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/compare/sam-gov"
              className="rounded-lg border border-slate-700 bg-slate-900 px-4 py-2.5 text-sm font-medium text-slate-300 transition-colors hover:border-blue-600 hover:text-blue-400"
            >
              FCT vs SAM.gov
            </Link>
            <Link
              href="/compare/usaspending"
              className="rounded-lg border border-slate-700 bg-slate-900 px-4 py-2.5 text-sm font-medium text-slate-300 transition-colors hover:border-blue-600 hover:text-blue-400"
            >
              FCT vs USASpending
            </Link>
            <Link
              href="/compare/govwin"
              className="rounded-lg border border-slate-700 bg-slate-900 px-4 py-2.5 text-sm font-medium text-slate-300 transition-colors hover:border-blue-600 hover:text-blue-400"
            >
              FCT vs GovWin
            </Link>
          </div>
        </div>

        {/* FAQ */}
        <div className="flex flex-col gap-5">
          <h2 className="text-xl font-semibold text-white">
            Frequently asked questions
          </h2>
          <div className="flex flex-col gap-4">
            {faqs.map((faq, i) => (
              <div
                key={i}
                className="rounded-lg border border-slate-800 bg-slate-900 p-5"
              >
                <h3 className="font-semibold text-white">
                  {faq.question}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-400">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </main>

      <CrossProductFooter />
    </div>
  );
}
