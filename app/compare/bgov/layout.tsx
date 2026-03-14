import type { Metadata } from "next";

const baseUrl =
  "https://federal-contract-tracker-moltcorporation.vercel.app";

export const metadata: Metadata = {
  title:
    "Bloomberg Government Alternative — Federal Contract Search for Small Business | Federal Contract Tracker",
  description:
    "Bloomberg Government (BGOV) starts at $6,000+/year. Federal Contract Tracker gives you awarded contract search, set-aside filters, and agency spending data for $49/month. Built for small businesses pursuing government contracts.",
  openGraph: {
    title: "Bloomberg Government Alternative — Federal Contract Search",
    description:
      "Search awarded federal contracts with set-aside filters and NAICS autocomplete. A fraction of the cost of BGOV.",
    type: "website",
    siteName: "Federal Contract Tracker",
    url: `${baseUrl}/compare/bgov`,
  },
  twitter: {
    card: "summary_large_image",
    title: "Bloomberg Government Alternative — Federal Contract Search",
    description:
      "Search federal contracts with set-aside filters. $49/mo vs BGOV's $6,000+/year.",
  },
  alternates: {
    canonical: `${baseUrl}/compare/bgov`,
  },
};

const faqs = [
  {
    question:
      "Is Federal Contract Tracker a replacement for Bloomberg Government?",
    answer:
      "No. BGOV is an enterprise intelligence platform covering the full spectrum of government activity — legislation, regulation, federal contracts, and agency budgets. Federal Contract Tracker focuses specifically on awarded contract research: who won, how much, which agency, and which set-aside type. If you need broad government intelligence, BGOV is the comprehensive solution. If you need affordable contract award data for business development, Federal Contract Tracker covers that at a fraction of the cost.",
  },
  {
    question: "Why is Bloomberg Government so expensive?",
    answer:
      "BGOV is part of Bloomberg's professional terminal ecosystem. It combines government contract data with legislative tracking, regulatory intelligence, budget analysis, and analyst research. The $6,000+/year price reflects the breadth of coverage and the Bloomberg data infrastructure behind it. Federal Contract Tracker uses the free USASpending.gov API and focuses only on awarded contracts, keeping costs at $49/month.",
  },
  {
    question: "Where does Federal Contract Tracker get its data?",
    answer:
      "All data comes from USASpending.gov, the U.S. government's official source for federal spending data. It covers all awarded federal contracts and is updated daily. We use the public API — no scraping, no proprietary data sources.",
  },
  {
    question:
      "I'm a small business. Do I need BGOV or Federal Contract Tracker?",
    answer:
      "For most small businesses entering federal contracting, BGOV is overkill and overpriced. If your main questions are 'who wins contracts in my NAICS code?' and 'which agencies spend the most on my services?', Federal Contract Tracker answers those for $49/month or free (10 searches/day). BGOV makes more sense for large firms with policy teams who need legislative and regulatory tracking alongside contract intelligence.",
  },
  {
    question: "Can I use both BGOV and Federal Contract Tracker?",
    answer:
      "Yes. Some firms use BGOV for legislative and regulatory tracking while using Federal Contract Tracker for quick awarded contract lookups by NAICS code and set-aside type. The tools serve different purposes — BGOV is broad government intelligence, Federal Contract Tracker is focused contract research.",
  },
];

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Bloomberg Government Alternative — Federal Contract Tracker",
    description:
      "Search awarded federal contracts with set-aside filters, NAICS autocomplete, and agency spending breakdowns. A fraction of the cost of Bloomberg Government.",
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

export default function BgovComparisonLayout({
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
