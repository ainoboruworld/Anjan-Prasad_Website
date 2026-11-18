import { defineArrayMember, defineField, defineType } from "sanity";

/**
 * One brand: what shows in the Brands menu and on its own page at
 * /brands/<slug>. Sections on the page appear only when their fields are
 * filled, so a brand can start with a name, logo and a line, and grow.
 */
export const brand = defineType({
  name: "brand",
  title: "Brand",
  type: "document",
  groups: [
    { name: "basics", title: "Basics", default: true },
    { name: "hero", title: "Hero" },
    { name: "about", title: "About" },
    { name: "gallery", title: "Gallery" },
    { name: "info", title: "Information" },
    { name: "cta", title: "Call to action" },
  ],
  fields: [
    defineField({ name: "name", title: "Brand name", type: "string", group: "basics", validation: (r) => r.required() }),
    defineField({
      name: "slug",
      title: "Page URL",
      type: "slug",
      group: "basics",
      options: { source: "name", maxLength: 80 },
      description: "The page lives at /brands/<this>. Generate from the name.",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "reference",
      to: [{ type: "brandCategory" }],
      group: "basics",
      validation: (r) => r.required(),
    }),
    defineField({ name: "published", title: "Published", type: "boolean", group: "basics", initialValue: true, description: "Turn off to hide the brand from the menu, the Brands page and its own URL." }),
    defineField({ name: "order", title: "Display order", type: "number", group: "basics", description: "Lower numbers show first within the category.", initialValue: 10 }),
    defineField({ name: "role", title: "Anjan's role", type: "string", group: "basics", description: 'e.g. "Founder & CEO" or "Advisor, through Noboru World".' }),
    defineField({
      name: "logo",
      title: "Logo",
      type: "image",
      group: "basics",
      description: "Transparent PNG or SVG. Shown on the brand page and as the fallback menu preview.",
      fields: [{ name: "alt", type: "string", title: "Alt text" }],
    }),
    defineField({
      name: "previewImage",
      title: "Menu preview image",
      type: "image",
      group: "basics",
      options: { hotspot: true },
      description: "Shown on the right of the Brands menu when this brand is hovered. Landscape, roughly 4:3. Falls back to the logo.",
      fields: [{ name: "alt", type: "string", title: "Alt text" }],
    }),
    defineField({ name: "shortDescription", title: "Short description", type: "text", rows: 2, group: "hero", description: "One or two sentences under the name on the brand page. Also used for search snippets.", validation: (r) => r.max(220) }),
    defineField({
      name: "heroImage",
      title: "Hero image",
      type: "image",
      group: "hero",
      options: { hotspot: true },
      description: "The large image at the top of the brand page. Landscape, at least 1600 px wide.",
      fields: [{ name: "alt", type: "string", title: "Alt text" }],
    }),
    defineField({ name: "heroCtaLabel", title: "Hero button text", type: "string", group: "hero", description: "Optional, e.g. “Visit website”." }),
    defineField({ name: "heroCtaHref", title: "Hero button link", type: "url", group: "hero", validation: (r) => r.uri({ allowRelative: true, scheme: ["http", "https"] }) }),
    defineField({ name: "aboutHeading", title: "About heading", type: "string", group: "about" }),
    defineField({
      name: "aboutBody",
      title: "About text",
      type: "array",
      group: "about",
      of: [defineArrayMember({ type: "block", styles: [{ title: "Normal", value: "normal" }], lists: [], marks: { decorators: [{ title: "Bold", value: "strong" }, { title: "Italic", value: "em" }], annotations: [] } })],
      description: "What the brand does and why it exists. Two or three short paragraphs read best.",
    }),
    defineField({
      name: "aboutImage",
      title: "About image",
      type: "image",
      group: "about",
      options: { hotspot: true },
      description: "Optional image beside the About text.",
      fields: [{ name: "alt", type: "string", title: "Alt text" }],
    }),
    defineField({
      name: "gallery",
      title: "Gallery",
      type: "array",
      group: "gallery",
      of: [
        defineArrayMember({
          type: "image",
          options: { hotspot: true },
          fields: [
            { name: "alt", type: "string", title: "Alt text" },
            { name: "caption", type: "string", title: "Caption (optional)" },
          ],
        }),
      ],
      description: "Drag to reorder. The first image is shown largest.",
    }),
    defineField({ name: "industry", title: "Industry", type: "string", group: "info" }),
    defineField({ name: "services", title: "Services or offerings", type: "array", of: [{ type: "string" }], group: "info", description: "One per line." }),
    defineField({ name: "positioning", title: "Positioning", type: "text", rows: 3, group: "info", description: "Optional. One short paragraph on how the brand is positioned." }),
    defineField({ name: "website", title: "Website", type: "url", group: "info", validation: (r) => r.uri({ scheme: ["http", "https"] }) }),
    defineField({ name: "ctaHeading", title: "CTA heading", type: "string", group: "cta" }),
    defineField({ name: "ctaDescription", title: "CTA description", type: "text", rows: 2, group: "cta" }),
    defineField({ name: "ctaLabel", title: "CTA button text", type: "string", group: "cta" }),
    defineField({ name: "ctaHref", title: "CTA link", type: "url", group: "cta", validation: (r) => r.uri({ allowRelative: true, scheme: ["http", "https"] }) }),
  ],
  orderings: [{ title: "By order", name: "orderAsc", by: [{ field: "order", direction: "asc" }] }],
  preview: {
    select: { title: "name", subtitle: "category.name", media: "logo", published: "published" },
    prepare({ title, subtitle, media, published }) {
      return { title: `${published === false ? "(unpublished) " : ""}${title ?? "Brand"}`, subtitle, media };
    },
  },
});
