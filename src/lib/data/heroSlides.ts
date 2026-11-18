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
 * Sample banners shown only while Sanity has no Hero banner documents, so the
 * image slideshow can be seen working. Replace them in the Studio; the first
 * published banner there retires these. Artwork lives in public/banners/.
 */
export const SAMPLE_BANNERS: HeroSlide[] = [
  {
    id: "sample-advisory",
    kind: "image",
    heading: "Business Advisory: clear decisions for founders who are building for the long run.",
    ctaLabel: "Book a consultation",
    ctaHref: "/business-advisory#capply",
    imageUrl: "/banners/sample-advisory.jpg",
    imageAlt: "Business Advisory: clear decisions for founders who are building for the long run. Book a consultation.",
    banner: { desktop: "/banners/sample-advisory.jpg", mobile: "/banners/sample-advisory-mobile.jpg", href: "/business-advisory#capply" },
  },
  {
    id: "sample-growth",
    kind: "image",
    heading: "Business Growth: from zero to ₹2.5 Cr ARR, one decision at a time.",
    ctaLabel: "See how it was done",
    ctaHref: "/knowledge-hub/case-study-lushful",
    imageUrl: "/banners/sample-growth.jpg",
    imageAlt: "Business Growth: from zero to ₹2.5 Cr ARR, one decision at a time. See how it was done.",
    banner: { desktop: "/banners/sample-growth.jpg", mobile: "/banners/sample-growth-mobile.jpg", href: "/knowledge-hub/case-study-lushful" },
  },
  {
    id: "sample-offer",
    kind: "image",
    heading: "Founder’s Diagnostic: five seats this month.",
    ctaLabel: "Book a seat",
    ctaHref: "/business-advisory#capply",
    imageUrl: "/banners/sample-offer.jpg",
    imageAlt: "Limited this month. Founder’s Diagnostic: five seats this month. Book a seat.",
    banner: { desktop: "/banners/sample-offer.jpg", mobile: "/banners/sample-offer-mobile.jpg", href: "/business-advisory#capply" },
  },
];
