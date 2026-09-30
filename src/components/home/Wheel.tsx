"use client";

import { useEffect, useState } from "react";
import { Cta } from "../ui/Cta";
import { AreaIcon, WheelPanes } from "../shared/WheelPanes";
import { AREAS, type AreaKey } from "@/lib/data/areas";

/**
 * "One advisor who sees the whole business." — the 360° ring. Auto-advances
 * every two seconds until the visitor hovers or picks an area.
 */
export function Wheel() {
  const [active, setActive] = useState<AreaKey>("tech");
  const [hold, setHold] = useState(false);

  useEffect(() => {
    if (hold) return;
    const t = setInterval(() => {
      if (document.hidden) return;
      setActive((k) => {
        const i = AREAS.findIndex((a) => a.key === k);
        return AREAS[(i + 1) % AREAS.length].key;
      });
    }, 2000);
    return () => clearInterval(t);
  }, [hold]);

  return (
    <section className="wheel" id="wheel-h">
      <div className="wrap">
        <div className="whx">
          <div>
            <span className="lab">360° business consulting</span>
            <h2>
              One advisor who sees <em>the whole business.</em>
            </h2>
          </div>
          <p>
            Most consultants play like a striker: brilliant in one position. But a business is a whole team, and it
            wins or loses together. I&rsquo;ve run every part of one myself, so I look at all nine areas at once. Hover
            over an area to see if it sounds like your business.
          </p>
        </div>

        <div className="whg" onMouseEnter={() => setHold(true)} onMouseLeave={() => setHold(false)}>
          <div className="wring">
            <div className="wtrack" />
            <div className="whub">
              <b>360°</b>
              <small>
                Holistic business
                <br />
                consultant
              </small>
            </div>
            {AREAS.map((a) => (
              <button
                type="button"
                key={a.key}
                className={`wn${a.key === active ? " on" : ""}`}
                data-k={a.key}
                style={{ left: a.pos.left, top: a.pos.top }}
                aria-pressed={a.key === active}
                onMouseEnter={() => setActive(a.key)}
                onFocus={() => setActive(a.key)}
                onClick={() => {
                  setActive(a.key);
                  setHold(true);
                }}
              >
                <span className="wi">
                  <AreaIcon svg={a.icon} />
                </span>
                <b>{a.name}</b>
              </button>
            ))}
          </div>

          <WheelPanes active={active} cta={(key) => <Cta href={`/consultation?w=${key}`}>See how I solve this</Cta>} />
        </div>
      </div>
    </section>
  );
}
