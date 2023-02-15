import { EventJsonLd } from 'next-seo';
import type { FC } from 'react';
import { useFragment } from '@/gql/fragment-masking';
import type { FetchEvent } from '../../api/events.api';
import { eventsApi } from '../../api/events.api';

type Props = {
  event: FetchEvent;
};
export const EventSeo: FC<Props> = (props) => {
  const event = useFragment(eventsApi.fullEventFragment, props.event);
  return (
    <EventJsonLd
      name="My Event"
      startDate="2020-01-23T00:00:00.000Z"
      endDate="2020-01-24T00:00:00.000Z"
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
      url="https://example.com/my-event"
      images={['https://example.com/photos/photo.jpg']}
      description={event.summary ?? ''}
      offers={[
        {
          price: '119.99',
          priceCurrency: 'USD',
          priceValidUntil: '2020-11-05',
          itemCondition: 'https://schema.org/UsedCondition',
          availability: 'https://schema.org/InStock',
          url: 'https://www.example.com/executive-anvil',
          seller: {
            name: 'John Doe',
          },
          validFrom: '2020-11-01T00:00:00.000Z',
        },
        {
          price: '139.99',
          priceCurrency: 'CAD',
          priceValidUntil: '2020-09-05',
          itemCondition: 'https://schema.org/UsedCondition',
          availability: 'https://schema.org/InStock',
          url: 'https://www.example.ca/executive-anvil',
          seller: {
            name: 'John Doe Sr.',
          },
          validFrom: '2020-08-05T00:00:00.000Z',
        },
      ]}
      organizer={{
        type: 'Organization',
        name: 'Sandrine Rauter',
        url: 'https://www.sandrinerauter.be',
      }}
      eventStatus="EventScheduled"
      eventAttendanceMode="OfflineEventAttendanceMode"
    />
  );
};
