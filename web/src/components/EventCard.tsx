import Image from 'next/image';
import Link from 'next/link';
import type { FC } from 'react';
import { DateRangeText } from '@/components/DateRangeText';
import { useFragment } from '@/gql/fragment-masking';
import { getStrapiMedia } from '@/lib/strapi';
import type { FetchEvent } from '../api/events.api';
import { eventsApi } from '../api/events.api';

type Props = {
  // event: FragmentType<typeof eventsApi.fullEventFragment>;
  event: FetchEvent;
};

export const EventCard: FC<Props> = (props) => {
  const event = useFragment(eventsApi.fullEventFragment, props.event);

  if (!event) {
    return <div>Error loading event</div>;
  }

  const keywords = ['cool', 'test'];

  return (
    <div className="max-w-sm overflow-hidden rounded shadow-lg">
      <div className="aspect-w-16 aspect-h-9 h-56 lg:aspect-none">
        {event.cover && (
          <Image
            alt="Cover event"
            width={1000}
            height={800}
            loading={'eager'}
            className="h-full w-full object-cover object-center lg:h-full lg:w-full"
            src={getStrapiMedia(event.cover) ?? ''}
          />
        )}
      </div>
      <article className="prose py-4 px-6">
        <div className="mb-2 text-xl font-bold">
          <Link href={`/event/${encodeURIComponent(event.slug)}`}>
            {event.title}
          </Link>
        </div>
        <DateRangeText
          startAt={event.startAt}
          endAt={event.endAt}
          className="text-indigo-600 first-letter:capitalize"
        />
        <p className="text-base text-gray-700 line-clamp-4">{event.summary}</p>
      </article>
      <div className="px-6 pt-4 pb-2">
        {keywords.map((keyword) => {
          return (
            <span
              key={keyword}
              className="mr-2 mb-2 inline-block rounded-full bg-gray-200 py-1 px-3 text-sm font-semibold text-gray-700"
            >
              #{keyword}
            </span>
          );
        })}
      </div>
    </div>
  );
};
