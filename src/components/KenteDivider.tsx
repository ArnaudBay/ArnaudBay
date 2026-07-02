import { useId } from "react";

// Séparateur inspiré du tissage kente : blocs chauds alternés (or / terracotta)
// ponctués de losanges, dans l'esprit des bandes tissées akan.
const KenteDivider = ({ className }: { className?: string }) => {
  const id = useId();
  return (
    <svg viewBox="0 0 120 12" preserveAspectRatio="none" className={className} aria-hidden>
      <defs>
        <pattern id={id} width="20" height="12" patternUnits="userSpaceOnUse">
          <rect x="0" y="0" width="10" height="12" fill="#c99a3f" />
          <rect x="10" y="0" width="10" height="12" fill="#9c6a45" />
          <path d="M5 2 L8 6 L5 10 L2 6 Z" fill="#6e4327" />
          <path d="M15 2 L18 6 L15 10 L12 6 Z" fill="#e6d2ad" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${id})`} />
    </svg>
  );
};

export default KenteDivider;
