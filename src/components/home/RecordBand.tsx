"use client";

import { SecHead } from "../shared/SecHead";
import type { PageSection } from "@/lib/sections";
import { useEffect, useRef, useState } from "react";

/** Counts up from 0 once the band scrolls into view. */
function Counter({ to, active }: { to: number; active: boolean }) {
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!active) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let t0: number | null = null;
    let raf = 0;
    const d = reduced ? 1 : 1600;
    const f = (t: number) => {
      if (t0 === null) t0 = t;
      const p = Math.min((t - t0) / d, 1);
      const e = 1 - Math.pow(1 - p, 3);
      setN(Math.round(to * e));
      if (p < 1) raf = requestAnimationFrame(f);
    };
    raf = requestAnimationFrame(f);
    return () => cancelAnimationFrame(raf);
  }, [active, to]);
  return <span className="cu">{active ? n : to}</span>;
}

const STATS: { to?: number; text?: string; logo?: string; plus?: boolean; label: string }[] = [
  { to: 16, plus: true, label: "Years of experience" },
  { to: 250, plus: true, label: "Businesses guided" },
  { to: 100, plus: true, label: "Brands worked with" },
  { to: 5, label: "Ventures built" },
  { logo: "/brand-logos/fortune-500-tile.png", text: "Fortune 500", label: "Companies advised" },
  { to: 3, plus: true, label: "Institutions and universities" },
];

/** "A record measured in outcomes." */
export function RecordBand({ sec }: { sec?: PageSection }) {
  if (sec?.hidden) return null;
  const ref = useRef<HTMLDivElement>(null);
  const [go, setGo] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (e) => {
        if (e[0].isIntersecting) {
          setGo(true);
          io.disconnect();
        }
      },
      { threshold: 0.35 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section className="rec rec2">
      <div className="wrap">
        <div className="rtop rv on">
          <div>
            <SecHead sec={sec} label="Trust & Experience" plain="A record measured " em="in outcomes." />
          </div>
          <p>
            {sec?.body ??
              "Seventeen plus years across global agencies, enterprise growth teams and my own ventures. These are the numbers I'm proudest of."}
          </p>
        </div>

        <div className={`rband rv on${go ? " go" : ""}`} ref={ref}>
          <div className="rfeat">
            <span className="lab">Marketing budgets managed</span>
            <b>
              ₹<Counter to={1200} active={go} />
              <span> Cr+</span>
            </b>
            <p>Across media and performance marketing for brands, agencies and my own ventures.</p>
            <div className="rsince">
              <small>Since 2011</small>
              <span>
                Started my first venture, <b>WebX</b>, and haven&rsquo;t stopped building since.
              </span>
            </div>
          </div>

          <div className="rstats">
            {(sec?.items?.length
              ? sec.items
                  .filter((x) => x.title && x.value)
                  .map((x): (typeof STATS)[number] => {
                    const num = parseInt(x.value!.replace(/[^0-9]/g, ""), 10);
                    const isNum = Number.isFinite(num) && /^[0-9]/.test(x.value!.trim());
                    // A text stat can carry a logo: the item's photo in the
                    // Studio, or the built-in Fortune 500 tile as fallback.
                    const logo = x.imageUrl ?? (x.value!.trim() === "Fortune 500" ? "/brand-logos/fortune-500-tile.png" : undefined);
                    return isNum
                      ? { to: num, plus: x.value!.includes("+"), label: x.title! }
                      : { text: x.value!, logo, label: x.title! };
                  })
              : STATS
            ).map((s) => (
              <div key={s.label}>
                <b>
                  {s.logo ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img className="rlogo" src={s.logo} alt={s.text} />
                  ) : (
                    s.text ?? <Counter to={s.to!} active={go} />
                  )}
                  {s.plus && <i>+</i>}
                </b>
                <small>{s.label}</small>
              </div>
            ))}
          </div>
        </div>

        <div className="secta rv on">
          <p>
            Numbers like these start with one conversation. <em>Yours can too.</em>
          </p>
          <a className="cta" href="/business-advisory#capply">
            Book a consultation <span>→</span>
          </a>
        </div>
      </div>
    </section>
  );
}
