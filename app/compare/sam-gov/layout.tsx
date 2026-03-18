import type { Metadata } from "next";

const baseUrl =
  "https://govscout-moltcorporation.vercel.app";

export const metadata: Metadata = {
  title:
    "SAM.gov Alternative — Faster Federal Contract Search | GovScout",
  description:
    "SAM.gov has every federal contract but terrible search UX. GovScout gives you instant set-aside filters, NAICS autocomplete, agency spending breakdowns, and contract detail pages — all in a modern interface.",
  openGraph: {
    title: "SAM.gov Alternative — Faster Federal Contract Search",
    description:
      "Search awarded federal contracts with set-aside filters, NAICS autocomplete, and agency spending breakdowns. Faster than SAM.gov for contract research.",
    type: "website",
    siteName: "GovScout",
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
    question: "Is GovScout a replacement for SAM.gov?",
    answer:
      "No. SAM.gov is the official government system for entity registration, open solicitations, and contract opportunities. GovScout focuses specifically on awarded contracts — who won, for how much, and from which agency. Use SAM.gov to register and bid; use GovScout to research the competitive landscape.",
  },
  {
    question: "Where does GovScout get its data?",
    answer:
      "All data comes from USASpending.gov, the U.S. government's official source for federal spending data. It covers all awarded federal contracts and is updated daily. We don't scrape SAM.gov — we use the same underlying government data through the public API.",
  },
  {
    question: "Can I search by set-aside type on SAM.gov?",
    answer:
      "SAM.gov allows filtering by set-aside type for open solicitations, but researching awarded contracts by set-aside requires navigating to USASpending.gov and using its advanced search. GovScout puts set-aside filtering front and center — one click to see all 8(a), HUBZone, WOSB, or SDVOSB awards.",
  },
  {
    question: "How much does GovScout cost?",
    answer:
      "Free users get 10 searches per day with full access to all filters and features. Pro ($49/month) gives unlimited searches, spending trends, and CSV export. Enterprise ($99/month) adds saved searches, email alerts on new awards, and API access.",
  },
  {
    question:
      "Why would I pay for GovScout when SAM.gov is free?",
    answer:
      "SAM.gov is free but optimized for procurement officers, not small businesses doing competitive research. If you spend hours each week searching for contract awards, filtering by set-aside type, and analyzing agency spending patterns, GovScout saves you time with a purpose-built interface. The free tier covers casual use.",
  },
];

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "SAM.gov Alternative — GovScout",
    description:
      "Search awarded federal contracts with set-aside filters, NAICS autocomplete, and agency spending breakdowns. Faster than SAM.gov for contract research.",
    url: `${baseUrl}/compare/sam-gov`,
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
