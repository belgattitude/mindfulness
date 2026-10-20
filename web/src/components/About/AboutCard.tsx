import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { FC } from "react";
import { twMerge } from "tailwind-merge";

import IconMeditation from "@/public/icons/activities/meditation.svg";
import IconRetreats from "@/public/icons/activities/retreats.svg";
import IconYoga from "@/public/icons/activities/yoga.svg";

import { sandrinePortrait, sandrineTagline } from "./sandrinePortrait";

const offers = [
  { Icon: IconMeditation, text: "Méditation · pleine conscience" },
  { Icon: IconYoga, text: "Yoga en présentiel ou en ligne" },
  { Icon: IconRetreats, text: "Stages et retraites" },
] as const;

/** A personal and calm introduction, opening the home page */
export const AboutCard: FC<{ className?: string }> = (props) => {
  const { className } = props;
  return (
    <section
      className={twMerge(
        // A tinted wash fading into the page: no edge at the bottom
        "from-brand-color-100 via-brand-color-50/60 relative isolate grid items-center gap-8 overflow-hidden bg-linear-to-b to-transparent pt-8 pb-10 md:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] md:gap-12 md:pt-14 md:pb-16",
        className
      )}
    >
      {/* A soft light behind the portrait */}
      <div
        aria-hidden="true"
        className="absolute -top-24 -left-24 -z-10 size-96 rounded-full bg-white/70 blur-3xl"
      />
      <div className="shadow-title-color-800/10 relative mx-auto aspect-4/5 w-full max-w-56 overflow-hidden rounded-3xl shadow-xl md:max-w-none">
        <Image
          src={sandrinePortrait.src}
          fill={true}
          priority={true}
          sizes="(min-width: 768px) 420px, 224px"
          className={`object-cover ${sandrinePortrait.objectPosition}`}
          alt={sandrinePortrait.alt}
        />
      </div>

      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <h2 className="font-display text-title-color-800 text-4xl leading-tight font-medium md:text-5xl">
            Bonjour, je suis{" "}
            <span className="text-title-color-600 italic">Sandrine</span>
          </h2>
          <p className="font-display text-title-color-600 text-xl italic">
            {sandrineTagline}
          </p>
        </div>

        <p className="text-lg leading-8 text-neutral-700">
          J&apos;enseigne le yoga et la pleine conscience depuis de nombreuses
          années. Pour celles et ceux que je n&apos;ai pas encore eu le plaisir
          de rencontrer, voici quelques pas de mon chemin.
        </p>

        <ul className="flex flex-wrap gap-2">
          {offers.map(({ Icon, text }) => (
            <li
              key={text}
              className="text-title-color-800 ring-brand-color-200 flex items-center gap-2 rounded-full bg-white/80 py-1.5 pr-4 pl-2 text-sm ring-1"
            >
              <Icon
                aria-hidden="true"
                className="text-title-color-600 size-5 flex-none"
              />
              {text}
            </li>
          ))}
        </ul>

        <figure className="flex gap-3">
          <span
            aria-hidden="true"
            className="font-display text-brand-color-800 -mt-3 text-6xl leading-none"
          >
            &ldquo;
          </span>
          <blockquote className="font-display text-title-color-700 text-xl leading-snug italic">
            Un nuage ne meurt jamais. Pour qu&apos;une larme soit éternelle, il
            suffit de la déposer dans une rivière.
          </blockquote>
        </figure>

        <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
          <Link
            href="/about"
            className="bg-title-color-600 hover:bg-title-color-700 flex items-center gap-2 rounded-full px-6 py-3 font-medium text-white shadow-sm outline-green-500 transition-colors"
          >
            Découvrir mon parcours
            <ArrowRight aria-hidden="true" className="size-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};
