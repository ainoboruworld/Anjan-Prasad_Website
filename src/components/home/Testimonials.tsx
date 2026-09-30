"use client";

import { useEffect, useState } from "react";
import { TESTIMONIALS } from "@/lib/data/site";

/** "In their own words." — one quote at a time, auto-rotating every 6s. */
export function Testimonials() {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const n = TESTIMONIALS.length;
  const go = (d: number) => setI((k) => (k + d + n) % n);

  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => go(1), 6000);
    return () => clearInterval(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paused]);

  return (
    <section className="sec tst2">
      <div className="wrap">
        <div className="tl rv on">
          <span className="lab">Testimonials</span>
          <h2>
            In their <em>own words.</em>
          </h2>
          <span className="ph-flag" style={{ margin: "14px 0 0" }}>
            Placeholder: replace with real quotes
          </span>
          <div className="ctl">
            <button type="button" aria-label="Previous" onClick={() => { setPaused(true); go(-1); }}>
              ←
            </button>
            <span className="cnt">
              <b>{String(i + 1).padStart(2, "0")}</b> / {String(n).padStart(2, "0")}
            </span>
            <button type="button" aria-label="Next" onClick={() => { setPaused(true); go(1); }}>
              →
            </button>
          </div>
        </div>

        <div className="tr2 rv on" aria-live="polite">
          {TESTIMONIALS.map((t, k) => (
            <figure className={`sl${k === i ? " on" : ""}`} key={t.name} aria-hidden={k !== i}>
              <blockquote>{t.quote}</blockquote>
              <figcaption>
                <span className="av">{t.initials}</span>
                <span>
                  <b>{t.name}</b>
                  <small>{t.role}</small>
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
