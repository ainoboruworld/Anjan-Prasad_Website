import type { Metadata } from "next";
import Link from "next/link";
import { ChecklistActions } from "@/components/resources/ChecklistActions";

export const metadata: Metadata = {
  title: "The 7 questions I ask before a first call",
  description:
    "The seven questions Anjan Prasad asks every founder and business owner before working together. Answer them honestly and half the decision settles itself.",
  alternates: { canonical: "/resources/first-call-questions" },
};

const QUESTIONS: { q: string; why: string }[] = [
  {
    q: "What is the one decision that, made well, would make the next three easier?",
    why: "Founders carry ten open decisions at once. One of them is usually upstream of the rest. Name it.",
  },
  {
    q: "Which 20% of your customers produce 80% of your margin, and what do you do differently for them?",
    why: "If the answer is “nothing”, that is your growth plan, and it costs almost nothing.",
  },
  {
    q: "If you stopped all paid spend for 30 days, how much revenue would actually disappear?",
    why: "Most people are paying for revenue they would have had anyway. Guess, then measure.",
  },
  {
    q: "How many days of cash do you have if nothing new comes in from today?",
    why: "Not revenue. Not profit. Days. Calm decisions come from knowing this number cold.",
  },
  {
    q: "What happens to a lead in the first ten minutes after it arrives?",
    why: "Speed and follow-up discipline beat clever pitches. Fix the first ten minutes first.",
  },
  {
    q: "Who on your team would you re-hire tomorrow without hesitation, and who would you not?",
    why: "The honest answer shows you the decision you have been postponing.",
  },
  {
    q: "What would break first if your customers doubled next quarter?",
    why: "Plan technology, people and operations against a growth number, not a wish list.",
  },
];

/** Lead magnet: a one-page, printable checklist in Anjan's voice. */
export default function FirstCallQuestionsPage() {
  return (
    <main className="pg on" id="main" data-p="resource">
      <article className="art res">
        <div className="aw">
          <Link href="/knowledge-hub" className="back">
            ← Knowledge Hub
          </Link>
          <span className="lab">A one-page tool · 5 min</span>
          <h1>
            The 7 questions I ask <em>before a first call.</em>
          </h1>
          <p className="lead">
            Answer these in writing, honestly, before you look for anyone&rsquo;s advice, including mine. In seventeen
            years I have not met a founder who did this and didn&rsquo;t see the next step more clearly.
          </p>
          <ChecklistActions />
          <ol className="qlist">
            {QUESTIONS.map((item, i) => (
              <li key={i}>
                <span className="qn">{String(i + 1).padStart(2, "0")}</span>
                <div>
                  <h2>{item.q}</h2>
                  <p>{item.why}</p>
                  <div className="qline" aria-hidden />
                  <div className="qline" aria-hidden />
                </div>
              </li>
            ))}
          </ol>
          <div className="endcta">
            <p>
              <em>If one of these pointed at a decision you keep postponing, that is the one worth an hour.</em>
            </p>
            <Link href="/business-advisory#capply" className="cta">
              Book a consultation <span>→</span>
            </Link>
          </div>
        </div>
      </article>
    </main>
  );
}
