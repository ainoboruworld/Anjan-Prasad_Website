import Image from "next/image";
import Link from "next/link";

/** "I've sat where you're sitting." */
export function AboutIntro() {
  return (
    <section className="sec about2">
      <div className="wrap">
        <div className="ph rv on">
          <Image src="/images/portrait-anjan.jpg" alt="Portrait of Anjan Prasad" width={900} height={1125} sizes="(max-width: 900px) 100vw, 480px" />
        </div>
        <div className="rv on">
          <span className="lab">Serial entrepreneur. Three times from zero, and counting.</span>
          <h2>
            I don&rsquo;t study businesses. <em>I run them.</em>
          </h2>
          <p className="b">
            I run three businesses today, after fifteen plus years inside global agencies managing over &#8377;1,200 Cr
            in budgets for some of India&rsquo;s biggest brands. I&rsquo;ve had the salary and left it to start from
            zero, worried about payroll and fixed things at midnight. That&rsquo;s what makes my advice different: I
            advise businesses the way I run my own, on systems, margins and honest execution.
          </p>
          <Link href="/about" className="ul" style={{ fontSize: 14, color: "var(--slate)" }}>
            Learn More
          </Link>
        </div>
      </div>
    </section>
  );
}
