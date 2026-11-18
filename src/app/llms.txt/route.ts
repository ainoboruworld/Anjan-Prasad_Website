import { getAllBrands } from "@/lib/brands";
import { ARTICLES } from "@/lib/data/articles";
import { env } from "@/lib/env";

/** llms.txt: a plain-text map of the site for AI crawlers and assistants. */
export async function GET() {
  const brands = await getAllBrands();
  const site = env.siteUrl.replace(/\/$/, "");
  const lines = [
    "# Anjan Prasad",
    "",
    "> Business consultant, business advisor and mentor to founders and business owners in India. Seventeen plus years building and advising profitable businesses: founder & CEO of Noboru World, co-founder of Lushful, CEO of Filing Buddy. Teaches at IIFT and IMT Ghaziabad.",
    "",
    "Anjan works one-to-one with founders on the decisions that shape a business: pricing, unit economics, go-to-market, growth, hiring and operations. He takes on a small number of advisory clients and mentees and replies personally to every request.",
    "",
    "## Programs",
    `- [Business Advisory](${site}/business-advisory): one-to-one consulting for founders and owners, from a single session to an ongoing seat at the table.`,
    `- [Business Coaching](${site}/business-coaching): regular one-to-one sessions to sharpen how a founder leads and decides.`,
    `- [Mentorship](${site}/mentorship): long-term mentorship for a small number of early-stage founders.`,
    `- [Workshops](${site}/workshops): half-day and full-day sessions for teams and cohorts.`,
    `- [Speaking](${site}/speaking): podcasts, business schools and events.`,
    "",
    "## Brands built, led and advised",
    ...brands.map((b) => `- [${b.name}](${site}/brands/${b.slug}): ${[b.role, b.shortDescription].filter(Boolean).join(". ")}`),
    "",
    "## Case studies and articles",
    ...ARTICLES.map((a) => `- [${a.title}](${site}/knowledge-hub/${a.slug}): ${a.excerpt}`),
    "",
    "## Resources",
    `- [The 7 questions I ask before a first call](${site}/resources/first-call-questions): a one-page checklist for founders.`,
    `- [About Anjan](${site}/about)`,
    `- [Contact](${site}/contact)`,
    "",
    "## Optional",
    `- [Sitemap](${site}/sitemap.xml)`,
    `- [Privacy](${site}/privacy)`,
  ];
  return new Response(lines.join("\n"), {
    headers: { "content-type": "text/plain; charset=utf-8", "cache-control": "public, max-age=3600" },
  });
}
