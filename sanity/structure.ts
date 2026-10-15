import type { StructureResolver } from "sanity/structure";
import { apiVersion } from "./env";

const PAGES = ["Home", "About", "Business Advisory", "Mentorship", "Speaker", "Contact"];

/**
 * Studio navigation, organized like a site map: Pages (each page's sections
 * in one folder), then the Knowledge Hub (blog posts and case studies kept
 * apart), then quotes and categories.
 */
export const structure: StructureResolver = (S) =>
  S.list()
    .title("Anjan Prasad — Website")
    .items([
      S.listItem()
        .title("Pages")
        .child(
          S.list()
            .title("Pages")
            .items(
              PAGES.map((page) =>
                S.listItem()
                  .title(page)
                  .child(
                    S.documentList()
                      .title(`${page} — sections`)
                      .apiVersion(apiVersion)
                      .filter('_type == "pageSection" && page == $page')
                      .params({ page })
                  )
              )
            )
        ),
      S.divider(),
      S.listItem()
        .title("Blog Posts")
        .child(
          S.documentList()
            .title("Blog Posts")
            .apiVersion(apiVersion)
            .filter('_type == "blogPost" && !defined(caseStudy.sector)')
            .schemaType("blogPost")
        ),
      S.listItem()
        .title("Case Studies")
        .child(
          S.documentList()
            .title("Case Studies")
            .apiVersion(apiVersion)
            .filter('_type == "blogPost" && defined(caseStudy.sector)')
            .schemaType("blogPost")
        ),
      S.divider(),
      S.documentTypeListItem("quote").title("Business Quotes"),
      S.documentTypeListItem("category").title("Categories"),
    ]);
