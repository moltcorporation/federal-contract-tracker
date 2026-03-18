import Link from "next/link";

const steps = [
  {
    title: "Check if your business is in a HUBZone",
    body: "HUBZone eligibility starts with location. Your principal office must be in a Historically Underutilized Business Zone, and at least 35% of your employees must live in a HUBZone. Use the SBA's HUBZone map at maps.certify.sba.gov to check your address. HUBZones include rural areas, qualified census tracts, Indian lands, and areas affected by base closures.",
  },
  {
    title: "Get HUBZone certified through the SBA",
    body: "Apply at certify.sba.gov. You must be a small business (by SBA size standards for your NAICS code), at least 51% owned by U.S. citizens, and meet the location and employee residency requirements. Certification takes 60-90 days. Once certified, you must be recertified every three years and maintain your HUBZone employees.",
  },
  {
    title: "Find your NAICS code",
    body: "Federal contracts are categorized by NAICS code. Use the Federal Contract Tracker's autocomplete — type your industry (e.g., 'construction', 'IT services', 'manufacturing') and select the matching code. Knowing your NAICS code is essential for finding HUBZone contracts in your industry.",
  },
  {
    title: "Search for awarded HUBZone contracts",
    body: "On the Federal Contract Tracker, enter your NAICS code and select \"HUBZone\" from the set-aside filter. This shows every HUBZone contract that has been awarded in your industry — who won, which agency awarded it, and the dollar amount. You'll see your competitive landscape instantly.",
  },
  {
    title: "Identify top agencies and track trends",
    body: "Use the Spending by Agency tab to see which agencies award the most HUBZone contracts in your NAICS code. Visit the Trends page and filter by HUBZone set-aside to see quarterly spending patterns. Some agencies have strong HUBZone programs — the Department of Defense, GSA, and VA are consistently large HUBZone spenders.",
  },
];

const faqs = [
  {
    question: "What is a HUBZone set-aside contract?",
    answer:
      "A HUBZone set-aside is a federal contract reserved for small businesses certified under the SBA's HUBZone program. The program aims to stimulate economic development in Historically Underutilized Business Zones by giving certified businesses preferential access to federal contracts. Only SBA-certified HUBZone businesses can bid on these contracts.",
  },
  {
    question: "What qualifies as a HUBZone?",
    answer:
      "HUBZones include qualified census tracts (based on household income and unemployment data), qualified non-metropolitan counties, Indian lands (including Alaska Native Village areas and Hawaiian Home Lands), qualified base closure areas, and qualified disaster areas. The SBA maintains an interactive map at maps.certify.sba.gov where you can check any address.",
  },
  {
    question: "What are the HUBZone certification requirements?",
    answer:
      "Your business must be a small business by SBA standards, at least 51% owned and controlled by U.S. citizens, have its principal office in a HUBZone, and have at least 35% of its employees residing in a HUBZone. The 35% employee requirement is calculated based on all employees, not just full-time — part-time employees count too.",
  },
  {
    question: "How much are HUBZone contracts worth?",
    answer:
      "HUBZone sole-source contracts can be up to $4.5 million for services or $8 million for manufacturing. Competitive HUBZone set-asides have no dollar limit. HUBZone businesses also get a 10% price evaluation preference on full and open competition contracts, meaning their bid is treated as 10% lower when evaluated against non-HUBZone competitors.",
  },
  {
    question: "What is the HUBZone price evaluation preference?",
    answer:
      "Even on contracts that aren't set aside for HUBZone, certified businesses get a 10% price evaluation preference in full and open competitions. If a HUBZone firm bids $110,000 and a non-HUBZone firm bids $100,000, they're evaluated equally. This applies only to contracts awarded based on price — not best value acquisitions.",
  },
  {
    question: "Can I search HUBZone contracts from a specific agency?",
    answer:
      "Yes. In the Federal Contract Tracker, select \"HUBZone\" as the set-aside type, then use the Awarding Agency dropdown to filter by a specific agency. You can also use the Spending by Agency tab to see which agencies award the most HUBZone contracts in your NAICS code.",
  },
  {
    question: "Where does this data come from?",
    answer:
      "All contract data comes from USASpending.gov, the U.S. government's official source for federal spending data. It is updated daily and covers all awarded federal contracts including set-aside designations.",
  },
];

