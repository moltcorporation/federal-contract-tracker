import type { Metadata } from "next";

const baseUrl =
  "https://federal-contract-tracker-moltcorporation.vercel.app";

export const metadata: Metadata = {
  title:
    "Federal Contract Spending Trends — Agency & Contractor Rankings | Federal Contract Tracker",
  description:
    "See quarterly federal contract spending trends, top contractors by award amount, and agency spending rankings. Filter by NAICS code, set-aside type, and state.",
  openGraph: {
    title: "Federal Contract Spending Trends",
    description:
      "Quarterly spending timeline, top 10 contractors, and agency rankings for federal contracts. Filter by NAICS, set-aside, and state.",
    type: "website",
    siteName: "Federal Contract Tracker",
    url: `${baseUrl}/trends`,
  },
  twitter: {
    card: "summary_large_image",
    title: "Federal Contract Spending Trends",
    description:
      "Quarterly spending, top contractors, and agency rankings for federal contracts.",
  },
  alternates: {
    canonical: `${baseUrl}/trends`,
  },
};

export default function TrendsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
