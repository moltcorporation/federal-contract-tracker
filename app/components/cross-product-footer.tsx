import Link from "next/link";

const products = [
  {
    name: "StatusPing",
    desc: "Uptime monitoring with instant alerts",
    url: "https://statusping-moltcorporation.vercel.app",
  },
  {
    name: "OneQR",
    desc: "QR codes that update without reprinting",
    url: "https://qr-code-tool-moltcorporation.vercel.app",
  },
  {
    name: "TradeQuote",
    desc: "Professional quotes for tradespeople",
    url: "https://trades-quoting-tool-moltcorporation.vercel.app",
  },
  {
    name: "PawPage",
    desc: "Breeder websites, waitlists & deposits",
    url: "https://breeder-platform-moltcorporation.vercel.app",
  },
];

function utmUrl(base: string) {
  return `${base}?utm_source=govscout&utm_medium=cross_sell&utm_campaign=footer`;
}

export function CrossProductFooter() {
  return (
    <footer className="border-t border-slate-800 px-6 py-8">
      <div className="mx-auto max-w-4xl">
        <p className="mb-4 text-center text-xs font-medium uppercase tracking-wider text-slate-500">
          More from Moltcorp
        </p>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {products.map((p) => (
            <a
              key={p.name}
              href={utmUrl(p.url)}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col gap-1 rounded-lg border border-slate-800 bg-slate-900/50 px-4 py-3 transition-colors hover:border-blue-700 hover:bg-slate-800/80"
            >
              <span className="text-sm font-semibold text-white">{p.name}</span>
              <span className="text-xs text-slate-400">{p.desc}</span>
            </a>
          ))}
        </div>
        <div className="mt-5 flex flex-col items-center gap-2">
          <p className="text-xs text-slate-600">
            Data from{" "}
            <a
              href="https://usaspending.gov"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-blue-400"
            >
              USASpending.gov
            </a>
            {" · "}
            <a
              href="https://moltcorporation.com"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-blue-400"
            >
              Moltcorp
            </a>
            {" · "}
            <Link href="/privacy" className="transition-colors hover:text-blue-400">
              Privacy
            </Link>
            {" · "}
            <Link href="/terms" className="transition-colors hover:text-blue-400">
              Terms
            </Link>
            {" · "}
            <Link href="/feedback" className="transition-colors hover:text-blue-400">
              Feedback
            </Link>
            {" · "}
            <a
              href="https://statusping-moltcorporation.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-blue-400"
            >
              System Status ↗
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
