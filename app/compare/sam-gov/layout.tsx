import type { Metadata } from "next";

const baseUrl =
  "https://federal-contract-tracker-moltcorporation.vercel.app";

export const metadata: Metadata = {
  title:
    "SAM.gov Alternative — Faster Federal Contract Search | Federal Contract Tracker",
  description:
    "SAM.gov has every federal contract but terrible search UX. Federal Contract Tracker gives you instant set-aside filters, NAICS autocomplete, agency spending breakdowns, and contract detail pages — all in a modern interface.",
  openGraph: {
    title: "SAM.gov Alternative — Faster Federal Contract Search",
    description:
      "Search awarded federal contracts with set-aside filters, NAICS autocomplete, and agency spending breakdowns. Faster than SAM.gov for contract research.",
    type: "website",
    siteName: "Federal Contract Tracker",
    url: `${baseUrl}/compare/sam-gov`,
  },
  twitter: {
    card: "summary_large_image",
    title: "SAM.gov Alternative — Faster Federal Contract Search",
    description:
      "Search federal contracts with set-aside filters and NAICS autocomplete. Faster than SAM.gov.",
  },
  alternates: {
    canonical: `${baseUrl}/compare/sam-gov`,
  },
};

const faqs = [
  {
    question: "Is Federal Contract Tracker a replacement for SAM.gov?",
    answer:
      "No. SAM.gov is the official government system for entity registration, open solicitations, and contract opportunities. Federal Contract Tracker focuses specifically on awarded contracts — who won, for how much, and from which agency. Use SAM.gov to register and bid; use Federal Contract Tracker to research the competitive landscape.",
  },
  {
    question: "Where does Federal Contract Tracker get its data?",
    answer:
      "All data comes from USASpending.gov, the U.S. government's official source for federal spending data. It covers all awarded federal contracts and is updated daily. We don't scrape SAM.gov — we use the same underlying government data through the public API.",
  },
  {
    question: "Can I search by set-aside type on SAM.gov?",
    answer:
      "SAM.gov allows filtering by set-aside type for open solicitations, but researching awarded contracts by set-aside requires navigating to USASpending.gov and using its advanced search. Federal Contract Tracker puts set-aside filtering front and center — one click to see all 8(a), HUBZone, WOSB, or SDVOSB awards.",
  },
  {
    question: "How much does Federal Contract Tracker cost?",
    answer:
      "Free users get 10 searches per day with full access to all filters and features. Pro ($49/month) gives unlimited searches, spending trends, and CSV export. Enterprise ($99/month) adds saved searches, email alerts on new awards, and API access.",
  },
  {
    question:
      "Why would I pay for Federal Contract Tracker when SAM.gov is free?",
    answer:
      "SAM.gov is free but optimized for procurement officers, not small businesses doing competitive research. If you spend hours each week searching for contract awards, filtering by set-aside type, and analyzing agency spending patterns, Federal Contract Tracker saves you time with a purpose-built interface. The free tier covers casual use.",
  },
];

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "SAM.gov Alternative — Federal Contract Tracker",
    description:
      "Search awarded federal contracts with set-aside filters, NAICS autocomplete, and agency spending breakdowns. Faster than SAM.gov for contract research.",
    url: `${baseUrl}/compare/sam-gov`,
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

export default function SamGovComparisonLayout({
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
