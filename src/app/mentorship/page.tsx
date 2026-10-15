import type { Metadata } from "next";
import { SecHead } from "@/components/shared/SecHead";
import { getSections, secHeading, pageMetadata } from "@/lib/sanity";
import { Cta } from "@/components/ui/Cta";
import { Signature } from "@/components/ui/Signature";
import { ConsultationForm } from "@/components/forms/ConsultationForm";


const DIFF = [
  {
    n: "01",
    h: "Advisory solves a decision",
    p: "You bring a specific problem, we work it through, and you leave with a clear next step. It can be one session or a few.",
  },
  {
    n: "02",
    h: "Mentorship builds a founder",
    p: "No single problem to solve. We work on you and the business together, over months and years, through whatever comes.",
  },
  {
    n: "03",
    h: "Sometimes, with equity",
    p: "For a few startups I believe in deeply, I take part of my commitment in equity. Skin in the game, both ways.",
  },
];

const YEAR = [
  {
    n: "01",
    h: "A monthly deep dive",
    p: "One long working session a month: the numbers, the team, the one thing that matters most right now.",
  },
  {
    n: "02",
    h: "A message away",
    p: "Between sessions you don't wait for a slot. A vendor quote, a hire, a pricing call: send it, I answer.",
  },
  {
    n: "03",
    h: "Quarterly honesty",
    p: "Every quarter we stop and compare the business to where we said it would be. No stories, just the numbers.",
  },
  {
    n: "04",
    h: "Doors, not just advice",
    p: "My network becomes yours: agencies, vendors, lawyers, operators and the people I'd call for my own companies.",
  },
];

export async function generateMetadata(): Promise<Metadata> {
  const m = await pageMetadata('Mentorship', {
    title: 'Mentorship',
    description: 'Long-term mentorship for a small number of early-stage founders. Anjan Prasad takes a seat at your table for the journey, sometimes with equity, always with skin in the game.',
  });
  return { ...m, alternates: { canonical: '/mentorship' } };
}

export const revalidate = 300;

export default async function MentorshipPage() {
  const sec = await getSections();
  const hero = sec["mentorship-hero"];
  const h1 = secHeading(hero, { plain: "A seat at your table, ", em: "for the whole journey." });
  return (
    <main className="pg on" data-p="advisory" id="main">
      <header className="ph1">
        <div className="wrap">
          <span className="lab">{hero?.label ?? "Programs · Mentorship"}</span>
          <h1>
            {h1.plain}
            {h1.em && <em>{h1.em}</em>}
          </h1>
          <p>
            {hero?.body ??
              "I mentor a small number of early-stage founders the way I wish someone had mentored me: long-term, hands-on and honest, sometimes with equity, always with skin in the game."}
          </p>
          <Cta href="#apply">Apply for mentorship</Cta>
        </div>
      </header>

      <section className="sec ways">
        <div className="wrap wy2">
          <div>
            <SecHead sec={sec["mentorship-long-game"]} label="Not another program" plain="This is the " em="long game." />
          </div>
          <div className="tx">
            <p className="big">
              Advisory answers a question. Mentorship walks the road. I take very few mentees at a time, because this
              only works when I know your business almost as well as <b>you</b> do.
            </p>
            <p>
              It&rsquo;s for founders near the start: an idea taking shape, or a young startup finding its first
              customers. You don&rsquo;t need a polished deck. You need to be all in, and honest about where you are.
            </p>
            <p className="sm">Running an established business with one decision in front of you? Advisory is the faster door.</p>
          </div>
        </div>
      </section>

      <section className="sec">
        <div className="wrap">
          <div className="sh">
            <div>
              <SecHead sec={sec["mentorship-differs"]} label="How it differs" plain="Advisory solves. " em="Mentorship builds." />
            </div>
          </div>
          <div className="c3 plain">
            {(sec["mentorship-differs"]?.items?.length ? sec["mentorship-differs"].items!.filter((x) => x.title && x.text).map((x, i) => ({ n: String(i + 1).padStart(2, "0"), h: x.title!, p: x.text! })) : DIFF).map((d) => (
              <div key={d.n}>
                <span className="lab">{d.n}</span>
                <h3>{d.h}</h3>
                <p>{d.p}</p>
              </div>
            ))}
          </div>
          <div className="secta">
            <p>Need the faster door instead?</p>
            <Cta href="/business-advisory#capply">Book a consultation</Cta>
          </div>
        </div>
      </section>

      <section className="sec steps">
        <div className="wrap">
          <div className="sh">
            <div>
              <SecHead sec={sec["mentorship-rhythm"]} label="The rhythm" plain="What a year together " em="looks like." />
            </div>
          </div>
          <ol className="st4">
            {(sec["mentorship-rhythm"]?.items?.length ? sec["mentorship-rhythm"].items!.filter((x) => x.title && x.text).map((x, i) => ({ n: String(i + 1).padStart(2, "0"), h: x.title!, p: x.text! })) : YEAR).map((s) => (
              <li key={s.n}>
                <b>{s.n}</b>
                <h3>{s.h}</h3>
                <p>{s.p}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="sec apply" id="apply">
        <div className="wrap">
          <div className="al">
            <span className="lab">Application</span>
            <h2>
              Tell me your <em>story.</em>
            </h2>
            <p>
              Not a pitch. Just where you are, what you&rsquo;re building and why it matters to you. I take on very few
              mentees, so I reply honestly either way.
            </p>
            <Signature />
          </div>
          <ConsultationForm kind="mentorship" />
        </div>
      </section>
    </main>
  );
}
