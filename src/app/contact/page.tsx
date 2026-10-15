import type { Metadata } from "next";
import { getSections, secHeading } from "@/lib/sanity";
import { ContactForm } from "@/components/forms/ContactForm";
import { SITE } from "@/lib/data/site";

export const metadata: Metadata = {
  title: "Contact",
  description: "For advisory, use the application. For everything else, speaking, collaborations, press or just a hello, write to Anjan here.",
  alternates: { canonical: "/contact" },
};

export const revalidate = 300;

export default async function ContactPage() {
  const sec = await getSections();
  const hero = sec["contact-hero"];
  const h1 = secHeading(hero, { plain: "Let\u2019s ", em: "talk." });
  return (
    <main className="pg on" data-p="contact" id="main">
      <header className="ph1">
        <div className="wrap cgrid">
          <div>
            <span className="lab">{hero?.label ?? "Contact"}</span>
            <h1>
              {h1.plain}
              {h1.em && <em>{h1.em}</em>}
            </h1>
            <p>
              {hero?.body ??
                "For advisory, use the application. For everything else, speaking, collaborations, press or just a hello, write to me here."}
            </p>
            <ul className="cl">
              <li>
                <small>Email</small>
                <span>Coming soon</span>
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
            <div className="secta">
              <p>Here about your business? Skip the inbox.</p>
              <a className="cta" href="/business-advisory#capply">
                Book a consultation <span>→</span>
              </a>
            </div>
          </div>
          <ContactForm />
        </div>
      </header>
    </main>
  );
}
