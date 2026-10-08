import { assertParsableStrictIsoDateZ } from "@httpx/assert";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import dayjs from "dayjs";
import { z } from "zod";

import { getSearchEventsParams } from "@/api/events.rest";
import { AgendaEventList } from "@/components/Event/AgendaEventList";
import { EventFilters } from "@/components/Event/EventFilters";
import type { EventTypeSlugs } from "@/components/Event/utils";
import { PageContent } from "@/components/PageContent";
import { reactQueryConfig } from "@/config/react-query.config";
import { getGetEventsQueryOptions } from "@/openapi/event/event";

interface Props {
  params: Promise<{
    eventTypeSlugs?: EventTypeSlugs[] | undefined;
  }>;
}

export const dynamic = "force-dynamic";

const limit = 10;

const schema = z.object({
  eventTypeSlugs: z.array(z.string()).max(1).optional(),
});

const AgendaRoute = async (props: Props) => {
  const params = await props.params;

  const safeParams = schema.parse(params);

  const eventType = (safeParams.eventTypeSlugs?.[0] as EventTypeSlugs) ?? null;

  const dateMin = dayjs().subtract(10, "month").toISOString();

  assertParsableStrictIsoDateZ(dateMin);

  // Prefetched on the server, the client component reads it from the cache
  const eventsParams = getSearchEventsParams({ dateMin, eventType, limit });
  const queryClient = new QueryClient(reactQueryConfig);
  await queryClient.prefetchQuery(getGetEventsQueryOptions(eventsParams));

  return (
    <PageContent title="Agenda">
      <div className="flex">
        <EventFilters selected={eventType} />
      </div>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <AgendaEventList params={eventsParams} />
      </HydrationBoundary>
    </PageContent>
  );
};

export default AgendaRoute;
