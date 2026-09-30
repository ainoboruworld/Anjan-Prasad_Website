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
          <span className="lab">About me</span>
          <h2>
            I&rsquo;ve sat where <em>you&rsquo;re sitting.</em>
          </h2>
          <p className="b">
            I&rsquo;ve had the salary and the security, and I&rsquo;ve left them to start from zero. I&rsquo;ve worried
            about payroll, chased customers and fixed things at midnight. I&rsquo;m an operator, not a theorist, so I
            advise businesses the way I run my own: on systems, margins and honest execution.
          </p>
          <Link href="/about" className="ul" style={{ fontSize: 14, color: "var(--slate)" }}>
            Learn More
          </Link>
        </div>
      </div>
    </section>
  );
}
