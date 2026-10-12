import { assertParsableStrictIsoDateZ } from "@httpx/assert";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import dayjs from "dayjs";
import type { Metadata } from "next";
import { notFound, permanentRedirect } from "next/navigation";

import {
  getPastEventsParams,
  getUpcomingEventsParams,
} from "@/api/events.rest";
import { AgendaEventList } from "@/components/Event/AgendaEventList";
import {
  getAgendaFiltersTitle,
  getAgendaUrl,
  parseAgendaSegments,
} from "@/components/Event/agendaFilters";
import { EventFilters } from "@/components/Event/EventFilters";
import { PageContent } from "@/components/PageContent";
import { reactQueryConfig } from "@/config/react-query.config";
import { getGetEventsQueryOptions } from "@/openapi/event/event";

interface Props {
  /** The universe and / or the event type: /agenda/yoga/stages-et-retraites */
  params: Promise<{
    filters?: string[] | undefined;
  }>;
}

export const dynamic = "force-dynamic";

// Upcoming events are all shown, past ones are only a reminder
const pastLimit = 10;

export const generateMetadata = async (props: Props): Promise<Metadata> => {
  const params = await props.params;
  const filters = parseAgendaSegments(params.filters ?? []);
  if (filters === null) {
    return { title: "Agenda introuvable" };
  }
  const filtersTitle = getAgendaFiltersTitle(filters);
  return {
    title: filtersTitle ? `Agenda · ${filtersTitle}` : "Agenda",
    alternates: { canonical: getAgendaUrl(filters) },
  };
};

const AgendaRoute = async (props: Props) => {
  const params = await props.params;
  const segments = params.filters ?? [];
  const filters = parseAgendaSegments(segments);
  if (filters === null) {
    notFound();
  }
  // One url per filters: the universe first
  const url = getAgendaUrl(filters);
  if (url !== ["/agenda", ...segments].join("/")) {
    permanentRedirect(url);
  }

  const now = dayjs().toISOString();
  const dateMin = dayjs().subtract(10, "month").toISOString();

  assertParsableStrictIsoDateZ(dateMin);

  // Prefetched on the server, the client components read them from the cache
  const upcomingParams = getUpcomingEventsParams({ now, ...filters });
  const pastParams = getPastEventsParams({
    now,
    dateMin,
    ...filters,
    limit: pastLimit,
  });
  const queryClient = new QueryClient(reactQueryConfig);
  await Promise.all([
    queryClient.prefetchQuery(getGetEventsQueryOptions(upcomingParams)),
    queryClient.prefetchQuery(getGetEventsQueryOptions(pastParams)),
  ]);

  const isFiltered = filters.universe !== null || filters.eventType !== null;
  return (
    <PageContent eyebrow={{ label: "Agenda" }}>
      <EventFilters selected={filters} />
      <HydrationBoundary state={dehydrate(queryClient)}>
        <div className="flex flex-col gap-12">
          <AgendaEventList
            params={upcomingParams}
            now={now}
            title="En cours et à venir"
            emptyText={
              isFiltered
                ? "Aucun événement prévu pour ces filtres pour le moment."
                : "Aucun événement prévu pour le moment."
            }
            emptyLink={
              isFiltered
                ? { href: "/agenda", label: "Voir tout l’agenda" }
                : undefined
            }
          />
          <AgendaEventList params={pastParams} now={now} title="Passés" />
        </div>
      </HydrationBoundary>
    </PageContent>
  );
};

export default AgendaRoute;
