"use client";

import { useRef } from "react";
import Link from "next/link";
import { CASE_STUDIES, articleHref } from "@/lib/data/articles";

/** "Work that moved the numbers." — horizontally scrolling case cards. */
export function CasesRow() {
  const row = useRef<HTMLDivElement>(null);
  const by = (dir: 1 | -1) => {
    const el = row.current;
    if (el) el.scrollBy({ left: (dir * el.clientWidth) / 3, behavior: "smooth" });
  };

  return (
    <section className="cases" id="cases">
      <div className="wrap">
        <div className="csx">
          <div>
            <span className="lab">Case studies</span>
            <h2>
              Work that moved <em>the numbers.</em>
            </h2>
          </div>
          <div className="cvctl">
            <button type="button" className="ccp" aria-label="Previous" onClick={() => by(-1)}>
              ←
            </button>
            <button type="button" className="ccn" aria-label="Next" onClick={() => by(1)}>
              →
            </button>
          </div>
        </div>

        <div className="ccrow" ref={row}>
          {CASE_STUDIES.map((a) => {
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
      </div>
    </section>
  );
}
