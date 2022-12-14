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
  //color: hotpink;
  //font-family: var(--font-inter);
  font-weight: 400;
  font-family: var(--font-handwritten);
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
      //font-size: 1.2em;
      font-family: var(--font-handwritten);
      //margin-bottom: 0;
      //padding: 0;
    }
  }
`;

export const EventDetail: FC<Props> = (props) => {
  const event = useFragment(eventsApi.fullEventFragment, props.event);
  if (!event) {
    return <p>NotFound</p>;
  }

  return (
    <>
      <div
        className={
          'fixed top-0 left-0 -z-10 m-0 h-[800px] max-h-[60vh] w-full overflow-hidden p-0 opacity-20'
        }
      >
        {event.cover && (
          <Image
            className={'absolute h-full w-full object-cover'}
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
      <Ctn
        className={
          'prose-ul:list-inside prose-ul:list-disc prose-h1:mb-1 prose-ul:p-0 prose-li:pl-0 prose-h1:font-normal prose-a:text-blue-600 prose md:prose-xl lg:prose-2xl border-1 m-4 rounded-2xl border-gray-100 bg-white p-4 text-gray-700 shadow-lg marker:mr-0 marker:text-purple-600 md:m-8 md:p-8 lg:m-16 lg:p-16'
        }
      >
        <div className={'hello'}>
          <h1>{event.displayTitle ?? event.title}</h1>
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
              className={''}
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
      </Ctn>
    </>
  );
};
