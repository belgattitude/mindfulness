import { dehydrate, QueryClient, useQuery } from '@tanstack/react-query';
import dayjs from 'dayjs';
import type { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { NextSeo } from 'next-seo';
import { z } from 'zod';
import { fetchEvents } from '@/api/events.api';
import { EventCard } from '@/components/Event/EventCard';
import { EventFilters } from '@/components/Event/EventFilters';
import {
  getEventTypeSlugs,
  type EventTypeSlugs,
} from '@/components/Event/utils';
import { ReactQueryErrorBox } from '@/components/ReactQueryErrorBox';
import { ReactQueryLoader } from '@/components/ReactQueryLoader';
import { reactQueryConfig } from '@/config/react-query.config';
import { convertIsoStringToDate } from '@/lib/date/date.utils';
import { assertParsableStrictIsoDateZ } from '@httpx/assert';

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
  assertParsableStrictIsoDateZ(dateMinStr);
  const { data, isLoading, error } = useQuery({
    queryKey: ['events', limit, dateMinStr, eventType],
    queryFn: async () =>
      fetchEvents({
        limit,
        dateMin: convertIsoStringToDate(dateMinStr),
        eventType,
      }),
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
  assertParsableStrictIsoDateZ(dateMinStr);

  const { filters = [] } = context.params ?? {};

  const f = {
    eventType: filters?.[0] ?? undefined,
    universe: filters?.[1] ?? undefined,
  };
  const parsedFilters = schema.parse(f);
  const eventType = (parsedFilters.eventType as EventTypeSlugs) ?? null;

  const queryClient = new QueryClient(reactQueryConfig);

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
