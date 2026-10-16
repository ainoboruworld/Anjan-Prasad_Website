"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { AdvisoryForm } from "../forms/AdvisoryForm";
import { WheelPanes } from "../shared/WheelPanes";
import { AREAS, findArea, type Area, type AreaKey } from "@/lib/data/areas";

/**
 * Consultation page body: the 360° diagnosis picker (list variant) wired to
 * the request form, so "Book a consultation on finance" pre-fills the area.
 * `initialKey` comes from `/consultation?w=fin` (the home wheel's CTAs).
 */
export function Diagnosis({ initialKey, areas = AREAS, beforeForm }: { initialKey?: string; areas?: Area[]; beforeForm?: ReactNode }) {
  const start = findArea(initialKey)?.key ?? areas[0]?.key ?? "mkt";
  const [active, setActive] = useState<AreaKey>(start);
  // Auto-advancing slideshow: each service holds for 3.5 seconds, pausing
  // once the visitor interacts (hover, focus or click).
  const [hold, setHold] = useState(Boolean(initialKey && findArea(initialKey)));
  const [presetArea, setPresetArea] = useState<string | undefined>(
    initialKey ? findArea(initialKey)?.name : undefined
  );
  const wheelRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (hold) return;
    const t = setInterval(() => {
      if (document.hidden) return;
      setActive((k) => {
        const i = areas.findIndex((a) => a.key === k);
        return areas[(i + 1) % areas.length].key;
      });
    }, 3500);
    return () => clearInterval(t);
  }, [hold, areas]);

  useEffect(() => {
    if (initialKey && findArea(initialKey)) {
      const t = setTimeout(() => wheelRef.current?.scrollIntoView({ behavior: "smooth" }), 50);
      return () => clearTimeout(t);
    }
  }, [initialKey]);

  const book = (name: string) => {
    setPresetArea(name);
    document.getElementById("capply")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <section className="wheel dx" id="wheel" ref={wheelRef}>
        <div className="wrap">
          <div className="dxh">
            <div>
              <span className="lab">360° business consulting</span>
              <h2>
                I don&rsquo;t advise from the outside. <em>I&rsquo;m still in it.</em>
              </h2>
            </div>
          </div>

          <div className="dxg" onMouseEnter={() => setHold(true)} onMouseLeave={() => setHold(false)}>
            <div className="dxl" role="tablist" aria-label="Areas">
              {areas.map((a) => (
                <button
                  type="button"
                  role="tab"
                  aria-selected={a.key === active}
                  key={a.key}
                  className={`wn${a.key === active ? " on" : ""}`}
                  data-k={a.key}
                  onMouseEnter={() => setActive(a.key)}
                  onFocus={() => setActive(a.key)}
                  onClick={() => setActive(a.key)}
                >
                  <em>{a.index}</em>
                  <span>{a.name}</span>
                </button>
              ))}
            </div>
            <WheelPanes
              areas={areas}
              active={active}
              cta={(key, name) => (
                <a
                  className="cta"
                  href="#capply"
                  data-area={name}
                  onClick={(ev) => {
                    ev.preventDefault();
                    book(name);
                  }}
                >
                  Book a consultation <span>→</span>
                </a>
              )}
            />
          </div>
        </div>
      </section>

      <section className="sec">
        <div className="wrap">
          <div className="c3 plain">
            <div>
              <span className="lab">Who it&rsquo;s for</span>
              <h3>A real decision</h3>
              <p>Founders, early-stage startups and people getting ready to start their own business.</p>
            </div>
            <div>
              <span className="lab">What you receive</span>
              <h3>A written next step</h3>
              <p>A prepared one-to-one session and a written next step you can act on immediately.</p>
            </div>
            <div>
              <span className="lab">Why book it</span>
              <h3>An operator&rsquo;s read</h3>
              <p>An operator&rsquo;s read on your business or idea: clarity today, better decisions tomorrow.</p>
            </div>
          </div>
        </div>
      </section>

      {beforeForm}

      <section className="sec apply" id="capply">
        <div className="wrap">
          <div className="al">
            <span className="lab">Request</span>
            <h2>
              Tell me what <em>you&rsquo;re deciding.</em>
            </h2>
            <p>Share a little about where you are. I&rsquo;ll come back with a time that works.</p>
          </div>
          <AdvisoryForm presetArea={presetArea} />
        </div>
      </section>
    </>
  );
}
