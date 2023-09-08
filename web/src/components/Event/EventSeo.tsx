import { EventJsonLd } from 'next-seo';
import type { FC } from 'react';
import { eventsApi, type FetchEvent } from '@/api/events.api';
import { siteConfig } from '@/config/site.config';
import { useFragment } from '@/gql/fragment-masking';

type Props = {
  event: FetchEvent;
};
export const EventSeo: FC<Props> = (props) => {
  const event = useFragment(eventsApi.fullEventFragment, props.event);

  const eventUrl = [siteConfig.canonicalUrl, 'event', event.slug].join('/');
  return (
    <EventJsonLd
      name={event.title}
      startDate={event.startAt}
      endDate={event.endAt}
      location={{
        name: 'My Place',
        sameAs: 'https://example.com/my-place',
        address: {
          streetAddress: '1600 Saratoga Ave',
          addressLocality: 'San Jose',
          addressRegion: 'CA',
          postalCode: '95129',
          addressCountry: 'US',
        },
      }}
      url={eventUrl}
      // images={[event.cover.data?.attributes?.url].filter((v) => v)}
      images={['https://..../test.jpg']}
      description={event.summary ?? ''}
      organizer={{
        type: 'Organization',
        name: 'Sandrine Rauter',
        url: 'https://www.sandrinerauter.be',
      }}
      // eventStatus="EventScheduled"
      // eventAttendanceMode="OfflineEventAttendanceMode"
    />
  );
};
