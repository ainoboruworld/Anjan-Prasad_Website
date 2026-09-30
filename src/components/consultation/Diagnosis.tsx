"use client";

import { useEffect, useRef, useState } from "react";
import { ConsultationForm } from "../forms/ConsultationForm";
import { WheelPanes } from "../shared/WheelPanes";
import { AREAS, findArea, type AreaKey } from "@/lib/data/areas";

/**
 * Consultation page body: the 360° diagnosis picker (list variant) wired to
 * the request form, so "Book a consultation on finance" pre-fills the area.
 * `initialKey` comes from `/consultation?w=fin` (the home wheel's CTAs).
 */
export function Diagnosis({ initialKey }: { initialKey?: string }) {
  const start = findArea(initialKey)?.key ?? "tech";
  const [active, setActive] = useState<AreaKey>(start);
  const [presetArea, setPresetArea] = useState<string | undefined>(
    initialKey ? findArea(initialKey)?.name : undefined
  );
  const wheelRef = useRef<HTMLElement>(null);

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
              <span className="lab">The 360° diagnosis</span>
              <h2>
                Where is your business <em>hurting right now?</em>
              </h2>
            </div>
            <p>
              Pick the one that sounds most like you. I&rsquo;ll show you what I usually find underneath it, and how
              I&rsquo;d approach it. If it&rsquo;s more than one, that&rsquo;s normal. Most businesses I work with tick
              three or four.
            </p>
          </div>

          <div className="dxg">
            <div className="dxl" role="tablist" aria-label="Areas">
              {AREAS.map((a) => (
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
                  Book a consultation on {name.toLowerCase()} <span>→</span>
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

      <section className="sec apply" id="capply">
        <div className="wrap">
          <div className="al">
            <span className="lab">Request</span>
            <h2>
              Tell me what <em>you&rsquo;re deciding.</em>
            </h2>
            <p>Share a little about where you are. I&rsquo;ll come back with a time that works.</p>
          </div>
          <ConsultationForm presetArea={presetArea} />
        </div>
      </section>
    </>
  );
}
