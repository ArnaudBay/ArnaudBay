// Symboles Adinkra (Ghana) — motifs porteurs de sens, dessinés au trait.
// Utilisés comme touches identitaires discrètes à travers le site.

type AdinkraProps = {
  className?: string;
  title?: string;
};

// Sankofa (forme « cœur ») — « il n'est jamais trop tard pour revenir chercher
// ce que l'on a oublié » : apprendre du passé pour bâtir l'avenir.
export const Sankofa = ({ className, title }: AdinkraProps) => (
  <svg viewBox="0 0 100 100" className={className} role="img" aria-label={title ?? "Sankofa"}>
    {title ? <title>{title}</title> : null}
    <g fill="none" stroke="currentColor" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M50 82 C 28 66, 14 52, 14 36 C 14 22, 30 16, 40 26 C 45 31, 48 36, 50 42 C 52 36, 55 31, 60 26 C 70 16, 86 22, 86 36 C 86 52, 72 66, 50 82 Z" />
      <path d="M32 32 C 27 36, 30 43, 37 41 C 42 39.5, 41 33, 35 34" strokeWidth="3.2" />
      <path d="M68 32 C 73 36, 70 43, 63 41 C 58 39.5, 59 33, 65 34" strokeWidth="3.2" />
      <circle cx="50" cy="73" r="3.2" strokeWidth="3.2" />
    </g>
  </svg>
);

// Nyansapo (« nœud de la sagesse ») — la sagesse, l'ingéniosité, la patience.
export const Nyansapo = ({ className, title }: AdinkraProps) => (
  <svg viewBox="0 0 100 100" className={className} role="img" aria-label={title ?? "Nyansapo"}>
    {title ? <title>{title}</title> : null}
    <g fill="none" stroke="currentColor" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M50 20 C 30 20, 30 44, 50 44 C 70 44, 70 20, 50 20 Z" />
      <path d="M50 80 C 30 80, 30 56, 50 56 C 70 56, 70 80, 50 80 Z" />
      <path d="M20 50 C 20 30, 44 30, 44 50 C 44 70, 20 70, 20 50 Z" />
      <path d="M80 50 C 80 30, 56 30, 56 50 C 56 70, 80 70, 80 50 Z" />
    </g>
  </svg>
);
