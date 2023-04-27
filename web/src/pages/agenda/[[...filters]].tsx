import { dehydrate, QueryClient, useQuery } from '@tanstack/react-query';
import dayjs from 'dayjs';
import type { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { NextSeo } from 'next-seo';
import { z } from 'zod';
import { fetchEvents } from '@/api/events.api';
import { EventCard } from '@/components/Event/EventCard';
import { EventFilters } from '@/components/Event/EventFilters';
import type { EventTypeSlugs } from '@/components/Event/utils';
import { getEventTypeSlugs } from '@/components/Event/utils';
import { ReactQueryErrorBox } from '@/components/ReactQueryErrorBox';
import { ReactQueryLoader } from '@/components/ReactQueryLoader';
import { queryClientConfig } from '@/config/query-client.config';
import { assertStringIsoDate } from '@/lib/date/assertStringIsoDate';
import { convertIsoStringToDate } from '@/lib/date/date.utils';

type Props = {
  dateMinStr: string;
  eventType: EventTypeSlugs | null;
};

const limit = 10;
// const dateMin = dayjs().subtract(10, 'month').toDate();

export default function EventsRoute(
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) {
  const { dateMinStr, eventType } = props;
  assertStringIsoDate(dateMinStr);
  const { data, isLoading, error } = useQuery({
    queryKey: ['events', limit, dateMinStr, eventType],
    queryFn: async () =>
      fetchEvents({
        limit,
        dateMin: convertIsoStringToDate(dateMinStr),
        eventType,
      }),
    useErrorBoundary: false,
    // prefetched data is made available through the server, on the client it might already look
    // outdated... as we use revalidation with events for this age, it's possible to set stale time
    // to max
    // staleTime: Number.MAX_SAFE_INTEGER,
  });

  if (error) {
    return <ReactQueryErrorBox e={error} />;
  }

  if (isLoading) {
    return <ReactQueryLoader />;
  }

  return (
    <>
      <NextSeo />

      <div className={'flex flex-col py-5'}>
        <div className={'flex'}>
          <EventFilters selected={eventType} />
        </div>
        <div className="flex flex-col gap-5">
          {data && (
            <>
              {data.events?.data?.map(
                (e) =>
                  e?.attributes && (
                    <EventCard event={e.attributes} key={`event-${e.id}`} />
                  )
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
}

const schema = z.object({
  eventType: z
    .enum([...getEventTypeSlugs()] as [string, ...string[]])
    .optional(),
});

export const getServerSideProps: GetServerSideProps<Props> = async (
  context
) => {
  const dateMin = dayjs().subtract(10, 'month').toDate();
  const dateMinStr = dateMin.toISOString();
  assertStringIsoDate(dateMinStr);

  const { filters = [] } = context.params ?? {};

  const f = {
    eventType: filters?.[0] ?? undefined,
    universe: filters?.[1] ?? undefined,
  };
  const parsedFilters = schema.parse(f);
  const eventType = (parsedFilters.eventType as EventTypeSlugs) ?? null;

  const queryClient = new QueryClient(queryClientConfig);

  await queryClient.prefetchQuery({
    queryKey: ['events', limit, dateMinStr, eventType],
    queryFn: async () =>
      fetchEvents({
        limit,
        dateMin: convertIsoStringToDate(dateMinStr),
        ...(eventType ? { eventType } : {}),
      }),
    retry: false,
  });

  return {
    props: {
      eventType: eventType ?? null,
      dateMinStr: dateMinStr,
      dehydratedState: dehydrate(queryClient),
    },
  };
};
