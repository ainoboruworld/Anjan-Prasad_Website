import type { Metadata } from "next";
import { SITE } from "@/lib/data/site";

export const metadata: Metadata = { title: "Privacy Policy", alternates: { canonical: "/privacy" } };

export default function PrivacyPage() {
  return (
    <main className="pg on" id="main">
      <div className="legal">
        <span className="lab">Legal</span>
        <h1>Privacy Policy</h1>
        <p>This page explains what happens to the details you share on this website.</p>
        <h2>What I collect</h2>
        <p>
          When you apply for advisory, request a consultation, write to me or subscribe to the newsletter, I keep the
          details you enter: your name, email, phone number if you add it, and what you write about your business.
        </p>
        <h2>How I use it</h2>
        <ul>
          <li>To read your application and reply to you personally.</li>
          <li>To send the weekly letter, if you subscribed. You can unsubscribe from any email.</li>
          <li>Never to sell or share with third parties for their own marketing.</li>
        </ul>
        <h2>Where it is stored</h2>
        <p>
          Submissions are stored securely with our database provider and delivered by email. Standard analytics may
          record anonymous usage of the site.
        </p>
        <h2>Your rights</h2>
        <p>
          You can ask to see, correct or delete what I hold about you at any time. Write to{" "}
          <a href={`mailto:${SITE.email}`}>{SITE.email}</a>.
        </p>
      </div>
    </main>
  );
}
