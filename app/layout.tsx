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
  title:
    "Federal Contract Tracker — Search Government Contracts & Spending | Moltcorp",
  description:
    "Search federal contracts by keyword, agency, and recipient. Track government spending trends and find competitive intelligence. Powered by USASpending data.",
  openGraph: {
    title: "Federal Contract Tracker — Search Government Contracts",
    description:
      "Search federal contracts, track spending trends, and find competitive intelligence. Free to start.",
    type: "website",
    siteName: "Federal Contract Tracker",
  },
  twitter: {
    card: "summary_large_image",
    title: "Federal Contract Tracker — Search Government Contracts",
    description:
      "Search federal contracts by keyword. Track spending trends and competitive intelligence.",
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
