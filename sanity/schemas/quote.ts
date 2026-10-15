import { defineField, defineType } from "sanity";

/** One business quote for the About page slideshow ("How I work"). */
export const quote = defineType({
  name: "quote",
  title: "Business Quote",
  type: "document",
  fields: [
    defineField({
      name: "lead",
      title: "First part",
      type: "string",
      description: 'Shown in regular type, e.g. "Revenue is opinion."',
      validation: (r) => r.required(),
    }),
    defineField({
      name: "emphasis",
      title: "Second part (italic)",
      type: "string",
      description: 'Shown in italics after the first part, e.g. "Cash in the bank is fact."',
      validation: (r) => r.required(),
    }),
    defineField({
      name: "order",
      title: "Order",
      type: "number",
      description: "Lower numbers show first. Leave empty to show after the ordered ones.",
    }),
  ],
  orderings: [{ title: "By order", name: "orderAsc", by: [{ field: "order", direction: "asc" }] }],
  preview: { select: { title: "lead", subtitle: "emphasis" } },
});
