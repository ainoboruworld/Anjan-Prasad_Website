"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Signature } from "../ui/Signature";
import { LIFE_PHOTOS } from "@/lib/data/site";

/** "Life beyond the boardroom." — draggable polaroid strip. */
export function LifeStrip({ variant = "home" }: { variant?: "home" | "about" }) {
  const wrap = useRef<HTMLDivElement>(null);
  const strip = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState<{ top: number; left: number } | null>(null);
  const [atEnd, setAtEnd] = useState(false);
  const [atStart, setAtStart] = useState(true);
  const [hint, setHint] = useState(true);

  const scrollBy = (dx: number) => strip.current?.scrollBy({ left: dx, behavior: "smooth" });

  const measure = useCallback(() => {
    const st = strip.current;
    if (!st) return;
    setPos({ top: st.offsetTop + st.offsetHeight / 2, left: st.offsetLeft + 16 });
    setAtEnd(st.scrollLeft + st.clientWidth >= st.scrollWidth - 8);
    setAtStart(st.scrollLeft < 10);
  }, []);

  useEffect(() => {
    measure();
    window.addEventListener("resize", measure);
    const t = setTimeout(() => setHint(false), 4000);
    return () => {
      window.removeEventListener("resize", measure);
      clearTimeout(t);
    };
  }, [measure]);

  // Mouse drag to scroll.
  useEffect(() => {
    const st = strip.current;
    if (!st) return;
    let down = false;
    let x = 0;
    let left = 0;
    const onDown = (e: MouseEvent) => {
      down = true;
      x = e.pageX;
      left = st.scrollLeft;
      st.style.cursor = "grabbing";
    };
    const onUp = () => {
      down = false;
      st.style.cursor = "";
    };
    const onMove = (e: MouseEvent) => {
      if (!down) return;
      e.preventDefault();
      st.scrollLeft = left - (e.pageX - x);
    };
    st.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    st.addEventListener("mousemove", onMove);
    return () => {
      st.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      st.removeEventListener("mousemove", onMove);
    };
  }, []);

  return (
    <section className="life2">
      <div className="wrap" ref={wrap}>
        <div className="note rv on">
          <span className="lab">Off the clock</span>
          <h2>
            Life beyond <em>the boardroom.</em>
          </h2>
          <p>
            Most of my best decisions weren&rsquo;t made in meetings. They came on quiet mornings, long drives and
            slow weekends.
          </p>
          <Signature />
          <div className="snav">
            <button type="button" aria-label="Previous photos" onClick={() => scrollBy(-320)}>
              ←
            </button>
            <button type="button" aria-label="More photos" onClick={() => scrollBy(320)}>
              →
            </button>
          </div>
          <span className="ph-flag">Placeholder photos: replace with Anjan&rsquo;s own</span>
        </div>

        <div className={`strip rv on${variant === "about" ? " strip2" : ""}`} ref={strip} onScroll={measure}>
          {LIFE_PHOTOS.map((p) => (
            <figure className="pc" key={p.src + p.tag} style={{ ["--r" as string]: p.rotate }}>
              <div className="im">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={p.src} alt="" loading="lazy" draggable={false} />
              </div>
              <figcaption>
                <small>{p.tag}</small>
                {p.caption}
              </figcaption>
            </figure>
          ))}
        </div>

        <button
          type="button"
          className={`snext${hint ? " hint" : ""}${atEnd ? " done" : ""}`}
          aria-label="Scroll for more photos"
          style={pos ? { top: pos.top } : undefined}
          onClick={() => scrollBy(320)}
        >
          <span>Scroll for more</span>
          <i>→</i>
        </button>
        <button
          type="button"
          className={`sprev${atStart ? " off" : ""}`}
          aria-label="Scroll back"
          style={pos ? { top: pos.top, left: pos.left } : undefined}
          onClick={() => scrollBy(-320)}
        >
          <i>←</i>
          <span>Back</span>
        </button>
      </div>
    </section>
  );
}
