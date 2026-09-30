"use client";

import { useEffect, useState } from "react";
import { ApMark } from "../brand/ApMark";

function shouldShow(): boolean {
  try {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return false;
    if (sessionStorage.getItem("ap-loader-shown")) return false;
    sessionStorage.setItem("ap-loader-shown", "1");
    return true;
  } catch {
    return false;
  }
}

/**
 * 360° first-visit loader. Renders nothing on the server and nothing at all
 * when JavaScript fails, so the page is never blocked. Shows once per
 * session; total time is capped at 1.6s.
 */
export function Loader() {
  const [state, setState] = useState<"idle" | "show" | "out">("idle");

  useEffect(() => {
    if (!shouldShow()) return;
    const t0 = setTimeout(() => setState("show"), 0);
    const t1 = setTimeout(() => setState("out"), 1100);
    const t2 = setTimeout(() => {
      setState("idle");
      document.documentElement.classList.add("ldr-done");
    }, 1580);
    return () => {
      clearTimeout(t0);
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  if (state === "idle") return null;
  return (
    <div className={`ldr${state === "out" ? " out" : ""}`} aria-hidden="true">
      <div className="ring360">
        <svg viewBox="0 0 170 170">
          <circle cx="85" cy="85" r="80" />
        </svg>
        <ApMark tone="dark" className="ap" />
      </div>
      <span className="cap">360° Business Consulting</span>
    </div>
  );
}
