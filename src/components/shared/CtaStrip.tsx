import type { ReactNode } from "react";
import { Cta } from "../ui/Cta";

/** Slim call-to-action band between sections. */
export function CtaStrip({
  text,
  label = "Book a consultation",
  href = "/consultation#capply",
  dark = false,
}: {
  text: ReactNode;
  label?: string;
  href?: string;
  dark?: boolean;
}) {
  return (
    <section className={`ctas${dark ? " dark" : ""}`}>
      <div className="wrap">
        <p>{text}</p>
        <Cta href={href}>{label}</Cta>
      </div>
    </section>
  );
}
