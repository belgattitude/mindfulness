"use client";
import { clsx } from "clsx";
import { useRouter } from "next/navigation";
import { useState } from "react";
import type { FC } from "react";
import { twMerge } from "tailwind-merge";

import { findEventBySlug } from "@/components/Event/utils";
import type { EventTypeSlugs } from "@/components/Event/utils";
import { siteConfig } from "@/config/site.config";

const types = [
  { slug: "", title: "Tous" },
  ...siteConfig.search.eventTypes,
] as const;

type Types = (typeof types)[number];

interface Props {
  onChange?: (selected: Types) => void;
  selected: EventTypeSlugs | null;
  className?: string;
}

export const EventFilters: FC<Props> = (props) => {
  const { className = "", onChange } = props;

  const router = useRouter();

  const [selected, setSelected] = useState<Types>(
    findEventBySlug(props.selected) ?? types[0]
  );

  const updateFilters = (eventType: Types) => {
    if (onChange) {
      // onChange(eventType);
    }
    const { slug } = eventType;
    setSelected(eventType);
    const url = ["/agenda", slug].filter((s) => s.length > 0).join("/");
    router.push(url);
  };

  return (
    <fieldset className={twMerge("flex flex-wrap gap-2 pb-8", className)}>
      <legend className="sr-only">Filtrer par type d&apos;activité</legend>
      {types.map((eventType) => {
        const isSelected = eventType.slug === selected.slug;
        return (
          <button
            type="button"
            key={eventType.slug}
            className={clsx(
              "cursor-pointer rounded-full border px-4 py-2 text-sm font-medium outline-green-500 transition-colors",
              isSelected
                ? "border-title-color-600 bg-title-color-600 text-white"
                : "border-brand-color-400 text-title-color-800 hover:bg-brand-color-50 bg-white"
            )}
            aria-pressed={isSelected}
            onClick={() => {
              updateFilters(eventType);
            }}
          >
            {eventType.title}
          </button>
        );
      })}
    </fieldset>
  );
};
