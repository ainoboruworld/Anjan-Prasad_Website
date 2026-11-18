"use client";

import { useEffect, useRef, useState } from "react";

export interface CarouselPhoto {
  src?: string;
  alt?: string;
  caption?: string;
}

/**
 * Small photo slideshow for a brand page: crossfades every 3 seconds, with
 * quiet arrows, pause on hover or focus, and reduced-motion respected.
 * Photos without a src render as a soft placeholder tile, so the section
 * looks finished before real photos are uploaded in the Studio.
 */
export function BrandCarousel({ photos, label, mono }: { photos: CarouselPhoto[]; label: string; mono: string }) {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduced = useRef(false);
  const n = photos.length;

  useEffect(() => {
    reduced.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, []);

  useEffect(() => {
    if (n < 2 || paused || reduced.current) return;
    const t = window.setInterval(() => {
      if (document.visibilityState === "visible") setI((c) => (c + 1) % n);
    }, 3000);
    return () => window.clearInterval(t);
  }, [n, paused, i]);

  if (!n) return null;
  const go = (d: number) => setI((c) => (c + d + n) % n);

  return (
    <figure
      className="bcar"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
      aria-roledescription="carousel"
      aria-label={label}
    >
      <div className="bcar-frame">
        {photos.map((p, k) => (
          <div key={k} className={`bcar-slide${k === i ? " on" : ""}`} aria-hidden={k !== i}>
            {p.src ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={p.src} alt={p.alt ?? ""} loading={k === 0 ? "eager" : "lazy"} decoding="async" />
            ) : (
              <div className="bcar-ph">
                <span>{mono}</span>
                <small>Photo placeholder {k + 1} · replace in Studio</small>
              </div>
            )}
          </div>
        ))}
        {n > 1 && (
          <>
            <button type="button" className="bcar-arrow prev" aria-label="Previous photo" onClick={() => go(-1)}>
              ←
            </button>
            <button type="button" className="bcar-arrow next" aria-label="Next photo" onClick={() => go(1)}>
              →
            </button>
          </>
        )}
      </div>
      <figcaption>
        <span>{photos[i]?.caption ?? label}</span>
        {n > 1 && (
          <small>
            {String(i + 1).padStart(2, "0")} / {String(n).padStart(2, "0")}
          </small>
        )}
      </figcaption>
    </figure>
  );
}
