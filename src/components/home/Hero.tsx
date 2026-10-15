import Image from "next/image";
import { Cta } from "../ui/Cta";
import { splitEm, type PageSection } from "@/lib/sanity";

/** Home hero: the opening statement and Anjan's portrait on the soft-blue arch. */
export function Hero({ sec = {} as PageSection }: { sec?: PageSection }) {
  const title = sec.heading ? splitEm(sec.heading) : { plain: "Build a Business That ", em: "Outlasts You." };
  return (
    <header className="hero">
      <div className="stage">
        <div className="ring" aria-hidden="true" />
        <div className="arch" aria-hidden="true" />
        <Image
          className="fig"
          src={sec.imageUrl ?? "/images/hero-anjan-cut.webp"}
          alt={sec.imageAlt ?? "Anjan Prasad, smiling at his desk"}
          width={810}
          height={1160}
          priority
          sizes="(max-width: 900px) 90vw, 600px"
        />
        <div className="desk" aria-hidden="true" />
      </div>

      <div className="wrap">
        <h1>
          {title.plain}
          {title.em && <em>{title.em}</em>}
        </h1>
        <p>
          {sec.body ??
            "I work with founders on the decisions that shape their businesses, from finding product-market fit to pricing, profitability and scaling. The goal is simple: build a business that grows with purpose and stands on its own."}
        </p>
        <div className="more">
          <Cta href="/business-advisory#capply">Book a consultation</Cta>
        </div>
      </div>
    </header>
  );
}
