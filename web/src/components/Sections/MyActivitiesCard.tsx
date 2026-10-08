"use client";

import { ArrowRight } from "lucide-react";
import Link from "next/link";
import type { FC } from "react";
import { twMerge } from "tailwind-merge";

import IconDialogue from "@/public/icons/activities/dialogue.svg";
import IconMindfulness from "@/public/icons/activities/mindfulness.svg";
import IconProgrammes from "@/public/icons/activities/programmes.svg";
import IconRegularClasses from "@/public/icons/activities/regular-classes.svg";
import IconRetreats from "@/public/icons/activities/retreats.svg";
import IconYoga from "@/public/icons/activities/yoga.svg";

interface Props {
  className?: string;
}

const activities = [
  {
    items: [
      {
        title: "Mindfulness",
        href: "/activities/mindfulness",
        Icon: IconMindfulness,
      },
      { title: "Yoga", href: "/activities/yoga", Icon: IconYoga },
      {
        title: "Dialogue conscient",
        href: "/activities/dialogue-conscient",
        Icon: IconDialogue,
      },
    ],
    name: "Activités",
  },
  {
    items: [
      {
        title: "Cours réguliers",
        href: "/agenda/cours-reguliers",
        Icon: IconRegularClasses,
      },
      {
        title: "Programmes & cycles",
        href: "/agenda/programmes-et-cycles",
        Icon: IconProgrammes,
      },
      {
        title: "Stages & retraites",
        href: "/agenda/stages-et-retraites",
        Icon: IconRetreats,
      },
    ],
    name: "Agenda",
  },
] as const;

export const MyActivitiesCard: FC<Props> = (props) => {
  const { className = "" } = props;
  return (
    <section
      className={twMerge(
        "ring-brand-color-200 @container flex flex-col gap-6 rounded-2xl bg-white p-4 shadow-sm ring-1 sm:p-6 md:p-8",
        className
      )}
    >
      <div className="flex flex-col gap-1">
        <h2 className="font-display text-title-color-800 text-4xl font-medium">
          Mes activités
        </h2>
        <p className="text-sm text-neutral-600">
          En personne et en ligne · France / Belgique · Particuliers /
          Organisations
        </p>
      </div>
      {/* Sized by the card, not the screen: it sits in a side column */}
      <div className="grid gap-6 @xl:grid-cols-2">
        {activities.map((group) => (
          <div key={group.name} className="flex flex-col gap-2">
            <h3 className="text-xs font-medium tracking-wide text-neutral-500 uppercase">
              {group.name}
            </h3>
            <ul className="flex flex-col gap-1">
              {group.items.map(({ title, href, Icon }) => (
                <li key={title}>
                  <Link
                    className="group hover:bg-brand-color-50 flex items-center gap-3 rounded-xl p-2 outline-green-500 transition-colors"
                    prefetch={false}
                    href={href}
                  >
                    <span className="bg-brand-color-50 text-title-color-700 group-hover:bg-brand-color-100 flex size-10 flex-none items-center justify-center rounded-full transition-colors">
                      <Icon aria-hidden="true" className="size-6" />
                    </span>
                    <span className="text-title-color-800 grow text-lg">
                      {title}
                    </span>
                    <ArrowRight
                      aria-hidden="true"
                      className="text-title-color-500 size-4 opacity-0 transition-all group-hover:translate-x-0.5 group-hover:opacity-100 motion-reduce:transition-none"
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
};
