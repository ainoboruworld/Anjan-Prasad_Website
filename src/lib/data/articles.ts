/**
 * Knowledge Hub seed content. When Sanity is configured, published posts
 * from the CMS take precedence (see src/lib/sanity.ts); these entries keep
 * the hub, the article pages and the home teaser working before then.
 */

export type ArticleCategory =
  | "Business"
  | "Startup"
  | "Marketing"
  | "Society"
  | "Politics"
  | "Spirituality"
  | "Case Studies";

export const CATEGORIES: ArticleCategory[] = [
  "Case Studies",
  "Business",
  "Startup",
  "Marketing",
  "Society",
  "Politics",
  "Spirituality",
];

export interface CaseStudyDetails {
  /** Sector label shown on the card, e.g. "AgriTech". */
  sector: string;
  /** Client name used when no logo exists. */
  client: string;
  /** Small logo shown on the home case cards (optional). */
  logo?: string;
  /** The two headline metrics on the home card. */
  cardMetrics: [[string, string], [string, string]];
  summary: string;
  metrics: [string, string][];
  tags: string[];
  quote?: [string, string];
}

export interface ArticleBlock {
  type: "lead" | "p" | "h2" | "quote" | "img" | "imgs" | "ul";
  text?: string;
  /** For quotes: bold lead-in. */
  strong?: string;
  src?: string;
  alt?: string;
  /** For list blocks. */
  items?: string[];
  /** For image-pair blocks: shown side by side at crisp size. */
  images?: { src: string; alt: string }[];
}

export interface Article {
  slug: string;
  title: string;
  category: ArticleCategory;
  /** Short date label as designed ("5 Oct"). */
  date: string;
  /** ISO date used for sorting, sitemap and metadata. */
  publishedAt: string;
  readTime: string;
  excerpt: string;
  image: string;
  /** Kicker shown on the article banner. */
  kicker: string;
  /** Banner title (falls back to excerpt). */
  bannerTitle?: string;
  /** Card thumbnail when it should differ from the banner image. */
  cardImage?: string;
  body?: ArticleBlock[];
  sources?: string;
  caseStudy?: CaseStudyDetails;
}

