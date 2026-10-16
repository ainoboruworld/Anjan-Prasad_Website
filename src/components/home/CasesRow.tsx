"use client";


import { SecHead } from "../shared/SecHead";
import type { PageSection } from "@/lib/sections";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { CASE_STUDIES, articleHref, type Article } from "@/lib/data/articles";

/**
 * "Work that moved the numbers." — horizontally scrolling case cards.
 * Auto-advances as a slideshow, looping back to the first card; pauses
 * while the visitor hovers the row or after they use the arrows. Cards
 * come from the Studio's Case Studies documents (CMS merged over the
 * seed), passed in as `cases`.
 */
export function CasesRow({ sec, cases }: { sec?: PageSection; cases?: Article[] }) {
  const row = useRef<HTMLDivElement>(null);
  const [hold, setHold] = useState(false);
  const by = (dir: 1 | -1) => {
    const el = row.current;
    if (el) el.scrollBy({ left: (dir * el.clientWidth) / 3, behavior: "smooth" });
  };

  useEffect(() => {
    if (hold) return;
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setInterval(() => {
      const el = row.current;
      if (!el || document.hidden) return;
      if (el.scrollLeft + el.clientWidth >= el.scrollWidth - 8) {
        el.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        el.scrollBy({ left: el.clientWidth / 3, behavior: "smooth" });
      }
    }, 3500);
    return () => clearInterval(t);
  }, [hold]);

  if (sec?.hidden) return null;

  return (
    <section className="cases" id="cases">
      <div className="wrap">
        <div className="csx">
          <div>
            <SecHead sec={sec} label="Case studies" plain="Work that moved " em="the numbers." />
          </div>
          <div className="cvctl">
            <button
              type="button"
              className="ccp"
              aria-label="Previous"
              onClick={() => {
                setHold(true);
                by(-1);
              }}
            >
              ←
            </button>
            <button
              type="button"
              className="ccn"
              aria-label="Next"
              onClick={() => {
                setHold(true);
                by(1);
              }}
            >
              →
            </button>
          </div>
        </div>

        <div className="ccrow" ref={row} onMouseEnter={() => setHold(true)} onMouseLeave={() => setHold(false)}>
          {(cases?.length ? cases : CASE_STUDIES).map((a) => {
            const c = a.caseStudy!;
            return (
              <Link className="cc" href={articleHref(a.slug)} key={a.slug}>
                <div className="cct">
                  {c.logo ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img className="ccl" src={c.logo} alt={c.client} />
                  ) : (
                    <span className="ccw">{c.client}</span>
                  )}
                  <span>{c.sector}</span>
                </div>
                <h3>{a.title}</h3>
                <div className="ccm">
                  {c.cardMetrics.map(([v, l]) => (
                    <div key={l}>
                      <b>{v}</b>
                      <small>{l}</small>
                    </div>
                  ))}
                </div>
                <span className="ccr">Read the case study →</span>
              </Link>
            );
          })}
        </div>
        <Link href="/knowledge-hub?cat=Case%20Studies" className="ul ccall">
          All case studies in the Knowledge Hub
        </Link>
        <div className="secta">
          <p>{sec?.body ?? "Want results like these in your business?"}</p>
          <Link href="/business-advisory#capply" className="cta">
            Book a consultation <span>→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
