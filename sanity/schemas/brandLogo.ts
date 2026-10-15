import { defineField, defineType } from "sanity";

/**
 * One brand logo on the trust wall. Groups: Ventures (with a role line),
 * Companies advised, Career, Faculty. Upload the muted/tinted version as
 * the main logo and optionally a full-colour version shown on hover.
 */
export const brandLogo = defineType({
  name: "brandLogo",
  title: "Brand Logo",
  type: "document",
  fields: [
    defineField({ name: "name", title: "Brand name", type: "string", validation: (r) => r.required() }),
    defineField({
      name: "group",
      title: "Group",
      type: "string",
      options: {
        list: [
          { title: "Ventures (built and led)", value: "ventures" },
          { title: "Companies advised", value: "advised" },
          { title: "Career (worked at)", value: "career" },
          { title: "Faculty (teaches at)", value: "faculty" },
        ],
      },
      validation: (r) => r.required(),
    }),
    defineField({ name: "role", title: "Role line (Ventures only)", type: "string", description: 'e.g. "01 · Founder & CEO"' }),
    defineField({
      name: "logo",
      title: "Logo — muted/tinted (150 × 44)",
      type: "image",
      description: "Transparent PNG fitted to a 150×44 px box, under 50 KB. This is what shows by default.",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "colourLogo",
      title: "Logo — full colour, shown on hover (150 × 44)",
      type: "image",
      description: "Optional. Same 150×44 px box as the muted version, transparent PNG under 50 KB.",
    }),
    defineField({ name: "order", title: "Order", type: "number", description: "Lower numbers show first within the group." }),
  ],
  orderings: [{ title: "By group", name: "groupAsc", by: [{ field: "group", direction: "asc" }, { field: "order", direction: "asc" }] }],
  preview: { select: { title: "name", subtitle: "group", media: "logo" } },
});
