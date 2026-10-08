"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import type { FC } from "react";

import { MainLogo } from "@/components/Logo/MainLogo";
import { siteConfig } from "@/config/site.config";
import type { MainNavLinks } from "@/config/site.config";

import { cn } from "../utils";
import { isActiveNavLink } from "./isActiveNavLink";

interface MainSidebarProps {
  id: string;
  open: boolean;
  onClose: () => void;
  mainNavLinks: MainNavLinks;
}

/** Burger menu: a panel sliding from the right, over a blurred backdrop */
export const MainSidebar: FC<MainSidebarProps> = (props) => {
  const { id, open, onClose, mainNavLinks } = props;
  const currentPath = usePathname() ?? "";

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
          className="image-rendering-unblur flex items-center gap-3 self-start outline-green-500"
        >
          <MainLogo
            width={90}
            height={60}
            priority={false}
            className="h-[44px] w-auto"
          />
          <span className="font-family-brand text-nav-title text-lg">
            {siteConfig.metadata.siteTitle}
          </span>
        </Link>

        <nav aria-label="Menu principal" className="mt-10">
          <ul className="space-y-1">
            {mainNavLinks.map((link) => {
              const active = isActiveNavLink(currentPath, link);
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={onClose}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "font-family-menu block rounded-lg px-3 py-2.5 text-xl font-light text-neutral-800 outline-green-500 transition-colors hover:bg-white/50",
                      active && "text-nav-title bg-white/60 font-normal"
                    )}
                  >
                    {link.title}
                  </Link>
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
