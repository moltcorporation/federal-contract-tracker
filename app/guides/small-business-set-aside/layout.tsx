import type { Metadata } from "next";

const baseUrl =
  "https://federal-contract-tracker-moltcorporation.vercel.app";

export const metadata: Metadata = {
  title:
    "Small Business Set-Aside Contracts — SBA Set-Aside Guide | GovScout",
  description:
    "Learn how to find SBA small business set-aside federal contracts. Understand size standards, eligibility, SAM.gov registration, and how to search for contracts reserved for small businesses.",
  openGraph: {
    title: "Small Business Set-Aside Federal Contracts",
    description:
      "Step-by-step guide to finding SBA small business set-aside contracts. Size standards, eligibility, and how to search awarded contracts.",
    type: "article",
    siteName: "GovScout",
    url: `${baseUrl}/guides/small-business-set-aside`,
  },
  twitter: {
    card: "summary_large_image",
    title: "Small Business Set-Aside Federal Contracts",
    description:
      "Guide to finding SBA small business set-aside federal contracts for qualifying small businesses.",
  },
  alternates: {
    canonical: `${baseUrl}/guides/small-business-set-aside`,
  },
};

export default function GuideLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
