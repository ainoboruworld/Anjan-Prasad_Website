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
    defineField({ name: "featuredImage", title: "Featured image", type: "image", options: { hotspot: true } }),
    defineField({ name: "kicker", title: "Banner kicker", type: "string", description: "e.g. Business foundations" }),
    defineField({ name: "bannerTitle", title: "Banner title", type: "string" }),
    defineField({ name: "body", title: "Body", type: "blockContent" }),
    defineField({ name: "sources", title: "Sources", type: "text", rows: 2 }),
    defineField({ name: "caseStudy", title: "Case study details", type: "caseStudy" }),
  ],
  preview: { select: { title: "title", subtitle: "category.title", media: "featuredImage" } },
});
