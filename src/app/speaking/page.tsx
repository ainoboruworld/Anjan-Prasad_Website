import type { Metadata } from "next";
import { SecHead } from "@/components/shared/SecHead";
import { getSections, secHeading } from "@/lib/sanity";
import { Cta } from "@/components/ui/Cta";
import { Signature } from "@/components/ui/Signature";
import { SpeakingForm } from "@/components/forms/SpeakingForm";

export const metadata: Metadata = {
  title: "Speaker",
  description:
    "Invite Anjan Prasad to your podcast, business school or event. Seventeen plus years of building and advising profitable businesses, told plainly, with real numbers.",
  alternates: { canonical: "/speaking" },
};

const TALKS = [
  {
    n: "01",
    h: "The numbers nobody shows you",
    p: "What a P&L hides, why profitable businesses run out of cash, and the months he worried about payroll while the books looked fine.",
  },
  {
    n: "02",
    h: "Leaving the salary",
    p: "The honest version of 0 to 1: what he kept from Accenture and the agency years, what he had to unlearn, and what the first year really costs.",
  },
  {
    n: "03",
    h: "Marketing from both chairs",
    p: "He managed over ₹1,200 Cr in budgets on the agency side, then spent his own money as a founder. What changes when it's your rupee.",
  },
];

const ROOMS = [
  {
    h: "Podcasts",
    p: "Long-form and unscripted. He answers the question asked, with real numbers from his own companies, not rehearsed lines.",
  },
  {
    h: "Business schools",
    p: "He already teaches at IIFT and IMT Ghaziabad. Case-led sessions where students work a real decision, not slideware.",
  },
  {
    h: "Tech schools and universities",
    p: "For engineers who will build companies: revenue, pricing and customers, the chapters the curriculum skips.",
  },
  {
    h: "Conferences and corporate events",
    p: "Keynotes and fireside chats on strategy, profitability and operating discipline, sized to the room and the hour.",
  },
];

export const revalidate = 300;

export default async function SpeakingPage() {
  const sec = await getSections();
  const hero = sec["speaking-hero"];
  const h1 = secHeading(hero, { plain: "Ask him anything. ", em: "He has run the numbers." });
  return (
    <main className="pg on" data-p="advisory" id="main">
      <header className="ph1">
        <div className="wrap">
          <span className="lab">{hero?.label ?? "Speaker"}</span>
          <h1>
            {h1.plain}
            {h1.em && <em>{h1.em}</em>}
          </h1>
          <p>
            {hero?.body ??
              "Anjan runs three businesses today and spent seventeen plus years before that inside global agencies, spending budgets for some of the biggest brands in the country. On a stage or a mic he does one thing: say plainly what building a business is actually like, with the numbers to back it."}
          </p>
          <Cta href="#invite">Invite Anjan to speak</Cta>
        </div>
      </header>

      <section className="sec ways">
        <div className="wrap wy2">
          <div>
            <SecHead sec={sec["speaking-why"]} label="Why hosts invite him" plain="Stories are cheap. " em="Numbers aren't." />
          </div>
          <div className="tx">
            <p className="big">
              Most business talks are either theory from people who never operated, or motivation with nothing
              underneath. Anjan sits in the rare third seat: <b>still operating, and willing to show the working</b>.
            </p>
            <p>
              He has been the agency selling the campaign and the founder paying for it, the consultant recommending the
              software and the buyer living with it. That both-sides view is what audiences remember, because nobody
              else in the room has it.
            </p>
            <p className="sm">No jargon, no slides for the sake of slides, and questions welcome at any point.</p>
          </div>
        </div>
      </section>

      <section className="sec">
        <div className="wrap">
          <div className="sh">
            <div>
              <SecHead sec={sec["speaking-talks"]} label="What he talks about" plain="Three conversations " em="worth having." />
            </div>
          </div>
          <div className="c3 plain">
            {(sec["speaking-talks"]?.items?.length ? sec["speaking-talks"].items!.filter((x) => x.title && x.text).map((x, i) => ({ n: String(i + 1).padStart(2, "0"), h: x.title!, p: x.text! })) : TALKS).map((t) => (
              <div key={t.n}>
                <span className="lab">{t.n}</span>
                <h3>{t.h}</h3>
                <p>{t.p}</p>
              </div>
            ))}
          </div>
          <div className="secta">
            <p>Have a different theme in mind? Pitch it in the invitation.</p>
            <Cta href="#invite">Invite Anjan to speak</Cta>
          </div>
        </div>
      </section>

      <section className="sec steps">
        <div className="wrap">
          <div className="sh">
            <div>
              <SecHead sec={sec["speaking-rooms"]} label="Where this lands" plain="Rooms he's " em="at home in." />
            </div>
          </div>
          <ol className="st4">
            {ROOMS.map((w, i) => (
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
