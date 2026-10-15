# Sanity CMS — Knowledge Hub

All blog posts and case studies are edited in Sanity Studio: `npm run studio`
(or deploy the studio and edit from the browser). Schemas live in
`sanity/schemas/`: `blogPost`, `category`, `blockContent` and the
`caseStudy` object.

Set `NEXT_PUBLIC_SANITY_PROJECT_ID` (plus dataset / api version) in Vercel.
The site fetches published posts (`publishedAt <= now()`) every five
minutes and merges them over the seed content in
`src/lib/data/articles.ts`, so a CMS post with the same slug replaces the
seed version.

## Writing a post (the blog format)

The body is paragraphs with images between them, like a long-form guide:

1. Write short paragraphs (Normal style). Use **H2** for each section — the
   H2s automatically build the "In this article" box at the top of the post.
2. Insert an image between two paragraphs wherever it helps. Give it alt
   text and an optional caption.
3. Quote style renders as a pull quote; bullet and numbered lists are
   supported.

## Image sizes (shown in the Studio on each field)

- **Featured image (banner):** 1600×700 px, JPG, under 400 KB.
- **Card thumbnail:** 900×675 px (4:3), JPG, under 200 KB. Optional; falls
  back to the banner.
- **Images inside the body:** 1200×700 px, JPG, under 300 KB.

## Case studies

Fill the "Case study details" object (sector, metrics, tags, quote) and the
post files under Case Studies with the metrics band on top. Charts are
currently seed-only (defined in `src/lib/data/articles.ts`).

Suggested categories: Business, Startup, Marketing, Society, Politics,
Spirituality.
