import { useId } from "react";

// Frise africaine discrète (losanges type kente / bogolan).
// Motif réutilisable pour ponctuer les sections avec une touche identitaire subtile.
const AfricanFrieze = ({ className }: { className?: string }) => {
  const id = useId();
  return (
    <svg viewBox="0 0 240 10" preserveAspectRatio="none" className={className} aria-hidden>
      <defs>
        <pattern id={id} width="16" height="10" patternUnits="userSpaceOnUse">
          <path d="M8 1 L14 5 L8 9 L2 5 Z" fill="none" stroke="currentColor" strokeWidth="1" />
          <circle cx="8" cy="5" r="0.8" fill="currentColor" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${id})`} />
    </svg>
  );
};

export default AfricanFrieze;
