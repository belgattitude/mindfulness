import type { PropsWithChildren } from "react";

import { getMenuPagesParams } from "@/api/pages.rest";
import { MainContent } from "@/components/Layout/MainContent";
import { MainFooter } from "@/components/Layout/MainFooter";
import { MainHeader } from "@/components/Layout/MainHeader";
import { siteConfig } from "@/config/site.config";
import { getContact } from "@/openapi/contact/contact";
import { getPages } from "@/openapi/page/page";

import { getMenuPageSlugs, getMenuProgrammes } from "./menuProgrammes";

type Props = PropsWithChildren;

const { mainNavLinks } = siteConfig;

/** The footer contact links: the site still renders when strapi is down */
const getContactDetails = async () => {
  try {
    const { data } = await getContact();
    return data ?? null;
  } catch {
    return null;
  }
};

/** The menu popups: without them the menu links still work */
const getMenuProgrammesSafe = async () => {
  try {
    const { data } = await getPages(
      getMenuPagesParams({ slugs: getMenuPageSlugs(mainNavLinks) })
    );
    return getMenuProgrammes(data ?? []);
  } catch {
    return {};
  }
};

export const MainLayout = async ({ children }: Props) => {
  const [contact, menuProgrammes] = await Promise.all([
    getContactDetails(),
    getMenuProgrammesSafe(),
  ]);
  return (
    // Own stacking context with explicit layers: backgrounds, then the main
    // content (z-10, holding the fixed page background image, see
    // PageBackgroundImg) and the footer content (z-10), then the header (z-20)
    <div className="bg-brand-color-400 isolate flex min-h-dvh flex-col">
      <MainHeader mainNavLinks={mainNavLinks} menuProgrammes={menuProgrammes} />
      <MainContent className="relative z-10 mx-auto flex w-full max-w-[1200px] flex-1 flex-col">
        {children}
      </MainContent>
      <MainFooter mainNavLinks={mainNavLinks} contact={contact} />
    </div>
  );
};
