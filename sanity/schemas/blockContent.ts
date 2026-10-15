import { defineArrayMember, defineType } from "sanity";

/** Portable Text body: paragraphs, H2s, pull quotes and inline images. */
export const blockContent = defineType({
  name: "blockContent",
  title: "Body",
  type: "array",
  of: [
    defineArrayMember({
      type: "block",
      styles: [
        { title: "Normal", value: "normal" },
        { title: "H2", value: "h2" },
        { title: "H3", value: "h3" },
        { title: "Quote", value: "blockquote" },
      ],
      marks: {
        decorators: [
          { title: "Strong", value: "strong" },
          { title: "Emphasis", value: "em" },
        ],
        annotations: [
          {
            name: "link",
            type: "object",
            title: "Link",
            fields: [{ name: "href", type: "url", title: "URL" }],
          },
        ],
      },
    }),
    defineArrayMember({
      type: "image",
      options: { hotspot: true },
      description: "Upload 1200×700 px (landscape, JPG, under 300 KB). Place between two paragraphs; it renders centered at reading width.",
      fields: [
        { name: "alt", type: "string", title: "Alt text", description: "One line describing the image, for SEO and screen readers." },
        { name: "caption", type: "string", title: "Caption (optional)", description: "Short line shown under the image." },
      ],
    }),
  ],
});
