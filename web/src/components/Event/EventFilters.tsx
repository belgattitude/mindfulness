import { clsx } from "clsx";
import Link from "next/link";
import type { FC, SVGProps } from "react";
import { twMerge } from "tailwind-merge";

import { siteConfig } from "@/config/site.config";
import IconDialogue from "@/public/icons/activities/dialogue.svg";
import IconMeditation from "@/public/icons/activities/meditation.svg";
import IconProgrammes from "@/public/icons/activities/programmes.svg";
import IconRegularClasses from "@/public/icons/activities/regular-classes.svg";
import IconRetreats from "@/public/icons/activities/retreats.svg";
import IconWorkshops from "@/public/icons/activities/workshops.svg";
import IconYoga from "@/public/icons/activities/yoga.svg";

import { getAgendaUrl } from "./agendaFilters";
import type { AgendaFilters } from "./agendaFilters";

type Icon = FC<SVGProps<SVGSVGElement>>;

const icons: Record<string, Icon> = {
  meditation: IconMeditation,
  yoga: IconYoga,
  "dialogue-conscient": IconDialogue,
  "stages-et-retraites": IconRetreats,
  "programmes-et-cycles": IconProgrammes,
  "cours-reguliers": IconRegularClasses,
  "atelier-ponctuel": IconWorkshops,
};

interface Option {
  slug: string | null;
  title: string;
}

const FilterRow: FC<{
  label: string;
  options: Option[];
  selected: string | null;
  getHref: (slug: string | null) => string;
}> = (props) => {
  const { label, options, selected, getHref } = props;
  return (
    <div className="flex flex-col gap-2 md:flex-row md:items-center md:gap-4">
      <p className="text-sm text-neutral-500 md:w-16 md:flex-none">{label}</p>
      {/* Wrapped, not scrolling: the selected chips are always visible */}
      <ul className="flex flex-wrap gap-2">
        {options.map((option) => {
          const isSelected = option.slug === selected;
          const Icon = option.slug === null ? null : icons[option.slug];
          return (
            <li key={option.slug ?? "all"} className="flex-none">
              <Link
                href={getHref(option.slug)}
                // Filters change the list only: keep the scroll position
                scroll={false}
                aria-current={isSelected ? "true" : undefined}
                className={clsx(
                  "flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-sm font-medium whitespace-nowrap outline-green-500 transition-colors md:px-4 md:py-2",
                  isSelected
                    ? "border-title-color-600 bg-title-color-600 text-white"
                    : "border-brand-color-400 text-title-color-800 hover:bg-brand-color-50 bg-white"
                )}
              >
                {Icon && (
                  <Icon aria-hidden="true" className="size-4 flex-none" />
                )}
                {option.title}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

interface Props {
  selected: AgendaFilters;
  className?: string;
}

/**
 * The agenda filters, links to their url (shareable): the universe and the
 * event type combine, "Tous" clears one of them
 */
export const EventFilters: FC<Props> = (props) => {
  const { selected, className } = props;
  return (
    <nav
      aria-label="Filtrer l’agenda"
      className={twMerge("flex flex-col gap-4 pb-8", className)}
    >
      <FilterRow
        label="Univers"
        options={[
          { slug: null, title: "Tous" },
          ...siteConfig.search.universes,
        ]}
        selected={selected.universe}
        getHref={(slug) =>
          getAgendaUrl({
            ...selected,
            universe: slug as AgendaFilters["universe"],
          })
        }
      />
      <FilterRow
        label="Type"
        options={[
          { slug: null, title: "Tous" },
          ...siteConfig.search.eventTypes,
        ]}
        selected={selected.eventType}
        getHref={(slug) =>
          getAgendaUrl({
            ...selected,
            eventType: slug as AgendaFilters["eventType"],
          })
        }
      />
    </nav>
  );
};
