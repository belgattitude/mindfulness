import { clsx } from "clsx";
import { ArrowDown } from "lucide-react";
import type { FC } from "react";
import { twMerge } from "tailwind-merge";

import {
  getDateBadgeParts,
  getSiteNow,
  getStartKey,
} from "@/lib/date/date.utils";
import type { EventPeriod } from "@/lib/date/date.utils";

import { findEventBySlug } from "./utils";
import type { EventTypeSlugs } from "./utils";

/** Shared by the agenda list (EventCard) and the event page (EventDetail) */

export type EventStatus = "ongoing" | "upcoming" | "past";

const statusLabels: Record<EventStatus, string> = {
  ongoing: "En cours",
  past: "Terminé",
  upcoming: "À venir",
};

/**
 * Over once its end day is over, ongoing from its start time, in the site
 * time zone. `now` (iso) comes from the server render.
 */
export const getEventStatus = (
  period: EventPeriod,
  now: string
): EventStatus => {
  const site = getSiteNow(now);
  if (period.endDate < site.date) {
    return "past";
  }
  return getStartKey(period) <= `${site.date}T${site.time}`
    ? "ongoing"
    : "upcoming";
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

/**
 * Calendar sheet of an event: the day, the days ("6–13 sept.") or, over a
 * week, the months. A period should not read as a single date.
 */
export const EventDateBadge: FC<{
  period: EventPeriod;
  className?: string;
}> = (props) => {
  const { period, className } = props;
  const parts = getDateBadgeParts(period);
  return (
    <div
      className={twMerge(
        "flex min-w-14 flex-col items-center rounded-xl bg-white/95 px-2 py-1.5 leading-none whitespace-nowrap shadow-sm",
        className
      )}
    >
      {parts.kind === "period" ? (
        <>
          <span className="text-title-color-800 text-xs font-semibold uppercase">
            {parts.from}
          </span>
          <ArrowDown
            aria-hidden="true"
            className="text-title-color-500 my-0.5 size-3"
          />
          <span className="text-title-color-800 text-xs font-semibold uppercase">
            {parts.end}
          </span>
        </>
      ) : (
        <>
          <span className="text-title-color-800 text-2xl font-semibold">
            {parts.kind === "day" ? parts.day : parts.days}
          </span>
          <span className="text-title-color-600 mt-1 text-xs uppercase">
            {parts.kind === "day" ? parts.month : parts.months}
          </span>
        </>
      )}
    </div>
  );
};
