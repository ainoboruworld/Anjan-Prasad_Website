import type { PageSection } from "@/lib/sections";

/**
 * One banner in the home hero slideshow. Slide 1 is always built from the
 * Home → Hero section (so today's hero keeps working untouched); any further
 * slides come from `heroSlide` documents in Sanity.
 */
export interface HeroSlide {
  id: string;
  eyebrow?: string;
  /** May carry the `*italic part*` convention; split with `splitEm`. */
  heading: string;
  body?: string;
  ctaLabel: string;
  ctaHref: string;
  imageUrl: string;
  imageAlt: string;
  align?: "left" | "center";
  imageSide?: "right" | "left";
}

export const HERO_DEFAULTS = {
  heading: "Build a Business That *Outlasts You.*",
  body: "I work with founders on the decisions that shape their businesses, from finding product-market fit to pricing, profitability and scaling. The goal is simple: build a business that grows with purpose and stands on its own.",
  ctaLabel: "Book a consultation",
  ctaHref: "/business-advisory#capply",
  imageUrl: "/images/hero-anjan-cut.webp",
  imageAlt: "Anjan Prasad at his desk, pen in hand",
} as const;

/** The main hero as a slide: exactly what the page shows today. */
export function defaultSlide(sec?: PageSection): HeroSlide {
  return {
    id: "home-hero",
    heading: sec?.heading ?? HERO_DEFAULTS.heading,
    body: sec?.body ?? HERO_DEFAULTS.body,
    ctaLabel: HERO_DEFAULTS.ctaLabel,
    ctaHref: HERO_DEFAULTS.ctaHref,
    imageUrl: sec?.imageUrl ?? HERO_DEFAULTS.imageUrl,
    imageAlt: sec?.imageAlt ?? HERO_DEFAULTS.imageAlt,
  };
}
