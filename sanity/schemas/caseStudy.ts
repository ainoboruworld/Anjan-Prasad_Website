import { defineField, defineType } from "sanity";

/**
 * Case-study details attached to a blog post. When `sector` is set the post
 * renders as a case study (metrics band, tags, quote) and is filed under
 * "Case Studies" in the hub.
 */
export const caseStudy = defineType({
  name: "caseStudy",
  title: "Case study details",
  type: "object",
  fields: [
    defineField({ name: "sector", title: "Sector", type: "string", description: "e.g. AgriTech" }),
    defineField({ name: "client", title: "Client", type: "string" }),
    defineField({ name: "logo", title: "Client logo", type: "image" }),
    defineField({ name: "summary", title: "Summary", type: "text", rows: 3 }),
    defineField({
      name: "metrics",
      title: "Metrics",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "value", type: "string", title: "Value" },
            { name: "label", type: "string", title: "Label" },
          ],
        },
      ],
    }),
    defineField({ name: "tags", title: "Tags", type: "array", of: [{ type: "string" }] }),
    defineField({ name: "quoteText", title: "Quote", type: "text", rows: 2 }),
    defineField({ name: "quoteBy", title: "Quote by", type: "string" }),
  ],
});
