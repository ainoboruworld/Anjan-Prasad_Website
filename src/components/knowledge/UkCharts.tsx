"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Animated growth charts for the Urban Kisaan case study. Each chart animates
 * once when it scrolls into view: the line draws itself, the bars grow from
 * the baseline. Values are the published campaign results.
 */

/** Instagram followers over the 12 months of the engagement (700 → 47K). */
const FOLLOWERS = [0.7, 1.1, 1.8, 3.0, 4.6, 7.2, 10.5, 15.0, 21.0, 28.5, 37.0, 47.0];

/** Organic traffic, indexed to the starting quarter (1× → 42×). */
const TRAFFIC: [string, number][] = [
  ["Q1", 1],
  ["Q2", 6],
  ["Q3", 18],
  ["Q4", 42],
];

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

export function FollowersChart() {
  const { ref, on } = useInView();
  const w = 520;
  const h = 220;
  const pad = { l: 16, r: 52, t: 26, b: 28 };
  const max = 50;
  const x = (i: number) => pad.l + (i * (w - pad.l - pad.r)) / (FOLLOWERS.length - 1);
  const y = (v: number) => pad.t + (1 - v / max) * (h - pad.t - pad.b);
  const d = FOLLOWERS.map((v, i) => `${i ? "L" : "M"}${x(i).toFixed(1)},${y(v).toFixed(1)}`).join(" ");
  const last = FOLLOWERS.length - 1;
  return (
    <figure className={`ukc${on ? " on" : ""}`} ref={ref as React.RefObject<HTMLElement>}>
      <figcaption>
        <b>Social following</b>
        <span>Instagram, 700 to 47K followers in 12 months</span>
      </figcaption>
      <svg viewBox={`0 0 ${w} ${h}`} role="img" aria-label="Line chart: Instagram followers growing from 700 to 47,000 across twelve months">
        {[0, 15, 30, 45].map((g) => (
          <g key={g}>
            <line x1={pad.l} x2={w - pad.r} y1={y(g)} y2={y(g)} stroke={GRID} strokeWidth="1" />
            <text x={w - pad.r + 8} y={y(g) + 4} fontSize="11" fill={INK2}>
              {g === 0 ? "0" : `${g}K`}
            </text>
          </g>
        ))}
        <path className="ukline" d={d} fill="none" stroke={NAVY} strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" pathLength={1} />
        <circle className="ukdot d1" cx={x(0)} cy={y(FOLLOWERS[0])} r="4" fill={NAVY} />
        <circle className="ukdot d2" cx={x(last)} cy={y(FOLLOWERS[last])} r="5" fill={GOLD} stroke={NAVY} strokeWidth="1.5" />
        <text className="ukval v1" x={x(0)} y={y(FOLLOWERS[0]) - 10} fontSize="11.5" fill={INK2}>
          700
        </text>
        <text className="ukval v2" x={x(last)} y={y(FOLLOWERS[last]) - 10} fontSize="12" fontWeight="600" fill={NAVY} textAnchor="end">
          47K
        </text>
        <text x={pad.l} y={h - 8} fontSize="11" fill={INK2}>
          Month 1
        </text>
        <text x={w - pad.r} y={h - 8} fontSize="11" fill={INK2} textAnchor="end">
          Month 12
        </text>
      </svg>
    </figure>
  );
}

export function TrafficChart() {
  const { ref, on } = useInView();
  const w = 520;
  const h = 220;
  const pad = { l: 16, r: 16, t: 26, b: 28 };
  const max = 45;
  const bw = 54;
  const slot = (w - pad.l - pad.r) / TRAFFIC.length;
  const y = (v: number) => pad.t + (1 - v / max) * (h - pad.t - pad.b);
  return (
    <figure className={`ukc${on ? " on" : ""}`} ref={ref as React.RefObject<HTMLElement>}>
      <figcaption>
        <b>Organic traffic</b>
        <span>Indexed to the starting quarter, 1&times; to 42&times;</span>
      </figcaption>
      <svg viewBox={`0 0 ${w} ${h}`} role="img" aria-label="Bar chart: organic traffic indexed from 1 times to 42 times across four quarters">
        <line x1={pad.l} x2={w - pad.r} y1={y(0)} y2={y(0)} stroke={GRID} strokeWidth="1" />
        {TRAFFIC.map(([q, v], i) => {
          const cx = pad.l + slot * i + slot / 2;
          const top = y(v);
          const base = y(0);
          return (
            <g key={q}>
              <g className="ukbar" style={{ transformOrigin: `${cx}px ${base}px`, transitionDelay: `${0.15 + i * 0.18}s` }}>
                <path
                  d={`M${cx - bw / 2},${base} L${cx - bw / 2},${top + 4} Q${cx - bw / 2},${top} ${cx - bw / 2 + 4},${top} L${cx + bw / 2 - 4},${top} Q${cx + bw / 2},${top} ${cx + bw / 2},${top + 4} L${cx + bw / 2},${base} Z`}
                  fill={i === TRAFFIC.length - 1 ? GOLD : NAVY}
                />
              </g>
              <text className="ukval" style={{ transitionDelay: `${0.5 + i * 0.18}s` }} x={cx} y={top - 8} fontSize="12" fontWeight="600" fill={NAVY} textAnchor="middle">
                {v}&times;
              </text>
              <text x={cx} y={h - 8} fontSize="11" fill={INK2} textAnchor="middle">
                {q}
              </text>
            </g>
          );
        })}
      </svg>
    </figure>
  );
}
