import Script from "next/script";
import type { Metadata } from "next";
import { Suspense } from "react";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { UtmTracker } from "./components/utm-tracker";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const baseUrl = "https://federal-contract-tracker-moltcorporation.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: "GovScout — Find Government Contracts | Moltcorp",
  description:
    "Search federal contract awards by NAICS code, agency, set-aside type, and dollar amount. Track spending trends and find set-aside opportunities for small businesses.",
  alternates: { canonical: baseUrl },
  openGraph: {
    title: "GovScout — Find Government Contracts",
    description:
      "Search federal contract awards, track spending trends, and research competitors in government contracting. Powered by USASpending data.",
    type: "website",
    siteName: "GovScout",
  },
  twitter: {
    card: "summary_large_image",
    title: "GovScout — Find Government Contracts",
    description:
      "Search federal contract awards, track spending trends, and research competitors. Powered by USASpending data.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      name: "GovScout",
      url: "https://federal-contract-tracker-moltcorporation.vercel.app",
      description:
        "Search federal contract awards by NAICS code, agency, set-aside type, and dollar amount. Powered by USASpending.gov data.",
      applicationCategory: "BusinessApplication",
      operatingSystem: "Any",
      offers: [
        {
          "@type": "Offer",
          name: "Free",
          price: "0",
          priceCurrency: "USD",
          description:
            "10 searches per day, contract search, spending by agency",
        },
        {
          "@type": "Offer",
          name: "Pro",
          price: "49",
          priceCurrency: "USD",
          priceSpecification: {
            "@type": "UnitPriceSpecification",
            price: "49",
            priceCurrency: "USD",
            billingDuration: "P1M",
          },
          description:
            "Unlimited searches, spending trends, CSV export, saved searches, email alerts",
        },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "How fresh is the contract data?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "GovScout pulls data directly from the USASpending.gov API and updates daily. You're searching the same federal spending records that agencies report.",
          },
        },
        {
          "@type": "Question",
          name: "How is this different from searching SAM.gov directly?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "SAM.gov shows open solicitations. GovScout shows awarded contracts — who won, how much, and from which agency. Plus you get spending trend analysis, competitive intelligence, set-aside filters, saved searches with email alerts, and CSV export.",
          },
        },
        {
          "@type": "Question",
          name: "Can I cancel anytime?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes. There are no long-term contracts or cancellation fees. Cancel your Pro subscription anytime from your account settings.",
          },
        },
        {
          "@type": "Question",
          name: "What's included in the free tier?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Free accounts get up to 10 searches per day with basic contract results — award ID, recipient, agency, amount, and dates. No credit card required.",
          },
        },
        {
          "@type": "Question",
          name: "What does Pro unlock?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Pro gives you unlimited searches, spending trend charts by agency, email alerts for saved searches, CSV export of results, and full competitive intelligence — all for $49/mo.",
          },
        },
        {
          "@type": "Question",
          name: "Do you support set-aside filters?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes. Filter by 8(a) Business Development, HUBZone, WOSB, SDVOSB, and SBA small business set-asides to find contracts reserved for your certification type.",
          },
        },
        {
          "@type": "Question",
          name: "How do email alerts work?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Save any search and GovScout will email you when new matching contract awards appear. Pro subscribers can save unlimited searches with alerts.",
          },
        },
        {
          "@type": "Question",
          name: "Can I export results?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Pro subscribers can export search results to CSV for use in spreadsheets, proposals, or CRM imports. Free tier users can view results on-screen only.",
          },
        },
      ],
    },
  ];

  return (
    <html lang="en" className="dark">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Suspense fallback={null}>
          <UtmTracker />
        </Suspense>
        {children}
        <Analytics />
        <Script
          src="https://analytics.moltcorporation.com/script.js"
          data-website-id="bc2a0432-f85a-40bc-a30f-720f90e2bf52"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
