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
import { CtaStrip } from "@/components/shared/CtaStrip";
import { getArticles } from "@/lib/sanity";

export const revalidate = 300;

export default async function HomePage() {
  const articles = (await getArticles()).filter((a) => !a.caseStudy);

  return (
    <main className="pg on" data-p="home" id="main">
      <Hero />
      <TrustWall />
      <CasesRow />
      <CtaStrip
        text={
          <>
            Facing a decision in your business? <em>Let&rsquo;s talk it through.</em>
          </>
        }
      />
      <RecordBand />
      <AboutIntro />
      <CtaStrip
        text={
          <>
            Building for the long run? <em>Apply for advisory.</em>
          </>
        }
        label="Apply for advisory"
        href="/business-advisory#apply"
      />
      <Journey />
      <LifeStrip />
      <CtaStrip
        text={
          <>
            One hour that moves the whole decision. <em>Request a session.</em>
          </>
        }
        label="Request a session"
      />
      <Wheel />
      <FeaturedMedia />
      <CtaStrip
        text={
          <>
            Not sure where it hurts? <em>Start with the 360° diagnosis.</em>
          </>
        }
        label="Start the diagnosis"
        href="/consultation#wheel"
      />
      <Testimonials />
      <KnowledgeTeaser articles={articles} />
      <CloseCta
        label="Your next step"
        title={
          <>
            Ready to build <em>your next chapter?</em>
          </>
        }
        text="Bring a proven operating playbook into your business, or get clarity on your next decision."
        primary={{ href: "/business-advisory", label: "Business Advisory" }}
        secondary={{ href: "/consultation", label: "Consultation" }}
      />
    </main>
  );
}
