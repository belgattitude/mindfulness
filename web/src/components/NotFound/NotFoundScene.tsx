import { ArrowRight } from "lucide-react";
import Link from "next/link";
import type { FC } from "react";

import {
  PageContent,
  pageContentBleedClassName,
} from "@/components/PageContent";
import { cn } from "@/components/utils";

import { ForestIllustration } from "./ForestIllustration";

export interface NotFoundLink {
  href: string;
  label: string;
}

interface Props {
  /** What was not found, as an eyebrow: "Agenda", "Programmes et cycles"… */
  eyebrow?: string;
  title: string;
  text: string;
  /** The first one is the main way out */
  links: NotFoundLink[];
}

/**
 * The 404 pages: a forest where the path fades away, a message adapted to
 * what was looked for and the ways back
 */
export const NotFoundScene: FC<Props> = (props) => {
  const { eyebrow, title, text, links } = props;
  return (
    <PageContent>
      {/* The forest spans the top of the card and fades into it */}
      <div
        className={cn(
          pageContentBleedClassName,
          "from-brand-color-100 relative overflow-hidden bg-linear-to-b to-transparent px-0 sm:px-0 md:px-0"
        )}
      >
        <ForestIllustration className="h-48 sm:h-60 md:h-80" />
        <div className="absolute inset-x-0 bottom-0 h-16 bg-linear-to-b from-transparent to-white/90" />
      </div>

      <div className="mx-auto flex max-w-2xl flex-col items-center gap-4 pt-6 pb-4 text-center md:pt-8">
        <p className="text-title-color-600 text-xs font-medium tracking-widest uppercase">
          {eyebrow ? `${eyebrow} · Erreur 404` : "Erreur 404"}
        </p>
        <h1 className="font-display text-title-color-800 text-4xl leading-tight font-medium md:text-5xl">
          {title}
        </h1>
        <p className="text-lg leading-8 text-neutral-700">{text}</p>
        <nav
          aria-label="Retrouver son chemin"
          className="mt-4 flex flex-wrap items-center justify-center gap-3"
        >
          {links.map((link, index) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium outline-green-500 transition-colors",
                index === 0
                  ? "bg-title-color-600 hover:bg-title-color-700 text-white shadow-sm"
                  : "text-title-color-800 ring-brand-color-300 hover:bg-brand-color-50 bg-white ring-1"
              )}
            >
              {link.label}
              {index === 0 && (
                <ArrowRight aria-hidden="true" className="size-4" />
              )}
            </Link>
          ))}
        </nav>
      </div>
    </PageContent>
  );
};
