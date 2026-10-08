"use client";

import type { FC } from "react";

import { useGetEvents } from "@/openapi/event/event";
import type { GetEventsParams } from "@/openapi/model";

import { EventCard } from "./EventCard";
import { getEventStatus } from "./EventMeta";

interface Props {
  /** The params prefetched by the server component (same query key) */
  params: GetEventsParams;
  /** Reference date (iso), the one used in params */
  now: string;
  title: string;
  /** Shown when there is no event, the section is hidden when not set */
  emptyText?: string;
}

export const AgendaEventList: FC<Props> = (props) => {
  const { params, now, title, emptyText } = props;
  const { data, error, isPending } = useGetEvents(params);

  if (isPending) {
    return null;
  }
  if (error) {
    return (
      <p className="text-red-700">Impossible de charger l&rsquo;agenda.</p>
    );
  }
  const events = data.data ?? [];
  if (events.length === 0 && emptyText === undefined) {
    return null;
  }
  return (
    <section className="flex flex-col gap-5">
      <h2 className="text-title-color-800 text-2xl font-light">{title}</h2>
      {events.length === 0 ? (
        <p className="text-neutral-600">{emptyText}</p>
      ) : (
        <ul className="flex flex-col gap-5">
          {events.map((e) => (
            <li key={`event-${e.documentId}`}>
              <EventCard
                event={e}
                status={getEventStatus({
                  startAt: e.startAt,
                  endAt: e.endAt,
                  now,
                })}
              />
            </li>
          ))}
        </ul>
      )}
    </section>
  );
};
