import Link from "next/link";
import { CrossProductFooter } from "@/app/components/cross-product-footer";

const comparisonRows = [
  {
    feature: "Set-aside filtering",
    ours: "One-click: 8(a), HUBZone, WOSB, SDVOSB, SBA — front and center",
    theirs: "Manual column filtering or separate tabs per set-aside type",
  },
  {
    feature: "NAICS code lookup",
    ours: "Autocomplete — type a keyword and pick from matching codes",
    theirs: "Copy-paste codes from Census Bureau or maintain your own lookup list",
  },
  {
    feature: "Data freshness",
    ours: "USASpending.gov API — updated daily, automatic",
    theirs: "Manual updates whenever you remember to check",
  },
  {
    feature: "Agency spending view",
    ours: "Top agencies ranked by spending with visual bars, filterable by NAICS and set-aside",
    theirs: "Pivot tables or manual aggregation across rows",
  },
  {
    feature: "New award alerts",
    ours: "Saved searches with email notifications on new matches (Pro)",
    theirs: "No alerts — you check when you remember",
  },
  {
    feature: "Search across all awards",
    ours: "Full-text search across all awarded contracts with instant results",
    theirs: "Limited to whatever you've manually entered or downloaded",
  },
  {
    feature: "Sharing with teammates",
    ours: "Share a link — anyone can search without setup",
    theirs: "Email the file, manage versions, hope formulas don't break",
  },
  {
    feature: "Data export",
    ours: "CSV export of any search result (Pro)",
    theirs: "Already in a spreadsheet — no export needed",
  },
  {
    feature: "Cost",
    ours: "Free (10 searches/day) or $49/month unlimited",
    theirs: "Free (your time is the cost)",
  },
];

