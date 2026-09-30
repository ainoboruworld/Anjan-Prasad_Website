import type { Metadata } from "next";
import Image from "next/image";
import { Journey } from "@/components/shared/Journey";
import { LifeStrip } from "@/components/shared/LifeStrip";
import { VideoPair } from "@/components/shared/VideoPair";
import { CloseCta } from "@/components/shared/CloseCta";

export const metadata: Metadata = {
  title: "About",
  description:
    "Hi, I'm Anjan. From Accenture and global agencies to founding Noboru World, Lushful and Filing Buddy: the long version of how I got here.",
  alternates: { canonical: "/about" },
};

const CRED = [
  { v: "16", plus: true, l: "Years building and advising" },
  { v: "₹120 Cr", plus: true, l: "Revenue generated" },
  { v: "100", plus: true, l: "Brands worked with" },
  { v: "250", plus: true, l: "Businesses guided" },
];

const PROOF = [
  { lab: "Built", h: "Noboru World · Lushful · Filing Buddy", p: "Businesses I founded, co-founded and lead today." },
  {
    lab: "Advised",
    h: "Fortune 500 companies and 100+ brands",
    p: "Including American Express, Sony, Google, PwC, Dabur, Tata Housing and Aditya Birla Capital.",
  },
  {
    lab: "Taught",
    h: "IIFT · IMT Ghaziabad · BML Munjal",
    p: "Visiting faculty, sharing real operating lessons with the next generation of leaders.",
  },
];

const BELIEFS = [
  { n: "01", h: "Profit before scale.", p: "Growth multiplies what you have. Make sure what you have works first." },
  { n: "02", h: "Say no more often.", p: "The fastest way to grow is usually to stop doing something." },
  { n: "03", h: "Systems over heroics.", p: "A business that needs you at 11pm isn't a business yet." },
  { n: "04", h: "Experience over theory.", p: "I only advise on what I've run, broken and fixed myself." },
];

const EXPECT = [
  { h: "I'll tell you the truth.", p: "Even when it's not what you hoped to hear. I'd rather lose a compliment than let you lose a year." },
  { h: "You work with me.", p: "No junior team, no slide templates. When you talk to me, you're talking to me." },
  { h: "I take on a few founders.", p: "So each one gets real attention, not a slot in a calendar." },
  { h: "I reply myself.", p: "Every application, within five working days." },
];

