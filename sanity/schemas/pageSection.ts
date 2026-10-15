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
          ],
          preview: { select: { title: "title", subtitle: "value" } },
        },
      ],
    }),
  ],
  orderings: [{ title: "By page", name: "pageAsc", by: [{ field: "page", direction: "asc" }] }],
  preview: { select: { title: "sectionTitle", subtitle: "page" } },
});
