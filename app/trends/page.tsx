"use client";

import { useState } from "react";
import { formatCurrency } from "@/lib/format";

interface TrendResult {
  aggregated_amount: number;
  time_period: {
    fiscal_year: string;
    quarter?: string;
    month?: string;
  };
}

interface CategoryResult {
  amount: number;
  name: string;
  code: string;
}

export default function TrendsPage() {
  const [timeline, setTimeline] = useState<TrendResult[]>([]);
  const [topRecipients, setTopRecipients] = useState<CategoryResult[]>([]);
  const [topAgencies, setTopAgencies] = useState<CategoryResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [naicsCode, setNaicsCode] = useState("");
  const [agency, setAgency] = useState("");
  const [searched, setSearched] = useState(false);

  async function handleAnalyze() {
    setLoading(true);
    try {
      const filters = {
        naicsCode: naicsCode || undefined,
        agency: agency || undefined,
        startDate: "2023-01-01",
        endDate: "2026-03-13",
      };

      const [timelineRes, recipientsRes, agenciesRes] = await Promise.all([
        fetch("/api/trends", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...filters, type: "timeline", group: "quarter" }),
        }),
        fetch("/api/trends", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...filters, type: "top_recipients", limit: 10 }),
        }),
        fetch("/api/trends", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...filters, type: "top_agencies", limit: 10 }),
        }),
      ]);

      const [timelineData, recipientsData, agenciesData] = await Promise.all([
        timelineRes.json(),
        recipientsRes.json(),
        agenciesRes.json(),
      ]);

      setTimeline(timelineData.results || []);
      setTopRecipients(recipientsData.results || []);
      setTopAgencies(agenciesData.results || []);
      setSearched(true);
    } catch {
      console.error("Failed to fetch trends");
    } finally {
      setLoading(false);
    }
  }

  const maxTimelineAmount = Math.max(
    ...timeline.map((t) => t.aggregated_amount),
    1
  );
  const maxRecipientAmount = Math.max(
    ...topRecipients.map((r) => r.amount),
    1
  );
  const maxAgencyAmount = Math.max(...topAgencies.map((a) => a.amount), 1);

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-slate-900 mb-2">
        Spending Trends
      </h1>
      <p className="text-slate-600 mb-8">
        Analyze federal contract spending patterns by industry, agency, or
        contractor.
      </p>

      {/* Filters */}
      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm mb-8">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleAnalyze();
          }}
          className="flex flex-wrap gap-4 items-end"
        >
          <div className="flex-1 min-w-48">
            <label className="block text-sm font-medium text-slate-700 mb-1">
              NAICS Code (optional)
            </label>
            <input
              type="text"
              value={naicsCode}
              onChange={(e) => setNaicsCode(e.target.value)}
              placeholder="e.g. 541512"
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
            />
          </div>
          <div className="flex-1 min-w-48">
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Agency (optional)
            </label>
            <input
              type="text"
              value={agency}
              onChange={(e) => setAgency(e.target.value)}
              placeholder="e.g. Department of Defense"
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="rounded-lg bg-blue-600 px-6 py-2.5 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-50 transition-colors"
          >
            {loading ? "Analyzing..." : "Analyze Trends"}
          </button>
        </form>
      </div>

      {searched && (
        <div className="space-y-8">
          {/* Timeline */}
          {timeline.length > 0 && (
            <div className="rounded-xl border border-slate-200 bg-white p-6">
              <h2 className="text-lg font-semibold text-slate-900 mb-4">
                Spending Over Time (Quarterly)
              </h2>
              <div className="space-y-2">
                {timeline.map((t, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <span className="w-24 text-xs text-slate-500 shrink-0 font-mono">
                      FY{t.time_period.fiscal_year} Q
                      {t.time_period.quarter || "?"}
                    </span>
                    <div className="flex-1 h-6 bg-slate-100 rounded overflow-hidden">
                      <div
                        className="h-full bg-blue-500 rounded"
                        style={{
                          width: `${(t.aggregated_amount / maxTimelineAmount) * 100}%`,
                        }}
                      />
                    </div>
                    <span className="w-20 text-xs text-slate-700 text-right font-medium">
                      {formatCurrency(t.aggregated_amount)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Top Recipients */}
          {topRecipients.length > 0 && (
            <div className="rounded-xl border border-slate-200 bg-white p-6">
              <h2 className="text-lg font-semibold text-slate-900 mb-4">
                Top 10 Contractors
              </h2>
              <div className="space-y-2">
                {topRecipients.map((r, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <span className="w-6 text-xs text-slate-400 text-right">
                      {i + 1}
                    </span>
                    <span className="w-48 text-sm text-slate-900 truncate shrink-0">
                      {r.name}
                    </span>
                    <div className="flex-1 h-6 bg-slate-100 rounded overflow-hidden">
                      <div
                        className="h-full bg-green-500 rounded"
                        style={{
                          width: `${(r.amount / maxRecipientAmount) * 100}%`,
                        }}
                      />
                    </div>
                    <span className="w-20 text-xs text-slate-700 text-right font-medium">
                      {formatCurrency(r.amount)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Top Agencies */}
          {topAgencies.length > 0 && (
            <div className="rounded-xl border border-slate-200 bg-white p-6">
              <h2 className="text-lg font-semibold text-slate-900 mb-4">
                Top 10 Awarding Agencies
              </h2>
              <div className="space-y-2">
                {topAgencies.map((a, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <span className="w-6 text-xs text-slate-400 text-right">
                      {i + 1}
                    </span>
                    <span className="w-48 text-sm text-slate-900 truncate shrink-0">
                      {a.name}
                    </span>
                    <div className="flex-1 h-6 bg-slate-100 rounded overflow-hidden">
                      <div
                        className="h-full bg-purple-500 rounded"
                        style={{
                          width: `${(a.amount / maxAgencyAmount) * 100}%`,
                        }}
                      />
                    </div>
                    <span className="w-20 text-xs text-slate-700 text-right font-medium">
                      {formatCurrency(a.amount)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {!searched && (
        <div className="rounded-xl border border-slate-200 bg-white p-12 text-center">
          <p className="text-slate-500">
            Enter a NAICS code or agency name above to analyze spending trends.
            Leave both empty to see all federal contract spending.
          </p>
        </div>
      )}
    </div>
  );
}
