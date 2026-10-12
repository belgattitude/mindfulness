"use client";

import { ChevronDown } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import type { FC } from "react";

import { MainLogo } from "@/components/Logo/MainLogo";
import { siteConfig } from "@/config/site.config";
import type { MainNavLinks } from "@/config/site.config";

import { cn } from "../utils";
import { isActiveNavLink } from "./isActiveNavLink";
import type { MenuProgrammes } from "./menuProgrammes";

interface MainSidebarProps {
  id: string;
  open: boolean;
  onClose: () => void;
  mainNavLinks: MainNavLinks;
  menuProgrammes: MenuProgrammes;
}

/** Burger menu: a panel sliding from the right, over a blurred backdrop */
export const MainSidebar: FC<MainSidebarProps> = (props) => {
  const { id, open, onClose, mainNavLinks, menuProgrammes } = props;
  const currentPath = usePathname() ?? "";
  // The menu link whose programmes are unfolded
  const [expandedHref, setExpandedHref] = useState<string | null>(null);

  // Escape closes the menu, the page does not scroll behind it
  useEffect(() => {
    if (!open) {
      return;
    }
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open, onClose]);

  return (
    <>
      <div
        aria-hidden="true"
        className={cn(
          "fixed inset-0 z-50 bg-neutral-900/20 backdrop-blur-[2px] transition-opacity duration-300 motion-reduce:transition-none",
          open ? "opacity-100" : "pointer-events-none opacity-0"
        )}
        onClick={onClose}
      />
      <aside
        id={id}
        aria-label="Menu"
        inert={!open}
        className={cn(
          "radial-gradient font-family-primary fixed inset-y-0 right-0 z-50 flex w-[min(85vw,360px)] flex-col overflow-y-auto px-6 pt-6 pb-8 transition-transform duration-300 ease-out motion-reduce:transition-none",
          // No shadow when closed, it would show at the screen edge
          open ? "translate-x-0 shadow-2xl" : "translate-x-full"
        )}
      >
        <Link
          href="/"
          onClick={onClose}
          className="flex items-center gap-3 self-start outline-green-500"
        >
          <MainLogo className="h-[44px] w-auto" />
          <span className="font-family-brand text-nav-title text-lg">
            {siteConfig.metadata.siteTitle}
          </span>
        </Link>

        <nav aria-label="Menu principal" className="mt-10">
          <ul className="space-y-1">
            {mainNavLinks.map((link) => {
              const active = isActiveNavLink(currentPath, link);
              const programmes = menuProgrammes[link.href] ?? [];
              const expanded = expandedHref === link.href;
              const programmesId = `${id}-programmes-${link.href.replaceAll("/", "-")}`;
              return (
                <li key={link.href}>
                  <div className="flex items-center gap-1">
                    <Link
                      href={link.href}
                      onClick={onClose}
                      aria-current={active ? "page" : undefined}
                      className={cn(
                        "font-family-menu block flex-1 rounded-lg px-3 py-2.5 text-xl font-light text-neutral-800 outline-green-500 transition-colors hover:bg-white/50",
                        active && "text-nav-title bg-white/60 font-normal"
                      )}
                    >
                      {link.title}
                    </Link>
                    {programmes.length > 0 && (
                      <button
                        type="button"
                        aria-expanded={expanded}
                        aria-controls={programmesId}
                        aria-label={`Programmes ${link.title}`}
                        onClick={() => {
                          setExpandedHref(expanded ? null : link.href);
                        }}
                        className="text-nav-title flex size-10 flex-none cursor-pointer items-center justify-center rounded-full outline-green-500 transition-colors hover:bg-white/50"
                      >
                        <ChevronDown
                          aria-hidden="true"
                          className={cn(
                            "size-5 transition-transform duration-200 motion-reduce:transition-none",
                            expanded && "rotate-180"
                          )}
                        />
                      </button>
                    )}
                  </div>
                  {programmes.length > 0 && (
                    <ul
                      id={programmesId}
                      hidden={!expanded}
                      className="mt-1 mb-2 ml-3 space-y-1 border-l border-white/70 pl-3"
                    >
                      {programmes.map((programme) => (
                        <li key={programme.href}>
                          <Link
                            href={programme.href}
                            onClick={onClose}
                            aria-current={
                              currentPath === programme.href
                                ? "page"
                                : undefined
                            }
                            className="hover:text-nav-title block rounded-lg px-2 py-1.5 leading-snug text-neutral-700 outline-green-500 transition-colors hover:bg-white/40"
                          >
                            {programme.title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              );
            })}
          </ul>
        </nav>

        <nav
          aria-label="Agenda"
          className="mt-8 border-t border-white/60 px-3 pt-6"
        >
          <p className="text-nav-title text-xs font-medium tracking-widest uppercase">
            Agenda
          </p>
          <ul className="mt-3 space-y-2">
            {siteConfig.search.eventTypes.map(({ slug, title }) => (
              <li key={slug}>
                <Link
                  href={`/agenda/${slug}`}
                  onClick={onClose}
                  className="hover:text-nav-title text-neutral-700 outline-green-500 transition-colors"
                >
                  {title}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="mt-auto px-3 pt-8">
          <Link
            href="/contact"
            onClick={onClose}
            className="text-nav-title block rounded-full bg-white/80 px-5 py-3 text-center font-medium shadow-sm outline-green-500 transition-colors hover:bg-white"
          >
            Me contacter
          </Link>
        </div>
      </aside>
    </>
  );
};
