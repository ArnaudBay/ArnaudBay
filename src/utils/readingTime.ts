import type { SiteLanguage } from "../components/Layout";

/**
 * Estime un temps de lecture à partir d'un nombre de caractères.
 * ~1000 caractères ≈ 1 minute (≈ 200 mots/min, ~5 caractères/mot).
 * Renvoie une chaîne vide si le contenu est vide.
 */
export function readingTime(charCount: number | undefined, language: SiteLanguage): string {
  if (!charCount) return "";
  const minutes = Math.max(1, Math.round(charCount / 1000));
  return language === "fr" ? `${minutes} min de lecture` : `${minutes} min read`;
}
