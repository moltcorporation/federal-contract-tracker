import Link from "next/link";

const steps = [
  {
    title: "Know your NAICS code",
    body: "Every federal contract is tagged with a NAICS code that identifies the industry. If you do IT consulting, your code might be 541512 (Computer Systems Design Services). If you do janitorial services, it's 561720. You need to know your code to find relevant contracts. The Federal Contract Tracker has NAICS autocomplete — start typing your industry and it suggests matching codes.",
  },
  {
    title: "Search for awarded 8(a) contracts",
    body: "Go to the Federal Contract Tracker, enter your NAICS code, and select \"8(a) Business Development\" from the set-aside filter. This shows you every 8(a) contract that has already been awarded in your industry. You'll see who won, which agency awarded it, and the dollar amount.",
  },
  {
    title: "Identify which agencies buy your services",
    body: "Look at the awarding agencies in your search results. If the Department of Veterans Affairs awarded 15 contracts in your NAICS code last year, that's a warm lead. Switch to the Spending by Agency tab to see which agencies spend the most on 8(a) contracts in your industry.",
  },
  {
    title: "Research your competitors",
    body: "The search results show which companies are winning 8(a) contracts. Click any contract to see the full award detail — financial summary, business categories, competition status, and place of performance. This is your competitive intelligence. Know who's winning, how much they're winning, and where.",
  },
  {
    title: "Track spending trends",
    body: "Visit the Trends page and filter by your NAICS code with the 8(a) set-aside. You'll see quarterly spending patterns — is spending going up or down? Which contractors are getting the most awards? This helps you time your proposals and focus on growing markets.",
  },
];

const faqs = [
  {
    question: "What is an 8(a) set-aside contract?",
    answer:
      "An 8(a) set-aside is a federal contract reserved exclusively for small businesses participating in the SBA's 8(a) Business Development program. The program helps socially and economically disadvantaged businesses compete for federal contracts. Only certified 8(a) firms can bid on these contracts, reducing competition and giving participants a real advantage.",
  },
  {
    question: "How do I get 8(a) certification?",
    answer:
      "Apply through the SBA's certify.sba.gov portal. You must be a small business that is at least 51% owned by a U.S. citizen who is socially and economically disadvantaged. The business must have been in operation for at least two years. The 8(a) program lasts nine years — four in the developmental stage and five in the transitional stage.",
  },
  {
    question: "How much are 8(a) contracts worth?",
    answer:
      "8(a) contracts range from a few thousand dollars to tens of millions. Sole-source 8(a) contracts (awarded without competition) can be up to $4.5 million for goods and services or $8 million for manufacturing. Competitive 8(a) contracts have no dollar limit. Use the Federal Contract Tracker to see actual awarded amounts in your NAICS code.",
  },
  {
    question: "What's the difference between 8(a) and other set-asides?",
    answer:
      "8(a) is for socially and economically disadvantaged businesses. HUBZone is for businesses in Historically Underutilized Business Zones. WOSB is for Women-Owned Small Businesses. SDVOSB is for Service-Disabled Veteran-Owned Small Businesses. Each program has different eligibility requirements and the contracts are reserved for different groups.",
  },
  {
    question: "Can I see 8(a) contracts from specific agencies?",
    answer:
      "Yes. In the Federal Contract Tracker, select \"8(a) Business Development\" as the set-aside type, then use the Awarding Agency dropdown to filter by a specific agency. You can also use the Spending by Agency tab to see which agencies award the most 8(a) contracts in your NAICS code.",
  },
  {
    question: "Where does this data come from?",
    answer:
      "All contract data comes from USASpending.gov, the U.S. government's official source for federal spending data. It is updated daily and covers all awarded federal contracts including set-aside designations.",
  },
];

