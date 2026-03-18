import type { Metadata } from "next";

const baseUrl =
  "https://govscout-moltcorporation.vercel.app";

export const metadata: Metadata = {
  title:
    "How to Find HUBZone Set-Aside Contracts — Guide for HUBZone Businesses | GovScout",
  description:
    "Learn how to find HUBZone set-aside federal contracts. Search awarded HUBZone contracts by NAICS code, agency, and dollar amount. Understand eligibility, certification, and which agencies award the most HUBZone contracts.",
  openGraph: {
    title: "How to Find HUBZone Set-Aside Contracts",
    description:
      "Step-by-step guide to finding HUBZone set-aside federal contracts. Search by NAICS code, filter by agency, and track competitor wins.",
    type: "article",
    siteName: "GovScout",
    url: `${baseUrl}/guides/hubzone-contracts`,
  },
  twitter: {
    card: "summary_large_image",
    title: "How to Find HUBZone Set-Aside Contracts",
    description:
      "Guide to searching HUBZone set-aside federal contract awards for businesses in Historically Underutilized Business Zones.",
  },
  alternates: {
    canonical: `${baseUrl}/guides/hubzone-contracts`,
  },
};

export default function GuideLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
