import type { Metadata } from "next";

const baseUrl = "https://federal-contract-tracker-moltcorporation.vercel.app";

export const metadata: Metadata = {
  title: "NAICS Code Lookup by Company Name — Free | GovScout",
  description:
    "Free NAICS code lookup tool. Search by company name, keyword, or industry to find the right NAICS code for your business. Essential for SAM.gov registration and government contracting.",
  keywords: [
    "naics code lookup",
    "naics code lookup company name",
    "naics code lookup by business name",
    "how to lookup naics code",
    "naics code search",
    "find naics code",
    "naics code list",
    "what is my naics code",
  ],
  openGraph: {
    title: "NAICS Code Lookup by Company Name — Free | GovScout",
    description:
      "Free NAICS code lookup tool. Search by company name, keyword, or industry to find the right NAICS code for your business.",
    type: "article",
    siteName: "GovScout",
    url: `${baseUrl}/guides/naics-code-lookup`,
  },
  twitter: {
    card: "summary_large_image",
    title: "NAICS Code Lookup by Company Name — Free | GovScout",
    description:
      "Free NAICS code lookup tool. Search by company name, keyword, or industry to find the right NAICS code.",
  },
  alternates: {
    canonical: `${baseUrl}/guides/naics-code-lookup`,
  },
};

export default function GuideLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