export default function EightAGuide() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "How to Find 8(a) Set-Aside Federal Contracts",
    description:
      "Step-by-step guide to searching for 8(a) set-aside federal contract awards using the Federal Contract Tracker.",
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
    <div className="flex min-h-screen flex-col bg-slate-50 font-sans dark:bg-slate-950">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <header className="flex items-center justify-between border-b border-slate-200 px-6 py-4 dark:border-slate-800">
        <Link href="/" className="flex items-center gap-2">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            className="h-6 w-6 text-blue-600 dark:text-blue-400"
            aria-hidden="true"
          >
            <path d="M3 21V7l9-4 9 4v14" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
            <path d="M9 21V13h6v8" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
            <circle cx="12" cy="9.5" r="1.5" fill="currentColor" />
          </svg>
          <span className="text-lg font-bold tracking-tight text-slate-900 dark:text-white">
            Federal Contract Tracker
          </span>
        </Link>
        <div className="flex items-center gap-4">
          <Link
            href="/trends"
            className="text-sm font-medium text-slate-600 transition-colors hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400"
          >
            Trends
          </Link>
          <Link
            href="/pricing"
            className="text-sm font-medium text-blue-600 transition-colors hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
          >
            Pricing
          </Link>
          <Link
            href="/"
            className="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-400"
          >
            Search contracts free
          </Link>
        </div>
      </header>

      <main className="mx-auto flex w-full max-w-3xl flex-col gap-10 px-4 py-12">
        <div className="flex flex-col gap-4">
          <p className="text-sm font-medium text-blue-600 dark:text-blue-400">
            Guide
          </p>
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl dark:text-white">
            How to Find 8(a) Set-Aside
            <span className="block text-blue-600 dark:text-blue-400">
              Federal Contracts
            </span>
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400">
            If you&apos;re in the SBA 8(a) Business Development program, the
            federal government sets aside contracts specifically for your
            business. The challenge is finding them. Here&apos;s how to search
            awarded 8(a) contracts, identify which agencies buy your services,
            and research your competitors.
          </p>
        </div>

        {/* Steps */}
        <div className="flex flex-col gap-6">
          {steps.map((step, i) => (
            <div
              key={i}
              className="flex gap-4 rounded-lg border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900"
            >
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-100 text-sm font-bold text-blue-700 dark:bg-blue-900/50 dark:text-blue-300">
                {i + 1}
              </div>
              <div className="flex flex-col gap-1.5">
                <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
                  {step.title}
                </h2>
                <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                  {step.body}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="flex flex-col items-center gap-4 rounded-xl border border-blue-200 bg-blue-50 p-8 text-center dark:border-blue-900/30 dark:bg-blue-950/20">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
            Search 8(a) contracts now
          </h2>
          <p className="max-w-md text-sm text-slate-600 dark:text-slate-400">
            Enter your NAICS code, select the 8(a) set-aside filter, and see
            every awarded contract in your industry. Free — 10 searches per day,
            no registration.
          </p>
          <Link
            href="/"
            className="rounded-lg bg-blue-600 px-8 py-3 text-base font-semibold text-white shadow-sm transition-all hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-400"
          >
            Search 8(a) contracts free
          </Link>
        </div>

        {/* Other set-aside types */}
        <div className="flex flex-col gap-4">
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
            Other set-aside types
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            The Federal Contract Tracker supports all major set-aside types.
            Use the same search process for any of these:
          </p>
          <div className="grid gap-3 sm:grid-cols-2">
            {[
              {
                name: "HUBZone",
                desc: "Businesses in Historically Underutilized Business Zones",
                href: "/guides/hubzone-contracts",
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
                name: "SBA Small Business",
                desc: "General small business set-asides",
                href: "/guides/small-business-set-aside",
              },
            ].map((type) => (
              <div
                key={type.name}
                className="rounded-lg border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900"
              >
                {type.href ? (
                  <Link href={type.href} className="font-semibold text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300">
                    {type.name}
                  </Link>
                ) : (
                  <h3 className="font-semibold text-slate-900 dark:text-white">
                    {type.name}
                  </h3>
                )}
                <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                  {type.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ */}
        <div className="flex flex-col gap-5">
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
            Frequently asked questions
          </h2>
          <div className="flex flex-col gap-4">
            {faqs.map((faq, i) => (
              <div
                key={i}
                className="rounded-lg border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900"
              >
                <h3 className="font-semibold text-slate-900 dark:text-white">
                  {faq.question}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* More resources */}
        <div className="flex flex-col gap-3">
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
            More resources
          </h2>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/guides/wosb-contracts"
              className="rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 transition-colors hover:border-blue-300 hover:text-blue-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:border-blue-600 dark:hover:text-blue-400"
            >
              WOSB Contracts Guide
            </Link>
            <Link
              href="/guides/hubzone-contracts"
              className="rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 transition-colors hover:border-blue-300 hover:text-blue-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:border-blue-600 dark:hover:text-blue-400"
            >
              HUBZone Contracts Guide
            </Link>
            <Link
              href="/compare/sam-gov"
              className="rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 transition-colors hover:border-blue-300 hover:text-blue-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:border-blue-600 dark:hover:text-blue-400"
            >
              FCT vs SAM.gov
            </Link>
            <Link
              href="/compare/govwin"
              className="rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 transition-colors hover:border-blue-300 hover:text-blue-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:border-blue-600 dark:hover:text-blue-400"
            >
              FCT vs GovWin
            </Link>
            <Link
              href="/trends"
              className="rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 transition-colors hover:border-blue-300 hover:text-blue-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:border-blue-600 dark:hover:text-blue-400"
            >
              Spending Trends
            </Link>
            <Link
              href="/pricing"
              className="rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 transition-colors hover:border-blue-300 hover:text-blue-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:border-blue-600 dark:hover:text-blue-400"
            >
              Pricing
            </Link>
          </div>
        </div>
      </main>

      <footer className="flex flex-col items-center gap-3 border-t border-slate-200 px-6 py-6 dark:border-slate-800">
        <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-slate-400 dark:text-slate-500">
          <span className="font-medium">Moltcorp Products:</span>
          <span className="font-semibold text-blue-600 dark:text-blue-400">
            Federal Contract Tracker
          </span>
          <a href="https://statusping-moltcorporation.vercel.app" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-blue-600 dark:hover:text-blue-400">StatusPing</a>
          <a href="https://domain-audit-tool-moltcorporation.vercel.app" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-blue-600 dark:hover:text-blue-400">Recon</a>
          <a href="https://qr-code-tool-moltcorporation.vercel.app" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-blue-600 dark:hover:text-blue-400">Qdot</a>
        </div>
        <p className="text-xs text-slate-400 dark:text-slate-600">
          Data from{" "}
          <a href="https://usaspending.gov" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-blue-600 dark:hover:text-blue-400">USASpending.gov</a>
          {" "}&middot; Built by agents at{" "}
          <a href="https://moltcorporation.com" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-blue-600 dark:hover:text-blue-400">Moltcorp</a>
        </p>
      </footer>
    </div>
  );
}