export default function HubzoneGuide() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "How to Find HUBZone Set-Aside Federal Contracts",
    description:
      "Step-by-step guide to finding HUBZone set-aside federal contract awards for businesses in Historically Underutilized Business Zones.",
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
            Federal Contract Tracker
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
            How to Find HUBZone Set-Aside
            <span className="block text-blue-400">
              Federal Contracts
            </span>
          </h1>
          <p className="text-lg text-slate-400">
            The HUBZone program gives small businesses in Historically
            Underutilized Business Zones preferential access to federal
            contracts. If your business is HUBZone-certified, here&apos;s how
            to find awarded contracts in your industry, identify the agencies
            spending the most, and research your competition.
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
            Search HUBZone contracts now
          </h2>
          <p className="max-w-md text-sm text-slate-400">
            Enter your NAICS code, select the HUBZone set-aside filter, and see
            every awarded contract in your industry. Free — 10 searches per day,
            no registration.
          </p>
          <Link
            href="/"
            className="rounded-lg bg-blue-500 px-8 py-3 text-base font-semibold text-white shadow-sm transition-all hover:bg-blue-400"
          >
            Search HUBZone contracts free
          </Link>
        </div>

        {/* Other set-aside types */}
        <div className="flex flex-col gap-4">
          <h2 className="text-xl font-semibold text-white">
            Other set-aside types
          </h2>
          <p className="text-sm text-slate-400">
            The Federal Contract Tracker supports all major set-aside types:
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
                name: "SBA Small Business",
                desc: "General small business set-asides",
                href: "/guides/small-business-set-aside",
              },
            ].map((type) => (
              <div
                key={type.name}
                className="rounded-lg border border-slate-800 bg-slate-900 p-4"
              >
                {type.href ? (
                  <Link href={type.href} className="font-semibold text-blue-400 hover:text-blue-300">
                    {type.name}
                  </Link>
                ) : (
                  <h3 className="font-semibold text-white">
                    {type.name}
                  </h3>
                )}
                <p className="mt-1 text-xs text-slate-400">
                  {type.desc}
                </p>
              </div>
            ))}
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

        {/* More resources */}
        <div className="flex flex-col gap-3">
          <h2 className="text-xl font-semibold text-white">
            More resources
          </h2>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/guides/8a-set-aside-contracts"
              className="rounded-lg border border-slate-700 bg-slate-900 px-4 py-2.5 text-sm font-medium text-slate-300 transition-colors hover:border-blue-600 hover:text-blue-400"
            >
              8(a) Set-Aside Guide
            </Link>
            <Link
              href="/guides/wosb-contracts"
              className="rounded-lg border border-slate-700 bg-slate-900 px-4 py-2.5 text-sm font-medium text-slate-300 transition-colors hover:border-blue-600 hover:text-blue-400"
            >
              WOSB Contracts Guide
            </Link>
            <Link
              href="/compare/sam-gov"
              className="rounded-lg border border-slate-700 bg-slate-900 px-4 py-2.5 text-sm font-medium text-slate-300 transition-colors hover:border-blue-600 hover:text-blue-400"
            >
              FCT vs SAM.gov
            </Link>
            <Link
              href="/trends"
              className="rounded-lg border border-slate-700 bg-slate-900 px-4 py-2.5 text-sm font-medium text-slate-300 transition-colors hover:border-blue-600 hover:text-blue-400"
            >
              Spending Trends
            </Link>
          </div>
        </div>
      </main>

      <footer className="flex flex-col items-center gap-3 border-t border-slate-800 px-6 py-6">
        <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-slate-500">
          <span className="font-medium">Moltcorp Products:</span>
          <span className="font-semibold text-blue-400">Federal Contract Tracker</span>
          <a href="https://statusping-moltcorporation.vercel.app" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-blue-400">StatusPing</a>
          <a href="https://qr-code-tool-moltcorporation.vercel.app" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-blue-400">Qdot</a>
        </div>
        <p className="text-xs text-slate-600">
          Data from{" "}
          <a href="https://usaspending.gov" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-blue-400">USASpending.gov</a>
          {" "}&middot; Built by agents at{" "}
          <a href="https://moltcorporation.com" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-blue-400">Moltcorp</a>
        </p>
      </footer>
    </div>
  );
}
