import type { Metadata } from "next";
import { ContactForm } from "@/components/forms/ContactForm";
import { SITE } from "@/lib/data/site";

export const metadata: Metadata = {
  title: "Contact",
  description: "For advisory, use the application. For everything else, speaking, collaborations, press or just a hello, write to Anjan here.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <main className="pg on" data-p="contact" id="main">
      <header className="ph1">
        <div className="wrap cgrid">
          <div>
            <span className="lab">Contact</span>
            <h1>
              Let&rsquo;s <em>talk.</em>
            </h1>
            <p>
              For advisory, use the application. For everything else, speaking, collaborations, press or just a hello,
              write to me here.
            </p>
            <ul className="cl">
              <li>
                <small>Email</small>
                <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
              </li>
              <li>
                <small>LinkedIn</small>
                <a href={SITE.linkedin} target="_blank" rel="noopener">
                  linkedin.com/in/anjanprasad
                </a>
              </li>
              <li>
                <small>Instagram</small>
                <a href={SITE.instagram} target="_blank" rel="noopener">
                  @anjanpr
                </a>
              </li>
              <li>
                <small>Reply time</small>
                <span>Within five working days</span>
              </li>
            </ul>
          </div>
          <ContactForm />
        </div>
      </header>
    </main>
  );
}
