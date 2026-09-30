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
import { getArticles } from "@/lib/sanity";

export const revalidate = 300;

export default async function HomePage() {
  const articles = (await getArticles()).filter((a) => !a.caseStudy);

  return (
    <main className="pg on" data-p="home" id="main">
      <Hero />
      <TrustWall />
      <CasesRow />
      <RecordBand />
      <AboutIntro />
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
