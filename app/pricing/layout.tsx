import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "GovScout Pro — $49/mo Federal Contract Intelligence",
  description:
    "Unlimited federal contract searches, competitor tracking, spending trends, and CSV export. GovWin charges $2,000+/year — GovScout Pro is $49/mo.",
  openGraph: {
    title: "GovScout Pro — $49/mo Federal Contract Intelligence",
    description:
      "Unlimited federal contract searches, competitor tracking, spending trends, and CSV export. GovWin charges $2,000+/year — GovScout Pro is $49/mo.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "GovScout Pro — $49/mo Federal Contract Intelligence",
    description:
      "Unlimited federal contract searches, competitor tracking, spending trends, and CSV export. GovWin charges $2,000+/year — GovScout Pro is $49/mo.",
  },
};

export default function PricingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
