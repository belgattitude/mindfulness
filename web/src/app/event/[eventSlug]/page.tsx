import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import dayjs from "dayjs";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { getEventParams } from "@/api/events.rest";
import { EventDetail } from "@/components/Event/EventDetail";
import { reactQueryConfig } from "@/config/react-query.config";
import { getDateRangeStr } from "@/lib/date/date.utils";
import { getStrapiMedia } from "@/lib/strapi";
import { getTextExcerpt } from "@/lib/text/text.utils";
import { getEvents, getGetEventsQueryOptions } from "@/openapi/event/event";

interface Props {
  params: Promise<{
    eventSlug: string;
  }>;
}

export const dynamic = "force-dynamic";

/**
 * Title, description and cover for the link previews when the page is shared.
 * The dates lead the description: they are what matters in a preview.
 */
export const generateMetadata = async (props: Props): Promise<Metadata> => {
  const { eventSlug } = await props.params;
  const response = await getEvents(getEventParams({ slug: eventSlug }));
  const event = response.data?.[0];
  if (!event) {
    return {};
  }
  const title = event.displayTitle ?? event.title;
  const dates = getDateRangeStr({ startAt: event.startAt, endAt: event.endAt });
  const description = getTextExcerpt(
    [
      `${dates.charAt(0).toUpperCase()}${dates.slice(1)}.`,
      event.summary || event.description || "",
    ].join(" ")
  );
  const cover = getStrapiMedia(event.cover);
  return {
    alternates: { canonical: `/event/${eventSlug}` },
    description,
    openGraph: {
      description,
      images: cover === null ? [] : [{ url: cover }],
      title,
      type: "article",
      url: `/event/${eventSlug}`,
    },
    title,
  };
};

const EventRoute = async (props: Props) => {
  const { eventSlug } = await props.params;

  // Fetched on the server (to answer a 404 for an unknown slug), the client
  // component reads it from the cache
  const eventParams = getEventParams({ slug: eventSlug });
  const queryClient = new QueryClient(reactQueryConfig);
  const data = await queryClient.fetchQuery(
    getGetEventsQueryOptions(eventParams)
  );
  if (!data.data?.length) {
    notFound();
  }

  return (
    <div>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <EventDetail params={eventParams} now={dayjs().toISOString()} />
      </HydrationBoundary>
    </div>
  );
};

export default EventRoute;
