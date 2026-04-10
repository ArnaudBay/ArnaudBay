# AGENTS.md

## Developer Commands

```bash
npm run dev      # Dev server on 0.0.0.0:8081 (NOT default port 5173)
npm run build   # Output to dist/
npm run lint     # ESLint
npm run test    # vitest run
npm run test:watch
npm run preview
```

## Architecture

Single-page React app (no routing). Entry: `main.tsx` → `App.tsx` → `pages/Index.tsx`.

`Index.tsx` manages state (`language`: "fr"|"en", `theme`: "dark"|"light") and passes it as props to all section components. No external state management.

Components in `src/components/`: Navbar, Hero, About, TechStack, Projects, Contact, Footer.

## Key Conventions

- TypeScript strict mode is **off** (`tsconfig.json`)
- Fonts: DM Serif Display (headings) + DM Mono (body), loaded from Google Fonts
- Tailwind theme extends colors via HSL CSS variables (`hsl(var(--primary))` etc.)
- Bilingual content handled internally in each component based on `language` prop

## Setup

- Node 20 required (`package.json` engines)
- Use Bun or npm