export default function AboutPage() {
  return (
    <main className="pg on" data-p="about" id="main">
      <header className="abz">
        <div className="wrap">
          <div className="abz-ph">
            <Image src="/images/portrait-anjan.jpg" alt="Anjan Prasad" width={900} height={1125} priority sizes="(max-width: 900px) 100vw, 420px" />
            <span className="abz-tag">Founder · Noboru World</span>
          </div>
          <div className="abz-tx">
            <span className="lab">About me</span>
            <h1>
              Hi, I&rsquo;m Anjan. <em>Let me tell you how I got here.</em>
            </h1>
            <p>
              I&rsquo;ll be honest: I never planned to become an entrepreneur. I was the guy with the steady corporate
              job, the good title and the monthly salary that showed up on time.
            </p>
            <p>
              Then one day I walked away from all of it to build something of my own. Some days I still wonder how I
              had the nerve. But everything I know about business, I learned after that day.
            </p>
          </div>
        </div>
        <div className="wrap">
          <div className="abz-cred">
            {CRED.map((c) => (
              <div key={c.l}>
                <b>
                  {c.v}
                  {c.plus && <i>+</i>}
                </b>
                <small>{c.l}</small>
              </div>
            ))}
          </div>
        </div>
      </header>

      <section className="mani">
        <div className="wrap">
          <span className="lab">How I work</span>
          <blockquote>
            &ldquo;I don&rsquo;t advise from a textbook. <em>I advise from the other side of the table.</em>&rdquo;
          </blockquote>
          <div className="sg">Anjan</div>
        </div>
      </section>

      <section className="story">
        <div className="wrap">
          <div className="stl">
            <span className="lab">My story</span>
            <h2>
              The long version, <em>over a cup of coffee.</em>
            </h2>
            <span className="ph-flag">Story draft: confirm details with Anjan</span>
          </div>
          <div className="sr">
            <p className="drop">
              My first real job was at Accenture. After that I spent years in advertising, at Mindshare and IPG
              Mediabrands, working on brands you&rsquo;d find in almost every Indian home. I loved it. I also slowly
              realised I was helping other people build their businesses, and never building my own.
            </p>
            <p>
              At Zeta Global and Fareportal I got closer to the numbers. That&rsquo;s where I understood something
              nobody teaches you in a classroom: a business isn&rsquo;t the idea or the logo. It&rsquo;s whether people
              pay you, again and again, at a price that leaves something over.
            </p>
            <p>
              So I left. I started Noboru World with more confidence than clarity. I made almost every mistake you can
              make. I hired too fast, priced too low, said yes to the wrong clients and worried about payroll more
              nights than I&rsquo;d like to admit. Slowly, we figured it out. Across the businesses I&rsquo;ve built and
              grown since, we&rsquo;ve generated more than ₹120 crore in revenue, and I remember what every rupee of it
              cost. Then came Lushful, working directly with farmers, and Filing Buddy, where I&rsquo;m CEO today.
            </p>
            <p className="pull">
              &ldquo;I&rsquo;m not writing this as someone who got it right the first time. I&rsquo;m writing it as
              someone who got it wrong, and kept going.&rdquo;
            </p>
            <p>
              These days I also teach at IIFT and IMT Ghaziabad, and I spend a good part of my week with founders. Some
              are running a business that has stopped growing. Some haven&rsquo;t started yet and just want someone to
              think it through with them.
            </p>
            <p>
              I work with them as a mentor, an advisor and sometimes just a sounding board. I don&rsquo;t have a
              framework to sell you. I have sixteen years of doing this for real, and I&rsquo;m happy to share all of
              it.
            </p>
            <p className="sgn">Anjan</p>
          </div>
        </div>
      </section>

      <section className="proof">
        <div className="wrap">
          <div className="pg3">
            {PROOF.map((p) => (
              <div key={p.lab}>
                <span className="lab">{p.lab}</span>
                <h3>{p.h}</h3>
                <p>{p.p}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Journey />

      <section className="hear" id="hear">
        <div className="wrap">
          <div className="sh">
            <div>
              <span className="lab">Hear it from me</span>
              <h2>
                Don&rsquo;t take my word for it. <em>Watch it.</em>
              </h2>
            </div>
          </div>
          <VideoPair variant="about" />
        </div>
      </section>

      <section className="bel">
        <div className="wrap">
          <div className="sh">
            <div>
              <span className="lab">What I believe</span>
              <h2>
                Things I believe, <em>because I paid for them.</em>
              </h2>
            </div>
            <span className="ph-flag">Draft beliefs: confirm with Anjan</span>
          </div>
          <div className="bl">
            {BELIEFS.map((b) => (
              <div key={b.n}>
                <b>{b.n}</b>
                <h3>{b.h}</h3>
                <p>{b.p}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="exp">
        <div className="wrap">
          <div className="sh">
            <div>
              <span className="lab">Working with me</span>
              <h2>
                What you can <em>expect.</em>
              </h2>
            </div>
          </div>
          <div className="ex4">
            {EXPECT.map((x) => (
              <div key={x.h}>
                <h3>{x.h}</h3>
                <p>{x.p}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <LifeStrip variant="about" />

      <CloseCta
        label="Work with me"
        title={
          <>
            If you&rsquo;re facing a decision, <em>I&rsquo;d like to hear about it.</em>
          </>
        }
        primary={{ href: "/consultation#capply", label: "Book a consultation" }}
      />
    </main>
  );
}
