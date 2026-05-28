import { defineConfig, type Config } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./src/sanity/schemas";

const projectId = import.meta.env.VITE_SANITY_PROJECT_ID as string | undefined;
const dataset = (import.meta.env.VITE_SANITY_DATASET as string | undefined) || "production";

export const isSanityConfigured = Boolean(projectId);

const config: Config | null = projectId
  ? defineConfig({
      name: "portfolio",
      title: "Portfolio CMS",
      projectId,
      dataset,
      basePath: "/studio",
      plugins: [structureTool(), visionTool()],
      schema: { types: schemaTypes },
    })
  : null;

export default config;
