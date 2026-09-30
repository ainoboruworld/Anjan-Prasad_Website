import type { Metadata } from "next";
import { Cta } from "@/components/ui/Cta";
import { Signature } from "@/components/ui/Signature";
import { AdvisoryForm } from "@/components/forms/AdvisoryForm";

export const metadata: Metadata = {
  title: "Business Advisory",
  description:
    "Clear decisions for founders who are building for the long run. Anjan Prasad works with a small number of founders at a time as a business advisor, consultant and mentor.",
  alternates: { canonical: "/business-advisory" },
};

const WHO = [
  { n: "01", h: "Growth has stalled", p: "You're working harder than ever and the numbers aren't moving." },
  { n: "02", h: "A big launch is coming", p: "A new product, city or channel, and you want to get it right the first time." },
  { n: "03", h: "Profit isn't keeping up", p: "Revenue is growing but the margin, or the cash, isn't." },
];

const STEPS = [
  { n: "01", h: "You apply", p: "A short form about your business and the decision in front of you." },
  { n: "02", h: "I read it myself", p: "Every application. I reply within five working days." },
  { n: "03", h: "We talk", p: "A focused conversation to understand the business and the real problem." },
  { n: "04", h: "We agree a plan", p: "If it's a fit, we agree how we'll work together and what success looks like." },
];

export default function BusinessAdvisoryPage() {
  return (
    <main className="pg on" data-p="advisory" id="main">
      <header className="ph1">
        <div className="wrap">
          <span className="lab">Programs · Business Advisory</span>
          <h1>
            Clear decisions for founders <em>who are building for the long run.</em>
          </h1>
          <p>
            I work with a small number of founders at a time. Tell me where your business is, and if I can help,
            we&rsquo;ll decide together what to do next, and what to stop doing.
          </p>
          <Cta href="#apply">Apply for advisory</Cta>
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
            {WHO.map((w) => (
              <div key={w.n}>
                <span className="lab">{w.n}</span>
                <h3>{w.h}</h3>
                <p>{w.p}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

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
              Some founders call me their <b>business consultant</b>. Others call me their <b>business advisor</b>, or
              their <b>business mentor</b>. Honestly, the title matters less than the conversation.
            </p>
            <p>
              Sometimes that means acting as a business coach, a growth consultant or a GTM strategist. Sometimes it
              means shaping business strategy, or stepping in as a marketing consultant or fractional CMO for a while.
              And for a few early startups I believe in, it means mentorship with equity.
            </p>
            <p className="sm">Whatever shape it takes, it starts the same way: with you telling me where the business is.</p>
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
          <AdvisoryForm />
        </div>
      </section>
    </main>
  );
}
