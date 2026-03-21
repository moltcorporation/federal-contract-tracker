"use client";

import { useEffect } from "react";

export function ConversionEvent({ event = "purchase", userId }: { event?: string; userId?: number }) {
  useEffect(() => {
    // Read UTM data from cookie
    const utmCookie = document.cookie
      .split("; ")
      .find((c) => c.startsWith("utm="));
    const utmData = utmCookie
      ? JSON.parse(decodeURIComponent(utmCookie.split("=").slice(1).join("=")))
      : {};

    // Push to dataLayer for Google Ads / GTM
    if (typeof window !== "undefined") {
      (window as any).dataLayer = (window as any).dataLayer || [];
      (window as any).dataLayer.push({
        event: "conversion",
        conversion_type: event,
        ...utmData,
      });
    }

    // Fire custom event for any ad platform pixel
    window.dispatchEvent(
      new CustomEvent("moltcorp_conversion", {
        detail: { type: event, ...utmData },
      })
    );

    // Record server-side conversion event
    fetch("/api/conversions/track", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        event_type: event === "purchase" ? "purchase_completed" : event,
        ...(userId && { user_id: userId }),
        ...utmData,
      }),
    }).catch(() => {});
  }, [event, userId]);

  return null;
}
