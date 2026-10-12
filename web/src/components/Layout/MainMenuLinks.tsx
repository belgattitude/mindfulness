import { clsx } from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { FC } from "react";

import { cn } from "@/components/utils";
import type { MainNavLinks } from "@/config/site.config";

import { isActiveNavLink } from "./isActiveNavLink";
import type { MenuProgrammes } from "./menuProgrammes";
import { MenuProgrammesPopover } from "./MenuProgrammesPopover";

interface Props {
  className?: string;
  mainNavLinks: MainNavLinks;
  menuProgrammes: MenuProgrammes;
}

export const MainMenuLinks: FC<Props> = (props) => {
  const { className = "", mainNavLinks, menuProgrammes } = props;
  const currentRouterPath = usePathname() ?? "";

  return (
    <div className={cn("items-end", className)}>
      {mainNavLinks.map((link) => {
        const { title, href } = link;
        const active = isActiveNavLink(currentRouterPath, link);
        const linkClassName = clsx(
          "px-4 py-2 text-lg text-neutral-900 decoration-gray-300 underline-offset-8 outline-green-500 hover:underline",
          { "underline decoration-gray-400": active }
        );
        const programmes = menuProgrammes[href] ?? [];
        if (programmes.length > 0) {
          return (
            <MenuProgrammesPopover
              key={`main-links-${href}`}
              href={href}
              title={title}
              programmes={programmes}
              ariaCurrent={active ? "page" : undefined}
              className={linkClassName}
            >
              {title}
            </MenuProgrammesPopover>
          );
        }
        return (
          <Link
            key={`main-links-${href}`}
            aria-current={active ? "page" : undefined}
            className={linkClassName}
            href={href}
          >
            {title}
          </Link>
        );
      })}
    </div>
  );
};
