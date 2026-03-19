import type { Metadata } from "next";
import Link from "next/link";
import { CrossProductFooter } from "@/app/components/cross-product-footer";

const baseUrl = "https://federal-contract-tracker-moltcorporation.vercel.app";

export const metadata: Metadata = {
  title:
    "How to Find SDVOSB Set-Aside Federal Contracts | GovScout",
  description:
    "Step-by-step guide to finding SDVOSB set-aside federal contract awards. Search by NAICS code, track agency spending, and research competitors. Free.",
  alternates: {
    canonical: `${baseUrl}/guides/sdvosb-contracts`,
  },
  openGraph: {
    title: "How to Find SDVOSB Set-Aside Federal Contracts",
    description:
      "Guide to finding service-disabled veteran-owned small business contract awards using the GovScout.",
    type: "article",
    siteName: "GovScout",
    url: `${baseUrl}/guides/sdvosb-contracts`,
  },
  twitter: {
    card: "summary_large_image",
    title: "How to Find SDVOSB Set-Aside Federal Contracts",
    description:
      "Search SDVOSB contract awards by NAICS code, track agency spending, and research competitors.",
  },
};

const steps = [
  {
    title: "Verify your SDVOSB status through VetCert",
    body: "To bid on SDVOSB set-aside contracts, your business must be verified through the SBA's VetCert system (formerly the VA's VIP database). You need a service-connected disability rating from the VA. The business must be at least 51% owned and controlled by one or more service-disabled veterans. Apply at vetcert.sba.gov — verification typically takes 60–90 days.",
  },
  {
    title: "Find your NAICS code",
    body: "Federal contracts are categorized by NAICS code. Use the GovScout's autocomplete — type your industry (e.g., 'janitorial', 'IT services', 'construction') and select the matching code. SDVOSB set-asides are available across all NAICS codes, giving you broad access to opportunities regardless of industry.",
  },
  {
    title: "Search for awarded SDVOSB contracts",
    body: "On the GovScout, enter your NAICS code and select the SDVOSB set-aside filter. This shows every SDVOSB contract that has been awarded in your industry — who won, which agency awarded it, and the dollar amount. Study the winners to understand your competitive landscape.",
  },
  {
    title: "Check VA-specific opportunities",
    body: "The Department of Veterans Affairs has its own Veterans First Contracting Program, which prioritizes SDVOSBs and VOSBs for VA contracts specifically. Search with the VA as the awarding agency to see these opportunities. VA contracts are often the largest source of SDVOSB set-aside awards.",
  },
  {
    title: "Track agency spending patterns",
    body: "Use the Spending by Agency tab to see which agencies award the most SDVOSB contracts in your NAICS code. The government-wide goal is 3% of prime contract dollars to SDVOSBs. The Trends page shows quarterly spending over time — look for agencies increasing their SDVOSB spending or falling short of their goals.",
  },
];

const faqs = [
  {
    question: "What is an SDVOSB set-aside contract?",
    answer:
      "An SDVOSB (Service-Disabled Veteran-Owned Small Business) set-aside is a federal contract reserved exclusively for verified service-disabled veteran-owned small businesses. The program helps veterans with service-connected disabilities compete for government contracts. The government-wide goal is to award at least 3% of all federal prime contracting dollars to SDVOSBs.",
  },
  {
    question: "How do I get SDVOSB verification?",
    answer:
      "Apply through the SBA's VetCert system at vetcert.sba.gov. You must provide proof of your service-connected disability rating from the VA, documentation of at least 51% ownership by the service-disabled veteran, and evidence that the veteran controls day-to-day management and long-term decision-making. The process moved from the VA to SBA on January 1, 2023.",
  },
  {
    question: "What is the difference between SDVOSB and VOSB?",
    answer:
      "SDVOSB is for veteran-owned businesses where the veteran has a service-connected disability rating from the VA (any percentage). VOSB (Veteran-Owned Small Business) is for any veteran-owned business, regardless of disability status. SDVOSB set-asides are more common and the government has a specific 3% spending goal for SDVOSBs. Both require VetCert verification.",
  },
  {
    question: "What are the sole-source contract limits for SDVOSBs?",
    answer:
      "Agencies can award sole-source contracts to SDVOSBs up to $4.5 million for services and $8 million for manufacturing. Sole-source means the agency awards directly to your business without competitive bidding. For competitive SDVOSB set-asides, there is no dollar limit.",
  },
  {
    question: "What is the VA's Veterans First Contracting Program?",
    answer:
      "Veterans First is the VA's own contracting program that goes beyond the government-wide SDVOSB program. The VA is required to set aside contracts for SDVOSBs and VOSBs before considering other small business programs. This means SDVOSBs get priority at the VA even over 8(a), HUBZone, and WOSB set-asides — making VA contracts especially valuable for veteran-owned businesses.",
  },
  {
    question: "Can I hold both SDVOSB and 8(a) certification?",
    answer:
      "Yes. SDVOSB verification and 8(a) Business Development certification are separate programs. If you qualify for both, you can bid on SDVOSB set-asides, 8(a) set-asides, and general small business set-asides — significantly expanding your opportunities. Use the GovScout to compare award volumes across both set-aside types in your NAICS code.",
  },
];

export default function SdvosbGuide() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "How to Find SDVOSB Set-Aside Federal Contracts",
    description:
      "Step-by-step guide to finding SDVOSB set-aside federal contract awards for service-disabled veteran-owned small businesses.",
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
            How to Find SDVOSB Set-Aside
            <span className="block text-blue-400">
              Federal Contracts
            </span>
          </h1>
          <p className="text-lg text-slate-400">
            The Service-Disabled Veteran-Owned Small Business (SDVOSB) program
            sets aside federal contracts for businesses owned by veterans with
            service-connected disabilities. If you have SDVOSB verification,
            here&apos;s how to find awarded contracts in your industry, identify
            the agencies spending the most, and research your competitors.
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
            Search SDVOSB contracts now
          </h2>
          <p className="max-w-md text-sm text-slate-400">
            Enter your NAICS code, select the SDVOSB filter, and see every
            awarded contract in your industry. Free — 10 searches per day, no
            registration.
          </p>
          <Link
            href="/"
            className="rounded-lg bg-blue-500 px-8 py-3 text-base font-semibold text-white shadow-sm transition-all hover:bg-blue-400"
          >
            Search SDVOSB contracts free
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
                name: "WOSB",
                desc: "Women-Owned Small Businesses",
                href: "/guides/wosb-contracts",
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
              WOSB Guide
            </Link>
            <Link
              href="/guides/hubzone-contracts"
              className="rounded-lg border border-slate-700 bg-slate-900 px-4 py-2.5 text-sm font-medium text-slate-300 transition-colors hover:border-blue-600 hover:text-blue-400"
            >
              HUBZone Guide
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
