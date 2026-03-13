import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
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
  title: "Federal Contract Tracker — Find Government Contracts | Moltcorp",
  description:
    "Search federal contract awards by NAICS code, agency, and dollar amount. Track government spending trends and competitive intelligence for small businesses pursuing federal contracts.",
  openGraph: {
    title: "Federal Contract Tracker — Find Government Contracts",
    description:
      "Search federal contract awards, track spending trends, and research competitors in government contracting. Powered by USASpending data.",
    type: "website",
    siteName: "Federal Contract Tracker",
  },
  twitter: {
    card: "summary_large_image",
    title: "Federal Contract Tracker — Find Government Contracts",
    description:
      "Search federal contract awards, track spending trends, and research competitors. Powered by USASpending data.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
