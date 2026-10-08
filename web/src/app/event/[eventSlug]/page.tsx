import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import dayjs from "dayjs";
import { notFound } from "next/navigation";

import { getEventParams } from "@/api/events.rest";
import { EventDetail } from "@/components/Event/EventDetail";
import { reactQueryConfig } from "@/config/react-query.config";
import { getGetEventsQueryOptions } from "@/openapi/event/event";

interface Props {
  params: Promise<{
    eventSlug: string;
  }>;
}

export const dynamic = "force-dynamic";

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
