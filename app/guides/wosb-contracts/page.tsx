import Link from "next/link";
import { CrossProductFooter } from "@/app/components/cross-product-footer";

const steps = [
  {
    title: "Confirm your WOSB or EDWOSB certification",
    body: "To bid on WOSB set-aside contracts, your business must be certified through the SBA. As of 2023, self-certification is no longer accepted — you need third-party certification through an SBA-approved certifier or directly through certify.sba.gov. EDWOSB (Economically Disadvantaged Women-Owned Small Business) certification unlocks additional set-aside contracts in specific NAICS codes.",
  },
  {
    title: "Find your NAICS code",
    body: "Federal contracts are categorized by NAICS code. Use the GovScout's autocomplete — type your industry (e.g., 'janitorial', 'consulting', 'construction') and select the matching code. WOSB set-asides are available in specific NAICS codes where women-owned businesses are underrepresented. The SBA maintains the list of eligible codes.",
  },
  {
    title: "Search for awarded WOSB contracts",
    body: "On the GovScout, enter your NAICS code and select \"Women-Owned Small Business\" from the set-aside filter. This shows every WOSB contract that has been awarded in your industry — who won, which agency awarded it, and the dollar amount. This is your competitive landscape.",
  },
  {
    title: "Compare WOSB and EDWOSB awards",
    body: "Run two searches: one with WOSB and one with EDWOSB (Economically Disadvantaged WOSB). EDWOSB set-asides are available in more NAICS codes and may have less competition. If you qualify for EDWOSB, you can bid on both WOSB and EDWOSB set-asides, doubling your opportunities.",
  },
  {
    title: "Track agency spending patterns",
    body: "Use the Spending by Agency tab to see which agencies award the most WOSB contracts in your NAICS code. Some agencies have stronger small business programs than others. The Trends page shows quarterly spending over time — look for agencies increasing their WOSB spending.",
  },
];

const faqs = [
  {
    question: "What is a WOSB set-aside contract?",
    answer:
      "A WOSB (Women-Owned Small Business) set-aside is a federal contract reserved exclusively for certified women-owned small businesses. The program was created to help women-owned businesses compete in industries where they are underrepresented. Only businesses with current WOSB certification through the SBA can bid on these contracts.",
  },
  {
    question: "What is the difference between WOSB and EDWOSB?",
    answer:
      "WOSB is for any certified women-owned small business. EDWOSB (Economically Disadvantaged Women-Owned Small Business) is for women-owned businesses where the woman owner's personal net worth is below $750,000 (excluding home and business equity). EDWOSB set-asides are available in more NAICS codes, giving qualifying businesses access to more opportunities.",
  },
  {
    question: "How do I get WOSB certification?",
    answer:
      "Apply through certify.sba.gov or an SBA-approved third-party certifier. Your business must be at least 51% owned and controlled by one or more women who are U.S. citizens. The women owners must manage day-to-day operations and make long-term decisions. Self-certification is no longer accepted as of January 2023.",
  },
  {
    question: "What are the contract dollar limits for WOSB set-asides?",
    answer:
      "Sole-source WOSB contracts can be up to $4.5 million for services or $8 million for manufacturing. Competitive WOSB set-asides have no dollar limit. Agencies can also set aside contracts below the simplified acquisition threshold ($250,000) for WOSBs.",
  },
  {
    question: "Which NAICS codes are eligible for WOSB set-asides?",
    answer:
      "WOSB set-asides are available in NAICS codes where women-owned businesses are substantially underrepresented. The SBA maintains the official list, which includes industries like construction, manufacturing, IT services, and professional services. EDWOSB set-asides cover additional NAICS codes where women-owned businesses are underrepresented (a broader category).",
  },
  {
    question: "Can I search for WOSB contracts from a specific agency?",
    answer:
      "Yes. In the GovScout, select \"Women-Owned Small Business\" as the set-aside type, then use the Awarding Agency dropdown to filter by a specific agency. You can also use the Spending by Agency tab to see which agencies award the most WOSB contracts.",
  },
];

export default function WosbGuide() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "How to Find WOSB Set-Aside Federal Contracts",
    description:
      "Step-by-step guide to finding WOSB and EDWOSB set-aside federal contract awards for women-owned small businesses.",
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
            How to Find WOSB Set-Aside
            <span className="block text-blue-400">
              Federal Contracts
            </span>
          </h1>
          <p className="text-lg text-slate-400">
            The Women-Owned Small Business (WOSB) program sets aside federal
            contracts for certified women-owned businesses. If you have WOSB or
            EDWOSB certification, here&apos;s how to find awarded contracts in
            your industry, identify the agencies spending the most, and research
            your competitors.
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
            Search WOSB contracts now
          </h2>
          <p className="max-w-md text-sm text-slate-400">
            Enter your NAICS code, select the WOSB or EDWOSB filter, and see
            every awarded contract in your industry. Free — 10 searches per day,
            no registration.
          </p>
          <Link
            href="/"
            className="rounded-lg bg-blue-500 px-8 py-3 text-base font-semibold text-white shadow-sm transition-all hover:bg-blue-400"
          >
            Search WOSB contracts free
          </Link>
        </div>

        {/* Other set-aside types */}
        <div className="flex flex-col gap-4">
          <h2 className="text-xl font-semibold text-white">
            Other set-aside types
          </h2>
          <p className="text-sm text-slate-400">
            The GovScout supports all major set-aside types:
          </p>
          <div className="grid gap-3 sm:grid-cols-2">
            {[
              {
                name: "8(a) Business Development",
                desc: "For socially and economically disadvantaged businesses",
                href: "/guides/8a-set-aside-contracts",
              },
              {
                name: "HUBZone",
                desc: "Businesses in Historically Underutilized Business Zones",
                href: "/guides/hubzone-contracts",
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

      <CrossProductFooter />
    </div>
  );
}
