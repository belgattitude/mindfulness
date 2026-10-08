import { assertParsableStrictIsoDateZ } from "@httpx/assert";
import dayjs from "dayjs";
import { z } from "zod";

import { fetchEvents } from "@/api/events.api";
import { EventCard } from "@/components/Event/EventCard";
import { EventFilters } from "@/components/Event/EventFilters";
import type { EventTypeSlugs } from "@/components/Event/utils";
import { PageContent } from "@/components/PageContent";
import { convertIsoStringToDate } from "@/lib/date/date.utils";

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

  const dateMin = dayjs().subtract(10, "month").toDate();
  const dateMinStr = dateMin.toISOString();

  assertParsableStrictIsoDateZ(dateMinStr);

  const data = await fetchEvents({
    dateMin: convertIsoStringToDate(dateMinStr),
    eventType,
    limit,
  });
  return (
    <PageContent title="Agenda">
      <div className="flex">
        <EventFilters selected={eventType} />
      </div>
      <div className="flex flex-col gap-5">
        {data?.events?.map(
          (e) => e && <EventCard event={e} key={`event-${e.documentId}`} />
        )}
      </div>
    </PageContent>
  );
};

export default AgendaRoute;
