import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "GovScout — Find Government Contracts";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          height: "100%",
          backgroundColor: "#020617",
          padding: "48px",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        {/* Logo + Name */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            marginBottom: "12px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "56px",
              height: "56px",
              borderRadius: "12px",
              backgroundColor: "#0f172a",
              border: "2px solid #3b82f6",
            }}
          >
            <svg
              viewBox="0 0 24 24"
              width="32"
              height="32"
              fill="none"
            >
              <path
                d="M3 21V7l9-4 9 4v14"
                stroke="#60a5fa"
                strokeWidth="1.5"
                strokeLinejoin="round"
              />
              <path
                d="M9 21V13h6v8"
                stroke="#60a5fa"
                strokeWidth="1.5"
                strokeLinejoin="round"
              />
              <circle cx="12" cy="9.5" r="1.5" fill="#60a5fa" />
            </svg>
          </div>
          <span
            style={{
              fontSize: 56,
              fontWeight: 800,
              color: "#fff",
              letterSpacing: "-0.02em",
            }}
          >
            GovScout
          </span>
        </div>

        {/* Tagline */}
        <span
          style={{
            fontSize: 28,
            color: "#94a3b8",
            marginBottom: "44px",
            textAlign: "center",
          }}
        >
          Federal Contract Search &amp; Competitive Intelligence
        </span>

        {/* Feature cards */}
        <div
          style={{
            display: "flex",
            gap: "28px",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "8px",
              padding: "24px 32px",
              borderRadius: "12px",
              backgroundColor: "#0f172a",
              border: "1px solid #1e293b",
            }}
          >
            <span style={{ fontSize: 36, fontWeight: 700, color: "#22c55e" }}>
              Free
            </span>
            <span style={{ fontSize: 16, color: "#64748b" }}>
              10 Searches/Day
            </span>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "8px",
              padding: "24px 32px",
              borderRadius: "12px",
              backgroundColor: "#0f172a",
              border: "1px solid #1e293b",
            }}
          >
            <span style={{ fontSize: 36, fontWeight: 700, color: "#3b82f6" }}>
              $49/mo
            </span>
            <span style={{ fontSize: 16, color: "#64748b" }}>
              Pro — Unlimited
            </span>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "8px",
              padding: "24px 32px",
              borderRadius: "12px",
              backgroundColor: "#0f172a",
              border: "1px solid #1e293b",
            }}
          >
            <span style={{ fontSize: 36, fontWeight: 700, color: "#eab308" }}>
              5+ yrs
            </span>
            <span style={{ fontSize: 16, color: "#64748b" }}>
              Award History
            </span>
          </div>
        </div>

        {/* URL */}
        <span
          style={{
            fontSize: 18,
            color: "#475569",
            marginTop: "44px",
          }}
        >
          Powered by USASpending.gov
        </span>
      </div>
    ),
    { ...size }
  );
}
