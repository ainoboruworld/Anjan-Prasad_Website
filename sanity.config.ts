import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./sanity/schemas";
import { structure } from "./sanity/structure";
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
  basePath: "/studio",
  plugins: [structureTool({ structure }), visionTool({ defaultApiVersion: apiVersion })],
  schema: {
    types: schemaTypes,
    templates: (prev) => [
      ...prev,
      // Pre-fills the sector so a new case study lands in the filtered
      // "Case Studies" list straight away (the filter keys on it).
      {
        id: "blogPost-case-study",
        title: "Case Study",
        schemaType: "blogPost",
        value: { caseStudy: { sector: "Business" } },
      },
    ],
  },
});
