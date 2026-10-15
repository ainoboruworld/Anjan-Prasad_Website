import type { ReactNode } from "react";

/**
 * CMS-aware prose column for the "wy2" sections (How I help, Why hosts
 * invite him, Not another program). When the section's Text is filled in
 * the Studio, its paragraphs (separated by blank lines) replace the
 * built-in copy: the first renders large, the last small when there are
 * three or more, the rest regular.
 */
export function SecProse({ body, children }: { body?: string; children: ReactNode }) {
  if (!body?.trim()) return <div className="tx">{children}</div>;
  const paras = body
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean);
  return (
    <div className="tx">
      {paras.map((p, i) => (
        <p key={i} className={i === 0 ? "big" : i === paras.length - 1 && paras.length >= 3 ? "sm" : undefined}>
          {p}
        </p>
      ))}
    </div>
  );
}
