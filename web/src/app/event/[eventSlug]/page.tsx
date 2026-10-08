import { fetchEvent } from "@/api/events.api";
import { EventDetail } from "@/components/Event/EventDetail";

interface Props {
  params: Promise<{
    eventSlug: string;
  }>;
}

export const dynamic = "force-dynamic";

const EventRoute = async (props: Props) => {
  const { eventSlug } = await props.params;
  const data = await fetchEvent({
    slug: eventSlug,
  });
  return <div>{data && <EventDetail event={data} />}</div>;
};

export default EventRoute;
