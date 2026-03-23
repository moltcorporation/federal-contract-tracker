import Link from "next/link";
import type { Metadata } from "next";
import { CrossProductFooter } from "@/app/components/cross-product-footer";

export const metadata: Metadata = {
  title: "Government Contracting Guides | GovScout",
  description:
    "Free guides for small businesses pursuing federal government contracts. Learn about set-aside programs, NAICS codes, SAM.gov registration, and winning strategies.",
  openGraph: {
    title: "Government Contracting Guides | GovScout",
    description:
      "Free guides for small businesses pursuing federal government contracts.",
  },
};

const guides = [
  {
    title: "SAM.gov Registration Guide",
    description:
      "Free step-by-step guide to registering on SAM.gov. Get your UEI, gather documents, and complete your entity registration.",
    href: "/guides/sam-gov-registration",
    tag: "Getting Started",
  },
  {
    title: "Capability Statement Template",
    description:
      "Free capability statement template for government contractors. Section-by-section guide with examples, tips, and a ready-to-use layout.",
    href: "/guides/capability-statement-template",
    tag: "Templates",
  },
  {
    title: "Government Contract Proposal Template",
    description:
      "Free proposal template with section-by-section guide — cover letter, technical approach, past performance, management plan, and cost volume.",
    href: "/guides/government-contract-proposal-template",
    tag: "Templates",
  },
  {
    title: "How to Find Government Contracts",
    description:
      "Step-by-step guide to finding federal contracts — from SAM.gov registration to competitive research.",
    href: "/guides/find-government-contracts",
    tag: "Getting Started",
  },
  {
    title: "Small Business Set-Aside Contracts",
    description:
      "How the general small business set-aside program works, who qualifies, and how to find set-aside opportunities.",
    href: "/guides/small-business-set-aside",
    tag: "Set-Aside Programs",
  },
  {
    title: "8(a) Business Development Contracts",
    description:
      "Guide to the SBA 8(a) program for socially and economically disadvantaged businesses — eligibility and sole-source thresholds.",
    href: "/guides/8a-set-aside-contracts",
    tag: "Set-Aside Programs",
  },
  {
    title: "WOSB Set-Aside Contracts",
    description:
      "How Women-Owned Small Business set-asides work, certification requirements, and finding WOSB opportunities.",
    href: "/guides/wosb-contracts",
    tag: "Set-Aside Programs",
  },
  {
    title: "SDVOSB Set-Aside Contracts",
    description:
      "Service-Disabled Veteran-Owned Small Business contracting — verification, sole-source rules, and finding opportunities.",
    href: "/guides/sdvosb-contracts",
    tag: "Set-Aside Programs",
  },
  {
    title: "HUBZone Contracts",
    description:
      "How the HUBZone program works for businesses in Historically Underutilized Business Zones — eligibility and price preferences.",
    href: "/guides/hubzone-contracts",
    tag: "Set-Aside Programs",
  },
];

export default function GuidesIndex() {
  return (
    <div className="flex min-h-screen flex-col bg-slate-950 font-sans">
      <header className="flex items-center justify-between border-b border-slate-800 px-6 py-4">
        <Link href="/" className="flex items-center gap-2">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            className="h-6 w-6 text-blue-400"
            aria-hidden="true"
          >
            <path
              d="M3 21V7l9-4 9 4v14"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinejoin="round"
            />
            <path
              d="M9 21V13h6v8"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinejoin="round"
            />
            <circle cx="12" cy="9.5" r="1.5" fill="currentColor" />
          </svg>
          <span className="text-lg font-bold tracking-tight text-white">
            GovScout
          </span>
        </Link>
        <div className="flex items-center gap-4">
          <Link
            href="/trends"
            className="text-sm font-medium text-slate-400 transition-colors hover:text-blue-400"
          >
            Trends
          </Link>
          <Link
            href="/guides"
            className="text-sm font-medium text-blue-400"
          >
            Guides
          </Link>
          <Link
            href="/pricing"
            className="text-sm font-medium text-slate-400 transition-colors hover:text-blue-400"
          >
            Pricing
          </Link>
          <Link
            href="/login"
            className="text-sm font-medium text-slate-400 transition-colors hover:text-blue-400"
          >
            Log in
          </Link>
          <Link
            href="/register"
            className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700"
          >
            Sign Up Free
          </Link>
        </div>
      </header>

      <main className="mx-auto flex w-full max-w-3xl flex-col gap-10 px-4 py-12">
        <div className="flex flex-col gap-4">
          <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            Government Contracting Guides
          </h1>
          <p className="text-lg text-slate-400">
            Free resources for small businesses pursuing federal contracts.
            Learn how to navigate set-aside programs, research competitors, and
            find opportunities in your industry.
          </p>
        </div>

        <div className="flex flex-col gap-4">
          {guides.map((guide) => (
            <Link
              key={guide.href}
              href={guide.href}
              className="group rounded-lg border border-slate-800 bg-slate-900 p-5 transition-colors hover:border-blue-600"
            >
              <p className="mb-1 text-xs font-medium uppercase tracking-wider text-blue-400">
                {guide.tag}
              </p>
              <h2 className="text-lg font-semibold text-white group-hover:text-blue-300">
                {guide.title}
              </h2>
              <p className="mt-1.5 text-sm text-slate-400">
                {guide.description}
              </p>
            </Link>
          ))}
        </div>

        <div className="flex flex-col items-center gap-4 rounded-xl border border-blue-900/30 bg-blue-950/20 p-8 text-center">
          <h2 className="text-2xl font-bold text-white">
            Ready to find contracts?
          </h2>
          <p className="max-w-md text-sm text-slate-400">
            Search federal contract awards by NAICS code, agency, and set-aside
            type. 10 free searches per day — no registration required.
          </p>
          <Link
            href="/"
            className="rounded-lg bg-blue-500 px-8 py-3 text-base font-semibold text-white shadow-sm transition-all hover:bg-blue-400"
          >
            Search contracts free
          </Link>
        </div>
      </main>

      <CrossProductFooter />
    </div>
  );
}
