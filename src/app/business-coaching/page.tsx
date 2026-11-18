import type { Metadata } from "next";
import { Cta } from "@/components/ui/Cta";
import { Signature } from "@/components/ui/Signature";
import { ConsultationForm } from "@/components/forms/ConsultationForm";
import { ServiceSchema } from "@/components/seo/ServiceSchema";

export const metadata: Metadata = {
  title: "Business Coaching",
  description:
    "Regular one-to-one coaching with Anjan Prasad for founders and business owners: sharper decisions, steadier leadership, and a business that runs on systems rather than on you.",
  alternates: { canonical: "/business-coaching" },
};

const RHYTHM = [
  { n: "01", h: "A fixed rhythm", p: "A standing session every two to four weeks, so the work compounds instead of restarting each time." },
  { n: "02", h: "Your numbers on the table", p: "Every session starts with what actually happened: cash, pipeline, margin, team. Then the decision." },
  { n: "03", h: "Between sessions", p: "A short note when something comes up that cannot wait. Not a hotline; a second pair of eyes you trust." },
];

/** Business coaching: the page is live so the menu never dead-ends; copy can move to Sanity like the others. */
export default function BusinessCoachingPage() {
  return (
    <main className="pg on" data-p="advisory" id="main">
      <header className="ph1">
        <div className="wrap">
          <span className="lab">Programs · Business Coaching</span>
          <h1>
            Sharper decisions, <em>every month.</em>
          </h1>
          <p>
            Advisory solves a decision. Coaching builds the habit of making good ones. Regular one-to-one sessions with
            a founder or owner who wants to lead with more clarity and less firefighting.
          </p>
          <Cta href="#apply">Ask about coaching</Cta>
        </div>
      </header>

      <section className="sec">
        <div className="wrap">
          <div className="sh">
            <div>
              <span className="lab">How it works</span>
              <h2>
                Steady, <em>not sporadic.</em>
              </h2>
            </div>
          </div>
          <div className="c3 plain">
            {RHYTHM.map((r) => (
              <div key={r.n}>
                <span className="lab">{r.n}</span>
                <h3>{r.h}</h3>
                <p>{r.p}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="sec apply" id="apply">
        <div className="wrap">
          <div className="al">
            <span className="lab">Start here</span>
            <h2>
              Tell me where the <em>business is.</em>
            </h2>
            <p>
              Where you are, what is in the way, and what you want to be different in six months. I reply myself within
              3&ndash;4 working days with whether coaching is the right door, or which one is.
            </p>
            <Signature />
          </div>
          <ConsultationForm kind="consultation" />
        </div>
      </section>
      <ServiceSchema
        name="Business Coaching"
        type="ProfessionalService"
        path="/business-coaching"
        description="Regular one-to-one business coaching for founders and business owners in India: sharper decisions, steadier leadership, a business that runs on systems."
      />
    </main>
  );
}
