# Sanity CMS — Knowledge Hub

Schemas live in `sanity/schemas/`: `blogPost`, `category`, `blockContent`
and the `caseStudy` object. Start the Studio with `npm run studio`.

The website reads published posts (`publishedAt <= now()`) through
`src/lib/sanity.ts`, revalidated every five minutes, and merges them over the
seed content in `src/lib/data/articles.ts`. A post with case-study details
(`caseStudy.sector`) is filed under "Case Studies" and renders the metrics
band, tags and quote.

Suggested categories: Business, Startup, Marketing, Society, Politics,
Spirituality.
