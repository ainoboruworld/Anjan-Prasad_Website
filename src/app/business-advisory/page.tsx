import type { Metadata } from "next";
import Link from "next/link";
import { Cta } from "@/components/ui/Cta";
import { Diagnosis } from "@/components/consultation/Diagnosis";

export const metadata: Metadata = {
  title: "Business Advisory",
  description:
    "Clear decisions for founders who are building for the long run. Business advisory and one-to-one consulting with Anjan Prasad, from a single session to an ongoing seat at your table.",
  alternates: { canonical: "/business-advisory" },
};

const WHO = [
  { n: "01", h: "Growth has stalled", p: "You're working harder than ever and the numbers aren't moving." },
  { n: "02", h: "A big launch is coming", p: "A new product, city or channel, and you want to get it right the first time." },
  { n: "03", h: "Profit isn't keeping up", p: "Revenue is growing but the margin, or the cash, isn't." },
];

const STEPS = [
  { n: "01", h: "You request a session", p: "A short form about your business and the decision in front of you." },
  { n: "02", h: "I read it myself", p: "Every request. I reply within five working days." },
  { n: "03", h: "We talk", p: "A focused one-to-one session to understand the business and the real problem." },
  { n: "04", h: "We decide what's next", p: "One session is often enough. If you want me at the table longer, we agree how." },
];

export default async function BusinessAdvisoryPage({
  searchParams,
}: {
  searchParams: Promise<{ w?: string }>;
}) {
  const { w } = await searchParams;

  return (
    <main className="pg on" data-p="advisory" id="main">
      <header className="ph1">
        <div className="wrap">
          <span className="lab">Programs · Business Advisory</span>
          <h1>
            Clear decisions for founders <em>who are building for the long run.</em>
          </h1>
          <p>
            One place for both: a focused one-to-one consultation when a single decision is in front of you, and ongoing
            advisory when you want me at the table as you build. It starts the same way, with you telling me where the
            business is.
          </p>
          <Cta href="#capply">Book a consultation</Cta>
        </div>
      </header>

      <section className="sec">
        <div className="wrap">
          <div className="sh">
            <div>
              <span className="lab">Who it&rsquo;s for</span>
              <h2>
                Founders at <em>a turning point.</em>
              </h2>
            </div>
          </div>
          <div className="c3 plain">
            {WHO.map((w2) => (
              <div key={w2.n}>
                <span className="lab">{w2.n}</span>
                <h3>{w2.h}</h3>
                <p>{w2.p}</p>
              </div>
            ))}
          </div>
          <div className="secta">
            <p>Sound familiar? Start with one session.</p>
            <Cta href="#capply">Book a consultation</Cta>
          </div>
        </div>
      </section>

      <Diagnosis initialKey={w} />

      <section className="sec ways">
        <div className="wrap wy2">
          <div>
            <span className="lab">How I help</span>
            <h2>
              Whatever you <em>call it.</em>
            </h2>
          </div>
          <div className="tx">
            <p className="big">
              <b>Business consultant</b>, <b>business advisor</b>, <b>business mentor</b>: founders have called me all
              three. The title never changes what happens in the room. You bring the decision that&rsquo;s costing you
              sleep, and we settle it.
            </p>
            <p>
              One month that looks like a growth consultant fixing a leaking funnel. Another, it&rsquo;s a fractional
              CMO building your marketing engine, or a GTM strategist taking a product to its first hundred customers.
              The label follows the problem, never the other way around.
            </p>
            <p className="sm">
              And for a few early startups I believe in, it goes deeper: a long-term seat at the table.{" "}
              <Link href="/mentorship">That is the mentorship program</Link>.
            </p>
          </div>
        </div>
      </section>

      <section className="sec steps">
        <div className="wrap">
          <div className="sh">
            <div>
              <span className="lab">How it works</span>
              <h2>
                Simple, and <em>personal.</em>
              </h2>
            </div>
          </div>
          <ol className="st4">
            {STEPS.map((s) => (
              <li key={s.n}>
                <b>{s.n}</b>
                <h3>{s.h}</h3>
                <p>{s.p}</p>
              </li>
            ))}
          </ol>
          <div className="secta">
            <p>Building something early and want a longer runway together?</p>
            <Cta href="/mentorship">Explore mentorship</Cta>
          </div>
        </div>
      </section>
    </main>
  );
}
