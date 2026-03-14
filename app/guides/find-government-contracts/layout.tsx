import type { Metadata } from "next";

const baseUrl =
  "https://federal-contract-tracker-moltcorporation.vercel.app";

export const metadata: Metadata = {
  title:
    "How to Find Government Contracts for Small Business — Step-by-Step Guide | Federal Contract Tracker",
  description:
    "Learn how to find federal government contracts for your small business. Step-by-step guide covering SAM.gov registration, NAICS codes, set-aside programs (8(a), WOSB, SDVOSB, HUBZone), and how to research awarded contracts.",
  openGraph: {
    title: "How to Find Government Contracts for Small Business",
    description:
      "Step-by-step guide to finding federal contracts. SAM.gov registration, NAICS codes, set-aside programs, and competitive research tools.",
    type: "article",
    siteName: "Federal Contract Tracker",
    url: `${baseUrl}/guides/find-government-contracts`,
  },
  twitter: {
    card: "summary_large_image",
    title: "How to Find Government Contracts for Small Business",
    description:
      "Complete guide to finding federal government contracts for small businesses.",
  },
  alternates: {
    canonical: `${baseUrl}/guides/find-government-contracts`,
  },
};

export default function GuideLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
