import type { Metadata } from "next";

const baseUrl =
  "https://federal-contract-tracker-moltcorporation.vercel.app";

export const metadata: Metadata = {
  title:
    "Stop Tracking Federal Contracts in Spreadsheets | GovScout",
  description:
    "Spreadsheets can't filter by set-aside type, autocomplete NAICS codes, or show agency spending trends. GovScout replaces manual tracking with purpose-built federal contract search for $49/month.",
  openGraph: {
    title: "Stop Tracking Federal Contracts in Spreadsheets",
    description:
      "Replace manual spreadsheet tracking with set-aside filters, NAICS autocomplete, and agency spending breakdowns. Free tier available.",
    type: "website",
    siteName: "GovScout",
    url: `${baseUrl}/compare/manual-tracking`,
  },
  twitter: {
    card: "summary_large_image",
    title: "Stop Tracking Federal Contracts in Spreadsheets",
    description:
      "Replace manual contract tracking with purpose-built search. Set-aside filters, NAICS autocomplete, spending trends. Free tier available.",
  },
  alternates: {
    canonical: `${baseUrl}/compare/manual-tracking`,
  },
};

const faqs = [
  {
    question: "Can GovScout replace my contract tracking spreadsheet?",
    answer:
      "For competitive research, yes. GovScout searches awarded federal contracts by NAICS code, set-aside type, agency, recipient, and dollar range — all the dimensions you'd manually track in a spreadsheet. Pro users also get saved searches with email alerts on new awards, spending trend charts, and CSV export. You still need your own systems for bid management and proposal tracking, but the competitive intelligence part is covered.",
  },
  {
    question: "How does GovScout get its data?",
    answer:
      "All data comes from USASpending.gov, the U.S. government's official source for federal spending data. It covers all awarded federal contracts and is updated daily. We use the public API — no scraping, no proprietary data sources.",
  },
  {
    question: "Can I export data to a spreadsheet?",
    answer:
      "Yes. Pro users can export search results to CSV with one click. This lets you keep using spreadsheets for your own analysis while GovScout handles the search, filtering, and data collection. You get the best of both: purpose-built search plus spreadsheet flexibility.",
  },
  {
    question: "What does the free tier include?",
    answer:
      "10 searches per day with full access to all filters — NAICS autocomplete, set-aside type, agency, recipient, dollar range. No signup required. The free tier is enough for occasional research. Pro ($49/month) adds unlimited searches, spending trends, CSV export, saved searches, and email alerts.",
  },
  {
    question: "I only track contracts in one NAICS code. Is GovScout overkill?",
    answer:
      "Actually, that's where GovScout saves the most time. Set up a saved search for your NAICS code with your preferred set-aside filters, and GovScout emails you when new awards match. No more manually checking USASpending.gov or updating your spreadsheet. The free tier covers 10 searches/day if you prefer manual checks.",
  },
];

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "GovScout vs Spreadsheet Tracking",
    description:
      "Replace manual federal contract tracking with purpose-built search. Set-aside filters, NAICS autocomplete, agency spending breakdowns.",
    url: `${baseUrl}/compare/manual-tracking`,
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

export default function ManualTrackingComparisonLayout({
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
