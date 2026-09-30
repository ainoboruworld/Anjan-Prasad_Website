import Link from "next/link";
import type { ReactNode } from "react";

/** Closing call-to-action band. */
export function CloseCta({
  label,
  title,
  text,
  primary,
  secondary,
}: {
  label: string;
  title: ReactNode;
  text?: string;
  primary: { href: string; label: string };
  secondary?: { href: string; label: string };
}) {
  return (
    <section className="close">
      <div className="wrap rv on">
        <div>
          <span className="lab">{label}</span>
          <h2 style={{ marginTop: 16 }}>{title}</h2>
          {text && <p style={{ color: "var(--harb)", marginTop: 18, maxWidth: 460 }}>{text}</p>}
        </div>
        <div className="two">
          <Link href={primary.href} className="cta2">
            {primary.label} <span>→</span>
          </Link>
          {secondary && (
            <Link href={secondary.href} className="btn2">
              {secondary.label} →
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
