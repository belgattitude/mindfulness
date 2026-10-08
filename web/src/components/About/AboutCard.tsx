import { ArrowRight, ExternalLink } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { FC } from "react";
import { twMerge } from "tailwind-merge";

import IconMindfulness from "@/public/icons/activities/mindfulness.svg";
import IconRetreats from "@/public/icons/activities/retreats.svg";
import IconYoga from "@/public/icons/activities/yoga.svg";

const offers = [
  {
    Icon: IconMindfulness,
    text: "Ateliers et cycles de mindfulness / pleine conscience",
  },
  { Icon: IconYoga, text: "Classes de yoga en présentiel ou en ligne" },
  { Icon: IconRetreats, text: "Stages et retraites de yoga et méditation" },
] as const;

export const AboutCard: FC<{ className?: string }> = (props) => {
  const { className } = props;
  return (
    <section
      className={twMerge(
        "ring-brand-color-200 flex flex-col overflow-hidden rounded-2xl bg-white shadow-sm ring-1 md:flex-row",
        className
      )}
    >
      <div className="bg-brand-color-200 relative aspect-4/3 flex-none md:aspect-auto md:min-h-80 md:w-2/5">
        <Image
          src="/images/sandrine-photo.jpg"
          fill={true}
          sizes="(min-width: 768px) 460px, 100vw"
          className="object-cover object-[center_30%]"
          alt="Portrait de Sandrine Rauter"
        />
      </div>

      <div className="flex flex-col gap-5 p-6 md:p-8">
        <div>
          <h2 className="text-title-color-800 text-2xl font-light">
            Bonjour, à mon propos
          </h2>
          <p className="text-title-color-600 mt-1 text-sm italic">
            Pleine conscience et yoga, teintée de nature et sa profondeur.
          </p>
        </div>

        <p className="leading-7 text-neutral-700">
          Je suis Sandrine Rauter, professeur de Yoga et de pleine conscience /
          mindfulness depuis de nombreuses années. Pour celles et ceux dont je
          n&apos;ai pas encore eu le plaisir de faire connaissance, vous
          trouverez un aperçu de mon parcours{" "}
          <Link
            href="/about"
            className="text-title-color-700 font-medium underline decoration-current/30 underline-offset-4 outline-green-500 hover:decoration-current"
          >
            ici
          </Link>
          .
        </p>

        <ul className="grid gap-3 text-sm text-neutral-700 lg:grid-cols-3">
          {offers.map(({ Icon, text }) => (
            <li key={text} className="flex items-center gap-3">
              <span className="bg-brand-color-50 text-title-color-700 flex size-9 flex-none items-center justify-center rounded-full">
                <Icon aria-hidden="true" className="size-5" />
              </span>
              {text}
            </li>
          ))}
        </ul>

        <blockquote className="border-brand-color-400 border-l-2 pl-4 text-sm leading-6 text-neutral-600 italic">
          Un nuage ne meurt jamais. Pour qu&apos;une larme soit éternelle, il
          suffit de la déposer dans une rivière.
        </blockquote>

        <div className="border-brand-color-100 flex flex-wrap gap-x-6 gap-y-2 border-t pt-4 text-sm font-medium">
          <Link
            href="/about"
            className="text-title-color-600 hover:text-title-color-800 flex w-fit items-center gap-1 outline-green-500 transition-colors"
          >
            Mon parcours
            <ArrowRight aria-hidden="true" className="size-4" />
          </Link>
          <a
            target="_blank"
            href="https://www.brusselsmindfulness.be/team/sandrine-rauter"
            className="text-title-color-600 hover:text-title-color-800 flex w-fit items-center gap-1 outline-green-500 transition-colors"
            rel="noreferrer"
          >
            Mes formations sur Brussels Mindfulness
            <ExternalLink aria-hidden="true" className="size-4" />
          </a>
        </div>
      </div>
    </section>
  );
};
