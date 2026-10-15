"use client";

import { NextStudio } from "next-sanity/studio";
import config from "../../../../sanity.config";

/** Friendly note instead of a crash while the Sanity env vars are not set. */
function NotConfigured() {
  return (
    <div style={{ minHeight: "100vh", display: "grid", placeItems: "center", background: "#F4F1EB", color: "#0B1A2E", fontFamily: "Geist, system-ui, sans-serif", padding: 24 }}>
      <div style={{ maxWidth: 520, textAlign: "center" }}>
        <h1 style={{ fontSize: 24, marginBottom: 12 }}>Content Studio is not configured yet</h1>
        <p style={{ lineHeight: 1.6, opacity: 0.8 }}>
          Set NEXT_PUBLIC_SANITY_PROJECT_ID (and NEXT_PUBLIC_SANITY_DATASET) in the hosting environment and redeploy.
          The Studio will then load here at /studio.
        </p>
      </div>
    </div>
  );
}

export function Studio() {
  if (!config.projectId) return <NotConfigured />;
  return <NextStudio config={config} />;
}
