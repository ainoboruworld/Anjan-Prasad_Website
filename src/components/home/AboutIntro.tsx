import Image from "next/image";
import Link from "next/link";
import { splitEm, type SiteCopy } from "@/lib/sanity";

/** "I've sat where you're sitting." */
export function AboutIntro({ copy = {} }: { copy?: SiteCopy }) {
  const heading = copy.aboutHeading ? splitEm(copy.aboutHeading) : { plain: "I don’t study businesses. ", em: "I run them." };
  return (
    <section className="sec about2">
      <div className="wrap">
        <div className="ph rv on">
          <Image src="/images/portrait-anjan.jpg" alt="Portrait of Anjan Prasad" width={900} height={1125} sizes="(max-width: 900px) 100vw, 480px" />
        </div>
        <div className="rv on">
          <span className="lab">{copy.aboutLabel ?? "Serial entrepreneur. Three times from zero, and counting."}</span>
          <h2>
            {heading.plain}
            {heading.em && <em>{heading.em}</em>}
          </h2>
          <p className="b">
            {copy.aboutBody ??
              "I run three businesses today, after seventeen plus years inside global agencies managing over ₹1,200 Cr in budgets for some of India’s biggest brands. I’ve had the salary and left it to start from zero, worried about payroll and fixed things at midnight. That’s what makes my advice different: I advise businesses the way I run my own, on systems, margins and honest execution."}
          </p>
          <Link href="/about" className="ul" style={{ fontSize: 14, color: "var(--slate)" }}>
            Learn More
          </Link>
        </div>
      </div>
    </section>
  );
}
