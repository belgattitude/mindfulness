"use client";

import { ArrowRight } from "lucide-react";
import Link from "next/link";
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
  /** A way out of an empty list (ie: clear the filters) */
  emptyLink?: { href: string; label: string } | undefined;
}

export const AgendaEventList: FC<Props> = (props) => {
  const { params, now, title, emptyText, emptyLink } = props;
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
      <h2 className="heading-section">{title}</h2>
      {events.length === 0 ? (
        <div className="flex flex-col gap-3">
          <p className="text-neutral-600">{emptyText}</p>
          {emptyLink && (
            <Link
              href={emptyLink.href}
              scroll={false}
              className="text-title-color-600 hover:text-title-color-800 flex w-fit items-center gap-1 text-sm font-medium outline-green-500 transition-colors"
            >
              {emptyLink.label}
              <ArrowRight aria-hidden="true" className="size-4" />
            </Link>
          )}
        </div>
      ) : (
        <ul className="flex flex-col gap-5">
          {events.map((e) => (
            <li key={`event-${e.documentId}`}>
              <EventCard event={e} status={getEventStatus(e, now)} />
            </li>
          ))}
        </ul>
      )}
    </section>
  );
};
