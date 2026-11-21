"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { Cta } from "../ui/Cta";
import { splitEm } from "@/lib/sections";
import type { HeroSlide } from "@/lib/data/heroSlides";

const INTERVAL_MS = 7000;
const SWIPE_PX = 40;

/**
 * The home hero, as a stack of identical banners. Slide 1 sits in normal
 * flow and sets the height; the others are layered over it and crossfade.
 * With a single slide this renders today's hero unchanged, with no timer
 * and no controls.
 */
export function HeroSlideshow({ slides }: { slides: HeroSlide[] }) {
  const many = slides.length > 1;
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduced = useRef(false);
  const timer = useRef<number | null>(null);
  const swipe = useRef<{ x: number; y: number } | null>(null);

  const go = useCallback(
    (n: number) => setActive((cur) => (((typeof n === "number" ? n : cur) % slides.length) + slides.length) % slides.length),
    [slides.length]
  );
  const next = useCallback(() => setActive((c) => (c + 1) % slides.length), [slides.length]);
  const prev = useCallback(() => setActive((c) => (c - 1 + slides.length) % slides.length), [slides.length]);

  // Reduced motion: no autoplay, instant switch (CSS handles the latter).
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    reduced.current = mq.matches;
    const onChange = () => {
      reduced.current = mq.matches;
    };
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  // Autoplay: restarts whenever the slide changes or pause state flips, so a
  // manual action gives the new slide a full interval.
  useEffect(() => {
    if (!many || paused || reduced.current) return;
    const tick = () => {
      if (document.visibilityState === "visible") next();
    };
    timer.current = window.setInterval(tick, INTERVAL_MS);
    return () => {
      if (timer.current) window.clearInterval(timer.current);
    };
  }, [many, paused, active, next]);

  const onPointerDown = (e: React.PointerEvent) => {
    if (!many) return;
    swipe.current = { x: e.clientX, y: e.clientY };
  };
  const onPointerUp = (e: React.PointerEvent) => {
    if (!many || !swipe.current) return;
    const dx = e.clientX - swipe.current.x;
    const dy = e.clientY - swipe.current.y;
    swipe.current = null;
    if (Math.abs(dx) > SWIPE_PX && Math.abs(dx) > Math.abs(dy) * 1.5) (dx < 0 ? next : prev)();
  };

  return (
    <header
      className={`hero${many ? " has-slides" : ""}`}
      {...(many
        ? {
            "aria-roledescription": "carousel",
            "aria-label": "Highlights",
            onMouseEnter: () => setPaused(true),
            onMouseLeave: () => setPaused(false),
            onFocusCapture: () => setPaused(true),
            onBlurCapture: (e: React.FocusEvent) => {
              if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setPaused(false);
            },
            onPointerDown,
            onPointerUp,
            onPointerCancel: () => {
              swipe.current = null;
            },
          }
        : {})}
    >
      {slides.map((s, i) => {
        const title = splitEm(s.heading);
        const isActive = i === active;
        if (s.kind === "image" && s.banner) {
          // One complete artwork: the image carries its own copy and CTA; the
          // whole banner links. Desktop and mobile artwork via <picture>.
          return (
            <a
              key={s.id}
              href={s.banner.href}
              className={`slide slide-img${isActive ? " is-active" : ""}`}
              aria-hidden={!isActive}
              aria-label={s.imageAlt || undefined}
              role="group"
              aria-roledescription="slide"
              tabIndex={isActive ? 0 : -1}
              {...(!isActive ? { inert: true } : {})}
            >
              <picture>
                {s.banner.mobile && <source media="(max-width: 900px)" srcSet={s.banner.mobile} />}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={s.banner.desktop}
                  alt={s.imageAlt}
                  loading={i === 0 ? "eager" : "lazy"}
                  fetchPriority={i === 0 ? "high" : "auto"}
                  decoding="async"
                />
              </picture>
            </a>
          );
        }
        const content = (
          <>
            <div className="stage">
              <div className="ring" aria-hidden="true" />
              <div className="arch" aria-hidden="true" />
              <Image
                className="fig"
                src={s.imageUrl}
                alt={s.imageAlt}
                width={698}
                height={624}
                priority={i === 0}
                fetchPriority={i === 0 ? "high" : "auto"}
                sizes="(max-width: 900px) 90vw, 600px"
              />
            </div>
            <div className="wrap">
              <div className="sl-text">
                {s.eyebrow && <span className="lab">{s.eyebrow}</span>}
                <h1>
                  {title.plain}
                  {title.em && <em>{title.em}</em>}
                </h1>
                {s.body && <p>{s.body}</p>}
                <div className="more">
                  <Cta href={s.ctaHref}>{s.ctaLabel}</Cta>
                </div>
              </div>
            </div>
          </>
        );
        if (!many) return <div key={s.id}>{content}</div>;
        return (
          <div
            key={s.id}
            className={`slide${isActive ? " is-active" : ""}`}
            data-align={s.align ?? "left"}
            data-side={s.imageSide ?? "right"}
            aria-hidden={!isActive}
            role="group"
            aria-roledescription="slide"
            aria-label={`${i + 1} of ${slides.length}`}
            // Keep inactive slides out of the tab order.
            {...(!isActive ? { inert: true } : {})}
          >
            {content}
          </div>
        );
      })}

      {many && (
        <>
          <div className="sl-ctl">
            <button type="button" className="sl-arrow" aria-label="Previous slide" onClick={prev}>
              ←
            </button>
            <div className="sl-dots" role="tablist" aria-label="Slides">
              {slides.map((s, i) => (
                <button
                  key={s.id}
                  type="button"
                  role="tab"
                  aria-selected={i === active}
                  aria-current={i === active ? "true" : undefined}
                  aria-label={`Go to slide ${i + 1}`}
                  className={i === active ? "on" : undefined}
                  onClick={() => go(i)}
                />
              ))}
            </div>
            <button type="button" className="sl-arrow" aria-label="Next slide" onClick={next}>
              →
            </button>
          </div>
          <span className="sl-live" aria-live="polite">
            Slide {active + 1} of {slides.length}: {splitEm(slides[active].heading).plain}
            {splitEm(slides[active].heading).em ?? ""}
          </span>
        </>
      )}
    </header>
  );
}
