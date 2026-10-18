import type { Metadata } from "next";
import { getSections, secHeading, pageMetadata, getSiteSeo } from "@/lib/sanity";
import { ContactForm } from "@/components/forms/ContactForm";
import { SITE } from "@/lib/data/site";
import { Socials } from "@/components/shared/Socials";


export async function generateMetadata(): Promise<Metadata> {
  const m = await pageMetadata('Contact', {
    title: 'Contact',
    description: 'For advisory, use the application. For everything else, speaking, collaborations, press or just a hello, write to Anjan here.',
  });
  return { ...m, alternates: { canonical: '/contact' } };
}

export const revalidate = 300;

export default async function ContactPage() {
  const [sec, site] = await Promise.all([getSections(), getSiteSeo()]);
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
                {site.email ? <a href={`mailto:${site.email}`}>{site.email}</a> : <span>Coming soon</span>}
              </li>
              <li>
                <small>LinkedIn</small>
                <a href={site.linkedin ?? SITE.linkedin} target="_blank" rel="noopener">
                  linkedin.com/in/anjanprasad
                </a>
              </li>
              <li>
                <small>Instagram</small>
                <a href={site.instagram ?? SITE.instagram} target="_blank" rel="noopener">
                  @anjanpr
                </a>
              </li>
              <li>
                <small>Reply time</small>
                <span>Within five working days</span>
              </li>
              <li>
                <small>Elsewhere</small>
                <Socials
                  links={[
                    { name: "LinkedIn", href: site.linkedin ?? SITE.linkedin },
                    { name: "Instagram", href: site.instagram ?? SITE.instagram },
                    { name: "YouTube", href: site.youtube ?? SITE.youtube },
                    { name: "Substack", href: site.substack ?? SITE.substack },
                    { name: "Twitter / X", href: site.twitter ?? SITE.twitter },
                  ]}
                />
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
