"use client";

import { useEffect, useRef, useState } from "react";
import type { CaseBarChartData, CaseLineChartData } from "@/lib/data/articles";

/**
 * Reusable, animated charts for case studies. Each chart takes its data from
 * the article body, animates once when scrolled into view (the line draws
 * itself, bars grow from the baseline) and stays static under reduced motion.
 */

const NAVY = "#0B1A2E";
const GOLD = "#CDB27A";
const GRID = "rgba(11,26,46,.12)";
const INK2 = "#5A6B7D";

function useInView() {
  const ref = useRef<HTMLElement>(null);
  const [on, setOn] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setOn(true);
      return;
    }
    const io = new IntersectionObserver(
      (es) => {
        if (es.some((e) => e.isIntersecting)) {
          setOn(true);
          io.disconnect();
        }
      },
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return { ref, on };
}

export function CaseLineChart({ c }: { c: CaseLineChartData }) {
  const { ref, on } = useInView();
  const w = 520;
  const h = 220;
  const pad = { l: 16, r: 52, t: 26, b: 28 };
  const x = (i: number) => pad.l + (i * (w - pad.l - pad.r)) / (c.points.length - 1);
  const y = (v: number) => pad.t + (1 - v / c.max) * (h - pad.t - pad.b);
  const d = c.points.map((v, i) => `${i ? "L" : "M"}${x(i).toFixed(1)},${y(v).toFixed(1)}`).join(" ");
  const last = c.points.length - 1;
  return (
    <figure className={`ukc${on ? " on" : ""}`} ref={ref as React.RefObject<HTMLElement>}>
      <figcaption>
        <b>{c.title}</b>
        <span>{c.note}</span>
      </figcaption>
      <svg viewBox={`0 0 ${w} ${h}`} role="img" aria-label={`Line chart: ${c.title}, ${c.note}`}>
        {c.ticks.map((t) => (
          <g key={t.label}>
            <line x1={pad.l} x2={w - pad.r} y1={y(t.v)} y2={y(t.v)} stroke={GRID} strokeWidth="1" />
            <text x={w - pad.r + 8} y={y(t.v) + 4} fontSize="11" fill={INK2}>
              {t.label}
            </text>
          </g>
        ))}
        <path className="ukline" d={d} fill="none" stroke={NAVY} strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" pathLength={1} />
        <circle className="ukdot d1" cx={x(0)} cy={y(c.points[0])} r="4" fill={NAVY} />
        <circle className="ukdot d2" cx={x(last)} cy={y(c.points[last])} r="5" fill={GOLD} stroke={NAVY} strokeWidth="1.5" />
        <text className="ukval v1" x={x(0)} y={y(c.points[0]) - 10} fontSize="11.5" fill={INK2}>
          {c.startValue}
        </text>
        <text className="ukval v2" x={x(last)} y={y(c.points[last]) - 10} fontSize="12" fontWeight="600" fill={NAVY} textAnchor="end">
          {c.endValue}
        </text>
        <text x={pad.l} y={h - 8} fontSize="11" fill={INK2}>
          {c.startLabel}
        </text>
        <text x={w - pad.r} y={h - 8} fontSize="11" fill={INK2} textAnchor="end">
          {c.endLabel}
        </text>
      </svg>
    </figure>
  );
}

export function CaseBarChart({ c }: { c: CaseBarChartData }) {
  const { ref, on } = useInView();
  const w = 520;
  const h = 220;
  const pad = { l: 16, r: 16, t: 26, b: 28 };
  const bw = Math.min(54, ((w - pad.l - pad.r) / c.bars.length) * 0.55);
  const slot = (w - pad.l - pad.r) / c.bars.length;
  const y = (v: number) => pad.t + (1 - v / c.max) * (h - pad.t - pad.b);
  return (
    <figure className={`ukc${on ? " on" : ""}`} ref={ref as React.RefObject<HTMLElement>}>
      <figcaption>
        <b>{c.title}</b>
        <span>{c.note}</span>
      </figcaption>
      <svg viewBox={`0 0 ${w} ${h}`} role="img" aria-label={`Bar chart: ${c.title}, ${c.note}`}>
        <line x1={pad.l} x2={w - pad.r} y1={y(0)} y2={y(0)} stroke={GRID} strokeWidth="1" />
        {c.bars.map((bar, i) => {
          const cx = pad.l + slot * i + slot / 2;
          const top = y(bar.value);
          const base = y(0);
          return (
            <g key={bar.label}>
              <g className="ukbar" style={{ transformOrigin: `${cx}px ${base}px`, transitionDelay: `${0.15 + i * 0.18}s` }}>
                <path
                  d={`M${cx - bw / 2},${base} L${cx - bw / 2},${top + 4} Q${cx - bw / 2},${top} ${cx - bw / 2 + 4},${top} L${cx + bw / 2 - 4},${top} Q${cx + bw / 2},${top} ${cx + bw / 2},${top + 4} L${cx + bw / 2},${base} Z`}
                  fill={bar.gold ? GOLD : NAVY}
                />
              </g>
              <text className="ukval" style={{ transitionDelay: `${0.5 + i * 0.18}s` }} x={cx} y={top - 8} fontSize="12" fontWeight="600" fill={NAVY} textAnchor="middle">
                {bar.value}
                {c.suffix ?? ""}
              </text>
              <text x={cx} y={h - 8} fontSize="11" fill={INK2} textAnchor="middle">
                {bar.label}
              </text>
            </g>
          );
        })}
      </svg>
    </figure>
  );
}
