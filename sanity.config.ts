import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./sanity/schemas";
import { apiVersion, dataset, projectId } from "./sanity/env";

/**
 * Sanity Studio for the Knowledge Hub. Run with `npm run studio` after
 * setting SANITY_STUDIO_PROJECT_ID / SANITY_STUDIO_DATASET. Excluded from
 * the Next.js build (see tsconfig "exclude").
 */
export default defineConfig({
  name: "anjan-prasad-knowledge-hub",
  title: "Anjan Prasad — Knowledge Hub",
  projectId,
  dataset,
  plugins: [structureTool(), visionTool({ defaultApiVersion: apiVersion })],
  schema: { types: schemaTypes },
});
