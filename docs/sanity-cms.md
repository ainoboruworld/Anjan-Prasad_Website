# Sanity CMS

## Filling the Studio the first time (seeding)

Create an API token with **Editor** permissions (sanity.io/manage → API →
Tokens), set it in Vercel as `SANITY_API_TOKEN`, redeploy, then open
`https://your-domain/api/cms-seed?run=1` once in the browser. It copies the
site's current content into the CMS: all blog posts with their images,
the six categories, the five business quotes and the "Site copy" document.
It never overwrites anything that already exists, so it is safe to re-run.

## Instant publish (recommended)

By default the site refreshes CMS content every 5 minutes. For instant
updates: set `SANITY_REVALIDATE_SECRET` in Vercel (any random string),
then in sanity.io/manage → API → Webhooks add a webhook with URL
`https://your-domain/api/revalidate?secret=<that string>`, dataset
`production`, triggered on create, update and delete. Every publish then
shows on the site immediately. Opening that URL in a browser also forces
a refresh by hand.

## What is editable

- **Blog Post** — every article: title, banner and card images, body with
  images between paragraphs.
- **Business Quote** — the rotating quotes on the About page ("How I
  work"); add up to ~50, ordered by the Order field.
- **Site Copy** — the home hero headline and subheadline, and the home
  About section's label, heading and paragraph. Wrap the italic part of a
  heading in *asterisks*. Empty fields keep the built-in text.
- **Category** — blog categories.

Case studies stay code-managed for now (their animated charts cannot be
expressed in the CMS yet).


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
