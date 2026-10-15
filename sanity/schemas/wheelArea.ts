import { defineField, defineType } from "sanity";

/**
 * One of the nine 360° areas, shown on the home wheel and the advisory
 * picker. The key ties the document to its position and icon; the texts
 * are fully editable. Empty fields keep the built-in text.
 */
export const wheelArea = defineType({
  name: "wheelArea",
  title: "360° Area",
  type: "document",
  fields: [
    defineField({ name: "key", title: "Key (do not change)", type: "string", readOnly: true }),
    defineField({ name: "name", title: "Area name", type: "string", description: 'e.g. "Technology"' }),
    defineField({ name: "stat", title: "Stat line", type: "text", rows: 2, description: "The punchy one-line stat on the home wheel." }),
    defineField({ name: "headline", title: "Headline (My view)", type: "text", rows: 2 }),
    defineField({ name: "note", title: "Personal note", type: "text", rows: 4, description: "The story behind the view, signed Anjan." }),
    defineField({
      name: "points",
      title: "Three points",
      type: "array",
      of: [{ type: "text", rows: 2 }],
      description: "The trap, the method, the proof.",
      validation: (r) => r.max(3),
    }),
  ],
  preview: { select: { title: "name", subtitle: "key" } },
});
