"use client";

import type { FC } from "react";

import { useGetEvents } from "@/openapi/event/event";
import type { GetEventsParams } from "@/openapi/model";

import { EventCard } from "./EventCard";

interface Props {
  /** The params prefetched by the server component (same query key) */
  params: GetEventsParams;
}

export const AgendaEventList: FC<Props> = (props) => {
  const { params } = props;
  const { data, error, isPending } = useGetEvents(params);

  if (isPending) {
    return null;
  }
  if (error) {
    return (
      <p className="text-red-700">Impossible de charger l&rsquo;agenda.</p>
    );
  }
  return (
    <div className="flex flex-col gap-5">
      {data.data?.map((e) => (
        <EventCard event={e} key={`event-${e.documentId}`} />
      ))}
    </div>
  );
};
