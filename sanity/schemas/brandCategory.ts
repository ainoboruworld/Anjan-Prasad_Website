import { defineField, defineType } from "sanity";

/** A group in the Brands menu, e.g. "Brands built" or "Brands advised". */
export const brandCategory = defineType({
  name: "brandCategory",
  title: "Brand category",
  type: "document",
  fields: [
    defineField({ name: "name", title: "Category name", type: "string", validation: (r) => r.required() }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "name", maxLength: 60 },
      description: "Used internally and in links. Generate from the name.",
      validation: (r) => r.required(),
    }),
    defineField({ name: "order", title: "Display order", type: "number", description: "Lower numbers show first.", initialValue: 10 }),
    defineField({ name: "active", title: "Active", type: "boolean", initialValue: true, description: "Inactive categories, and their brands, are hidden from the site." }),
  ],
  orderings: [{ title: "By order", name: "orderAsc", by: [{ field: "order", direction: "asc" }] }],
  preview: {
    select: { title: "name", active: "active" },
    prepare({ title, active }) {
      return { title: `${active === false ? "(inactive) " : ""}${title ?? "Category"}` };
    },
  },
});
