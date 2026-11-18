import { HeroSlideshow } from "./HeroSlideshow";
import { SAMPLE_BANNERS, defaultSlide, type HeroSlide } from "@/lib/data/heroSlides";
import type { PageSection } from "@/lib/sanity";

/**
 * Home hero: the opening statement and Anjan's portrait on the soft-blue
 * arch. Slide 1 is this section; any extra slides (from Sanity "Hero slide"
 * documents) rotate behind it as a slideshow.
 */
export function Hero({
  sec = {} as PageSection,
  slides = [],
  banners = [],
}: {
  sec?: PageSection;
  /** Optional composed text slides from the Studio (Home hero text slides). */
  slides?: HeroSlide[];
  /** Full-image banners from the Studio (Home hero banners). */
  banners?: HeroSlide[];
}) {
  if (sec?.hidden) return null;
  // Until the Studio has banners of its own, three samples show the slideshow working.
  const extra = banners.length || slides.length ? [...banners, ...slides] : SAMPLE_BANNERS;
  return <HeroSlideshow slides={[defaultSlide(sec), ...extra]} />;
}
