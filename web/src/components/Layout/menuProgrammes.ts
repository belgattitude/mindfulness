import type { MainNavLinks } from "@/config/site.config";
import type { Page } from "@/openapi/model";

export interface MenuProgramme {
  title: string;
  href: string;
}

/** The programmes of the menu pages, by menu link href */
export type MenuProgrammes = Record<string, MenuProgramme[]>;

const pagePathPrefix = "/activities/";

/** Slugs of the strapi pages linked from the menu (/activities/<slug>) */
export const getMenuPageSlugs = (links: MainNavLinks): string[] =>
  links
    .filter((link) => link.href.startsWith(pagePathPrefix))
    .map((link) => link.href.slice(pagePathPrefix.length));

export const getMenuProgrammes = (pages: Page[]): MenuProgrammes =>
  Object.fromEntries(
    pages.map((page) => [
      `${pagePathPrefix}${page.slug}`,
      (page.programmes ?? []).flatMap((programme) =>
        programme.title && programme.slug
          ? [{ title: programme.title, href: `/programme/${programme.slug}` }]
          : []
      ),
    ])
  );