export const ARTICLES: Article[] = [
  {
    slug: "case-study-assure-clinic",
    title: "Powering the growth of a ₹100 Cr dermatology brand",
    category: "Case Studies",
    date: "Healthcare",
    publishedAt: "2025-07-01",
    readTime: "7 min read",
    excerpt: "9× revenue growth in 12 months, +300% daily leads.",
    image: "/images/life-1.jpg",
    kicker: "Case Studies",
    caseStudy: {
      sector: "Healthcare",
      client: "Assure Clinic",
      cardMetrics: [["9×", "revenue growth in 12 months"], ["+300%", "daily leads"]],
      summary:
        "As Assure expanded into new markets, we built a performance engine that raised patient inquiries and lowered acquisition costs, supporting its growth to 13 outlets and a ₹15 Cr raise.",
      metrics: [
        ["9×", "revenue growth in 12 months"],
        ["+300%", "daily leads"],
        ["−55%", "cost per customer"],
        ["3.4", "ROAS on Google and Meta"],
      ],
      tags: ["Performance marketing", "PPC", "Social campaigns"],
      quote: ["Noboru helped us attract more patients, reduce ad costs and grow our clinic.", "Dr. Priyanka, Assure Clinic"],
    },
    body: [
      {
        type: "lead",
        text: "Assure Clinic, a dermatology and hair-transplant brand, needed patient demand to keep pace with its expansion. In twelve months revenue grew 9 times, daily leads rose 300% and cost per customer fell 55%.",
      },
      { type: "h2", text: "The challenge" },
      {
        type: "p",
        text: "Healthcare marketing punishes waste: every wrong click is expensive, and trust decides who a patient calls. Assure was expanding into new cities and needed inquiries to grow faster than ad spend.",
      },
      { type: "h2", text: "What we did" },
      {
        type: "ul",
        items: [
          "A performance engine across Google and Meta, tuned city by city.",
          "PPC built around high-intent treatment searches, not generic awareness.",
          "Social campaigns with real doctors and real outcomes, because proof converts in healthcare.",
        ],
      },
      { type: "h2", text: "The results" },
      {
        type: "ul",
        items: [
          "Revenue grew 9x in twelve months.",
          "Daily leads rose 300% while cost per customer fell 55%.",
          "Campaigns held a 3.4 ROAS on Google and Meta.",
          "The growth supported expansion to 13 outlets and a \u20b915 Cr raise.",
        ],
      },
      { type: "h2", text: "Key takeaways" },
      {
        type: "ul",
        items: [
          "In healthcare, intent beats reach: a hundred right clicks outperform a million wrong ones.",
          "Falling acquisition cost is what lets growth fund itself.",
          "Proof sells: real doctors and real outcomes convert better than any creative.",
        ],
      },
    ],
  },
  {
    slug: "case-study-ev-launch",
    title: "Powering the digital launch behind 5,000 EV bookings in 4 days",
    category: "Case Studies",
    date: "Electric mobility",
    publishedAt: "2025-06-01",
    readTime: "7 min read",
    excerpt: "9× return on ad spend, −62% cost per lead.",
    image: "/images/life-3.jpg",
    kicker: "Case Studies",
    caseStudy: {
      sector: "Electric mobility",
      client: "EV launch",
      cardMetrics: [["9×", "return on ad spend"], ["−62%", "cost per lead"]],
      summary:
        "Build trust in a new category, create nationwide demand and convert it into bookings. We built the brand, the booking platform and the launch campaigns, and the company went on to attract a $50M strategic investment.",
      metrics: [
        ["9×", "return on ad spend"],
        ["−62%", "cost per lead"],
        ["18M+", "impressions"],
        ["+65%", "brand search"],
      ],
      tags: ["Brand identity", "Booking platform", "Launch campaigns", "CRO"],
    },
    body: [
      {
        type: "lead",
        text: "A new electric mobility brand had to earn trust in a category most Indians had never bought into, and convert it fast. The launch took 5,000 bookings in 4 days at a 9\u00d7 return on ad spend.",
      },
      { type: "h2", text: "The challenge" },
      {
        type: "p",
        text: "No brand, no bookings platform, no existing demand, and a launch date. Everything from identity to checkout had to be built, then filled, in one run-up.",
      },
      { type: "h2", text: "What we did" },
      {
        type: "ul",
        items: [
          "Brand identity built for a first-time category: simple claims, visible proof.",
          "A booking platform designed around one job, taking a deposit in minutes.",
          "Launch campaigns sequenced from awareness to booking, with CRO on every step.",
        ],
      },
      { type: "h2", text: "The results" },
      {
        type: "ul",
        items: [
          "5,000 bookings in the first 4 days.",
          "9\u00d7 return on ad spend, with cost per lead down 62%.",
          "18M+ impressions and brand search up 65%.",
          "The company went on to attract a $50M strategic investment.",
        ],
      },
      { type: "h2", text: "Key takeaways" },
      {
        type: "ul",
        items: [
          "A launch is a system: brand, platform and campaigns fail separately, win together.",
          "In a new category, reducing friction converts better than raising volume.",
          "Early proof of demand is what investors actually buy.",
        ],
      },
    ],
  },
  {
    slug: "case-study-lushful",
    title: "Building a D2C brand from zero to ₹2.5 Cr ARR",
    category: "Case Studies",
    date: "D2C",
    publishedAt: "2025-05-01",
    readTime: "7 min read",
    excerpt: "₹20L+ monthly revenue, +446% monthly orders.",
    image: "/images/life-1.jpg",
    kicker: "Case Studies",
    caseStudy: {
      sector: "D2C",
      client: "Lushful",
      logo: "/brand-logos/case-lushful.png",
      cardMetrics: [["₹20L+", "monthly revenue"], ["+446%", "monthly orders"]],
      summary:
        "One journey, end to end: brand foundation, website and apps, growth across search, social, email and WhatsApp, and the operations underneath.",
      metrics: [
        ["₹20L+", "monthly revenue"],
        ["+446%", "monthly orders"],
        ["+87%", "average order value"],
        ["57%", "customer retention"],
      ],
      tags: ["Brand and packaging", "Web and apps", "SEO and ads", "CRM and ops"],
      quote: ["They became an extension of the internal team.", "Neelabh Singh, Co-founder, Lushful"],
    },
    body: [
      {
        type: "lead",
        text: "Lushful is a D2C food brand built from zero: brand, website, apps, growth and operations, one journey end to end. It reached \u20b92.5 Cr ARR with \u20b920L+ monthly revenue and 57% customer retention.",
      },
      { type: "h2", text: "The challenge" },
      {
        type: "p",
        text: "D2C food is a margin game played against giants. A new brand has to win trust on the first order and make money on the repeat, or the economics never work.",
      },
      { type: "h2", text: "What we did" },
      {
        type: "ul",
        items: [
          "Brand and packaging that earn the first order on the shelf and the screen.",
          "A website and apps built for reorders, not just first purchases.",
          "Growth across search, social, email and WhatsApp, each channel paying its way.",
          "CRM and operations underneath, because retention is an operations problem too.",
        ],
      },
      { type: "h2", text: "The results" },
      {
        type: "ul",
        items: [
          "\u20b920L+ monthly revenue, \u20b92.5 Cr ARR.",
          "Monthly orders up 446% and average order value up 87%.",
          "57% customer retention, rare in D2C food.",
        ],
      },
      { type: "h2", text: "Key takeaways" },
      {
        type: "ul",
        items: [
          "In D2C the first order is marketing; the second order is the business.",
          "Retention is built in operations and CRM, not in ads.",
          "Owning the full stack, brand to delivery, is what protects the margin.",
        ],
      },
    ],
  },
  {
    slug: "case-study-fortune-500-conglomerate",
    title: "Transforming the digital experience of a Fortune 500 conglomerate",
    category: "Case Studies",
    date: "Enterprise",
    publishedAt: "2025-04-01",
    readTime: "7 min read",
    excerpt: "667× search clicks, 142× impressions.",
    image: "/images/life-5.jpg",
    kicker: "Case Studies",
    caseStudy: {
      sector: "Enterprise",
      client: "Fortune 500",
      cardMetrics: [["667×", "search clicks"], ["142×", "impressions"]],
      summary:
        "Hundreds of competing pages and thousands of technical issues. We restructured 500+ URLs, redesigned key journeys and built a search visibility engine.",
      metrics: [
        ["667×", "search clicks"],
        ["142×", "impressions"],
        ["−96.6%", "technical issues"],
        ["221", "URLs ranking #1"],
      ],
      tags: ["Information architecture", "UX revamp", "Technical SEO"],
    },
    body: [
      {
        type: "lead",
        text: "A Fortune 500 conglomerate's digital estate had grown into hundreds of competing pages and thousands of technical issues. After restructuring, search clicks grew 667 times and 221 URLs rank #1.",
      },
      { type: "h2", text: "The challenge" },
      {
        type: "p",
        text: "At enterprise scale the problem is rarely content, it is structure: pages competing with each other, journeys that dead-end and technical debt that keeps search engines from trusting the site.",
      },
      { type: "h2", text: "What we did" },
      {
        type: "ul",
        items: [
          "Information architecture: 500+ URLs restructured so every page has one job.",
          "UX revamp of the key journeys people actually take.",
          "Technical SEO at scale, clearing 96.6% of the issues holding rankings back.",
        ],
      },
      { type: "h2", text: "The results" },
      {
        type: "ul",
        items: [
          "Search clicks grew 667x and impressions 142x.",
          "221 URLs now rank #1 for their queries.",
          "Technical issues down 96.6% from the audit baseline.",
        ],
      },
      { type: "h2", text: "Key takeaways" },
      {
        type: "ul",
        items: [
          "At enterprise scale, structure beats content volume.",
          "Pages that compete with each other rank worse than fewer pages with one job each.",
          "Technical debt is invisible until you clear it; then everything built on top starts working.",
        ],
      },
    ],
  },
];

export const CASE_STUDIES = ARTICLES.filter((a) => a.caseStudy);

/** Label under the card: "Business · 5 Oct" or "Case study · AgriTech". */
export function articleMeta(a: Article): string {
  return a.caseStudy ? `Case study · ${a.caseStudy.sector}` : `${a.category} · ${a.date}`;
}

/**
 * Split a title at the first ": " or "? " so the second half renders in
 * italic serif, exactly as the design does.
 */
export function splitTitle(title: string): { head: string; tail: string | null } {
  const m = title.match(/^(.*?[:?])\s(.+)$/);
  if (!m) return { head: title, tail: null };
  return { head: m[1] + " ", tail: m[2] };
}

export function articleHref(slug: string): string {
  return `/knowledge-hub/${slug}`;
}
