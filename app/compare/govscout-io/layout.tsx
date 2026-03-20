import type { Metadata } from "next";

const baseUrl =
  "https://federal-contract-tracker-moltcorporation.vercel.app";

export const metadata: Metadata = {
  title:
    "GovScout vs govscout.io — Pricing & Feature Comparison | GovScout",
  description:
    "Compare GovScout and govscout.io side by side. One simple $49/mo plan vs three tiers up to $500/mo. Same federal contract data, simpler pricing, no upsell wall.",
  openGraph: {
    title: "GovScout vs govscout.io — Federal Contract Search Compared",
    description:
      "Side-by-side comparison of GovScout and govscout.io. One plan at $49/mo vs $50–$500/mo. Same SAM.gov and USASpending data sources.",
    type: "website",
    siteName: "GovScout",
    url: `${baseUrl}/compare/govscout-io`,
  },
  twitter: {
    card: "summary_large_image",
    title: "GovScout vs govscout.io — Federal Contract Search Compared",
    description:
      "One plan at $49/mo vs three tiers up to $500/mo. Same data, simpler pricing. Compare features side by side.",
  },
  alternates: {
    canonical: `${baseUrl}/compare/govscout-io`,
  },
};

const faqs = [
  {
    question: "Do GovScout and govscout.io use the same data?",
    answer:
      "Both products pull from the same federal data sources — SAM.gov and USASpending.gov. The difference is in how the data is presented, what tools are built on top of it, and what you pay for access.",
  },
  {
    question: "Why is GovScout cheaper than govscout.io?",
    answer:
      "GovScout offers one plan at $49/month that includes everything: unlimited searches, set-aside filters, spending trends, saved searches with email alerts, and CSV export. govscout.io splits features across three tiers ($50, $150, $500/mo), locking proposal tools and SLED search behind higher plans.",
  },
  {
    question: "Does govscout.io have features GovScout doesn't?",
    answer:
      "Yes. govscout.io's Professional ($150/mo) and Enterprise ($500/mo) tiers include AI proposal outline generation, AI proposal editing, and state/local/education (SLED) contract search. GovScout focuses on federal contract search and competitive intelligence at a single price point.",
  },
  {
    question: "Can I try GovScout before paying?",
    answer:
      "Yes. GovScout offers a free tier with 10 searches per day and full access to all filters — no signup or credit card required. govscout.io offers a 7-day free trial that requires registration.",
  },
  {
    question: "Which tool is better for small businesses?",
    answer:
      "If you need federal contract search, set-aside filtering, and spending trends, GovScout gives you all of that for $49/month with no upsell. If you also need AI proposal generation or state/local contract coverage, govscout.io's higher tiers offer those — at 3–10x the price.",
  },
];

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "GovScout vs govscout.io Comparison",
    description:
      "Side-by-side comparison of GovScout and govscout.io for federal contract search. Pricing, features, and data sources compared.",
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
            "Unlimited searches, spending trends, CSV export, saved searches, email alerts",
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

export default function GovscoutIoComparisonLayout({
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
