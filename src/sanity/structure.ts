import type { StructureResolver } from "sanity/structure";
import { FolderKanban, Newspaper } from "lucide-react";

/**
 * Arborescence personnalisée du Studio.
 * Regroupe les documents par section avec un tri par défaut cohérent
 * avec l'affichage du site (projets par ordre manuel, articles par date).
 */
export const structure: StructureResolver = (S) =>
  S.list()
    .title("Contenu")
    .items([
      S.listItem()
        .title("Projets")
        .icon(FolderKanban)
        .child(
          S.documentTypeList("project")
            .title("Projets")
            .defaultOrdering([{ field: "order", direction: "asc" }])
        ),
      S.listItem()
        .title("Blog")
        .icon(Newspaper)
        .child(
          S.documentTypeList("blogPost")
            .title("Articles")
            .defaultOrdering([{ field: "date", direction: "desc" }])
        ),
    ]);
