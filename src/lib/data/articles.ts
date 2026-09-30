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
  type: "lead" | "p" | "h2" | "quote" | "img";
  text?: string;
  /** For quotes: bold lead-in. */
  strong?: string;
  src?: string;
  alt?: string;
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
  body?: ArticleBlock[];
  sources?: string;
  caseStudy?: CaseStudyDetails;
}

export const ARTICLES: Article[] = [
  {
    slug: "what-every-business-needs-to-get-right",
    title: "Before the idea, the funding or the logo: what every business needs to get right",
    category: "Business",
    date: "5 Oct",
    publishedAt: "2025-10-05",
    readTime: "6 min read",
    excerpt: "Four fundamentals that decide whether a business lasts, long before the logo matters.",
    image: "/images/life-4.jpg",
    kicker: "Business foundations",
    bannerTitle: "Would anyone pay for this, again and again?",
    body: [
      {
        type: "lead",
        text: "The first time I started a business, I spent weeks on the name. Then the logo. Then the website. None of it mattered. What mattered was a question I hadn't asked yet: would anyone pay for this, again and again, at a price that left something over?",
      },
      {
        type: "quote",
        strong: "By the numbers.",
        text: "As many as 90% of Indian startups fail within five years (IBM and Oxford Economics). Among 431 VC-backed shutdowns studied by CB Insights, the top reasons were running out of capital (70%), poor product-market fit (43%) and unsustainable unit economics (19%).",
      },
      { type: "img", src: "/images/article-why-startups-shut-down.jpg", alt: "Why startups shut down" },
      { type: "h2", text: "1. A customer who has a real problem" },
      {
        type: "p",
        text: "Not a market. One specific person with a problem painful enough that they're already trying to solve it, badly. If you can't name three real people who fit, you don't have a customer yet. You have a hope.",
      },
      { type: "h2", text: "2. A margin that survives reality" },
      {
        type: "p",
        text: "Write down every cost of serving one customer once. Then ask: at this price, what's left? Scale multiplies what you have. If what you have is thin, scale makes it thin and large.",
      },
      { type: "img", src: "/images/article-where-100-rupees-go.jpg", alt: "Where ₹100 of revenue goes" },
      { type: "h2", text: "3. Cash that arrives before it leaves" },
      {
        type: "p",
        text: "Profitable businesses still die when money goes out before it comes in. Profit tells you if the business works. Cash tells you if it survives long enough to prove it.",
      },
      { type: "img", src: "/images/article-cash-gap.jpg", alt: "The cash gap" },
      { type: "h2", text: "4. Focus on one thing that works" },
      {
        type: "p",
        text: "Every founder I meet has five promising directions. The ones who build something lasting pick one, make it work, and only then add the next.",
      },
    ],
    sources:
      "Sources: CB Insights, Why startups fail (March 2026); IBM Institute for Business Value and Oxford Economics, via Inc42 (2017).",
  },
  {
    slug: "is-your-idea-worth-pursuing",
    title: "Is your idea worth pursuing? How I test an idea before I put money into it",
    category: "Startup",
    date: "12 Oct",
    publishedAt: "2025-10-12",
    readTime: "7 min read",
    excerpt: "A simple test that saves months of building the wrong thing.",
    image: "/images/life-2.jpg",
    kicker: "Startup",
  },
  {
    slug: "revenue-profit-and-cash-flow",
    title: "Revenue, profit and cash flow: the three numbers I check before any other",
    category: "Business",
    date: "19 Oct",
    publishedAt: "2025-10-19",
    readTime: "6 min read",
    excerpt: "Why a profitable business can still run out of money, and how to see it coming.",
    image: "/images/life-3.jpg",
    kicker: "Business",
  },
  {
    slug: "why-indian-consumers-are-changing-the-way-they-spend",
    title: "Why Indian consumers are changing the way they spend",
    category: "Society",
    date: "26 Oct",
    publishedAt: "2025-10-26",
    readTime: "8 min read",
    excerpt: "What's shifting in Indian spending, and what it means for the brands you build.",
    image: "/images/life-4.jpg",
    kicker: "Society",
  },
  {
    slug: "why-people-choose-one-brand-over-another",
    title: "Why do people choose one brand over another? What running Lushful taught me",
    category: "Marketing",
    date: "2 Nov",
    publishedAt: "2025-11-02",
    readTime: "7 min read",
    excerpt: "The quiet reasons customers stay loyal, learned from running a food brand.",
    image: "/images/life-2.jpg",
    kicker: "Marketing",
  },
  {
    slug: "business-model-vs-revenue-model",
    title: "Business model vs revenue model: how does your business actually make money?",
    category: "Business",
    date: "9 Nov",
    publishedAt: "2025-11-09",
    readTime: "6 min read",
    excerpt: "Two ideas founders mix up, and why getting them straight changes your pricing.",
    image: "/images/life-3.jpg",
    kicker: "Business",
  },
  {
    slug: "do-you-need-a-business-plan",
    title: "Do you need a business plan? What I actually put in mine",
    category: "Business",
    date: "16 Nov",
    publishedAt: "2025-11-16",
    readTime: "5 min read",
    excerpt: "The one-page plan I use instead of a forty-page document nobody reads.",
    image: "/images/life-4.jpg",
    kicker: "Business",
  },
  {
    slug: "what-should-an-mvp-prove",
    title: "What should an MVP actually prove before you build the full product?",
    category: "Startup",
    date: "23 Nov",
    publishedAt: "2025-11-23",
    readTime: "7 min read",
    excerpt: "Build the smallest thing that answers the biggest question.",
    image: "/images/life-2.jpg",
    kicker: "Startup",
  },
  {
    slug: "how-government-policy-shapes-indian-businesses",
    title: "How government policy quietly shapes the way Indian businesses operate",
    category: "Politics",
    date: "1 Feb",
    publishedAt: "2026-02-01",
    readTime: "8 min read",
    excerpt: "Budgets, rules and regulation: the forces most founders notice too late.",
    image: "/images/life-3.jpg",
    kicker: "Politics",
  },
  {
    slug: "the-quiet-hour",
    title: "The quiet hour: what a morning practice taught me about running a business",
    category: "Spirituality",
    date: "8 Mar",
    publishedAt: "2026-03-08",
    readTime: "5 min read",
    excerpt: "Why the calmest founders make the clearest decisions, and how I protect my first hour.",
    image: "/images/life-2.jpg",
    kicker: "Spirituality",
  },
  {
    slug: "case-study-urban-kisaan",
    title: "Supporting the growth behind a $7.5M AgriTech startup",
    category: "Case Studies",
    date: "AgriTech",
    publishedAt: "2025-09-01",
    readTime: "7 min read",
    excerpt: "$2M ARR reached, 42× organic traffic.",
    image: "/images/life-3.jpg",
    kicker: "Case Studies",
    caseStudy: {
      sector: "AgriTech",
      client: "Urban Kisaan",
      logo: "/brand-logos/case-urban-kisaan.png",
      cardMetrics: [["$2M", "ARR reached"], ["42×", "organic traffic"]],
      summary:
        "Before the world noticed Urban Kisaan, we helped shape the story: refining the business model, building an organic presence and supporting the brand into funding readiness and a pivot.",
      metrics: [
        ["$2M", "ARR reached"],
        ["42×", "organic traffic"],
        ["67×", "social growth, 700 to 47K"],
        ["3.7", "ROAS on Google and Meta"],
      ],
      tags: ["Business model and GTM", "Brand and social", "Performance and SEO", "Funding readiness"],
    },
  },
  {
    slug: "case-study-digit-insurance",
    title: "Powering the organic growth behind India's first insurtech unicorn",
    category: "Case Studies",
    date: "InsurTech",
    publishedAt: "2025-08-01",
    readTime: "7 min read",
    excerpt: "20× organic traffic, 68K to 1.5M, 1.5M+ policies sold via organic.",
    image: "/images/life-4.jpg",
    kicker: "Case Studies",
    caseStudy: {
      sector: "InsurTech",
      client: "Digit",
      logo: "/brand-logos/case-digit.png",
      cardMetrics: [["20×", "organic traffic, 68K to 1.5M"], ["1.5M+", "policies sold via organic"]],
      summary:
        "A brand-new website with no authority, up against India's biggest insurers. We built an \"Insurance Simplified\" content engine, established topical authority and won the top of the funnel through an SEO-first strategy.",
      metrics: [
        ["20×", "organic traffic, 68K to 1.5M"],
        ["1.5M+", "policies sold via organic"],
        ["800+", "high-authority pages"],
        ["Zero", "paid ads dependency"],
      ],
      tags: ["SEO strategy", "Content engine", "Topical authority"],
      quote: [
        "Their team adapted quickly, consistently delivering innovative ideas, high-quality execution and timely results.",
        "Bhavuk Khandelwal, VP Marketing, Digit",
      ],
    },
  },
  {
    slug: "case-study-assure-clinic",
    title: "Powering the growth of a ₹100 Cr dermatology brand",
    category: "Case Studies",
    date: "Healthcare",
    publishedAt: "2025-07-01",
    readTime: "7 min read",
    excerpt: "9× revenue growth in 12 months, +300% daily leads.",
    image: "/images/life-2.jpg",
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
  },
  {
    slug: "case-study-lushful",
    title: "Building a D2C brand from zero to ₹2.5 Cr ARR",
    category: "Case Studies",
    date: "D2C",
    publishedAt: "2025-05-01",
    readTime: "7 min read",
    excerpt: "₹20L+ monthly revenue, +446% monthly orders.",
    image: "/images/life-2.jpg",
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
  },
  {
    slug: "case-study-fortune-500-conglomerate",
    title: "Transforming the digital experience of a Fortune 500 conglomerate",
    category: "Case Studies",
    date: "Enterprise",
    publishedAt: "2025-04-01",
    readTime: "7 min read",
    excerpt: "667× search clicks, 142× impressions.",
    image: "/images/life-4.jpg",
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
