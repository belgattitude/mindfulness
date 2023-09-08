import { clsx } from 'clsx';
import Image from 'next/image';
import Link from 'next/link';
import type { FC } from 'react';
import { twMerge } from 'tailwind-merge';
import { DateRangeText } from '@/components/DateRangeText';
import { useFragment } from '@/gql/fragment-masking';
import { getStrapiMedia } from '@/lib/strapi';
import { eventsApi, type FetchEvent } from '../../api/events.api';

type Props = {
  event: FetchEvent;
  className?: string;
};

export const EventCard: FC<Props> = (props) => {
  const { className = '' } = props;
  const event = useFragment(eventsApi.fullEventFragment, props.event);
  const eventUrl = `/event/${encodeURIComponent(event.slug)}`;
  return (
    <div
      className={twMerge(
        clsx('flex flex-col gap-5 pt-5 md:flex-row'),
        className
      )}
    >
      <div className={'flex-none md:w-[300px]'}>
        <Link href={eventUrl}>
          <Image
            alt={`Photo ${event.title}`}
            width={1000}
            height={800}
            priority={true}
            className="relative h-[200px] rounded object-cover"
            style={{
              objectFit: 'cover',
            }}
            src={getStrapiMedia(event.cover) ?? ''}
          />
        </Link>
      </div>
      <div className="">
        <div className={'text-2xl uppercase leading-8 text-brand-color-900'}>
          <Link href={eventUrl} className={'text-2xl uppercase leading-8'}>
            {event.title}
          </Link>
        </div>

        <DateRangeText
          startAt={event.startAt}
          endAt={event.endAt}
          className="text-indigo-600 first-letter:capitalize"
        />

        <div className="divide-y divide-gray-300/50">
          <div className="space-y-6 py-8 text-base font-normal leading-7 text-neutral-800">
            <p>{event.summary}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export const EventCardBackup: FC<Props> = (props) => {
  const event = useFragment(eventsApi.fullEventFragment, props.event);

  const keywords = ['cool', 'test'];

  const eventUrl = `/event/${encodeURIComponent(event.slug)}`;

  return (
    <div className="max-w-sm overflow-hidden rounded shadow-lg">
      <div className="aspect-h-9 aspect-w-16 h-56 lg:aspect-none">
        <Link href={eventUrl}>
          <Image
            alt="Cover event"
            width={1000}
            height={800}
            priority={true}
            className="h-full w-full object-cover object-center lg:h-full lg:w-full"
            src={getStrapiMedia(event.cover) ?? ''}
          />
        </Link>
      </div>
      <article className="prose px-6 py-4">
        <div className="mb-2 text-xl font-bold">
          <Link href={eventUrl}>{event.title}</Link>
        </div>
        <DateRangeText
          startAt={event.startAt}
          endAt={event.endAt}
          className="text-indigo-600 first-letter:capitalize"
        />
        <p className="line-clamp-4 text-base text-gray-700">{event.summary}</p>
      </article>
      <div className="px-6 pb-2 pt-4">
        {keywords.map((keyword) => {
          return (
            <span
              key={keyword}
              className="mb-2 mr-2 inline-block rounded-full bg-gray-200 px-3 py-1 text-sm font-semibold text-gray-700"
            >
              #{keyword}
            </span>
          );
        })}
      </div>
    </div>
  );
};
