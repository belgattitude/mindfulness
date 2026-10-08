import Link from "next/link";
import type { FC } from "react";
import { twMerge } from "tailwind-merge";

import { DateRangeText } from "@/components/DateRangeText";

import { EventDateBadge, EventTags, getEventStatus } from "./EventMeta";

interface EventMiniItemEvent {
  slug: string;
  title: string;
  displayTitle?: string | null;
  startAt: string;
  endAt: string;
  eventType?: string | null;
}

/** Events not finished yet, soonest first */
export const getNextEvents = <T extends EventMiniItemEvent>(
  events: readonly T[],
  now: string
): T[] =>
  events
    .filter((event) => event.endAt >= now)
    .toSorted((a, b) => a.startAt.localeCompare(b.startAt));

/** Finished events, most recent first */
export const getPastEvents = <T extends EventMiniItemEvent>(
  events: readonly T[],
  now: string
): T[] =>
  events
    .filter((event) => event.endAt < now)
    .toSorted((a, b) => b.startAt.localeCompare(a.startAt));

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
        startAt={event.startAt}
        className="bg-brand-color-50 ring-brand-color-200 flex-none shadow-none ring-1 group-hover:bg-white"
      />
      <div className="flex min-w-0 flex-col gap-1">
        <span className="text-title-color-800 group-hover:text-title-color-600 text-sm leading-snug font-medium transition-colors">
          {event.displayTitle ?? event.title}
        </span>
        <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
          <EventTags
            eventType={event.eventType}
            status={getEventStatus({
              startAt: event.startAt,
              endAt: event.endAt,
              now,
            })}
            className="text-[0.6875rem]"
          />
          <DateRangeText
            startAt={event.startAt}
            endAt={event.endAt}
            className="text-xs text-neutral-500 first-letter:capitalize"
          />
        </div>
      </div>
    </Link>
  );
};
