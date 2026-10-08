import { assertParsableStrictIsoDateZ } from "@httpx/assert";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import dayjs from "dayjs";
import { z } from "zod";

import {
  getPastEventsParams,
  getUpcomingEventsParams,
} from "@/api/events.rest";
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

// Upcoming events are all shown, past ones are only a reminder
const pastLimit = 10;

const schema = z.object({
  eventTypeSlugs: z.array(z.string()).max(1).optional(),
});

const AgendaRoute = async (props: Props) => {
  const params = await props.params;

  const safeParams = schema.parse(params);

  const eventType = (safeParams.eventTypeSlugs?.[0] as EventTypeSlugs) ?? null;

  const now = dayjs().toISOString();
  const dateMin = dayjs().subtract(10, "month").toISOString();

  assertParsableStrictIsoDateZ(dateMin);

  // Prefetched on the server, the client components read them from the cache
  const upcomingParams = getUpcomingEventsParams({ now, eventType });
  const pastParams = getPastEventsParams({
    now,
    dateMin,
    eventType,
    limit: pastLimit,
  });
  const queryClient = new QueryClient(reactQueryConfig);
  await Promise.all([
    queryClient.prefetchQuery(getGetEventsQueryOptions(upcomingParams)),
    queryClient.prefetchQuery(getGetEventsQueryOptions(pastParams)),
  ]);

  return (
    <PageContent title="Agenda">
      <div className="flex">
        <EventFilters selected={eventType} />
      </div>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <div className="flex flex-col gap-12">
          <AgendaEventList
            params={upcomingParams}
            now={now}
            title="En cours et à venir"
            emptyText="Aucun événement prévu pour le moment."
          />
          <AgendaEventList params={pastParams} now={now} title="Passés" />
        </div>
      </HydrationBoundary>
    </PageContent>
  );
};

export default AgendaRoute;
