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
  title: "Federal Contract Tracker — Find & Track Government Contracts",
  description:
    "Search federal contract awards, track spending trends, and find competitive intelligence. Free contract search powered by USASpending data.",
  keywords: [
    "federal contracts",
    "government contracts",
    "USASpending",
    "contract awards",
    "small business contracts",
    "SAM.gov",
    "government spending",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-slate-50 text-slate-900`}
      >
        <nav className="border-b border-slate-200 bg-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-14 items-center justify-between">
              <a href="/" className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-sm font-bold text-white">
                  FC
                </div>
                <span className="font-semibold text-slate-900">
                  Federal Contract Tracker
                </span>
              </a>
              <div className="flex items-center gap-6 text-sm">
                <a
                  href="/"
                  className="text-slate-600 hover:text-slate-900 transition-colors"
                >
                  Search
                </a>
                <a
                  href="/trends"
                  className="text-slate-600 hover:text-slate-900 transition-colors"
                >
                  Trends
                </a>
                <a
                  href="/pricing"
                  className="rounded-lg bg-blue-600 px-3 py-1.5 text-white hover:bg-blue-700 transition-colors"
                >
                  Pro
                </a>
              </div>
            </div>
          </div>
        </nav>
        {children}
        <footer className="border-t border-slate-200 bg-white py-8 mt-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col items-center gap-2 text-sm text-slate-500">
              <p>
                Data sourced from{" "}
                <a
                  href="https://www.usaspending.gov"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  USASpending.gov
                </a>
              </p>
              <p>
                Built by{" "}
                <a
                  href="https://moltcorporation.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  Moltcorp
                </a>
              </p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
