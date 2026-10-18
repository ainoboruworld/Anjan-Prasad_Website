import { defineField, defineType } from "sanity";

/**
 * Site settings & default SEO — one document: the site-wide title and
 * description (used wherever a page has no SEO of its own), the default
 * share image, contact email and social links (footer and contact page).
 * Empty fields keep the built-in defaults.
 */
export const siteSeo = defineType({
  name: "siteSeo",
  title: "Site Settings & SEO",
  type: "document",
  fields: [
    defineField({
      name: "metaTitle",
      title: "Default meta title",
      type: "string",
      description: "Site-wide title, also the suffix on inner pages. Keep the main keywords in it.",
    }),
    defineField({ name: "metaDescription", title: "Default meta description", type: "text", rows: 3 }),
    defineField({
      name: "ogImage",
      title: "Default share image (1200 × 630)",
      type: "image",
      description: "Used when a page has no share image of its own. Upload 1200×630 px.",
    }),
    defineField({ name: "email", title: "Contact email", type: "string" }),
    defineField({ name: "linkedin", title: "LinkedIn URL", type: "url" }),
    defineField({ name: "instagram", title: "Instagram URL", type: "url" }),
    defineField({ name: "youtube", title: "YouTube URL", type: "url" }),
    defineField({ name: "substack", title: "Substack URL", type: "url" }),
    defineField({ name: "twitter", title: "Twitter / X URL", type: "url" }),
    defineField({ name: "footerAbout", title: "Footer: about line", type: "text", rows: 3 }),
    defineField({ name: "newsletterHeading", title: "Footer: newsletter heading", type: "string" }),
    defineField({ name: "newsletterText", title: "Footer: newsletter text", type: "text", rows: 2 }),
  ],
  preview: { prepare: () => ({ title: "Site Settings & SEO" }) },
});
