import type { FC, PropsWithChildren } from "react";

import { MainContent } from "@/components/Layout/MainContent";
import { MainFooter } from "@/components/Layout/MainFooter";
import { MainHeader } from "@/components/Layout/MainHeader";
import { siteConfig } from "@/config/site.config";

type Props = PropsWithChildren;

const { mainNavLinks } = siteConfig;

export const MainLayout: FC<Props> = ({ children }) => (
  // Own stacking context with explicit layers: backgrounds, then the main
  // content (z-10, holding the fixed page background image, see
  // PageBackgroundImg) and the footer content (z-10), then the header (z-20)
  <div className="bg-brand-color-400 isolate flex min-h-dvh flex-col">
    <MainHeader mainNavLinks={mainNavLinks} />
    <MainContent className="relative z-10 mx-auto flex w-full max-w-[1200px] flex-1 flex-col">
      {children}
    </MainContent>
    <MainFooter mainNavLinks={mainNavLinks} />
  </div>
);
