import { HAS_TILE, logoSrc, tileSrc } from "./brands";

/**
 * One page per brand Anjan has built, led or advised. Shown under the
 * "Brands" menu, each as a one-page case study with a link out to the
 * brand's own website. Facts here mirror the About page and the Knowledge
 * Hub case studies; anything not yet verified is left out rather than
 * invented, and `draft` pages say so plainly.
 */
export type BrandKind = "founded" | "advised" | "career";

export interface BrandPage {
  slug: string;
  name: string;
  kind: BrandKind;
  /** Anjan's relationship with the brand, e.g. "Founder & CEO". */
  role: string;
  /** Sector line under the name. */
  sector: string;
  /** One-sentence headline for the page. */
  headline: string;
  /** Two or three short paragraphs. */
  story: string[];
  /** What Anjan did or does, as short bullets. */
  work: string[];
  /** Verified numbers only. */
  metrics?: [string, string][];
  /** Knowledge Hub case studies that belong to this brand. */
  cases?: string[];
  /** The brand's own website, when known. */
  website?: string;
  /** Pull quote, when there is a real one. */
  quote?: [string, string];
  /** True while the page is a short summary rather than a full case study. */
  draft?: boolean;
}

export const BRAND_PAGES: BrandPage[] = [
  {
    slug: "noboru-world",
    name: "Noboru World",
    kind: "founded",
    role: "Founder & CEO",
    sector: "Growth and performance marketing",
    headline: "The company I left a salary to start, and made almost every mistake in.",
    story: [
      "Noboru World is where I stopped helping other people build businesses and built my own. I started it with more confidence than clarity: I hired too fast, priced too low, said yes to the wrong clients and worried about payroll more nights than I'd like to admit.",
      "Slowly, we figured it out. Today Noboru runs growth for brands from first-customer startups to Fortune 500 teams, and the work in the case studies below came out of it.",
    ],
    work: [
      "Performance marketing across Google and Meta, with cost per customer as the number that matters",
      "Launch campaigns, booking platforms and conversion work for new categories",
      "Brand, web and growth for D2C businesses, end to end",
      "Digital experience and technical SEO for enterprise teams",
    ],
    cases: ["case-study-assure-clinic", "case-study-ev-launch", "case-study-fortune-500-conglomerate"],
    website: "https://noboruworld.com",
  },
  {
    slug: "lushful",
    name: "Lushful",
    kind: "founded",
    role: "Co-founder & Managing Director",
    sector: "D2C food, working directly with farmers",
    headline: "A food brand built from zero to ₹2.5 Cr ARR, one decision at a time.",
    story: [
      "Lushful is a direct-to-consumer food brand that works directly with farmers. I co-founded it and run it as Managing Director, which means I own the unit economics, not just the brand.",
      "We built it in one continuous journey: brand foundation and packaging, the website and apps, growth across search, social, email and WhatsApp, and the operations underneath all of it.",
    ],
    work: [
      "Brand foundation and packaging",
      "Website, apps and the order and delivery operations behind them",
      "Growth across SEO, paid search and social, email and WhatsApp",
      "Retention: the repeat customer, not the first one, is the business",
    ],
    metrics: [
      ["₹20L+", "monthly revenue"],
      ["+446%", "monthly orders"],
      ["+87%", "average order value"],
      ["57%", "customer retention"],
    ],
    cases: ["case-study-lushful"],
    quote: ["They became an extension of the internal team.", "Neelabh Singh, Co-founder, Lushful"],
  },
  {
    slug: "filing-buddy",
    name: "Filing Buddy",
    kind: "founded",
    role: "CEO",
    sector: "Compliance and company filings",
    headline: "A compliance business I run as CEO today: boring on purpose, profitable by design.",
    story: [
      "Filing Buddy handles the compliance and filings that every Indian business has to get right and nobody wants to think about. I run it as CEO.",
      "It is the least glamorous of the businesses I've built and the one that taught me the most about recurring revenue, process and the value of doing dull things reliably.",
    ],
    work: [
      "Running the business day to day as CEO",
      "Pricing and packaging recurring compliance services",
      "Building process so the work is done the same way every time",
    ],
    draft: true,
  },
  {
    slug: "pinkfly",
    name: "Pinkfly",
    kind: "founded",
    role: "Founder",
    sector: "Venture",
    headline: "A business I founded. The full story is coming to this page.",
    story: ["Pinkfly is one of the businesses I founded. I'm writing its page the way I write everything here: the real problem, what we tried, what worked and what I'd do differently."],
    work: ["Founder"],
    draft: true,
  },
  {
    slug: "auxman",
    name: "Auxman",
    kind: "founded",
    role: "Founder",
    sector: "Venture",
    headline: "A business I founded. The full story is coming to this page.",
    story: ["Auxman is one of the businesses I founded. Its page will follow the same shape as the rest: the real problem, what we tried, what worked and what I'd do differently."],
    work: ["Founder"],
    draft: true,
  },
  {
    slug: "fundamentals",
    name: "Fundamentals",
    kind: "founded",
    role: "Founder",
    sector: "Venture",
    headline: "A business I founded. The full story is coming to this page.",
    story: ["Fundamentals is one of the businesses I founded. Its page will follow the same shape as the rest: the real problem, what we tried, what worked and what I'd do differently."],
    work: ["Founder"],
    draft: true,
  },
  {
    slug: "sapiens",
    name: "Sapiens",
    kind: "founded",
    role: "Founder",
    sector: "Venture",
    headline: "A business I founded. The full story is coming to this page.",
    story: ["Sapiens is one of the businesses I founded. Its page will follow the same shape as the rest: the real problem, what we tried, what worked and what I'd do differently."],
    work: ["Founder"],
    draft: true,
  },
  {
    slug: "fortune-500",
    name: "Fortune 500 conglomerate",
    kind: "advised",
    role: "Advisor, through Noboru World",
    sector: "Enterprise",
    headline: "Transforming the digital experience of a Fortune 500 conglomerate.",
    story: [
      "Large organisations rarely lack ideas or budget. What they lack is a clear information architecture and the discipline to make a website serve the people who actually use it.",
      "This engagement, delivered through Noboru World, rebuilt the digital experience from the structure up. The full case study is in the Knowledge Hub.",
    ],
    work: ["Information architecture", "UX revamp", "Technical SEO"],
    cases: ["case-study-fortune-500-conglomerate"],
  },
];

export function brandPage(slug: string): BrandPage | undefined {
  return BRAND_PAGES.find((b) => b.slug === slug);
}

export function brandLogo(slug: string): string {
  return HAS_TILE.has(slug) ? tileSrc(slug) : logoSrc(slug, true);
}

export const BRAND_KIND_LABEL: Record<BrandKind, string> = {
  founded: "Built and led",
  advised: "Advised",
  career: "Worked at",
};
