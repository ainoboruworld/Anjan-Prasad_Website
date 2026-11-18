import { defineField, defineType } from "sanity";

/**
 * A full-image banner in the home hero slideshow. The artwork carries its
 * own headline and call to action; the site only shows the image and makes
 * it clickable. Slide 1 (the main hero) stays fixed; banners follow it.
 */
export const heroBanner = defineType({
  name: "heroBanner",
  title: "Hero banner",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Internal name", type: "string", description: "Only shown in the Studio list.", validation: (r) => r.required() }),
    defineField({ name: "enabled", title: "Enabled", type: "boolean", initialValue: true }),
    defineField({ name: "order", title: "Display order", type: "number", description: "Lower numbers show first (after the main hero).", initialValue: 10 }),
    defineField({
      name: "image",
      title: "Banner image (desktop)",
      type: "image",
      description: "The complete banner artwork. 2400 × 1000 px (2.4:1) fits the hero without cropping. JPG or WebP under 400 KB.",
      options: { hotspot: true },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "mobileImage",
      title: "Banner image (mobile)",
      type: "image",
      description: "Optional portrait version for phones. 900 × 1800 px (1:2). Falls back to the desktop image.",
      options: { hotspot: true },
    }),
    defineField({ name: "alt", title: "Alt text", type: "string", description: "The banner's message in one line, for screen readers and SEO.", validation: (r) => r.required() }),
    defineField({
      name: "href",
      title: "Destination link",
      type: "string",
      description: "Where the whole banner leads when clicked, e.g. /business-advisory#capply or a full URL.",
      initialValue: "/business-advisory#capply",
      validation: (r) => r.required(),
    }),
    defineField({ name: "startsAt", title: "Show from", type: "datetime", description: "Optional." }),
    defineField({ name: "endsAt", title: "Show until", type: "datetime", description: "Optional. The banner disappears after this." }),
  ],
  orderings: [{ title: "By order", name: "orderAsc", by: [{ field: "order", direction: "asc" }] }],
  preview: {
    select: { title: "title", subtitle: "href", media: "image", enabled: "enabled" },
    prepare({ title, subtitle, media, enabled }) {
      return { title: `${enabled === false ? "(off) " : ""}${title ?? "Hero banner"}`, subtitle, media };
    },
  },
});
