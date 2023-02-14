import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';
import type { FC, ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';
import { DateRangeText } from '@/components/DateRangeText';
import { useFragment } from '@/gql/fragment-masking';
import { getStrapiMedia } from '@/lib/strapi';
import type { FetchEvent } from '../api/events.api';
import { eventsApi } from '../api/events.api';

type Props = {
  event: FetchEvent;
  className?: string;
};

type CardBoxProps = {
  children: ReactNode;
  className?: string;
};
export const CardBox: FC<CardBoxProps> = (props) => {
  const { className = '', children } = props;

  return (
    <div
      className={twMerge(
        clsx('flex justify-center overflow-hidden'),
        className
      )}
    >
      {children}
    </div>
  );
};

export const EventCard: FC<Props> = (props) => {
  const { className = '' } = props;
  const event = useFragment(eventsApi.fullEventFragment, props.event);
  const eventUrl = `/event/${encodeURIComponent(event.slug)}`;
  return (
    <div
      className={twMerge(
        clsx(
          'grow border px-6 pt-10 pb-8 shadow-xl ring-1 ring-gray-900/5 sm:rounded-lg sm:px-10'
        ),
        className
      )}
    >
      <div className="">
        <div className="bg-white">
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
        <div className={'pt-5 text-2xl font-extralight uppercase leading-8'}>
          <Link
            href={eventUrl}
            className={'pt-5 text-2xl font-extralight uppercase leading-8'}
          >
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

export const EventCard3: FC<Props> = (props) => {
  const event = useFragment(eventsApi.fullEventFragment, props.event);

  const keywords = ['cool', 'test'];

  const eventUrl = `/event/${encodeURIComponent(event.slug)}`;

  return (
    <div className="max-w-sm overflow-hidden rounded shadow-lg">
      <div className="aspect-w-16 aspect-h-9 lg:aspect-none h-56">
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
      <article className="prose py-4 px-6">
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
