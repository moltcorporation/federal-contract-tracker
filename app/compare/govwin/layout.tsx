import type { Metadata } from "next";

const baseUrl =
  "https://govscout-moltcorporation.vercel.app";

export const metadata: Metadata = {
  title:
    "GovWin Alternative — Affordable Federal Contract Research | GovScout",
  description:
    "GovWin by Deltek costs $2,000–$12,000/year. GovScout gives you awarded contract search, set-aside filters, NAICS autocomplete, and agency spending breakdowns for $49/month — no enterprise sales call required.",
  openGraph: {
    title: "GovWin Alternative — Affordable Federal Contract Research",
    description:
      "Search awarded federal contracts with set-aside filters, NAICS autocomplete, and agency spending breakdowns. 1/40th the cost of GovWin.",
    type: "website",
    siteName: "GovScout",
    url: `${baseUrl}/compare/govwin`,
  },
  twitter: {
    card: "summary_large_image",
    title: "GovWin Alternative — Affordable Federal Contract Research",
    description:
      "Search federal contracts with set-aside filters and NAICS autocomplete. $49/mo vs GovWin's $2K–$12K/year.",
  },
  alternates: {
    canonical: `${baseUrl}/compare/govwin`,
  },
};

const faqs = [
  {
    question: "Is GovScout a replacement for GovWin?",
    answer:
      "Not entirely. GovWin is a full pipeline intelligence platform — it tracks pre-solicitation opportunities, agency forecasts, and competitor intel across the entire procurement lifecycle. GovScout focuses on awarded contracts: who won, for how much, and from which agency. If you need pipeline tracking and bid intelligence, GovWin is the more complete tool. If you need affordable awarded contract research, GovScout does that job at 1/40th the price.",
  },
  {
    question: "Why is GovWin so expensive?",
    answer:
      "GovWin employs analysts who manually research and curate opportunity intelligence, agency forecasts, and competitive landscape reports. That human research labor is what drives the $2,000–$12,000/year price tag. GovScout uses the free USASpending.gov API for awarded contract data, which keeps costs low enough to offer at $49/month.",
  },
  {
    question: "Where does GovScout get its data?",
    answer:
      "All data comes from USASpending.gov, the U.S. government's official source for federal spending data. It covers all awarded federal contracts and is updated daily. We use the public API — no scraping, no proprietary data sources.",
  },
  {
    question: "Can I use both GovWin and GovScout?",
    answer:
      "Yes, and many small businesses should. Use GovWin (or a similar pipeline tool) to find and track upcoming opportunities. Use GovScout to research the competitive landscape — who's winning contracts in your NAICS codes, which agencies are spending, and what set-aside contracts are being awarded. The awarded contract research from GovScout complements GovWin's forward-looking pipeline intelligence.",
  },
  {
    question:
      "I'm a small business and can't afford GovWin. Is GovScout enough?",
    answer:
      "It depends on what you need. If your primary goal is understanding who wins contracts in your space — which agencies spend the most, what set-aside awards look like, and who your competitors are — GovScout covers that for $49/month or even free (10 searches/day). You won't get pre-solicitation tracking or bid intelligence, but for competitive research on awarded contracts, it's a practical starting point.",
  },
];

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "GovWin Alternative — GovScout",
    description:
      "Search awarded federal contracts with set-aside filters, NAICS autocomplete, and agency spending breakdowns. 1/40th the cost of GovWin by Deltek.",
    url: `${baseUrl}/compare/govwin`,
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

export default function GovWinComparisonLayout({
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
