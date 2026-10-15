import { defineField, defineType } from "sanity";

/**
 * Page Section — one editable section of the website, Pinkfly-style.
 * Every page is broken into sections ("Home · Hero", "About · Beliefs", …).
 * Fields are optional: an empty field keeps the text built into the site.
 * The `key` ties the document to its place on the page; do not change it.
 */
export const pageSection = defineType({
  name: "pageSection",
  title: "Page Section",
  type: "document",
  fields: [
    defineField({ name: "page", title: "Page", type: "string", readOnly: true }),
    defineField({ name: "sectionTitle", title: "Section", type: "string", readOnly: true }),
    defineField({
      name: "key",
      title: "Key (do not change)",
      type: "string",
      readOnly: true,
      description: "Connects this document to its section on the website.",
    }),
    defineField({ name: "label", title: "Small label", type: "string" }),
    defineField({
      name: "heading",
      title: "Heading",
      type: "string",
      description: "Wrap the italic part in *asterisks*, e.g. \"In their *own words.*\"",
    }),
    defineField({ name: "body", title: "Text", type: "text", rows: 4 }),
    defineField({
      name: "image",
      title: "Image (portrait 900 × 1200)",
      type: "image",
      options: { hotspot: true },
      description: "The section's photo, where it has one. Home hero portrait: 900×1200 px. About portraits: 900×1125 px (4:5). JPG or WebP, under 300 KB.",
      fields: [{ name: "alt", type: "string", title: "Alt text", description: "One line describing the image, for SEO and screen readers." }],
    }),
    defineField({
      name: "items",
      title: "Items",
      type: "array",
      description: "The section's list: cards, stats or testimonials. What each field means depends on the section.",
      of: [
        {
          type: "object",
          fields: [
            { name: "title", type: "string", title: "Title / Name" },
            { name: "value", type: "string", title: "Value / Role" },
            { name: "text", type: "text", title: "Text", rows: 3 },
            {
              name: "image",
              type: "image",
              title: "Photo (where the item has one)",
              options: { hotspot: true },
              description: "Off the clock photos: 600×750 px (4:5), JPG, under 150 KB.",
              fields: [{ name: "alt", type: "string", title: "Alt text" }],
            },
          ],
          preview: { select: { title: "title", subtitle: "value" } },
        },
      ],
    }),
  ],
  orderings: [{ title: "By page", name: "pageAsc", by: [{ field: "page", direction: "asc" }] }],
  preview: { select: { title: "sectionTitle", subtitle: "page" } },
});
