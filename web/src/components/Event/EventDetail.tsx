import Image from 'next/image';
import type { FC } from 'react';
import { eventsApi, type FetchEvent } from '@/api/events.api';
import { DateRangeText } from '@/components/DateRangeText';
import { MarkdownText } from '@/components/MarkdownText';
import { useFragment } from '@/gql/fragment-masking';
import { getStrapiMedia } from '@/lib/strapi';

type Props = {
  event: FetchEvent;
};

export const EventDetail: FC<Props> = (props) => {
  const event = useFragment(eventsApi.fullEventFragment, props.event);
  if (!event) {
    return <p>NotFound</p>;
  }

  return (
    <div className={'flex flex-1'}>
      <div
        className={
          'fixed left-0 top-0 -z-10 m-0 h-screen max-h-screen w-full overflow-hidden p-0 opacity-15'
        }
      >
        {event.cover && (
          <Image
            className={'absolute size-full object-cover'}
            alt="Photo retraite"
            width={1200}
            height={900}
            style={{
              objectFit: 'cover',
            }}
            src={getStrapiMedia(event.cover) ?? ''}
          />
        )}
      </div>
      <div
        className={[
          'font-family-brand',
          'rounded-xl',
          'bg-white/80',
          'prose-slate',
          'text-neutral-700',
          'py-10 px-14 mt-10',
          'prose-xl prose-zinc prose-h1:mb-1 prose-h1:font-normal prose-h1:text-4xl prose-a:text-blue-600 prose-ul:list-inside prose-ul:list-disc prose-ul:p-0 prose-li:pl-0',
          'shadow-lg marker:mr-0 marker:text-purple-600 ',
          'max-w-full',
        ].join(' ')}
      >
        <div>
          <h1 className={''}>{event.displayTitle ?? event.title}</h1>
          <p>
            avec {event.organizers} en {event.location}
          </p>
          <DateRangeText
            startAt={event.startAt}
            endAt={event.endAt}
            className="text-indigo-600 first-letter:capitalize"
          />
        </div>
        <div className={'description'}>
          {event.cover && (
            <Image
              className={'object-cover'}
              alt="Photo retraite"
              width={1200}
              priority={true}
              height={900}
              style={{
                objectFit: 'cover',
              }}
              src={getStrapiMedia(event.cover) ?? ''}
            />
          )}
          <MarkdownText text={event.description ?? ''} />
        </div>
      </div>
    </div>
  );
};
