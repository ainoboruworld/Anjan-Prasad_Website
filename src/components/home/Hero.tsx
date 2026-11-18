import { HeroSlideshow } from "./HeroSlideshow";
import { SAMPLE_SLIDES, defaultSlide, type HeroSlide } from "@/lib/data/heroSlides";
import type { PageSection } from "@/lib/sanity";

/**
 * Home hero: the opening statement and Anjan's portrait on the soft-blue
 * arch. Slide 1 is this section; any extra slides (from Sanity "Hero slide"
 * documents) rotate behind it as a slideshow.
 */
export function Hero({ sec = {} as PageSection, slides = [] }: { sec?: PageSection; slides?: HeroSlide[] }) {
  if (sec?.hidden) return null;
  // Until the Studio has slides of its own, two samples show the slideshow working.
  const extra = slides.length ? slides : SAMPLE_SLIDES;
  return <HeroSlideshow slides={[defaultSlide(sec), ...extra]} />;
}
