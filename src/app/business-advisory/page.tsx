import type { Metadata } from "next";
import { SecHead } from "@/components/shared/SecHead";
import { getSections, secHeading, pageMetadata, getAreas } from "@/lib/sanity";
import Link from "next/link";
import { Cta } from "@/components/ui/Cta";
import { Diagnosis } from "@/components/consultation/Diagnosis";


const WHO = [
  {
    n: "01",
    h: "Growth has stalled",
    p: "You're working harder than ever and the numbers aren't moving. I've hit that ceiling in my own companies, more than once.",
  },
  {
    n: "02",
    h: "A big bet is coming",
    p: "A new product, city or channel, and real money going in. One prepared conversation before you commit is the cheapest insurance there is.",
  },
  {
    n: "03",
    h: "Profit isn't keeping up",
    p: "Revenue grows, but the margin or the cash doesn't. I've lived that month, worrying about salaries while the P&L looked fine.",
  },
];

const PROOF = [
  {
    n: "17+ years",
    h: "Across agencies and brands",
    p: "I kept seeing the same gaps repeat: fragmented teams, disconnected channels and growth trapped in silos. It's why I advise on the whole business, not one department.",
  },
  {
    n: "3 businesses",
    h: "Running today",
    p: "A tech company, a food brand and a compliance business, each built from zero. My advice is tested on my own money first.",
  },
  {
    n: "₹1,200 Cr+",
    h: "In media and performance marketing",
    p: "Managed for some of India's biggest brands. I know what good execution costs, and what you should never pay for.",
  },
];

const STEPS = [
  { n: "01", h: "You request a session", p: "A short form about your business and the decision in front of you. Ten minutes, no deck needed." },
  { n: "02", h: "I read it myself", p: "Every request, no team in between. I reply within five working days." },
  {
    n: "03",
    h: "We talk",
    p: "A focused one-to-one session on the real problem. If I'm not the right person for it, I'll tell you that on the call.",
  },
  { n: "04", h: "You leave with a next step", p: "A written, specific one. One session is often enough; if you want me at the table longer, we agree how." },
];

export async function generateMetadata(): Promise<Metadata> {
  const m = await pageMetadata('Business Advisory', {
    title: 'Business Advisory',
    description: 'Clear decisions for founders who are building for the long run. Business advisory and one-to-one consulting with Anjan Prasad, from a single session to an ongoing seat at your table.',
  });
  return { ...m, alternates: { canonical: '/business-advisory' } };
}

export default async function BusinessAdvisoryPage({
  searchParams,
}: {
  searchParams: Promise<{ w?: string }>;
}) {
  const { w } = await searchParams;
  const [sec, areas] = await Promise.all([getSections(), getAreas()]);
  const hero = sec["advisory-hero"];
  const h1 = secHeading(hero, { plain: "Clear decisions for founders ", em: "who are building for the long run." });

  return (
    <main className="pg on" data-p="advisory" id="main">
      <header className="ph1">
        <div className="wrap">
          <span className="lab">{hero?.label ?? "Programs · Business Advisory"}</span>
          <h1>
            {h1.plain}
            {h1.em && <em>{h1.em}</em>}
          </h1>
          <p>
            {hero?.body ??
              "I run three businesses today and spent seventeen plus years inside global agencies before that. Founders bring me the decision in front of them: one focused consultation when that's all it takes, ongoing advisory when you want me at the table as you build. Either way it starts with you telling me where the business is."}
          </p>
          <Cta href="#capply">Book a consultation</Cta>
        </div>
      </header>

      <section className="sec">
        <div className="wrap">
          <div className="sh">
            <div>
              <SecHead sec={sec["advisory-who"]} label="Who it's for" plain="Founders at " em="a turning point." />
            </div>
          </div>
          <div className="c3 plain">
            {(sec["advisory-who"]?.items?.length ? sec["advisory-who"].items!.filter((x) => x.title && x.text).map((x, i) => ({ n: String(i + 1).padStart(2, "0"), h: x.title!, p: x.text! })) : WHO).map((w2) => (
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

      <section className="sec">
        <div className="wrap">
          <div className="sh">
            <div>
              <SecHead sec={sec["advisory-proof"]} label="Why founders listen" plain="Advice that's been " em="paid for already." />
            </div>
          </div>
          <div className="c3 plain">
            {(sec["advisory-proof"]?.items?.length ? sec["advisory-proof"].items!.filter((x) => x.title && x.text).map((x, i) => ({ n: x.value ?? String(i + 1).padStart(2, "0"), h: x.title!, p: x.text! })) : PROOF).map((pr) => (
              <div key={pr.n}>
                <span className="lab">{pr.n}</span>
                <h3>{pr.h}</h3>
                <p>{pr.p}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Diagnosis initialKey={w} areas={areas} />

      <section className="sec ways">
        <div className="wrap wy2">
          <div>
            <SecHead sec={sec["advisory-help"]} label="How I help" plain="Whatever you " em="call it." />
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
              <SecHead sec={sec["advisory-steps"]} label="How it works" plain="Simple, and " em="personal." />
            </div>
          </div>
          <ol className="st4">
            {(sec["advisory-steps"]?.items?.length ? sec["advisory-steps"].items!.filter((x) => x.title && x.text).map((x, i) => ({ n: String(i + 1).padStart(2, "0"), h: x.title!, p: x.text! })) : STEPS).map((s) => (
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
