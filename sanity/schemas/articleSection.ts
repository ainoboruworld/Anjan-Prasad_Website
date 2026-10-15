import { defineArrayMember, defineField, defineType } from "sanity";

/**
 * One section of an article, Pinkfly-style: a heading, the paragraphs,
 * and an optional image that sits below them. An article is a list of
 * these, so images always land between two blocks of text.
 */
export const articleSection = defineType({
  name: "articleSection",
  title: "Article section",
  type: "object",
  fields: [
    defineField({
      name: "heading",
      title: "Section heading",
      type: "string",
      description: 'The H2 above this section, e.g. "The challenge". It also builds the "In this article" box. Leave empty for a section with no heading.',
    }),
    defineField({
      name: "text",
      title: "Article — the paragraphs",
      type: "array",
      description: "The section's paragraphs. Highlight text for bold, italic or a link; bulleted and numbered lists are supported.",
      of: [
        defineArrayMember({
          type: "block",
          styles: [
            { title: "Normal", value: "normal" },
            { title: "Quote", value: "blockquote" },
          ],
          lists: [
            { title: "Bulleted", value: "bullet" },
            { title: "Numbered", value: "number" },
          ],
          marks: {
            decorators: [
              { title: "Bold", value: "strong" },
              { title: "Italic", value: "em" },
            ],
            annotations: [
              { name: "link", type: "object", title: "Link", fields: [{ name: "href", type: "url", title: "URL" }] },
            ],
          },
        }),
      ],
    }),
    defineField({
      name: "image",
      title: "Image — below the paragraphs (1200 × 700)",
      type: "image",
      options: { hotspot: true },
      description: "Landscape, 1200×700 px, JPG under 300 KB. Sits between this section's paragraphs and the next section. Leave empty for a section with no picture.",
      fields: [
        { name: "alt", type: "string", title: "Alt text", description: "One line describing the image, for SEO and screen readers." },
        { name: "caption", type: "string", title: "Caption (optional)", description: "Short line shown under the image." },
      ],
    }),
  ],
  preview: {
    select: { title: "heading", media: "image" },
    prepare: ({ title, media }) => ({ title: title || "Section (no heading)", media }),
  },
});
