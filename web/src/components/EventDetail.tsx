import Image from 'next/image';
import type { FC } from 'react';
import { MarkdownText } from '@/components/MarkdownText';
import { useFragment } from '@/gql/fragment-masking';
import { getStrapiMedia } from '@/lib/strapi';
import type { FetchEvent } from '../api/events.api';
import { eventsApi } from '../api/events.api';

type Props = {
  event: FetchEvent;
};

export const EventDetail: FC<Props> = (props) => {
  const event = useFragment(eventsApi.fullEventFragment, props.event);

  if (!event) {
    return <p>NotFound</p>;
  }
  return (
    <div>
      <div className={'prose-xl'}>
        <h1>{event.title}</h1>
        {event.cover && (
          <Image
            alt="Photo retraite"
            width={1000}
            height={800}
            src={getStrapiMedia(event.cover) ?? ''}
          />
        )}
        <MarkdownText text={event.description ?? ''} />
      </div>
    </div>
  );
};
