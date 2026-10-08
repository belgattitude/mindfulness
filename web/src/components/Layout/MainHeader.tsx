"use client";

import { clsx } from "clsx";
import { useRef, useState } from "react";
import type { FC } from "react";
import { useOutsideClick } from "rooks";

import { BurgerMenuIcon } from "@/components/Burger/BurgerMenuIcon";
import { MainMenuLinks } from "@/components/Layout/MainMenuLinks";
import { MainNavHeader } from "@/components/Layout/MainNavHeader";
import { MainSidebar } from "@/components/Layout/MainSidebar";
import { cn } from "@/components/utils";
import type { MainNavLinks } from "@/config/site.config";

interface MainNavProps {
  mainNavLinks: MainNavLinks;
}

export const MainHeader: FC<MainNavProps> = (props) => {
  const { mainNavLinks } = props;
  const ref = useRef<HTMLDivElement>(null);

  const [isSidebarExpanded, setIsSidebarExpanded] = useState<boolean>(false);

  useOutsideClick(ref, () => setIsSidebarExpanded(false));

  return (
    <div className="flex">
      <div
        className={clsx(
          "border-brand-color-50 shadow-brand-color-50 top-0 z-50 w-full bg-white/95 lg:border-b-2"
        )}
      >
        <MainNavHeader className="z-50" />
        <div
          className={clsx(
            `container-xl static top-0 mx-auto hidden gap-2 p-2 md:flex`
          )}
        >
          <div
            className={cn(
              "flex grow flex-row items-center justify-center gap-5 py-2 md:flex"
            )}
          >
            <MainMenuLinks
              mainNavLinks={mainNavLinks}
              className={cn(
                "font-family-menu text-xl font-light transition-opacity duration-700 ease-in-out md:block",
                {
                  "opacity-0": isSidebarExpanded,
                }
              )}
            />
          </div>
        </div>
        <MainSidebar hidden={!isSidebarExpanded} mainNavLinks={mainNavLinks} />
        <BurgerMenuIcon
          ref={ref}
          className={cn(
            "*:text-title-color-800 absolute top-3 right-5 size-[30px]"
          )}
          handleClick={() => {
            setIsSidebarExpanded((prevState) => !prevState);
          }}
          isOpen={isSidebarExpanded}
        />
      </div>
    </div>
  );
};
