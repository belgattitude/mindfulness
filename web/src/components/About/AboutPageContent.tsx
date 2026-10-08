"use client";

import { ArrowRight, ExternalLink } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { FC } from "react";

import { MarkdownText } from "@/components/MarkdownText";
import { ProseContent } from "@/components/ProseContent";
import { useGetAbout } from "@/openapi/about/about";

import { sandrinePortrait, sandrineTagline } from "./sandrinePortrait";

/** The "Liens inspirants" heading of the description, any level */
const linksHeadingRegex = /^#{1,6}\s+liens inspirants\s*$/imu;
const urlRegex = /https?:\/\/[^\s)>\]]+/gu;

/**
 * The description ends with a list of inspiring links: they are shown as
 * cards, the text before as the career. Without the heading, all is text.
 */
const splitDescription = (description: string) => {
  const match = linksHeadingRegex.exec(description);
  if (match === null) {
    return { career: description, links: [] };
  }
  const linksText = description.slice(match.index + match[0].length);
  return {
    career: description.slice(0, match.index).trim(),
    links: [...new Set(linksText.match(urlRegex))],
  };
};

/** https://www.emergences.org → emergences.org */
const getDisplayHost = (url: string) => {
  try {
    return new URL(url).hostname.replace(/^www\./u, "");
  } catch {
    return url;
  }
};

const InspiringLinks: FC<{ links: string[] }> = (props) => {
  const { links } = props;
  return (
    <section className="border-brand-color-200 mt-12 border-t pt-10">
      <h2 className="text-title-color-800 text-2xl font-light">
        Liens inspirants
      </h2>
      <p className="mt-1 text-sm text-neutral-600">
        Des lieux et des communautés qui nourrissent ma pratique.
      </p>
      <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {links.map((url) => (
          <li key={url}>
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-brand-color-50 ring-brand-color-200 text-title-color-800 hover:ring-brand-color-800 flex items-center justify-between gap-3 rounded-xl px-4 py-3 text-sm font-medium ring-1 outline-green-500 transition-colors hover:bg-white"
            >
              <span className="truncate">{getDisplayHost(url)}</span>
              <ExternalLink
                aria-hidden="true"
                className="text-title-color-500 size-4 flex-none"
              />
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
};

/** The about page, prefetched by the server component */
export const AboutPageContent: FC = () => {
  const { data, error, isPending } = useGetAbout();

  if (isPending) {
    return null;
  }
  if (error) {
    return <p className="text-red-700">Impossible de charger la page.</p>;
  }
  const { career, links } = splitDescription(data.data?.description ?? "");
  return (
    <>
      <header className="grid items-center gap-6 sm:grid-cols-[12rem_1fr] md:gap-10 lg:grid-cols-[16rem_1fr]">
        <div className="bg-brand-color-200 relative aspect-square w-40 overflow-hidden rounded-full shadow-md sm:w-full sm:rounded-2xl">
          <Image
            src={sandrinePortrait.src}
            fill={true}
            priority={true}
            sizes="(min-width: 1024px) 256px, (min-width: 640px) 192px, 160px"
            className={`object-cover ${sandrinePortrait.objectPosition}`}
            alt={sandrinePortrait.alt}
          />
        </div>
        <div className="flex flex-col gap-3">
          <h1 className="text-title-color-800 text-3xl leading-tight font-normal lg:text-4xl">
            Sandrine Rauter
          </h1>
          <p className="text-title-color-600 text-lg italic">
            {data.data?.summary ?? sandrineTagline}
          </p>
          <div className="mt-2 flex flex-wrap gap-3">
            <Link
              href="/contact"
              className="bg-title-color-600 hover:bg-title-color-700 rounded-full px-5 py-2.5 text-sm font-medium text-white outline-green-500 transition-colors"
            >
              Me contacter
            </Link>
            <Link
              href="/agenda"
              className="text-title-color-700 ring-brand-color-300 flex items-center gap-1 rounded-full px-5 py-2.5 text-sm font-medium ring-1 outline-green-500 transition-colors hover:bg-white"
            >
              Voir l&rsquo;agenda
              <ArrowRight aria-hidden="true" className="size-4" />
            </Link>
          </div>
        </div>
      </header>

      <section className="mt-10 md:mt-12">
        <h2 className="text-title-color-800 text-2xl font-light">
          Mon parcours
        </h2>
        {/* A readable line length, the card is wide on desktop */}
        <ProseContent className="mt-4 max-w-prose [&_p:first-child]:mt-0">
          <MarkdownText className="text-title-color-800" text={career} />
        </ProseContent>
      </section>

      {links.length > 0 && <InspiringLinks links={links} />}
    </>
  );
};
