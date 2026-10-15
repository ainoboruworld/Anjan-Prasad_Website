"use client";

import { useEffect, useState } from "react";

/**
 * Rotating business quotes for the "How I work" band. Quotes come from
 * Sanity ("Business Quote" documents) when published; these five are the
 * fallback until then.
 */
const FALLBACK: { lead: string; em: string }[] = [
  { lead: "I don’t advise from a textbook.", em: "I advise from the other side of the table." },
  { lead: "Revenue is opinion.", em: "Cash in the bank is fact." },
  { lead: "A business that needs you every day", em: "is a job you can’t quit." },
  { lead: "Discounts buy customers.", em: "Margins keep companies." },
  { lead: "Plans don’t survive contact with customers.", em: "Systems do." },
];

const ROTATE_MS = 1000;

export function QuoteSlideshow({ quotes }: { quotes?: { lead: string; em: string }[] | null }) {
  const list = quotes?.length ? quotes : FALLBACK;
  const [i, setI] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const t = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setI((n) => (n + 1) % list.length);
        setFade(true);
      }, 250);
    }, ROTATE_MS);
    return () => clearInterval(t);
  }, [list.length]);

  const q = list[i % list.length];
  return (
    <blockquote className={`qsl${fade ? " on" : ""}`}>
      &ldquo;{q.lead} <em>{q.em}</em>&rdquo;
    </blockquote>
  );
}
