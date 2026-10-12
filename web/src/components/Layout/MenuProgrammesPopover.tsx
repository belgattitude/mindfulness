"use client";

import { PreviewCard } from "@base-ui/react/preview-card";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import type { FC, ReactNode } from "react";

import type { MenuProgramme } from "./menuProgrammes";

interface Props {
  /** The menu link: it still goes to the page, the popup opens on hover */
  href: string;
  title: string;
  programmes: MenuProgramme[];
  className?: string;
  ariaCurrent?: "page" | undefined;
  children: ReactNode;
}

const itemClassName =
  "hover:bg-brand-color-50 block rounded-lg px-3 py-2 outline-green-500 transition-colors";

/**
 * A menu link showing the programmes of its page in a popup, on hover or
 * focus. A preview card: the trigger stays a plain link (a popover trigger
 * would be announced as a button).
 */
export const MenuProgrammesPopover: FC<Props> = (props) => {
  const { href, title, programmes, className, ariaCurrent, children } = props;
  // Closed on navigation: the header stays mounted, the pointer over the popup
  // would keep it open on the next page
  const [open, setOpen] = useState(false);
  const close = () => {
    setOpen(false);
  };
  return (
    <PreviewCard.Root open={open} onOpenChange={setOpen}>
      <PreviewCard.Trigger
        delay={150}
        closeDelay={200}
        render={
          <Link
            href={href}
            aria-current={ariaCurrent}
            className={className}
            onClick={close}
          />
        }
      >
        {children}
      </PreviewCard.Trigger>
      <PreviewCard.Portal>
        {/* Below the menu bar (the link is ~14px above its bottom), the
            arrow on the green */}
        <PreviewCard.Positioner side="bottom" sideOffset={24} className="z-50">
          <PreviewCard.Popup className="font-family-primary w-80 origin-(--transform-origin) rounded-2xl bg-white p-2 text-neutral-700 shadow-lg ring-1 ring-black/5 transition-[transform,opacity] duration-150 data-ending-style:scale-95 data-ending-style:opacity-0 data-starting-style:scale-95 data-starting-style:opacity-0">
            {/* Points at the menu link, placed by base-ui */}
            <PreviewCard.Arrow className="data-[side=bottom]:top-[-9px]">
              <svg
                width="20"
                height="10"
                viewBox="0 0 20 10"
                aria-hidden="true"
                className="block"
              >
                <path
                  d="M0 10 9 1.4a1.4 1.4 0 0 1 2 0L20 10Z"
                  className="fill-white"
                />
                <path
                  d="M0 10 9 1.4a1.4 1.4 0 0 1 2 0L20 10"
                  className="fill-none stroke-black/10"
                />
              </svg>
            </PreviewCard.Arrow>
            <p className="text-title-color-600 px-3 pt-2 pb-1 text-xs font-medium tracking-widest uppercase">
              {programmes.length === 1 ? "Programme" : "Programmes"}
            </p>
            <ul>
              {programmes.map((programme) => (
                <li key={programme.href}>
                  <Link
                    href={programme.href}
                    onClick={close}
                    className={`${itemClassName} text-title-color-800 leading-snug`}
                  >
                    {programme.title}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-1 border-t border-neutral-100 pt-1">
              <Link
                href={href}
                onClick={close}
                className={`${itemClassName} text-title-color-600 flex items-center gap-1.5 text-sm font-medium`}
              >
                Découvrir {title}
                <ArrowRight aria-hidden="true" className="size-4" />
              </Link>
            </div>
          </PreviewCard.Popup>
        </PreviewCard.Positioner>
      </PreviewCard.Portal>
    </PreviewCard.Root>
  );
};
