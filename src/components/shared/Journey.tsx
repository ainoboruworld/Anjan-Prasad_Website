import Link from "next/link";
import { JOURNEY } from "@/lib/data/site";
import type { SectionItem } from "@/lib/sections";

interface JourneyCta {
  href: string;
  text: string;
  label: string;
}

/** "From a corporate desk to building my own." — used on Home and About. */
export function Journey({ cta, items }: { cta?: JourneyCta; items?: SectionItem[] | null }) {
  const steps = items?.length
    ? items
        .filter((x) => x.title && x.text)
        .map((x, i, all) => ({ when: x.value ?? "", title: x.title!, text: x.text!, now: i === all.length - 1 }))
    : JOURNEY;
  return (
    <section className="jr">
      <div className="wrap">
        <div className="sh rv on">
          <div>
            <span className="lab">My journey</span>
            <h2>
              From a corporate desk <em>to building my own.</em>
            </h2>
          </div>
          <p>If you&rsquo;re somewhere on this road right now, I&rsquo;ve probably been there too.</p>
        </div>
        <ol className="jpath rv on">
          {steps.map((j) => (
            <li key={j.title} className={"now" in j && j.now ? "now" : undefined}>
              <span className="dt">{j.when}</span>
              <b>{j.title}</b>
              <p>{j.text}</p>
            </li>
          ))}
        </ol>
        {cta && (
          <div className="secta secta-line rv on">
            <p>{cta.text}</p>
            <Link href={cta.href} className="ul">
              {cta.label} →
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
