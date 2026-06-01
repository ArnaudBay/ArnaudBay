import { defineField, defineType } from "sanity";

export default defineType({
  name: "blogPost",
  title: "Blog Post",
  type: "document",
  groups: [
    { name: "meta", title: "Méta", default: true },
    { name: "contentFr", title: "Contenu (FR)" },
    { name: "contentEn", title: "Contenu (EN)" },
    { name: "stats", title: "Statistiques" },
  ],
  fields: [
    defineField({
      name: "titleFr",
      title: "Titre (FR)",
      type: "string",
      group: "meta",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "titleEn",
      title: "Title (EN)",
      type: "string",
      group: "meta",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      group: "meta",
      options: { source: "titleEn", maxLength: 96 },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "date",
      title: "Date",
      type: "date",
      group: "meta",
      initialValue: () => new Date().toISOString().slice(0, 10),
      validation: (r) => r.required(),
    }),
    defineField({
      name: "category",
      title: "Catégorie",
      type: "string",
      group: "meta",
      description: "Affichée avant le titre dans la liste (ex: IA, Entrepreneuriat, Carnet).",
    }),
    defineField({
      name: "author",
      title: "Auteur",
      type: "string",
      group: "meta",
      initialValue: "Arnaud BAYALE",
    }),
    defineField({
      name: "coverImage",
      title: "Image de couverture",
      type: "image",
      group: "meta",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          title: "Texte alternatif",
          type: "string",
          description: "Description de l'image pour l'accessibilité et le SEO.",
        }),
      ],
    }),
    defineField({
      name: "tags",
      title: "Tags",
      type: "array",
      group: "meta",
      of: [{ type: "string" }],
      options: { layout: "tags" },
    }),
    defineField({
      name: "url",
      title: "Lien externe (optionnel)",
      type: "url",
      group: "meta",
      description:
        "À renseigner uniquement si l'article pointe vers un site externe au lieu d'une page interne.",
    }),

    // --- Statistiques (alimentées automatiquement par le site, non éditables) ---
    defineField({
      name: "viewCount",
      title: "Vues",
      type: "number",
      group: "stats",
      readOnly: true,
      initialValue: 0,
      description: "Incrémenté automatiquement à chaque visite de l'article.",
    }),
    defineField({
      name: "likeCount",
      title: "Likes",
      type: "number",
      group: "stats",
      readOnly: true,
      initialValue: 0,
      description: "Incrémenté automatiquement quand un visiteur aime l'article.",
    }),

    // --- Contenu FR ---
    defineField({
      name: "descriptionFr",
      title: "Résumé (FR)",
      type: "text",
      group: "contentFr",
      rows: 3,
      description: "Court extrait affiché dans la liste des articles.",
    }),
    defineField({
      name: "bodyFr",
      title: "Contenu (FR)",
      type: "array",
      group: "contentFr",
      of: [
        { type: "block" },
        {
          type: "image",
          options: { hotspot: true },
          fields: [
            defineField({ name: "alt", title: "Texte alternatif", type: "string" }),
          ],
        },
      ],
    }),

    // --- Contenu EN ---
    defineField({
      name: "descriptionEn",
      title: "Summary (EN)",
      type: "text",
      group: "contentEn",
      rows: 3,
      description: "Short excerpt shown in the posts list.",
    }),
    defineField({
      name: "bodyEn",
      title: "Content (EN)",
      type: "array",
      group: "contentEn",
      of: [
        { type: "block" },
        {
          type: "image",
          options: { hotspot: true },
          fields: [
            defineField({ name: "alt", title: "Alt text", type: "string" }),
          ],
        },
      ],
    }),
  ],
  orderings: [
    { title: "Date (récent)", name: "dateDesc", by: [{ field: "date", direction: "desc" }] },
    { title: "Date (ancien)", name: "dateAsc", by: [{ field: "date", direction: "asc" }] },
  ],
  preview: {
    select: {
      title: "titleFr",
      date: "date",
      category: "category",
      media: "coverImage",
      bodyFr: "bodyFr",
    },
    prepare({ title, date, category, media, bodyFr }) {
      const formatted = date
        ? new Date(date).toLocaleDateString("fr-FR", {
            day: "numeric",
            month: "short",
            year: "numeric",
          })
        : "Sans date";
      // Longueur du texte du corps (~1000 caractères ≈ 1 min de lecture).
      const charCount = Array.isArray(bodyFr)
        ? bodyFr.reduce((sum, block) => {
            if (block?._type !== "block" || !Array.isArray(block.children)) return sum;
            return (
              sum + block.children.map((child) => child?.text || "").join("").length
            );
          }, 0)
        : 0;
      const minutes = charCount ? `${Math.max(1, Math.round(charCount / 1000))} min` : null;
      return {
        title,
        subtitle: [category, formatted, minutes].filter(Boolean).join(" · "),
        media,
      };
    },
  },
});
