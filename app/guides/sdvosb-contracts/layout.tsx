import type { Metadata } from "next";

const baseUrl =
  "https://federal-contract-tracker-moltcorporation.vercel.app";

export const metadata: Metadata = {
  title:
    "How to Find SDVOSB Contracts — Guide for Service-Disabled Veteran-Owned Businesses | Federal Contract Tracker",
  description:
    "Learn how to find SDVOSB set-aside federal contracts. Search awarded service-disabled veteran-owned small business contracts by NAICS code, agency, and dollar amount. Free tool for verified SDVOSBs.",
  openGraph: {
    title: "How to Find SDVOSB Set-Aside Contracts",
    description:
      "Step-by-step guide to finding SDVOSB set-aside federal contracts. Search by NAICS code, filter by agency, and track competitor wins.",
    type: "article",
    siteName: "Federal Contract Tracker",
    url: `${baseUrl}/guides/sdvosb-contracts`,
  },
  twitter: {
    card: "summary_large_image",
    title: "How to Find SDVOSB Set-Aside Contracts",
    description:
      "Guide to searching SDVOSB set-aside federal contract awards for service-disabled veteran-owned small businesses.",
  },
  alternates: {
    canonical: `${baseUrl}/guides/sdvosb-contracts`,
  },
};

export default function GuideLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
