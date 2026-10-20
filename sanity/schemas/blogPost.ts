import { defineField, defineType } from "sanity";

/**
 * Blog post — the CMS document editors manage. Supports a featured image,
 * category, scheduled publishing (a future publishedAt hides the post until
 * due), reading time, banner kicker/title and optional case-study details.
 * The website reads these via the projection in src/lib/sanity.ts.
 */
export const blogPost = defineType({
  name: "blogPost",
  title: "Blog Post",
  type: "document",
  fields: [
    defineField({
      name: "hidden",
      title: "Hide from the website",
      type: "boolean",
      description: "When on, this post or case study disappears from the whole site (lists, slideshows and its own page).",
      initialValue: false,
    }),
    defineField({ name: "title", title: "Title", type: "string", validation: (r) => r.required() }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (r) => r.required(),
    }),
    defineField({ name: "category", title: "Category", type: "reference", to: [{ type: "category" }] }),
    defineField({
      name: "publishedAt",
      title: "Published at",
      type: "datetime",
      validation: (r) => r.required(),
      description: "Set a future date to schedule the post.",
    }),
    defineField({ name: "readTime", title: "Read time (minutes)", type: "number" }),
    defineField({ name: "excerpt", title: "Excerpt", type: "text", rows: 3 }),
    defineField({
      name: "featuredImage",
      title: "Featured image — banner (1600 × 700)",
      type: "image",
      options: { hotspot: true },
      description: "Upload 1600×700 px (landscape, JPG, under 400 KB). Shown full width at the top of the article.",
    }),
    defineField({
      name: "cardImage",
      title: "Card thumbnail (900 × 675)",
      type: "image",
      options: { hotspot: true },
      description: "Upload 900×675 px (4:3, JPG, under 200 KB). Shown on Knowledge Hub cards; falls back to the featured image when empty.",
    }),
    defineField({ name: "kicker", title: "Banner kicker", type: "string", description: "e.g. Business foundations" }),
    defineField({ name: "bannerTitle", title: "Banner title", type: "string" }),
    defineField({
      name: "sections",
      title: "Article — sections (paragraphs + image between)",
      type: "array",
      of: [{ type: "articleSection" }],
      description: "The article, section by section: heading, paragraphs, and an optional image that sits between this section and the next.",
    }),
    defineField({
      name: "body",
      title: "Body (older format)",
      type: "blockContent",
      description: "Older single-field format. Used only when the sections above are empty.",
      hidden: ({ document }) => !document?.body && !!(document?.sections as unknown[] | undefined)?.length,
    }),
    defineField({
      name: "metaTitle",
      title: "SEO: meta title",
      type: "string",
      description: "The browser-tab and Google title for this article. Aim for under 60 characters, main keyword early. Empty = the article title.",
      validation: (r) => r.max(70).warning("Keep under 60–70 characters so Google doesn't cut it off."),
    }),
    defineField({
      name: "metaDescription",
      title: "SEO: meta description",
      type: "text",
      rows: 3,
      description: "The snippet under the title in Google. Aim for 140–160 characters. Empty = the excerpt.",
      validation: (r) => r.max(170).warning("Keep under 160 characters so Google doesn't cut it off."),
    }),
    defineField({ name: "sources", title: "Sources", type: "text", rows: 2 }),
    defineField({ name: "caseStudy", title: "Case study details", type: "caseStudy" }),
  ],
  preview: { select: { title: "title", subtitle: "category.title", media: "featuredImage" } },
});
