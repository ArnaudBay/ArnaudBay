import { defineField, defineType } from "sanity";

export default defineType({
  name: "project",
  title: "Projet",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Titre",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "order",
      title: "Ordre d'affichage",
      type: "number",
      description: "Plus petit = affiché en premier",
    }),
    defineField({
      name: "descriptionFr",
      title: "Description (FR)",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "descriptionEn",
      title: "Description (EN)",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "image",
      title: "Image",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "techs",
      title: "Stacks",
      type: "array",
      of: [{ type: "string" }],
      options: { layout: "tags" },
    }),
    defineField({
      name: "url",
      title: "Lien projet",
      type: "url",
    }),
    defineField({
      name: "badgeFr",
      title: "Badge (FR)",
      type: "string",
      description: "Ex: 'Play Store en cours'",
    }),
    defineField({
      name: "badgeEn",
      title: "Badge (EN)",
      type: "string",
    }),
  ],
  orderings: [
    { title: "Ordre manuel", name: "orderAsc", by: [{ field: "order", direction: "asc" }] },
  ],
  preview: {
    select: { title: "title", media: "image" },
  },
});
