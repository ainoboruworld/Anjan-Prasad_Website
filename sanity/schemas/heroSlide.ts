import { defineField, defineType } from "sanity";

/**
 * One extra banner in the home hero slideshow. The first slide is always
 * the Home → Hero section; these documents follow it, in `order`.
 */
export const heroSlide = defineType({
  name: "heroSlide",
  title: "Hero slide",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Internal name", type: "string", description: "Only shown in the Studio list.", validation: (r) => r.required() }),
    defineField({ name: "enabled", title: "Enabled", type: "boolean", initialValue: true }),
    defineField({ name: "order", title: "Order", type: "number", description: "Lower numbers show first (after the main hero).", initialValue: 10 }),
    defineField({ name: "eyebrow", title: "Small label above the heading", type: "string", description: "Optional, e.g. “Limited · November”." }),
    defineField({
      name: "heading",
      title: "Heading",
      type: "string",
      description: "Wrap the part to show in blue italic in asterisks, e.g. Founder’s Diagnostic: *five seats this month.*",
      validation: (r) => r.required(),
    }),
    defineField({ name: "body", title: "Text", type: "text", rows: 3 }),
    defineField({ name: "ctaLabel", title: "Button label", type: "string", initialValue: "Book a consultation" }),
    defineField({ name: "ctaHref", title: "Button link", type: "string", initialValue: "/business-advisory#capply", description: "A path like /mentorship or a full URL." }),
    defineField({
      name: "image",
      title: "Image",
      type: "image",
      options: { hotspot: true },
      description: "Optional. A cut-out on a transparent background works best on the arch. Leave empty to keep Anjan’s portrait.",
      fields: [{ name: "alt", type: "string", title: "Alt text" }],
    }),
    defineField({
      name: "align",
      title: "Text alignment",
      type: "string",
      options: { list: [{ title: "Left (default)", value: "left" }, { title: "Centre", value: "center" }], layout: "radio" },
      initialValue: "left",
    }),
    defineField({
      name: "imageSide",
      title: "Image side",
      type: "string",
      options: { list: [{ title: "Right (default)", value: "right" }, { title: "Left", value: "left" }], layout: "radio" },
      initialValue: "right",
    }),
    defineField({ name: "startsAt", title: "Show from", type: "datetime", description: "Optional. Leave empty to show immediately." }),
    defineField({ name: "endsAt", title: "Show until", type: "datetime", description: "Optional. The slide disappears after this." }),
  ],
  orderings: [{ title: "By order", name: "orderAsc", by: [{ field: "order", direction: "asc" }] }],
  preview: {
    select: { title: "title", subtitle: "heading", media: "image", enabled: "enabled" },
    prepare({ title, subtitle, media, enabled }) {
      return { title: `${enabled === false ? "(off) " : ""}${title ?? "Hero slide"}`, subtitle, media };
    },
  },
});
