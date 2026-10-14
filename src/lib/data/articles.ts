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

export interface CaseLineChartData {
  kind: "line";
  title: string;
  note: string;
  points: number[];
  max: number;
  ticks: { v: number; label: string }[];
  startValue: string;
  endValue: string;
  startLabel: string;
  endLabel: string;
}

export interface CaseBarChartData {
  kind: "bars";
  title: string;
  note: string;
  bars: { label: string; value: number; gold?: boolean }[];
  max: number;
  suffix?: string;
}

export type CaseChartData = CaseLineChartData | CaseBarChartData;

export interface ArticleBlock {
  type: "lead" | "p" | "h2" | "quote" | "img" | "chart" | "ul";
  text?: string;
  /** For quotes: bold lead-in. */
  strong?: string;
  src?: string;
  alt?: string;
  /** For chart blocks: the chart definition to render. */
  chart?: CaseChartData;
  /** For list blocks. */
  items?: string[];
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
    slug: "what-every-business-needs-to-get-right",
    title: "Before the idea, the funding or the logo: what every business needs to get right",
    category: "Business",
    date: "5 Oct",
    publishedAt: "2025-10-05",
    readTime: "6 min read",
    excerpt: "Four fundamentals that decide whether a business lasts, long before the logo matters.",
    image: "/images/life-5.jpg",
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
    image: "/images/life-1.jpg",
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
    image: "/images/life-5.jpg",
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
    image: "/images/life-1.jpg",
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
    image: "/images/life-5.jpg",
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
    image: "/images/life-1.jpg",
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
    image: "/images/life-1.jpg",
    kicker: "Spirituality",
  },
  {
    slug: "case-study-urban-kisaan",
    title: "Urban Kisaan: 700 followers to $2M ARR",
    category: "Case Studies",
    date: "AgriTech",
    publishedAt: "2025-09-01",
    readTime: "7 min read",
    excerpt: "$2M ARR reached, 42× organic traffic.",
    image: "/images/case-uk-banner.jpg",
    cardImage: "/images/case-uk-thumb.jpg",
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
    body: [
      {
        type: "lead",
        text: "Urban Kisaan grows fresh produce in vertical hydroponic farms across Indian cities. In twelve months of working together, the company went from 700 Instagram followers and paid-only demand to 47,000 followers, 42 times the organic traffic and $2M ARR.",
      },
      { type: "h2", text: "The challenge" },
      {
        type: "p",
        text: "Urban Kisaan is a Y Combinator W20 agritech startup with real science: pesticide-free greens grown with a fraction of the water, harvested minutes from the customer. But the product was ahead of the story. The model mixed B2B supply, retail kiosks and home delivery, the brand had 700 Instagram followers, and nearly all demand was paid for, click by click.",
      },
      {
        type: "img",
        src: "/images/uk-farm.jpg",
        alt: "Inside an Urban Kisaan vertical hydroponic farm",
      },
      { type: "h2", text: "What we did" },
      {
        type: "p",
        text: "We started at the business model, not the marketing: how Urban Kisaan makes money, which channels deserved focus and what the pitch had to prove. Then we built demand in layers.",
      },
      {
        type: "ul",
        items: [
          "Business model and GTM consulting: sharpened the revenue model, channel focus and the one-line pitch.",
          "Brand and social: content built around the story only Urban Kisaan could tell, urban farming shown from inside the farm.",
          "SEO and content: owned the questions people already ask about hydroponics, clean greens and urban farming.",
          "Performance marketing: Google and Meta campaigns added last, once there was a story for them to land on.",
        ],
      },
      {
        type: "p",
        text: "Social came first. In twelve months the Instagram following grew from 700 to 47,000, a 67 times jump, without buying followers.",
      },
      {
        type: "chart",
        chart: {
          kind: "line",
          title: "Social following",
          note: "Instagram, 700 to 47K followers in 12 months",
          points: [0.7, 1.1, 1.8, 3.0, 4.6, 7.2, 10.5, 15.0, 21.0, 28.5, 37.0, 47.0],
          max: 50,
          ticks: [
            { v: 0, label: "0" },
            { v: 15, label: "15K" },
            { v: 30, label: "30K" },
            { v: 45, label: "45K" },
          ],
          startValue: "700",
          endValue: "47K",
          startLabel: "Month 1",
          endLabel: "Month 12",
        },
      },
      {
        type: "img",
        src: "/images/uk-store.jpg",
        alt: "An Urban Kisaan retail store",
      },
      {
        type: "p",
        text: "Search compounded next. Content answered real questions quarter after quarter, and organic traffic reached 42 times its starting level, demand the company no longer pays for every month.",
      },
      {
        type: "chart",
        chart: {
          kind: "bars",
          title: "Organic traffic",
          note: "Indexed to the starting quarter, 1\u00d7 to 42\u00d7",
          bars: [
            { label: "Q1", value: 1 },
            { label: "Q2", value: 6 },
            { label: "Q3", value: 18 },
            { label: "Q4", value: 42, gold: true },
          ],
          max: 45,
          suffix: "\u00d7",
        },
      },
      {
        type: "img",
        src: "/images/uk-discovery.jpg",
        alt: "Urban Kisaan featured in Discovery Channel's Planet Healers",
      },
      { type: "h2", text: "The results" },
      {
        type: "ul",
        items: [
          "Revenue scaled to $2M ARR with contribution margin up 18%.",
          "Instagram grew from 700 to 47,000 followers in 12 months (67x).",
          "Organic traffic grew 42x from its starting level.",
          "Google and Meta campaigns held a 3.7 ROAS.",
          "The brand supported funding readiness and a pivot, and Discovery Channel featured Urban Kisaan in Planet Healers.",
        ],
      },
      { type: "h2", text: "Key takeaways" },
      {
        type: "ul",
        items: [
          "Fix the business model before spending on marketing; the pitch and unit economics decide what growth is worth buying.",
          "Organic demand compounds; paid demand stops the day you stop paying. Build the first before scaling the second.",
          "A strong story, built on real numbers, earns attention while you still need it.",
        ],
      },
      {
        type: "quote",
        strong: "Anjan:",
        text: "Before the world noticed Urban Kisaan, we helped shape the story.",
      },
    ],
  },
  {
    slug: "case-study-digit-insurance",
    title: "Powering the organic growth behind India's first insurtech unicorn",
    category: "Case Studies",
    date: "InsurTech",
    publishedAt: "2025-08-01",
    readTime: "7 min read",
    excerpt: "20× organic traffic, 68K to 1.5M, 1.5M+ policies sold via organic.",
    image: "/images/life-5.jpg",
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
    body: [
      {
        type: "lead",
        text: "Digit set out to sell insurance online against India's biggest insurers, starting with a brand-new website and no search authority. Organic traffic grew 20 times, from 68K to 1.5M, and over 1.5 million policies were sold through organic alone.",
      },
      { type: "h2", text: "The challenge" },
      {
        type: "p",
        text: "Insurance is one of the most competitive categories in Indian search, dominated by incumbents with decades of authority. Digit had a better product and a simpler story, but no ranking, no topical authority and no time to buy its way in forever.",
      },
      { type: "h2", text: "What we did" },
      {
        type: "ul",
        items: [
          "SEO-first strategy: win the questions people actually ask about insurance, before they know which insurer to pick.",
          "An Insurance Simplified content engine: 800+ high-authority pages that explain policies in plain language.",
          "Topical authority: clusters built subject by subject, so each new page ranked faster than the last.",
        ],
      },
      {
        type: "chart",
        chart: {
          kind: "line",
          title: "Organic traffic",
          note: "Monthly organic visits, 68K to 1.5M",
          points: [0.07, 0.1, 0.16, 0.24, 0.35, 0.48, 0.63, 0.8, 0.98, 1.15, 1.33, 1.5],
          max: 1.6,
          ticks: [
            { v: 0, label: "0" },
            { v: 0.5, label: "0.5M" },
            { v: 1, label: "1M" },
            { v: 1.5, label: "1.5M" },
          ],
          startValue: "68K",
          endValue: "1.5M",
          startLabel: "Start",
          endLabel: "At scale",
        },
      },
      { type: "h2", text: "The results" },
      {
        type: "ul",
        items: [
          "Organic traffic grew 20x, from 68K to 1.5M visits.",
          "1.5M+ policies sold through organic channels.",
          "800+ high-authority pages ranking across the category.",
          "Zero dependency on paid ads for top-of-funnel demand.",
        ],
      },
      { type: "h2", text: "Key takeaways" },
      {
        type: "ul",
        items: [
          "In a category where trust decides, education outranks advertising.",
          "Topical authority compounds: each cluster makes the next one rank faster.",
          "Organic demand is an asset on the balance sheet; paid demand is an expense.",
        ],
      },
    ],
  },
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
      {
        type: "chart",
        chart: {
          kind: "bars",
          title: "Revenue growth",
          note: "Indexed by quarter over 12 months, 1\u00d7 to 9\u00d7",
          bars: [
            { label: "Q1", value: 1 },
            { label: "Q2", value: 3 },
            { label: "Q3", value: 6 },
            { label: "Q4", value: 9, gold: true },
          ],
          max: 10,
          suffix: "\u00d7",
        },
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
      {
        type: "chart",
        chart: {
          kind: "bars",
          title: "Cost per lead",
          note: "Indexed to pre-launch benchmark, down 62%",
          bars: [
            { label: "Benchmark", value: 100 },
            { label: "At launch", value: 38, gold: true },
          ],
          max: 110,
        },
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
      {
        type: "chart",
        chart: {
          kind: "line",
          title: "Annual recurring revenue",
          note: "From zero to \u20b92.5 Cr ARR",
          points: [0, 0.1, 0.25, 0.45, 0.7, 0.95, 1.2, 1.5, 1.8, 2.05, 2.3, 2.5],
          max: 2.75,
          ticks: [
            { v: 0, label: "0" },
            { v: 1, label: "\u20b91 Cr" },
            { v: 2, label: "\u20b92 Cr" },
          ],
          startValue: "0",
          endValue: "\u20b92.5 Cr",
          startLabel: "Launch",
          endLabel: "At scale",
        },
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
      {
        type: "chart",
        chart: {
          kind: "bars",
          title: "Technical issues",
          note: "Indexed to the audit baseline, down 96.6%",
          bars: [
            { label: "At audit", value: 100 },
            { label: "After cleanup", value: 3, gold: true },
          ],
          max: 110,
        },
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
