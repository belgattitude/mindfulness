import { css } from '@emotion/react';
import styled from '@emotion/styled';
import Image from 'next/image';
import type { FC } from 'react';
import { DateRangeText } from '@/components/DateRangeText';
import { MarkdownText } from '@/components/MarkdownText';
import { useFragment } from '@/gql/fragment-masking';
import { getStrapiMedia } from '@/lib/strapi';
import type { FetchEvent } from '../api/events.api';
import { eventsApi } from '../api/events.api';

type Props = {
  event: FetchEvent;
};

const title = css`
  color: hotpink;
  font-family: var(--font-inter);
`;

const Ctn = styled.div`
  .hello {
    > h1:first-of-type {
      ${title};
    }
  }
  .cover {
  }
  .description {
    h1 {
      font-size: 1.2em;
      text-transform: lowercase;
      font-family: var(--font-handwritten);
      font-size: 4em;
    }
  }
`;

export const EventDetail: FC<Props> = (props) => {
  const event = useFragment(eventsApi.fullEventFragment, props.event);

  if (!event) {
    return <p>NotFound</p>;
  }
  return (
    <Ctn>
      <div className={'hello'}>
        <h1>{event.title}</h1>
        <DateRangeText
          startAt={event.startAt}
          endAt={event.endAt}
          className="text-indigo-600 first-letter:capitalize"
        />
        <div className={'cover'}>
          {event.cover && (
            <Image
              alt="Photo retraite"
              width={1000}
              height={800}
              src={getStrapiMedia(event.cover) ?? ''}
            />
          )}
        </div>
      </div>
      <div className={'description prose-xl'}>
        <MarkdownText text={event.description ?? ''} />
      </div>
    </Ctn>
  );
};
