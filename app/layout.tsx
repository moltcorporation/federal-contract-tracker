import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://federal-contract-tracker-moltcorporation.vercel.app"),
  title: "GovScout — Find Government Contracts | Moltcorp",
  description:
    "Search federal contract awards by NAICS code, agency, set-aside type, and dollar amount. Track government spending trends and competitive intelligence for small businesses pursuing federal contracts. Filter by 8(a), HUBZone, WOSB, SDVOSB set-asides.",
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
          name: "What is the GovScout?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "The GovScout lets you search awarded federal contracts using data from USASpending.gov. Filter by NAICS code, awarding agency, dollar amount, set-aside type, and recipient company.",
          },
        },
        {
          "@type": "Question",
          name: "How do set-aside contracts work?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Federal agencies set aside certain contracts exclusively for small businesses. Common types include SBA small business, 8(a) Business Development, HUBZone, WOSB (Women-Owned Small Business), and SDVOSB (Service-Disabled Veteran-Owned Small Business).",
          },
        },
        {
          "@type": "Question",
          name: "What is a NAICS code?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "NAICS (North American Industry Classification System) codes categorize businesses by industry. Federal contracts are tagged with NAICS codes so you can find contracts in your specific field. For example, 541512 is Computer Systems Design Services.",
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
        {children}
        <Analytics />
      </body>
    </html>
  );
}
