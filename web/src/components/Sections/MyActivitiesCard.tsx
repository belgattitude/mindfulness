"use client";

import { clsx } from "clsx";
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
    name: "Programmes",
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
    <div
      className={twMerge(
        "radial-gradient font-family-primary bg-brand-color/60 mx-auto flex flex-col gap-5 border p-5 text-neutral-700 shadow-xl sm:rounded-lg sm:px-10",
        className
      )}
    >
      <div className="relative flex flex-col items-center justify-center gap-1">
        <h1 className="text-3xl font-extralight">Mes Activités</h1>
        <p className="p-3">En personne et en ligne</p>
        <p className="p-1">France / Belgique - Particuliers / Organisation</p>
      </div>
      <div className="flex flex-col justify-center md:flex-row">
        {activities.map((group, idxGroup) => (
          <div
            key={group.name}
            className={clsx("gap-5", { "md:ml-[80px]": idxGroup > 0 })}
          >
            <div className="ml-0 p-1 text-lg font-light underline md:hidden">
              {group.name}
            </div>
            <ul className="p-1">
              {group.items.map(({ title, href, Icon }) => (
                <li key={`${title}`} className="flex items-center">
                  <Icon aria-hidden="true" className="size-6 flex-none" />
                  <Link
                    className="p-3 text-lg decoration-white underline-offset-8 outline-green-500 hover:underline"
                    title={title}
                    prefetch={false}
                    href={href}
                  >
                    {title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};
