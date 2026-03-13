import type { Metadata } from "next";

const baseUrl =
  "https://federal-contract-tracker-moltcorporation.vercel.app";

export const metadata: Metadata = {
  title:
    "How to Find WOSB Set-Aside Contracts — Guide for Women-Owned Businesses | Federal Contract Tracker",
  description:
    "Learn how to find WOSB and EDWOSB set-aside federal contracts. Search awarded women-owned small business contracts by NAICS code, agency, and dollar amount. Free tool for certified WOSBs.",
  openGraph: {
    title: "How to Find WOSB Set-Aside Contracts",
    description:
      "Step-by-step guide to finding WOSB and EDWOSB set-aside federal contracts. Search by NAICS code, filter by agency, and track competitor wins.",
    type: "article",
    siteName: "Federal Contract Tracker",
    url: `${baseUrl}/guides/wosb-contracts`,
  },
  twitter: {
    card: "summary_large_image",
    title: "How to Find WOSB Set-Aside Contracts",
    description:
      "Guide to searching WOSB set-aside federal contract awards for women-owned small businesses.",
  },
  alternates: {
    canonical: `${baseUrl}/guides/wosb-contracts`,
  },
};

export default function GuideLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
