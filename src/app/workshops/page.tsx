import type { Metadata } from "next";
import { Cta } from "@/components/ui/Cta";
import { Signature } from "@/components/ui/Signature";
import { SpeakingForm } from "@/components/forms/SpeakingForm";
import { ServiceSchema } from "@/components/seo/ServiceSchema";

export const metadata: Metadata = {
  title: "Business Workshops",
  description:
    "Live online group workshops of 60 to 90 minutes on how to start and how to build and grow a business. ₹199 per workshop.",
  alternates: { canonical: "/workshops" },
};

const DETAILS = [
  { n: "01", h: "Live online group workshop", p: "Duration 60–90 minutes, with live Q&A." },
  { n: "02", h: "₹199 per workshop", p: "One workshop, one price." },
  {
    n: "03",
    h: "Who it is for",
    p: "People currently working a job, aspiring entrepreneurs, and anyone who wants to start their own business.",
  },
];

const TOPICS = [
  { n: "01", h: "How to Start a Business from Scratch", p: "A step-by-step understanding of starting and setting up a business." },
  { n: "02", h: "How to Build and Grow a Business", p: "A step-by-step understanding of building and growing a business." },
];

const RECEIVE = [
  "Practical business knowledge",
  "Step-by-step guidance",
  "Real business examples and case studies",
  "Live Q&A",
  "Workshop notes and key takeaways",
];

/** Business workshops: the programme as published; the copy can move to Sanity like the others. */
export default function WorkshopsPage() {
  return (
    <main className="pg on" data-p="advisory" id="main">
      <header className="ph1">
        <div className="wrap">
          <span className="lab">Programs · Business Workshops</span>
          <h1>
            Start or grow a business, <em>step by step.</em>
          </h1>
          <p>
            Live online group workshops for people working a job, aspiring entrepreneurs and anyone planning to start their
            own business. 60–90 minutes, ₹199 per workshop.
          </p>
          <Cta href="#apply">Ask about a workshop</Cta>
        </div>
      </header>

      <section className="sec">
        <div className="wrap">
          <div className="sh">
            <div>
              <span className="lab">Details</span>
              <h2>
                Built for <em>the room.</em>
              </h2>
            </div>
          </div>
          <div className="c3 plain">
            {DETAILS.map((f) => (
              <div key={f.n}>
                <span className="lab">{f.n}</span>
                <h3>{f.h}</h3>
                <p>{f.p}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="sec">
        <div className="wrap">
          <div className="sh">
            <div>
              <span className="lab">Workshop topics</span>
              <h2>
                Two <em>questions.</em>
              </h2>
            </div>
          </div>
          <div className="c3 plain">
            {TOPICS.map((f) => (
              <div key={f.n}>
                <span className="lab">{f.n}</span>
                <h3>{f.h}</h3>
                <p>{f.p}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="sec">
        <div className="wrap">
          <div className="sh">
            <div>
              <span className="lab">What participants receive</span>
              <h2>
                Something you can <em>use on Monday.</em>
              </h2>
            </div>
          </div>
          <div className="c3 plain">
            {RECEIVE.map((item, i) => (
              <div key={item}>
                <span className="lab">{String(i + 1).padStart(2, "0")}</span>
                <h3>{item}</h3>
              </div>
            ))}
          </div>
          <p>Outcome: understand the fundamentals of starting or growing a business and the steps involved.</p>
        </div>
      </section>

      <section className="sec apply" id="apply">
        <div className="wrap">
          <div className="al">
            <span className="lab">Enquire</span>
            <h2>
              Which workshop <em>would you like?</em>
            </h2>
            <p>Tell me which workshop you would like to attend and what you are doing now. I reply within five working days.</p>
            <Signature />
          </div>
          <SpeakingForm />
        </div>
      </section>
      <ServiceSchema
        name="Business Workshops"
        path="/workshops"
        description="Live online business workshops of 60 to 90 minutes for people starting or growing a business in India: ₹199 per workshop."
      />
    </main>
  );
}
