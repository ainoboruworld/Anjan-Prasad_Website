import { defineField, defineType } from "sanity";

/**
 * Site copy — one document holding the most-edited lines on the website.
 * Every field is optional: an empty field keeps the text currently built
 * into the site, so nothing can break by leaving things blank.
 */
export const siteCopy = defineType({
  name: "siteCopy",
  title: "Site Copy",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Internal name",
      type: "string",
      initialValue: "Site copy",
      readOnly: true,
    }),
    defineField({
      name: "heroTitle",
      title: "Home hero: headline",
      type: "string",
      description: 'Current: "Build a Business That Outlasts You." The part after the last comma-free break goes italic automatically if you wrap it in *asterisks*, e.g. "Build a Business That *Outlasts You.*"',
    }),
    defineField({
      name: "heroSubheadline",
      title: "Home hero: subheadline",
      type: "text",
      rows: 3,
      description: "The paragraph under the headline.",
    }),
    defineField({
      name: "aboutLabel",
      title: "Home about: small label",
      type: "string",
      description: 'Current: "Serial entrepreneur. Three times from zero, and counting."',
    }),
    defineField({
      name: "aboutHeading",
      title: "Home about: heading",
      type: "string",
      description: 'Wrap the italic part in *asterisks*, e.g. "I don\'t study businesses. *I run them.*"',
    }),
    defineField({
      name: "aboutBody",
      title: "Home about: paragraph",
      type: "text",
      rows: 5,
    }),
  ],
  preview: { prepare: () => ({ title: "Site copy", subtitle: "Hero and home about text" }) },
});
