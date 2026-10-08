import { fetchEvent } from "@/api/events.api";
import { EventDetail } from "@/components/Event/EventDetail";

interface Props {
  params: Promise<{
    eventSlug: string;
  }>;
}

export const dynamic = "force-dynamic";

export default async function EventRoute(props: Props) {
  const { eventSlug } = await props.params;
  const data = await fetchEvent({
    slug: eventSlug,
  });
  return <div>{data && <EventDetail event={data} />}</div>;
}
