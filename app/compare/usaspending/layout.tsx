import type { Metadata } from "next";

const baseUrl =
  "https://govscout-moltcorporation.vercel.app";

export const metadata: Metadata = {
  title:
    "USASpending Alternative — Easier Federal Contract Search | GovScout",
  description:
    "USASpending.gov has all the data but a steep learning curve. GovScout gives you the same awarded contract data with purpose-built filters, NAICS autocomplete, set-aside search, and agency spending views — no training required.",
  openGraph: {
    title: "USASpending Alternative — Easier Federal Contract Search",
    description:
      "Search awarded federal contracts with set-aside filters, NAICS autocomplete, and agency spending breakdowns. Same data as USASpending.gov, better search experience.",
    type: "website",
    siteName: "GovScout",
    url: `${baseUrl}/compare/usaspending`,
  },
  twitter: {
    card: "summary_large_image",
    title: "USASpending Alternative — Easier Federal Contract Search",
    description:
      "Same government contract data, purpose-built search UX. Set-aside filters, NAICS autocomplete, agency spending views.",
  },
  alternates: {
    canonical: `${baseUrl}/compare/usaspending`,
  },
};

const faqs = [
  {
    question: "Does GovScout use USASpending data?",
    answer:
      "Yes. All contract data comes directly from the USASpending.gov API, the official U.S. government source for federal spending data. We display the same awarded contract records — we just make them easier to search and filter.",
  },
  {
    question: "Why not just use USASpending.gov directly?",
    answer:
      "USASpending.gov covers all federal spending — contracts, grants, loans, direct payments, and more. That breadth means the interface serves many audiences. If you specifically need to research awarded contracts by NAICS code, set-aside type, or agency, GovScout gives you a focused, faster path to those answers.",
  },
  {
    question: "What data does USASpending have that you don't?",
    answer:
      "USASpending.gov covers grants, loans, direct payments, other financial assistance, and sub-awards in addition to contracts. It also provides geographic spending maps, agency profiles, and federal account data. We focus exclusively on contract awards — the segment most relevant to government contractors.",
  },
  {
    question: "How fresh is the data compared to USASpending?",
    answer:
      "Our data comes from the same USASpending.gov API, so freshness is identical. USASpending updates daily from agency submissions. When a new contract award appears on USASpending.gov, it appears in GovScout at the same time.",
  },
  {
    question: "Is GovScout free?",
    answer:
      "Free users get 10 searches per day with access to all filters and features. Pro ($49/month) adds unlimited searches, spending trends, and CSV export. USASpending.gov is completely free with no limits — the trade-off is usability.",
  },
];

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "USASpending Alternative — GovScout",
    description:
      "Search awarded federal contracts with set-aside filters, NAICS autocomplete, and agency spending breakdowns. Same data as USASpending.gov, purpose-built UX.",
    url: `${baseUrl}/compare/usaspending`,
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

export default function USASpendingComparisonLayout({
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
