import type { Metadata } from "next";
import { SITE } from "@/lib/data/site";

export const metadata: Metadata = { title: "Terms & Conditions", alternates: { canonical: "/terms" } };

export default function TermsPage() {
  return (
    <main className="pg on" id="main">
      <div className="legal">
        <span className="lab">Legal</span>
        <h1>Terms &amp; Conditions</h1>
        <p>By using this website you agree to the terms below.</p>
        <h2>Content</h2>
        <p>
          Articles, case studies and notes on this site are shared as general guidance from my own experience. They are
          not financial, legal or tax advice. Decisions about your business remain yours.
        </p>
        <h2>Advisory and consultation</h2>
        <p>
          Applying for advisory or requesting a consultation does not create an engagement. If we decide to work
          together, the scope, fees and terms are agreed in writing before we start.
        </p>
        <h2>Intellectual property</h2>
        <p>Text, images and the Ap mark on this site belong to Anjan Prasad unless stated otherwise. Brand logos belong to their owners.</p>
        <h2>Contact</h2>
        <p>
          Questions about these terms: <a href={`mailto:${SITE.email}`}>{SITE.email}</a>.
        </p>
      </div>
    </main>
  );
}
