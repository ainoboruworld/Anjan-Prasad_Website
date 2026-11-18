import type { PageSection } from "@/lib/sections";

/**
 * One banner in the home hero slideshow. Slide 1 is always built from the
 * Home → Hero section (so today's hero keeps working untouched); any further
 * slides come from `heroSlide` documents in Sanity.
 */
export interface HeroSlide {
  id: string;
  /** "text" (default): the composed hero. "image": one complete banner artwork. */
  kind?: "text" | "image";
  /** Image banners: desktop artwork, optional mobile artwork, and where it links. */
  banner?: { desktop: string; mobile?: string; href: string };
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


/**
 * Sample slides shown only while Sanity has no hero banners or text slides,
 * so the slideshow can be seen working. The first published banner or slide
 * in the Studio replaces them.
 */
export const SAMPLE_SLIDES: HeroSlide[] = [
  {
    id: "sample-offer",
    eyebrow: "Limited · this month",
    heading: "Founder’s Diagnostic: *five seats this month.*",
    body: "One 90-minute session on the decision in front of you. You bring the numbers; I bring seventeen years of having been wrong first.",
    ctaLabel: "Book a seat",
    ctaHref: "/business-advisory#capply",
    imageUrl: HERO_DEFAULTS.imageUrl,
    imageAlt: HERO_DEFAULTS.imageAlt,
  },
  {
    id: "sample-mentorship",
    eyebrow: "Mentorship · applications open",
    heading: "A seat at your table, *for the whole journey.*",
    body: "Long-term mentorship for a small number of early-stage founders. Sometimes with equity, always with skin in the game.",
    ctaLabel: "Apply for mentorship",
    ctaHref: "/mentorship",
    imageUrl: HERO_DEFAULTS.imageUrl,
    imageAlt: HERO_DEFAULTS.imageAlt,
  },
  {
    id: "sample-letter",
    eyebrow: "The weekly letter",
    heading: "One operator’s letter. *Every week.*",
    body: "Playbooks, margins and field notes on building profitable businesses in India. No motivation, only method.",
    ctaLabel: "Read the latest",
    ctaHref: "/knowledge-hub",
    imageUrl: HERO_DEFAULTS.imageUrl,
    imageAlt: HERO_DEFAULTS.imageAlt,
  },
];
