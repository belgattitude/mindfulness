import Link from "next/link";
import type { FC } from "react";
import { twMerge } from "tailwind-merge";

import { DateRangeText } from "@/components/DateRangeText";
import { getStartKey } from "@/lib/date/date.utils";
import type { EventPeriod } from "@/lib/date/date.utils";

import { EventDateBadge, EventTags, getEventStatus } from "./EventMeta";

interface EventMiniItemEvent extends EventPeriod {
  slug: string;
  title: string;
  displayTitle?: string | null;
  eventType?: string | null;
}

/** Events not finished yet, soonest first */
export const getNextEvents = <T extends EventMiniItemEvent>(
  events: readonly T[],
  now: string
): T[] =>
  events
    .filter((event) => getEventStatus(event, now) !== "past")
    .toSorted((a, b) => getStartKey(a).localeCompare(getStartKey(b)));

/** Finished events, most recent first */
export const getPastEvents = <T extends EventMiniItemEvent>(
  events: readonly T[],
  now: string
): T[] =>
  events
    .filter((event) => getEventStatus(event, now) === "past")
    .toSorted((a, b) => getStartKey(b).localeCompare(getStartKey(a)));

/** A compact event row (date badge, title, tags), linking to the event page */
export const EventMiniItem: FC<{
  event: EventMiniItemEvent;
  /** Reference date (iso) for the status, set by the server */
  now: string;
  className?: string;
}> = (props) => {
  const { event, now, className } = props;
  return (
    <Link
      href={`/event/${encodeURIComponent(event.slug)}`}
      className={twMerge(
        "group hover:bg-brand-color-50 -mx-2 flex items-center gap-3 rounded-xl p-2 outline-green-500 transition-colors",
        className
      )}
    >
      <EventDateBadge
        period={event}
        className="bg-brand-color-50 ring-brand-color-200 flex-none shadow-none ring-1 group-hover:bg-white"
      />
      <div className="flex min-w-0 flex-col gap-1">
        <span className="text-title-color-800 group-hover:text-title-color-600 text-sm leading-snug font-medium transition-colors">
          {event.displayTitle ?? event.title}
        </span>
        <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
          <EventTags
            eventType={event.eventType}
            status={getEventStatus(event, now)}
            className="text-[0.6875rem]"
          />
          <DateRangeText
            period={event}
            className="text-xs text-neutral-500 first-letter:capitalize"
          />
        </div>
      </div>
    </Link>
  );
};
