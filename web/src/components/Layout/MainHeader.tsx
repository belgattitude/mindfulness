"use client";

import { clsx } from "clsx";
import { useCallback, useRef, useState } from "react";
import type { FC } from "react";

import { BurgerMenuIcon } from "@/components/Burger/BurgerMenuIcon";
import { MainMenuLinks } from "@/components/Layout/MainMenuLinks";
import { MainNavHeader } from "@/components/Layout/MainNavHeader";
import { MainSidebar } from "@/components/Layout/MainSidebar";
import { cn } from "@/components/utils";
import type { MainNavLinks } from "@/config/site.config";

interface MainNavProps {
  mainNavLinks: MainNavLinks;
}

const sidebarId = "main-sidebar";

export const MainHeader: FC<MainNavProps> = (props) => {
  const { mainNavLinks } = props;
  const burgerRef = useRef<HTMLButtonElement>(null);

  const [isSidebarExpanded, setIsSidebarExpanded] = useState<boolean>(false);

  // Focus back on the burger, so keyboard users don't lose their place
  const closeSidebar = useCallback(() => {
    setIsSidebarExpanded(false);
    burgerRef.current?.focus();
  }, []);

  return (
    <div className="flex">
      <div
        className={clsx(
          "border-brand-color-50 shadow-brand-color-50 top-0 z-40 w-full bg-white/95 lg:border-b-2"
        )}
      >
        <MainNavHeader />
        <div className={clsx(`static top-0 mx-auto hidden gap-2 p-2 md:flex`)}>
          <div
            className={cn(
              "flex grow flex-row items-center justify-center gap-5 py-2 md:flex"
            )}
          >
            <MainMenuLinks
              mainNavLinks={mainNavLinks}
              className="font-family-menu text-xl font-light md:block"
            />
          </div>
        </div>
      </div>
      <MainSidebar
        id={sidebarId}
        open={isSidebarExpanded}
        onClose={closeSidebar}
        mainNavLinks={mainNavLinks}
      />
      {/* Above the sidebar, it becomes its close button */}
      <BurgerMenuIcon
        ref={burgerRef}
        controls={sidebarId}
        className="fixed top-4 right-4 z-60"
        handleClick={() => {
          setIsSidebarExpanded((prevState) => !prevState);
        }}
        isOpen={isSidebarExpanded}
      />
    </div>
  );
};
