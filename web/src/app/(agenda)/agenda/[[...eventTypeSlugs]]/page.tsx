import dayjs from 'dayjs';
import { fetchEvents } from '@/api/events.api';
import { EventCard } from '@/components/Event/EventCard';
import { EventFilters } from '@/components/Event/EventFilters';
import type { EventTypeSlugs } from '@/components/Event/utils';
import { convertIsoStringToDate } from '@/lib/date/date.utils';
import { assertParsableStrictIsoDateZ } from '@httpx/assert';
import { z } from 'zod';
import { PageContent } from '@/components/PageContent';

type Props = {
  params: Promise<{
    eventTypeSlugs?: EventTypeSlugs[] | undefined;
  }>;
};

export const dynamic = 'force-dynamic';

const schema = z.object({
  eventTypeSlugs: z.array(z.string()).max(1).optional(),
});

export default async function AgendaRoute(props: Props) {
  const { eventTypeSlugs } = await props.params;

  const safeParams = schema.parse(await props.params);

  const eventType = (safeParams.eventTypeSlugs?.[0] as EventTypeSlugs) ?? null;

  const dateMin = dayjs().subtract(10, 'month').toDate();
  const dateMinStr = dateMin.toISOString();

  assertParsableStrictIsoDateZ(dateMinStr);

  const data = await fetchEvents({
    limit,
    dateMin: convertIsoStringToDate(dateMinStr),
    eventType,
  });
  return (
    <PageContent title={'Agenda'}>
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
    </PageContent>
  );
}

const limit = 10;
