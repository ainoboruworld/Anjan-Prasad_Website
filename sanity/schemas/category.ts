import { defineField, defineType } from "sanity";

/** Knowledge Hub category: Business, Startup, Marketing, Society, Politics, Spirituality. */
export const category = defineType({
  name: "category",
  title: "Category",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Title", type: "string", validation: (r) => r.required() }),
    defineField({ name: "slug", title: "Slug", type: "slug", options: { source: "title", maxLength: 96 } }),
  ],
});
