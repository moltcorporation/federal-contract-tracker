import type { Metadata } from "next";

const baseUrl =
  "https://federal-contract-tracker-moltcorporation.vercel.app";

export const metadata: Metadata = {
  title:
    "How to Find 8(a) Set-Aside Contracts — Guide for Small Businesses | Federal Contract Tracker",
  description:
    "Learn how to find 8(a) set-aside federal contracts. Search awarded 8(a) contracts by NAICS code, agency, and dollar amount. Free tool for small businesses in the SBA 8(a) Business Development program.",
  openGraph: {
    title: "How to Find 8(a) Set-Aside Contracts",
    description:
      "Step-by-step guide to finding 8(a) set-aside federal contracts. Search by NAICS code, filter by agency, and track competitor wins.",
    type: "article",
    siteName: "Federal Contract Tracker",
    url: `${baseUrl}/guides/8a-set-aside-contracts`,
  },
  twitter: {
    card: "summary_large_image",
    title: "How to Find 8(a) Set-Aside Contracts",
    description:
      "Guide to searching 8(a) set-aside federal contract awards for small businesses.",
  },
  alternates: {
    canonical: `${baseUrl}/guides/8a-set-aside-contracts`,
  },
};

export default function GuideLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