export default function ManualTrackingComparison() {
  return (
    <div className="flex min-h-screen flex-col bg-slate-950 font-sans">
      <header className="flex items-center justify-between border-b border-slate-800 px-6 py-4">
        <Link href="/" className="flex items-center gap-2">
          <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6 text-blue-400" aria-hidden="true">
            <path d="M3 21V7l9-4 9 4v14" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
            <path d="M9 21V13h6v8" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
            <circle cx="12" cy="9.5" r="1.5" fill="currentColor" />
          </svg>
          <span className="text-lg font-bold tracking-tight text-white">
            GovScout
          </span>
        </Link>
        <div className="flex items-center gap-4">
          <Link href="/trends" className="text-sm font-medium text-slate-400 transition-colors hover:text-blue-400">Trends</Link>
          <Link href="/saved-searches" className="text-sm font-medium text-slate-400 transition-colors hover:text-blue-400">Saved Searches</Link>
          <Link href="/pricing" className="text-sm font-medium text-blue-400 transition-colors hover:text-blue-300">Pricing</Link>
        </div>
      </header>

      <main className="mx-auto flex w-full max-w-3xl flex-col gap-10 px-4 py-12">
        <div className="flex flex-col items-center gap-5 text-center">
          <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            Stop Tracking Contracts
            <span className="block text-blue-400">
              In Spreadsheets
            </span>
          </h1>
          <p className="mx-auto max-w-xl text-lg text-slate-400">
            Most small businesses start tracking government contracts in Excel
            or Google Sheets. It works — until you need to filter by set-aside
            type across 10,000 awards, or check whether a new contract was
            posted in your NAICS code this week. GovScout does that in seconds.
          </p>
        </div>

        {/* The spreadsheet problem */}
        <div className="flex flex-col gap-4 rounded-xl border border-amber-900/30 bg-amber-950/20 p-6">
          <h2 className="text-xl font-semibold text-white">
            The spreadsheet problem
          </h2>
          <p className="text-sm leading-relaxed text-slate-400">
            Spreadsheets are great for tracking your own bids and proposals. But
            they&apos;re the wrong tool for competitive research. You can&apos;t
            search across all awarded contracts in real time. You can&apos;t
            filter 8(a) or HUBZone awards with one click. You can&apos;t see
            which agencies are spending the most in your industry without
            building pivot tables from raw USASpending.gov downloads.
          </p>
          <p className="text-sm leading-relaxed text-slate-400">
            That research is what GovScout automates. Keep your spreadsheet for
            pipeline tracking — use GovScout for the competitive intelligence
            that feeds it.
          </p>
        </div>

        {/* Time comparison */}
        <div className="flex flex-col items-center gap-3 rounded-xl border border-emerald-900/30 bg-emerald-950/20 p-6 text-center">
          <p className="text-sm font-medium text-emerald-400">
            Time comparison
          </p>
          <div className="flex items-baseline gap-3">
            <div className="flex flex-col">
              <span className="text-3xl font-extrabold text-white">
                10 sec
              </span>
              <span className="text-xs text-slate-400">
                GovScout search
              </span>
            </div>
            <span className="text-sm text-slate-500">
              vs
            </span>
            <div className="flex flex-col">
              <span className="text-3xl font-extrabold text-slate-500">
                2–4 hrs
              </span>
              <span className="text-xs text-slate-400">
                manual download + cleanup
              </span>
            </div>
          </div>
          <p className="text-xs text-slate-400">
            Per research query — NAICS code + set-aside type + agency filter
          </p>
        </div>

        {/* Comparison table */}
        <div className="flex flex-col gap-4">
          <h2 className="text-xl font-semibold text-white">
            GovScout vs spreadsheet tracking
          </h2>
          <div className="overflow-x-auto rounded-xl border border-slate-800">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-800 bg-slate-900/50">
                  <th className="px-4 py-3 text-left font-medium text-slate-500">
                    Feature
                  </th>
                  <th className="px-4 py-3 text-left font-medium text-blue-400">
                    GovScout
                  </th>
                  <th className="px-4 py-3 text-left font-medium text-slate-500">
                    Spreadsheet
                  </th>
                </tr>
              </thead>
              <tbody>
                {comparisonRows.map((row, i) => (
                  <tr
                    key={i}
                    className="border-b border-slate-800/50 last:border-0"
                  >
                    <td className="px-4 py-3 font-medium text-slate-300">
                      {row.feature}
                    </td>
                    <td className="px-4 py-3 text-slate-300">
                      {row.ours}
                    </td>
                    <td className="px-4 py-3 text-slate-500">
                      {row.theirs}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* When spreadsheets still win */}
        <div className="flex flex-col gap-4">
          <h2 className="text-xl font-semibold text-white">
            When spreadsheets still make sense
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="flex flex-col gap-2 rounded-lg border border-blue-900/30 bg-blue-950/20 p-5">
              <h3 className="font-semibold text-blue-400">
                Use GovScout for...
              </h3>
              <ul className="flex flex-col gap-1.5 text-sm text-slate-400">
                <li>Finding who wins contracts in your NAICS codes</li>
                <li>Filtering awards by set-aside type (8(a), HUBZone, WOSB)</li>
                <li>Tracking agency spending trends over time</li>
                <li>Getting alerts when new matching awards post</li>
                <li>Quick competitive research before a bid decision</li>
              </ul>
            </div>
            <div className="flex flex-col gap-2 rounded-lg border bg-slate-900 p-5">
              <h3 className="font-semibold text-slate-300">
                Keep your spreadsheet for...
              </h3>
              <ul className="flex flex-col gap-1.5 text-sm text-slate-400">
                <li>Tracking your own active bids and proposals</li>
                <li>Managing teaming partner relationships</li>
                <li>Custom scoring models for go/no-go decisions</li>
                <li>Internal reporting to leadership</li>
                <li>Anything specific to your BD process</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Who this is for */}
        <div className="flex flex-col gap-4">
          <h2 className="text-xl font-semibold text-white">
            Built for small businesses doing their own research
          </h2>
          <p className="text-sm leading-relaxed text-slate-400">
            Enterprise BD teams have Deltek GovWin, Bloomberg Government, and
            dedicated analysts. Small businesses have spreadsheets and late
            nights on USASpending.gov. GovScout fills that gap — the
            competitive research piece that spreadsheets handle poorly, at a
            price point that makes sense before your first federal win.
          </p>
          <p className="text-sm leading-relaxed text-slate-400">
            Export any search result to CSV when you need it in your
            spreadsheet. GovScout handles the search and filtering; your
            spreadsheet handles everything after.
          </p>
        </div>

        {/* Also compare */}
        <div className="flex flex-wrap items-center gap-3 rounded-lg border border-slate-800 bg-slate-900 px-5 py-4">
          <span className="text-sm text-slate-400">
            Also compare:
          </span>
          <Link
            href="/compare/govwin"
            className="text-sm font-medium text-blue-400 transition-colors hover:text-blue-300"
          >
            GovScout vs GovWin
          </Link>
          <span className="text-slate-600">&middot;</span>
          <Link
            href="/compare/sam-gov"
            className="text-sm font-medium text-blue-400 transition-colors hover:text-blue-300"
          >
            GovScout vs SAM.gov
          </Link>
          <span className="text-slate-600">&middot;</span>
          <Link
            href="/compare/bgov"
            className="text-sm font-medium text-blue-400 transition-colors hover:text-blue-300"
          >
            GovScout vs Bloomberg Government
          </Link>
          <span className="text-slate-600">&middot;</span>
          <Link
            href="/compare/govscout-io"
            className="text-sm font-medium text-blue-400 transition-colors hover:text-blue-300"
          >
            vs govscout.io
          </Link>
        </div>

        {/* FAQ */}
        <div className="flex flex-col gap-5">
          <h2 className="text-xl font-semibold text-white">
            Frequently asked questions
          </h2>
          <div className="flex flex-col gap-4">
            {[
              {
                question: "Can GovScout replace my contract tracking spreadsheet?",
                answer:
                  "For competitive research, yes. GovScout searches awarded federal contracts by NAICS code, set-aside type, agency, recipient, and dollar range — all the dimensions you'd manually track in a spreadsheet. Pro users also get saved searches with email alerts on new awards, spending trend charts, and CSV export. You still need your own systems for bid management and proposal tracking, but the competitive intelligence part is covered.",
              },
              {
                question: "How does GovScout get its data?",
                answer:
                  "All data comes from USASpending.gov, the U.S. government's official source for federal spending data. It covers all awarded federal contracts and is updated daily. We use the public API — no scraping, no proprietary data sources.",
              },
              {
                question: "Can I export data to a spreadsheet?",
                answer:
                  "Yes. Pro users can export search results to CSV with one click. This lets you keep using spreadsheets for your own analysis while GovScout handles the search, filtering, and data collection. You get the best of both: purpose-built search plus spreadsheet flexibility.",
              },
              {
                question: "What does the free tier include?",
                answer:
                  "10 searches per day with full access to all filters — NAICS autocomplete, set-aside type, agency, recipient, dollar range. No signup required. The free tier is enough for occasional research. Pro ($49/month) adds unlimited searches, spending trends, CSV export, saved searches, and email alerts.",
              },
              {
                question: "I only track contracts in one NAICS code. Is GovScout overkill?",
                answer:
                  "Actually, that's where GovScout saves the most time. Set up a saved search for your NAICS code with your preferred set-aside filters, and GovScout emails you when new awards match. No more manually checking USASpending.gov or updating your spreadsheet. The free tier covers 10 searches/day if you prefer manual checks.",
              },
            ].map((faq, i) => (
              <div
                key={i}
                className="rounded-lg border border-slate-800 bg-slate-900 p-5"
              >
                <h3 className="font-semibold text-white">
                  {faq.question}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-400">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="flex flex-col items-center gap-4 rounded-xl border border-blue-900/30 bg-blue-950/20 p-8 text-center">
          <h2 className="text-2xl font-bold text-white">
            Try it — faster than opening a spreadsheet
          </h2>
          <p className="max-w-md text-sm text-slate-400">
            10 free searches per day. Set-aside filters, NAICS autocomplete,
            agency spending breakdowns. No registration, no downloads.
          </p>
          <Link
            href="/"
            className="rounded-lg bg-blue-500 px-8 py-3 text-base font-semibold text-white shadow-sm transition-all hover:bg-blue-400"
          >
            Search contracts free
          </Link>
        </div>
      </main>

      <CrossProductFooter />
    </div>
  );
}
