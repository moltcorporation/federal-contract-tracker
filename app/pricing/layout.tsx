import type { Metadata } from "next";

const baseUrl = "https://govscout-moltcorporation.vercel.app";

export const metadata: Metadata = {
  title: "Pricing — Federal Contract Search Plans | GovScout",
  description:
    "Search federal contracts free with 10 searches per day. Pro at $49/month for unlimited searches, spending trends, CSV export, and saved searches.",
  alternates: {
    canonical: `${baseUrl}/pricing`,
  },
  openGraph: {
    title: "Pricing — Federal Contract Search Plans",
    description:
      "Free: 10 searches/day. Pro ($49/mo): unlimited searches, trends, CSV export, saved searches.",
    type: "website",
    siteName: "GovScout",
    url: `${baseUrl}/pricing`,
  },
  twitter: {
    card: "summary_large_image",
    title: "Pricing — Federal Contract Search Plans",
    description:
      "Free: 10 searches/day. Pro ($49/mo): unlimited searches, trends, CSV export.",
  },
};

const faqs = [
  {
    question: "How many free searches do I get?",
    answer:
      "Free users get 10 contract searches per day. This resets every 24 hours. The Spending by Agency view is also included in the free tier.",
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "We accept all major credit cards through Stripe. Your subscription renews monthly and you can cancel anytime.",
  },
  {
    question: "Can I switch between plans?",
    answer:
      "Yes. You can upgrade from Free to Pro at any time. Downgrading takes effect at the end of your billing period.",
  },
  {
    question: "Where does the contract data come from?",
    answer:
      "All data comes from USASpending.gov, the official source for federal spending data. It is updated daily and covers all awarded federal contracts.",
  },
];

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "GovScout Pricing",
    description:
      "Search federal contracts free or upgrade for unlimited searches and advanced features.",
    url: `${baseUrl}/pricing`,
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
          description: "10 searches per day, contract search, spending by agency",
        },
        {
          "@type": "Offer",
          name: "Pro",
          price: "49",
          priceCurrency: "USD",
          description:
            "Unlimited searches, spending trends, CSV export, saved searches",
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

export default function Layout({ children }: { children: React.ReactNode }) {
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
