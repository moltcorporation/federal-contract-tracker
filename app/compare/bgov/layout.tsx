import type { Metadata } from "next";

const baseUrl =
  "https://federal-contract-tracker-moltcorporation.vercel.app";

export const metadata: Metadata = {
  title:
    "Bloomberg Government Alternative — Affordable Federal Contract Research | Federal Contract Tracker",
  description:
    "Bloomberg Government (BGOV) costs $6,000–$12,000/year for government intelligence. Federal Contract Tracker gives you awarded contract search, set-aside filters, NAICS autocomplete, and agency spending breakdowns for $49/month — a practical BGOV alternative for contract research.",
  openGraph: {
    title: "Bloomberg Government Alternative — Affordable Federal Contract Research",
    description:
      "Search awarded federal contracts with set-aside filters, NAICS autocomplete, and agency spending breakdowns. $49/mo vs BGOV's $6K–$12K/year.",
    type: "website",
    siteName: "Federal Contract Tracker",
    url: `${baseUrl}/compare/bgov`,
  },
  twitter: {
    card: "summary_large_image",
    title: "Bloomberg Government Alternative — Affordable Federal Contract Research",
    description:
      "Search federal contracts with set-aside filters and NAICS autocomplete. $49/mo vs BGOV's $6K–$12K/year.",
  },
  alternates: {
    canonical: `${baseUrl}/compare/bgov`,
  },
};

const faqs = [
  {
    question: "Is Federal Contract Tracker a replacement for Bloomberg Government?",
    answer:
      "No. BGOV covers legislation, regulation, and contracts. Federal Contract Tracker focuses on awarded contracts only — who won, how much, and which agency. They are different tools for different needs.",
  },
  {
    question: "Why is Bloomberg Government so expensive?",
    answer:
      "BGOV employs journalists, analysts, and researchers who produce original intelligence on legislation, regulation, and procurement. That human research labor drives the $6,000–$12,000/year price tag. Federal Contract Tracker uses the free USASpending.gov API for awarded contract data, which keeps costs low enough to offer at $49/month.",
  },
  {
    question: "Can I use both Bloomberg Government and Federal Contract Tracker?",
    answer:
      "Yes. Use BGOV for legislative and regulatory intelligence. Use Federal Contract Tracker for affordable awarded contract research — who wins contracts in your NAICS codes, which agencies spend the most, and what set-aside contracts are being awarded.",
  },
  {
    question:
      "I'm a small business. Is Federal Contract Tracker enough to get started?",
    answer:
      "If your goal is understanding who wins contracts in your space, yes. $49/month or free (10 searches/day). You won't get legislative tracking, but for competitive contract research it's a practical starting point.",
  },
];

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Bloomberg Government Alternative — Federal Contract Tracker",
    description:
      "Search awarded federal contracts with set-aside filters, NAICS autocomplete, and agency spending breakdowns. A practical BGOV alternative for contract research.",
    url: `${baseUrl}/compare/bgov`,
    mainEntity: {
      "@type": "SoftwareApplication",
      name: "Federal Contract Tracker",
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

export default function BGOVComparisonLayout({
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
