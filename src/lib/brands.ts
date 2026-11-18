import "server-only";
import type { PortableTextBlock } from "@portabletext/types";
import { BRAND_PAGES, brandLogo as seedLogo, type BrandPage } from "./data/brandPages";
import { ARTICLES } from "./data/articles";
import { getBrandCategoriesCms, getBrandsCms, type CmsBrand, type CmsBrandCategory } from "./sanity";

/**
 * The Brands catalogue the site renders from: Sanity documents merged over
 * the built-in brand pages by slug, the same pattern the Knowledge Hub uses
 * for articles. A brand edited in the Studio replaces its built-in twin;
 * a brand that exists only in the Studio is simply added; unpublished
 * brands and inactive categories disappear everywhere.
 */

export interface BrandImage {
  url: string;
  alt?: string;
  caption?: string;
}

export interface Brand {
  slug: string;
  name: string;
  categorySlug: string;
  role?: string;
  logoUrl?: string;
  previewUrl?: string;
  shortDescription?: string;
  heroImage?: BrandImage;
  heroCtaLabel?: string;
  heroCtaHref?: string;
  aboutHeading?: string;
  /** Portable Text from Sanity, or plain paragraphs from the built-in data. */
  aboutBody?: PortableTextBlock[];
  aboutParagraphs?: string[];
  aboutImage?: BrandImage;
  gallery?: BrandImage[];
  industry?: string;
  services?: string[];
  positioning?: string;
  website?: string;
  ctaHeading?: string;
  ctaDescription?: string;
  ctaLabel?: string;
  ctaHref?: string;
  /* Built-in extras kept for the seeded brands. */
  metrics?: [string, string][];
  results?: string[];
  lesson?: string;
  quote?: [string, string];
  cases?: { slug: string; title: string; image: string; readTime: string }[];
  draft?: boolean;
  source: "cms" | "seed";
}

export interface BrandCategory {
  slug: string;
  name: string;
  brands: Brand[];
}

export const SEED_CATEGORIES: { slug: string; name: string; kind: BrandPage["kind"] }[] = [
  { slug: "built", name: "Brands built", kind: "founded" },
  { slug: "advised", name: "Brands advised", kind: "advised" },
];

function fromSeed(b: BrandPage): Brand {
  const cases = (b.cases ?? [])
    .map((s) => ARTICLES.find((a) => a.slug === s))
    .filter((a): a is (typeof ARTICLES)[number] => Boolean(a))
    .map((a) => ({ slug: a.slug, title: a.title, image: a.cardImage ?? a.image, readTime: a.readTime }));
  return {
    slug: b.slug,
    name: b.name,
    categorySlug: SEED_CATEGORIES.find((c) => c.kind === b.kind)?.slug ?? "built",
    role: b.role,
    logoUrl: seedLogo(b.slug),
    previewUrl: b.cover,
    shortDescription: b.headline,
    heroImage: b.cover ? { url: b.cover } : undefined,
    aboutHeading: b.challenge ? "The challenge" : undefined,
    aboutParagraphs: [...b.story, ...(b.challenge ? [b.challenge] : [])],
    gallery: b.photos?.map((p) => ({ url: p.src, alt: p.alt, caption: p.caption })),
    industry: b.sector,
    services: b.work,
    website: b.website,
    metrics: b.metrics,
    results: b.results,
    lesson: b.lesson,
    quote: b.quote,
    cases,
    draft: b.draft,
    source: "seed",
  };
}

function fromCms(c: CmsBrand): Brand {
  return {
    slug: c.slug,
    name: c.name,
    categorySlug: c.categorySlug,
    role: c.role,
    logoUrl: c.logoUrl,
    previewUrl: c.previewUrl,
    shortDescription: c.shortDescription,
    heroImage: c.heroImageUrl ? { url: c.heroImageUrl, alt: c.heroImageAlt } : undefined,
    heroCtaLabel: c.heroCtaLabel,
    heroCtaHref: c.heroCtaHref,
    aboutHeading: c.aboutHeading,
    aboutBody: c.aboutBody,
    aboutImage: c.aboutImageUrl ? { url: c.aboutImageUrl, alt: c.aboutImageAlt } : undefined,
    gallery: c.gallery?.filter((g) => g.url).map((g) => ({ url: g.url!, alt: g.alt, caption: g.caption })),
    industry: c.industry,
    services: c.services?.filter(Boolean),
    positioning: c.positioning,
    website: c.website,
    ctaHeading: c.ctaHeading,
    ctaDescription: c.ctaDescription,
    ctaLabel: c.ctaLabel,
    ctaHref: c.ctaHref,
    source: "cms",
  };
}

