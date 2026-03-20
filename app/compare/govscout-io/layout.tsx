import type { Metadata } from "next";

const baseUrl =
  "https://federal-contract-tracker-moltcorporation.vercel.app";

export const metadata: Metadata = {
  title:
    "GovScout vs govscout.io — Federal Contract Search Comparison | GovScout",
  description:
    "GovScout vs govscout.io: both offer AI-powered federal contract search. GovScout starts free (10 searches/day) with Pro at $49/mo. govscout.io starts at $50/mo with no free tier.",
  openGraph: {
    title: "GovScout vs govscout.io — Federal Contract Search Comparison",
    description:
      "Free tier with 10 searches/day. $49/mo Pro vs $50-$500/mo. Compare both federal contract search tools side by side.",
    type: "website",
    siteName: "GovScout",
    url: `${baseUrl}/compare/govscout-io`,
  },
  twitter: {
    card: "summary_large_image",
    title: "GovScout vs govscout.io — Federal Contract Search Comparison",
    description:
      "Free tier with 10 searches/day. $49/mo vs $50-$500/mo. Compare both tools side by side.",
  },
  alternates: {
    canonical: `${baseUrl}/compare/govscout-io`,
  },
};

const faqs = [
  {
    question: "What is govscout.io?",
    answer:
      "govscout.io is an AI-powered federal contract search platform based in Greenville, SC. They offer Standard ($50/mo), Professional ($150/mo), and Enterprise ($500/mo) plans with features like AI opportunity search, proposal generation, and SLED (state/local/education) contract coverage. They offer a 7-day free trial.",
  },
  {
    question: "How is GovScout different from govscout.io?",
    answer:
      "Both tools search federal contract data from SAM.gov and USASpending.gov. GovScout offers a permanent free tier (10 searches/day) and flat $49/mo Pro pricing with no upsells. govscout.io has no free tier (7-day trial only) but offers AI proposal generation ($150/mo tier) and state/local/education search ($150/mo tier) that GovScout doesn't have.",
  },
  {
    question: "Which is better for small businesses?",
    answer:
      "For small businesses exploring government contracting, GovScout's free tier lets you research contracts without any commitment. If you need AI-generated proposals or state/local contract search, govscout.io's Professional plan ($150/mo) covers that. For pure federal contract research on a budget, GovScout at $49/mo vs govscout.io at $50/mo is essentially the same price — but GovScout includes a free tier to start.",
  },
  {
    question: "Does govscout.io have features GovScout doesn't?",
    answer:
      "Yes. govscout.io offers AI proposal outline generation and editing ($150/mo Professional tier), SLED (state/local/education) contract search, AI opportunity chat, and attachment summaries. GovScout focuses on federal awarded contract research with set-aside filters, NAICS autocomplete, and agency spending trends.",
  },
];

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "GovScout vs govscout.io — Federal Contract Search Comparison",
    description:
      "Compare GovScout and govscout.io for federal contract search. Free tier vs paid-only, flat pricing vs tiered upsells.",
    url: `${baseUrl}/compare/govscout-io`,
    mainEntity: {
      "@type": "SoftwareApplication",
      name: "GovScout",
      applicationCategory: "BusinessApplication",
      operatingSystem: "Any",
      offers: [
        {
          "@type": "Offer",
          name: "Free",
          price: "0",
          priceCurrency: "USD",
          description: "10 searches per day with all filters",
        },
        {
          "@type": "Offer",
          name: "Pro",
          price: "49",
          priceCurrency: "USD",
          description:
            "Unlimited searches, spending trends, CSV export",
        },
      ],
    },
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  },
];

export default function GovScoutIoComparisonLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {children}
    </>
  );
}
