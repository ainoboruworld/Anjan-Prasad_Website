import type { Metadata } from "next";
import { Cta } from "@/components/ui/Cta";
import { Signature } from "@/components/ui/Signature";
import { ConsultationForm } from "@/components/forms/ConsultationForm";

export const metadata: Metadata = {
  title: "Mentorship",
  description:
    "Long-term mentorship for a small number of early-stage founders. Anjan Prasad takes a seat at your table for the journey, sometimes with equity, always with skin in the game.",
  alternates: { canonical: "/mentorship" },
};

const WHO = [
  { n: "01", h: "You're early", p: "An idea taking shape, or a young startup finding its footing and its first customers." },
  { n: "02", h: "You're all in", p: "This is not a side project. You're building something you intend to run for years." },
  { n: "03", h: "You want a partner", p: "Not a course or a cheering squad. Someone who has built businesses, at your table." },
];

const STEPS = [
  { n: "01", h: "You apply", p: "A short form about you, the business and where you want to take it." },
  { n: "02", h: "I read it myself", p: "Every application. I take on very few mentees, so I reply honestly either way." },
  { n: "03", h: "We meet", p: "A real conversation about the business, the numbers and the founder behind them." },
  { n: "04", h: "We commit", p: "If it's a fit, we agree how we work: cadence, scope, and sometimes equity." },
];

export default function MentorshipPage() {
  return (
    <main className="pg on" data-p="advisory" id="main">
      <header className="ph1">
        <div className="wrap">
          <span className="lab">Programs · Mentorship</span>
          <h1>
            A seat at your table, <em>for the whole journey.</em>
          </h1>
          <p>
            Advisory solves a decision. Mentorship is longer than that: I work with a small number of early-stage
            founders over months and years, sometimes with equity, always with skin in the game.
          </p>
          <Cta href="#apply">Apply for mentorship</Cta>
        </div>
      </header>

      <section className="sec">
        <div className="wrap">
          <div className="sh">
            <div>
              <span className="lab">Who it&rsquo;s for</span>
              <h2>
                Founders near <em>the start.</em>
              </h2>
            </div>
          </div>
          <div className="c3 plain">
            {WHO.map((w) => (
              <div key={w.n}>
                <span className="lab">{w.n}</span>
                <h3>{w.h}</h3>
                <p>{w.p}</p>
              </div>
            ))}
          </div>
          <div className="secta">
            <p>Further along, with one decision in front of you?</p>
            <Cta href="/business-advisory#capply">Book a consultation</Cta>
          </div>
        </div>
      </section>

      <section className="sec steps">
        <div className="wrap">
          <div className="sh">
            <div>
              <span className="lab">How it works</span>
              <h2>
                Few seats, <em>taken seriously.</em>
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
        </div>
      </section>

      <section className="sec apply" id="apply">
        <div className="wrap">
          <div className="al">
            <span className="lab">Application</span>
            <h2>
              Tell me about <em>your business.</em>
            </h2>
            <p>There&rsquo;s no fee to apply and no sales call. I read every form and reply personally.</p>
            <Signature />
          </div>
          <ConsultationForm kind="mentorship" />
        </div>
      </section>
    </main>
  );
}
