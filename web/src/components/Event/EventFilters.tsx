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

  const updateFilters = async (selected: Types) => {
    if (onChange) {
      // onChange(selected);
    }
    const { slug } = selected;
    setSelected(selected);
    const url = ["/agenda", slug].filter((s) => s.length > 0).join("/");
    router.push(url);
  };

  return (
    <div className={twMerge("flex flex-col gap-5 py-5 md:flex-row", className)}>
      {types.map((eventType) => (
        <div
          key={eventType.slug}
          className={clsx(
            "flex-1 rounded-sm bg-gray-200 p-5 drop-shadow-sm hover:cursor-pointer hover:bg-gray-100",
            {
              "bg-gray-300 underline": eventType.slug === selected.slug,
            }
          )}
          onClick={async (_e) => {
            await updateFilters(eventType);
          }}
        >
          {eventType.title}
        </div>
      ))}
    </div>
  );
};