/** A CMS brand over its built-in twin: CMS fields win, built-in extras remain. */
function merge(cms: Brand, seed?: Brand): Brand {
  if (!seed) return cms;
  const pick = <K extends keyof Brand>(k: K): Brand[K] => (cms[k] !== undefined && cms[k] !== null && (cms[k] as unknown) !== "" ? cms[k] : seed[k]);
  return {
    ...seed,
    ...cms,
    role: pick("role"),
    logoUrl: pick("logoUrl"),
    previewUrl: pick("previewUrl"),
    shortDescription: pick("shortDescription"),
    heroImage: pick("heroImage"),
    aboutHeading: pick("aboutHeading"),
    aboutParagraphs: cms.aboutBody?.length ? undefined : seed.aboutParagraphs,
    gallery: cms.gallery?.length ? cms.gallery : seed.gallery,
    industry: pick("industry"),
    services: cms.services?.length ? cms.services : seed.services,
    website: pick("website"),
    draft: cms.aboutBody?.length || cms.shortDescription ? false : seed.draft,
    source: "cms",
  };
}

export async function getBrandCatalog(): Promise<BrandCategory[]> {
  const [cmsCats, cmsBrands] = await Promise.all([getBrandCategoriesCms(), getBrandsCms()]);
  const seedBySlug = new Map(BRAND_PAGES.map((b) => [b.slug, fromSeed(b)]));

  // Categories: CMS when any exist, otherwise the built-in two.
  const cats: { slug: string; name: string }[] = cmsCats.length
    ? cmsCats.map((c: CmsBrandCategory) => ({ slug: c.slug, name: c.name }))
    : SEED_CATEGORIES.map((c) => ({ slug: c.slug, name: c.name }));

  // Brands: every published CMS brand (merged over its seed twin), plus any
  // seed brand the CMS does not know yet, so nothing vanishes before content
  // is entered. A seed brand that the CMS has unpublished stays hidden.
  const cmsSlugs = new Set(cmsBrands.map((b) => b.slug));
  const hiddenSeed = new Set(cmsBrands.filter((b) => !b.published).map((b) => b.slug));
  const merged: Brand[] = [
    ...cmsBrands.filter((b) => b.published).map((b) => merge(fromCms(b), seedBySlug.get(b.slug))),
    ...[...seedBySlug.values()].filter((b) => !cmsSlugs.has(b.slug) && !hiddenSeed.has(b.slug)),
  ];

  return cats
    .map((c) => ({ ...c, brands: merged.filter((b) => b.categorySlug === c.slug) }))
    .filter((c) => c.brands.length > 0);
}

export async function getAllBrands(): Promise<Brand[]> {
  return (await getBrandCatalog()).flatMap((c) => c.brands);
}

export async function getBrand(slug: string): Promise<Brand | undefined> {
  return (await getAllBrands()).find((b) => b.slug === slug);
}

/** The lightweight shape the header needs; safe to pass to a client component. */
export interface BrandsMenuData {
  categories: { slug: string; name: string; brands: { slug: string; name: string; role?: string; previewUrl?: string; logoUrl?: string }[] }[];
}

export async function getBrandsMenu(): Promise<BrandsMenuData> {
  const cats = await getBrandCatalog();
  return {
    categories: cats.map((c) => ({
      slug: c.slug,
      name: c.name,
      brands: c.brands.map((b) => ({ slug: b.slug, name: b.name, role: b.role, previewUrl: b.previewUrl ?? b.heroImage?.url, logoUrl: b.logoUrl })),
    })),
  };
}
