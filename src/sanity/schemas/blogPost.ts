import { defineField, defineType } from "sanity";

export default defineType({
  name: "blogPost",
  title: "Blog Post",
  type: "document",
  fields: [
    defineField({
      name: "titleFr",
      title: "Titre (FR)",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "titleEn",
      title: "Title (EN)",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "titleEn", maxLength: 96 },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "date",
      title: "Date",
      type: "date",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "descriptionFr",
      title: "Résumé (FR)",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "descriptionEn",
      title: "Summary (EN)",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "tags",
      title: "Tags",
      type: "array",
      of: [{ type: "string" }],
      options: { layout: "tags" },
    }),
    defineField({
      name: "url",
      title: "Lien externe",
      type: "url",
    }),
  ],
  orderings: [
    { title: "Date (récent)", name: "dateDesc", by: [{ field: "date", direction: "desc" }] },
  ],
  preview: {
    select: { title: "titleFr", subtitle: "date" },
  },
});
