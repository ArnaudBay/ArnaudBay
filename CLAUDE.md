# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Personal portfolio website for Arnaud BAYALE (fullstack web & mobile developer). Single-page application in French with FR/EN language toggle. Deployed on Vercel.

## Commands

- **Dev server:** `npm run dev` (runs on `0.0.0.0:8081`)
- **Build:** `npm run build` (output in `dist/`)
- **Lint:** `npm run lint`
- **Tests:** `npm run test` (vitest, single run) / `npm run test:watch` (watch mode)
- **Preview production build:** `npm run preview`

## Tech Stack

- React 18 + TypeScript + Vite (SWC plugin)
- Tailwind CSS 3 with CSS custom properties for theming (HSL color tokens defined in `index.css`)
- shadcn/ui component library (Radix UI primitives + `class-variance-authority` + `tailwind-merge`)
- Framer Motion for animations (shared variants in `src/utils/animations.ts`)
- Fonts: DM Serif Display (headings) + DM Mono (body), loaded from Google Fonts

## Architecture

Single-page app with no routing. Entry: `main.tsx` -> `App.tsx` -> `pages/Index.tsx`.

`Index.tsx` owns the `language` state (`"fr" | "en"`, type `SiteLanguage`) and passes it as a prop to every section component. All section components live in `src/components/` and handle their own bilingual content internally based on the `language` prop.

Section components rendered in order: `Navbar` -> `Hero` -> `About` -> `TechStack` -> `Projects` -> `Contact` -> `Footer`.

## Key Conventions

- TypeScript strict mode is off (`tsconfig.json`: `"strict": false`)
- Tailwind theme extends colors via HSL CSS variables (e.g., `hsl(var(--primary))`)
- Custom font families: `font-heading` and `font-body` in Tailwind config
