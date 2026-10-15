import { Hero } from "@/components/home/Hero";
import { TrustWall } from "@/components/home/TrustWall";
import { CasesRow } from "@/components/home/CasesRow";
import { RecordBand } from "@/components/home/RecordBand";
import { AboutIntro } from "@/components/home/AboutIntro";
import { Journey } from "@/components/shared/Journey";
import { LifeStrip } from "@/components/shared/LifeStrip";
import { Wheel } from "@/components/home/Wheel";
import { FeaturedMedia } from "@/components/shared/VideoPair";
import { Testimonials } from "@/components/home/Testimonials";
import { KnowledgeTeaser } from "@/components/home/KnowledgeTeaser";
import { CloseCta } from "@/components/shared/CloseCta";
import { getArticles, getSections, splitEm } from "@/lib/sanity";

export const revalidate = 300;

function initials(name: string): string {
  return name
    .split(/\s+/)
    .map((w) => w[0] ?? "")
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export default async function HomePage() {
  const [all, sec] = await Promise.all([getArticles(), getSections()]);
  const articles = all.filter((a) => !a.caseStudy);
  const close = sec["home-close"];
  const closeTitle = close?.heading ? splitEm(close.heading) : null;
  const testimonials = sec["home-testimonials"]?.items
    ?.filter((t) => t.text && t.title)
    .map((t) => ({ quote: t.text!, name: t.title!, role: t.value ?? "", initials: initials(t.title!) }));

  return (
    <main className="pg on" data-p="home" id="main">
      <Hero sec={sec["home-hero"]} />
      <TrustWall />
      <CasesRow />
      <RecordBand />
      <AboutIntro sec={sec["home-about"]} />
      <Journey
        cta={{
          href: "/about",
          text: "If this road sounds familiar, read the long version.",
          label: "My story",
        }}
      />
      <LifeStrip />
      <Wheel />
      <FeaturedMedia />
      <Testimonials items={testimonials} />
      <KnowledgeTeaser articles={articles} />
      <CloseCta
        label={close?.label ?? "Your next step"}
        title={
          closeTitle ? (
            <>
              {closeTitle.plain}
              {closeTitle.em && <em>{closeTitle.em}</em>}
            </>
          ) : (
            <>
              Ready to build <em>your next chapter?</em>
            </>
          )
        }
        text={close?.body ?? "Bring a proven operating playbook into your business, or get clarity on your next decision."}
        primary={{ href: "/business-advisory#capply", label: "Book a consultation" }}
        secondary={{ href: "/mentorship", label: "Mentorship" }}
      />
    </main>
  );
}
