import type { Metadata } from "next";
import { Cta } from "@/components/ui/Cta";
import { Signature } from "@/components/ui/Signature";
import { ConsultationForm } from "@/components/forms/ConsultationForm";
import { ServiceSchema } from "@/components/seo/ServiceSchema";

export const metadata: Metadata = {
  title: "Business Coaching",
  description:
    "One-to-one business coaching for aspiring entrepreneurs and business owners: a 12-week programme across eight core business functions, at ₹9,000 per week.",
  alternates: { canonical: "/business-coaching" },
};

const TERMS = [
  { n: "01", h: "₹9,000 per week", p: "Recommended duration 12 weeks. Total investment ₹1,08,000." },
  { n: "02", h: "Weekly one-to-one", p: "Structured coaching sessions, every week, for the full programme." },
  { n: "03", h: "30-day money-back guarantee", p: "Subject to terms and conditions. Applies to programmes booked for a minimum of 12 weeks." },
];

const FUNCTIONS = [
  { h: "Marketing", p: "Brand positioning, marketing strategy, customer acquisition and retention" },
  { h: "Sales", p: "Sales strategy, lead management, conversions and customer retention" },
  { h: "Revenue Optimisation", p: "Pricing, revenue models, profitability and new opportunities" },
  { h: "Finance", p: "Financial planning, cash flow, budgeting and cost management" },
  { h: "Human Resources", p: "Recruitment, team structure, performance and delegation" },
  { h: "Operations", p: "Processes, workflow management and efficiency" },
  { h: "Logistics & Supply Chain", p: "Procurement, inventory, vendors and distribution" },
  { h: "Technology", p: "Technology adoption, automation and business tools" },
];

const RECEIVE = [
  "Initial business health assessment",
  "Evaluation of the eight core business functions",
  "Identification of areas for improvement",
  "Weekly one-to-one coaching",
  "Action points and accountability",
  "Progress reviews",
  "Final 90-day business growth roadmap",
];

/** Business coaching: the programme as published; the copy can move to Sanity like the others. */
export default function BusinessCoachingPage() {
  return (
    <main className="pg on" data-p="advisory" id="main">
      <header className="ph1">
        <div className="wrap">
          <span className="lab">Programs · Business Coaching</span>
          <h1>
            Structured guidance, <em>week by week.</em>
          </h1>
          <p>
            One-to-one coaching for aspiring entrepreneurs and business owners who want to build, manage and improve their
            business on a clear plan.
          </p>
          <Cta href="#apply">Ask about coaching</Cta>
        </div>
      </header>

      <section className="sec">
        <div className="wrap">
          <div className="sh">
            <div>
              <span className="lab">Investment</span>
              <h2>
                ₹9,000 <em>per week.</em>
              </h2>
            </div>
          </div>
          <div className="c3 plain">
            {TERMS.map((r) => (
              <div key={r.n}>
                <span className="lab">{r.n}</span>
                <h3>{r.h}</h3>
                <p>{r.p}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="sec">
        <div className="wrap">
          <div className="sh">
            <div>
              <span className="lab">Eight core functions</span>
              <h2>
                Reviewed <em>together.</em>
              </h2>
              <p>
                Depending on the business, some areas need more attention than others. The programme does not follow a
                fixed checklist for every business.
              </p>
            </div>
          </div>
          <div className="c3 plain">
            {FUNCTIONS.map((f, i) => (
              <div key={f.h}>
                <span className="lab">{String(i + 1).padStart(2, "0")}</span>
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
              <span className="lab">What you receive</span>
              <h2>
                Every <em>session counts.</em>
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
          <p>
            Outcome: a stronger business structure, better decision-making and a clear direction for growth.
          </p>
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
              Your business or idea, how long you have been operating, your biggest challenges, and what you want to achieve
              in the next 12 weeks. I reply myself within 3&ndash;4 working days.
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
        description="One-to-one business coaching for founders and business owners in India: a 12-week programme at ₹9,000 per week, covering marketing, sales, finance, operations, technology and more."
      />
    </main>
  );
}
