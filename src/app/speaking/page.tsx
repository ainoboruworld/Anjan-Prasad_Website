import type { Metadata } from "next";
import { Cta } from "@/components/ui/Cta";
import { Signature } from "@/components/ui/Signature";
import { SpeakingForm } from "@/components/forms/SpeakingForm";

export const metadata: Metadata = {
  title: "Speaking",
  description:
    "Invite Anjan Prasad to your podcast, business school or event. More than fifteen years of building and advising profitable businesses, told plainly and from the field.",
  alternates: { canonical: "/speaking" },
};

const TOPICS = [
  {
    n: "01",
    h: "Building profitable businesses",
    p: "What actually keeps an Indian business alive: margins, cash and pricing, from someone who has run the payroll.",
  },
  {
    n: "02",
    h: "0 to 1, then scale",
    p: "Leaving a corporate career, surviving the first year, and the systems that let a founder step back.",
  },
  {
    n: "03",
    h: "Marketing that pays for itself",
    p: "Growth, GTM and brand from fifteen plus years across Accenture, Mindshare, IPG Mediabrands and his own companies.",
  },
];

const WHERE = [
  { h: "Podcasts", p: "Long-form conversations about building in India. Honest numbers, real stories, no rehearsed lines." },
  { h: "Business schools", p: "He already teaches at IIFT and IMT Ghaziabad. Case-led sessions students can use, not slideware." },
  { h: "Tech schools and universities", p: "For engineers who will build companies: what the textbook leaves out about revenue." },
  { h: "Conferences and corporate events", p: "Keynotes and fireside chats on strategy, profitability and operating discipline." },
];

export default function SpeakingPage() {
  return (
    <main className="pg on" data-p="advisory" id="main">
      <header className="ph1">
        <div className="wrap">
          <span className="lab">Speaking</span>
          <h1>
            An operator on stage, <em>not a motivational speaker.</em>
          </h1>
          <p>
            For more than fifteen years Anjan has built, advised and taught business: founder of Noboru World, CEO of
            Filing Buddy, advisor to brands from American Express to Snapdeal, and visiting faculty at IIFT and IMT
            Ghaziabad. He brings that field experience to podcasts, classrooms and stages, plainly and without jargon.
          </p>
          <Cta href="#invite">Invite Anjan to speak</Cta>
        </div>
      </header>

      <section className="sec">
        <div className="wrap">
          <div className="sh">
            <div>
              <span className="lab">What he speaks about</span>
              <h2>
                Method, <em>not motivation.</em>
              </h2>
            </div>
          </div>
          <div className="c3 plain">
            {TOPICS.map((t) => (
              <div key={t.n}>
                <span className="lab">{t.n}</span>
                <h3>{t.h}</h3>
                <p>{t.p}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="sec steps">
        <div className="wrap">
          <div className="sh">
            <div>
              <span className="lab">Where this lands</span>
              <h2>
                Rooms he&rsquo;s <em>at home in.</em>
              </h2>
            </div>
          </div>
          <ol className="st4">
            {WHERE.map((w, i) => (
              <li key={w.h}>
                <b>{String(i + 1).padStart(2, "0")}</b>
                <h3>{w.h}</h3>
                <p>{w.p}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="sec apply" id="invite">
        <div className="wrap">
          <div className="al">
            <span className="lab">Invitation</span>
            <h2>
              Tell me about <em>the room.</em>
            </h2>
            <p>
              The format, the audience and the date you have in mind. I read every invitation myself and reply within
              five working days.
            </p>
            <Signature />
          </div>
          <SpeakingForm />
        </div>
      </section>
    </main>
  );
}
