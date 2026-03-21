import Link from "next/link";
import { CrossProductFooter } from "@/app/components/cross-product-footer";

const steps = [
  {
    title: "Confirm your small business size status",
    body: "The SBA defines 'small' differently for each industry using NAICS-based size standards. For most service industries, the threshold is average annual receipts (typically $9M\u2013$47.5M). For manufacturing, it\u2019s usually employee count (typically 500\u20131,500). Check your size standard at sba.gov/size-standards \u2014 if your business is under the threshold for your primary NAICS code, you qualify as a small business for federal contracting.",
  },
  {
    title: "Register on SAM.gov",
    body: "Every business bidding on federal contracts must register in the System for Award Management (SAM.gov). Registration is free and takes 7\u201310 business days. You\u2019ll need your EIN, UEI number, bank account information, and NAICS codes. During registration, you\u2019ll self-certify as a small business under your NAICS codes. Keep your registration active \u2014 it must be renewed annually.",
  },
  {
    title: "Find your NAICS codes",
    body: "Federal contracts are categorized by NAICS code \u2014 6-digit codes describing what your business does. For example, 541511 is Custom Computer Programming Services. Most businesses qualify under 2\u20135 codes. Use the GovScout\u2019s autocomplete to search by keyword and find codes matching your services. Your NAICS codes also determine your SBA size standard.",
  },
  {
    title: "Search for small business set-aside contracts",
    body: "On the GovScout, enter your NAICS code and select the SBA Small Business set-aside filter. This shows every small business set-aside contract awarded in your industry \u2014 who won, which agency awarded it, and the dollar amount. Small business set-asides are the most common type, with the highest total dollar volume of any set-aside program.",
  },
  {
    title: "Identify top agencies for small business contracts",
    body: "Use the Spending by Agency view to find which agencies award the most small business set-aside contracts in your NAICS codes. Agencies are required to meet small business contracting goals \u2014 the government-wide target is 23% of prime contract dollars to small businesses. Agencies that consistently fall short of their goals are more likely to increase small business set-asides.",
  },
  {
    title: "Explore specialized set-aside programs",
    body: "If your business qualifies for additional certifications \u2014 8(a), WOSB, SDVOSB, or HUBZone \u2014 you can access contracts with even less competition. These programs reserve contracts specifically for their categories and have sole-source provisions. Getting certified for multiple programs significantly expands your opportunities.",
  },
];

const faqs = [
  {
    question: "What is a small business set-aside contract?",
    answer:
      "A small business set-aside is a federal contract reserved exclusively for small businesses. Contracting officers are required to set aside contracts for small business competition when they expect at least two qualified small businesses will submit offers at fair market prices. The government-wide goal is to award at least 23% of all federal prime contracting dollars to small businesses.",
  },
  {
    question: "How does the SBA determine if my business is small?",
    answer:
      "The SBA uses size standards that vary by NAICS code. For most service industries, the standard is based on average annual receipts over the past 5 years (typically $9M\u2013$47.5M depending on industry). For manufacturing, it\u2019s based on average number of employees (typically 500\u20131,500). Check your specific standard at sba.gov/size-standards by entering your NAICS code.",
  },
  {
    question: "Do I need SBA certification for small business set-asides?",
    answer:
      "No. General small business set-asides only require self-certification through your SAM.gov registration. You declare your small business status when registering. However, specialized programs like 8(a), WOSB, SDVOSB, and HUBZone do require formal SBA certification or verification. If you qualify for those programs, the additional certification is worth pursuing.",
  },
  {
    question: "What is the difference between a small business set-aside and an 8(a) set-aside?",
    answer:
      "A general small business set-aside is open to any SBA-qualified small business. An 8(a) set-aside is reserved specifically for businesses in the SBA\u2019s 8(a) Business Development program, which serves socially and economically disadvantaged entrepreneurs. 8(a) set-asides have less competition but require formal certification. Small business set-asides have higher volume but more bidders.",
  },
  {
    question: "What are the sole-source limits for small business contracts?",
    answer:
      "For general small business set-asides, there are no sole-source provisions \u2014 they must be competitively bid. However, specialized programs have sole-source limits: 8(a) up to $4.5M services/$8M manufacturing, SDVOSB up to $4.5M/$8M, WOSB up to $4.5M/$8M, and HUBZone up to $4.5M/$8M. If you qualify for any of these, sole-source contracts are a significant advantage.",
  },
  {
    question: "How much of federal spending goes to small businesses?",
    answer:
      "The government-wide goal is 23% of prime contract dollars to small businesses. In recent years, the actual percentage has exceeded this target \u2014 over $178 billion was awarded to small businesses in FY2023. Use the GovScout\u2019s Trends page to see quarterly spending patterns and identify which agencies are the biggest small business spenders in your NAICS codes.",
  },
];

export default function SmallBusinessSetAsideGuide() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "How to Find SBA Small Business Set-Aside Federal Contracts",
    description:
      "Step-by-step guide to finding SBA small business set-aside federal contracts, including size standards, SAM.gov registration, and competitive research.",
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
          <Link href="/guides/find-government-contracts" className="text-sm font-medium text-slate-400 transition-colors hover:text-blue-400">Guides</Link>
          <Link href="/pricing" className="text-sm font-medium text-blue-400 transition-colors hover:text-blue-300">Pricing</Link>
        </div>
      </header>

      <main className="mx-auto flex w-full max-w-3xl flex-col gap-10 px-4 py-12">
        <div className="flex flex-col gap-4">
          <p className="text-sm font-medium text-blue-400">
            Guide
          </p>
          <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            Small Business Set-Aside
            <span className="block text-blue-400">
              Federal Contracts
            </span>
          </h1>
          <p className="text-lg text-slate-400">
            The federal government is required to award at least 23% of prime
            contract dollars to small businesses. General small business
            set-asides are the most common type of reserved contract &mdash; any
            SBA-qualified small business can compete. Here&apos;s how to confirm
            your eligibility, find set-aside contracts, and identify the
            agencies spending the most in your industry.
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
            Search small business set-aside contracts
          </h2>
          <p className="max-w-md text-sm text-slate-400">
            Enter your NAICS code, select the SBA Small Business filter, and see
            every awarded set-aside contract in your industry. Free &mdash; 10
            searches per day, no registration.
          </p>
          <Link
            href="/"
            className="rounded-lg bg-blue-500 px-8 py-3 text-base font-semibold text-white shadow-sm transition-all hover:bg-blue-400"
          >
            Search small business contracts free
          </Link>
        </div>

        {/* Other set-aside types */}
        <div className="flex flex-col gap-4">
          <h2 className="text-xl font-semibold text-white">
            Other set-aside types
          </h2>
          <p className="text-sm text-slate-400">
            If your business qualifies for additional certifications, these
            specialized programs offer contracts with less competition:
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
              href="/guides/sdvosb-contracts"
              className="rounded-lg border border-slate-700 bg-slate-900 px-4 py-2.5 text-sm font-medium text-slate-300 transition-colors hover:border-blue-600 hover:text-blue-400"
            >
              SDVOSB Guide
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
