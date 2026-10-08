import { clsx } from "clsx";
import type { FC } from "react";
import { twMerge } from "tailwind-merge";

import { getDayMonthParts } from "@/lib/date/date.utils";

import { findEventBySlug } from "./utils";
import type { EventTypeSlugs } from "./utils";

/** Shared by the agenda list (EventCard) and the event page (EventDetail) */

export type EventStatus = "ongoing" | "upcoming" | "past";

const statusLabels: Record<EventStatus, string> = {
  ongoing: "En cours",
  past: "Terminé",
  upcoming: "À venir",
};

/** Dates are iso strings, compared as is. `now` comes from the server render. */
export const getEventStatus = (params: {
  startAt: string;
  endAt: string;
  now: string;
}): EventStatus => {
  const { startAt, endAt, now } = params;
  if (endAt < now) {
    return "past";
  }
  return startAt <= now ? "ongoing" : "upcoming";
};

/** The location is sometimes filled with "online" instead of the online flag */
export const isOnlineEvent = (event: {
  online?: boolean | null;
  location?: string | null;
}) => event.online === true || /^\s*online\s*$/iu.test(event.location ?? "");

/** Type and status of an event, ie: "Cours réguliers" "En cours" */
export const EventTags: FC<{
  eventType?: string | null;
  status: EventStatus;
  className?: string;
}> = (props) => {
  const { status, className } = props;
  const eventType = findEventBySlug(props.eventType as EventTypeSlugs);
  return (
    <div
      className={twMerge("flex flex-wrap gap-2 text-xs font-medium", className)}
    >
      {eventType !== null && (
        <span className="bg-brand-color-100 text-title-color-800 rounded-full px-2.5 py-1">
          {eventType.title}
        </span>
      )}
      <span
        className={clsx("rounded-full px-2.5 py-1", {
          "bg-title-color-600 text-white": status === "ongoing",
          "ring-title-color-400 text-title-color-700 ring-1 ring-inset":
            status === "upcoming",
          "bg-neutral-100 text-neutral-600": status === "past",
        })}
      >
        {statusLabels[status]}
      </span>
    </div>
  );
};

/** Calendar sheet with the first day of an event */
export const EventDateBadge: FC<{ startAt: string; className?: string }> = (
  props
) => {
  const { startAt, className } = props;
  const { day, month } = getDayMonthParts({ date: startAt });
  return (
    <div
      className={twMerge(
        "flex min-w-14 flex-col items-center rounded-xl bg-white/95 px-2 py-1.5 leading-none shadow-sm",
        className
      )}
    >
      <span className="text-title-color-800 text-2xl font-semibold">{day}</span>
      <span className="text-title-color-600 mt-1 text-xs uppercase">
        {month}
      </span>
    </div>
  );
};
