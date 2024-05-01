import { fetchEvent } from '@/api/events.api';
import { EventDetail } from '@/components/Event/EventDetail';

type Props = {
  params: {
    eventSlug: string;
  };
};

export const dynamic = 'force-dynamic';

export default async function EventRoute(props: Props) {
  const { eventSlug } = props.params;
  const data = await fetchEvent({
    slug: eventSlug,
  });
  return (
    <div>{data?.attributes && <EventDetail event={data.attributes} />}</div>
  );
}
