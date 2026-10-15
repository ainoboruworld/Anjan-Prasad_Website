import { defineField, defineType } from "sanity";

/**
 * Per-page SEO: the browser-tab title, the meta description Google shows,
 * and the image used when the page is shared. One document per page.
 * Empty fields keep the built-in defaults.
 */
export const pageSeo = defineType({
  name: "pageSeo",
  title: "Page SEO",
  type: "document",
  fields: [
    defineField({ name: "page", title: "Page", type: "string", readOnly: true }),
    defineField({
      name: "metaTitle",
      title: "Meta title",
      type: "string",
      description: "The browser-tab and Google title. Aim for under 60 characters, with the main keyword early.",
      validation: (r) => r.max(70).warning("Keep under 60–70 characters so Google doesn't cut it off."),
    }),
    defineField({
      name: "metaDescription",
      title: "Meta description",
      type: "text",
      rows: 3,
      description: "The snippet under the title in Google. Aim for 140–160 characters that make a founder click.",
      validation: (r) => r.max(170).warning("Keep under 160 characters so Google doesn't cut it off."),
    }),
    defineField({
      name: "ogImage",
      title: "Share image",
      type: "image",
      description: "Shown when the page is shared on LinkedIn/WhatsApp/X. Upload 1200×630 px (JPG, under 300 KB).",
    }),
  ],
  preview: { select: { title: "page", subtitle: "metaTitle" } },
});
