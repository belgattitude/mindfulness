"use client";

import { ArrowRight } from "lucide-react";
import Link from "next/link";
import type { FC } from "react";
import { twMerge } from "tailwind-merge";

import { DateRangeText } from "@/components/DateRangeText";
import { useGetEvents } from "@/openapi/event/event";
import type { GetEventsParams } from "@/openapi/model";

import { EventDateBadge, EventTags, getEventStatus } from "./EventMeta";

interface Props {
  /** The params prefetched by the server component (same query key) */
  params: GetEventsParams;
  /** Reference date (iso), the one used in params */
  now: string;
  className?: string;
}

/** The next events, a compact version of the agenda list */
export const UpcomingEventsCard: FC<Props> = (props) => {
  const { params, now, className } = props;
  const { data, error, isPending } = useGetEvents(params);

  if (isPending || error) {
    return null;
  }
  const events = data.data ?? [];

  return (
    <section
      className={twMerge(
        "ring-brand-color-200 @container flex flex-col gap-4 rounded-2xl bg-white p-4 shadow-sm ring-1 sm:p-6",
        className
      )}
    >
      <h2 className="font-display text-title-color-800 text-3xl font-medium">
        Prochains rendez-vous
      </h2>
      {events.length === 0 ? (
        <p className="text-sm text-neutral-600">
          Aucun événement prévu pour le moment.
        </p>
      ) : (
        // A list in a narrow section, a row of columns in a wide one
        <ul className="divide-brand-color-100 flex flex-col divide-y @3xl:grid @3xl:grid-cols-3 @3xl:gap-6 @3xl:divide-y-0">
          {events.map((event) => (
            <li
              key={event.documentId}
              className="py-3 first:pt-0 last:pb-0 @3xl:py-0"
            >
              <Link
                href={`/event/${encodeURIComponent(event.slug)}`}
                className="group flex gap-4 rounded-lg outline-green-500"
              >
                <EventDateBadge
                  startAt={event.startAt}
                  className="bg-brand-color-50 ring-brand-color-200 h-fit flex-none shadow-none ring-1"
                />
                <div className="flex min-w-0 flex-col gap-1.5">
                  <EventTags
                    eventType={event.eventType}
                    status={getEventStatus({
                      startAt: event.startAt,
                      endAt: event.endAt,
                      now,
                    })}
                    className="text-[0.6875rem]"
                  />
                  <h3 className="text-title-color-800 group-hover:text-title-color-600 leading-snug font-medium transition-colors">
                    {event.displayTitle ?? event.title}
                  </h3>
                  <DateRangeText
                    startAt={event.startAt}
                    endAt={event.endAt}
                    className="text-xs text-neutral-500 first-letter:capitalize"
                  />
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
      <Link
        href="/agenda"
        className="text-title-color-600 hover:text-title-color-800 flex w-fit items-center gap-1 text-sm font-medium outline-green-500 transition-colors"
      >
        Voir tout l&rsquo;agenda
        <ArrowRight aria-hidden="true" className="size-4" />
      </Link>
    </section>
  );
};
