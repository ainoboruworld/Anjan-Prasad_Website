import type { Metadata } from "next";
import { Cta } from "@/components/ui/Cta";
import { Signature } from "@/components/ui/Signature";
import { SpeakingForm } from "@/components/forms/SpeakingForm";
import { ServiceSchema } from "@/components/seo/ServiceSchema";

export const metadata: Metadata = {
  title: "Workshops",
  description:
    "Half-day and full-day workshops with Anjan Prasad for founder cohorts, leadership teams and business schools: unit economics, pricing, go-to-market and the decisions that shape a business.",
  alternates: { canonical: "/workshops" },
};

const FORMATS = [
  { n: "01", h: "Founder cohorts", p: "A half day on the decisions that shape a young business: pricing, cash, first hires, first customers." },
  { n: "02", h: "Leadership teams", p: "A full day inside one company, on its own numbers. We leave with decisions made, not slides." },
  { n: "03", h: "Business schools", p: "Sessions built from seventeen years of doing it, for students who want the version without the gloss." },
];

/** Workshops: the page is live so the menu never dead-ends; copy can move to Sanity like the others. */
export default function WorkshopsPage() {
  return (
    <main className="pg on" data-p="advisory" id="main">
      <header className="ph1">
        <div className="wrap">
          <span className="lab">Programs · Workshops</span>
          <h1>
            A room full of founders, <em>and real numbers.</em>
          </h1>
          <p>
            Half-day and full-day sessions for teams, cohorts and classrooms. No motivation, only method: everyone
            leaves with something they can use on Monday.
          </p>
          <Cta href="#apply">Ask about a workshop</Cta>
        </div>
      </header>

      <section className="sec">
        <div className="wrap">
          <div className="sh">
            <div>
              <span className="lab">Formats</span>
              <h2>
                Built for <em>the room.</em>
              </h2>
            </div>
          </div>
          <div className="c3 plain">
            {FORMATS.map((f) => (
              <div key={f.n}>
                <span className="lab">{f.n}</span>
                <h3>{f.h}</h3>
                <p>{f.p}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="sec apply" id="apply">
        <div className="wrap">
          <div className="al">
            <span className="lab">Enquire</span>
            <h2>
              Tell me about <em>the room.</em>
            </h2>
            <p>The audience, the format and the date you have in mind. I read every enquiry myself and reply within five working days.</p>
            <Signature />
          </div>
          <SpeakingForm />
        </div>
      </section>
      <ServiceSchema
        name="Business Workshops"
        path="/workshops"
        description="Half-day and full-day business workshops for founder cohorts, leadership teams and business schools in India."
      />
    </main>
  );
}
