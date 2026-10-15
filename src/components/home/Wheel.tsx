"use client";

import { SecHead } from "../shared/SecHead";
import type { PageSection } from "@/lib/sections";
import { useEffect, useState } from "react";
import { Cta } from "../ui/Cta";
import { AreaIcon, WheelPanes } from "../shared/WheelPanes";
import { AREAS, type Area, type AreaKey } from "@/lib/data/areas";

/**
 * "One advisor who sees the whole business." — the 360° ring. Auto-advances
 * every second until the visitor hovers or picks an area.
 */
export function Wheel({ sec, areas = AREAS }: { sec?: PageSection; areas?: Area[] }) {
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
    }, 1000);
    return () => clearInterval(t);
  }, [hold]);

  if (sec?.hidden) return null;

  return (
    <section className="wheel" id="wheel-h">
      <div className="wrap">
        <div className="whx">
          <div>
            <SecHead sec={sec} label="360° business consulting" plain="One advisor who sees " em="the whole business." />
          </div>
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
            {areas.map((a) => (
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

          <WheelPanes areas={areas} active={active} cta={(key) => <Cta href={`/business-advisory?w=${key}`}>See how I solve this</Cta>} />
        </div>
      </div>
    </section>
  );
}
