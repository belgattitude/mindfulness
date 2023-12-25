// Temporary api with graphql-request - will have to change this, either
// - urql
// - phase out graphql
import { HttpNotFound } from '@httpx/exception';
import request, { GraphQLClient } from 'graphql-request';
import type { EventTypeSlugs } from '@/components/Event/utils';
import { getGraphQLUrl } from '@/config/graphql.config';
import type { FragmentType } from '@/gql/fragment-masking';
import { graphql } from '@/gql/gql';
import type { EventFiltersInput, PublicationState } from '@/gql/graphql';
import { getGraphqlRequestCatcher } from '@/lib/getGraphqlRequestCatcher';

export const fullEventFragment = graphql(/* GraphQL */ `
  fragment FullEventFragment on Event {
    createdAt
    updatedAt
    publishedAt
    slug
    title
    displayTitle
    location
    organizers
    online
    summary
    description
    startAt
    endAt
    cover {
      data {
        id
        attributes {
          url
          caption
          alternativeText
        }
      }
    }
  }
`);

const getEvent = graphql(/* GraphQL */ `
  query getEvent($slug: String) {
    events(filters: { slug: { eq: $slug } }) {
      data {
        id
        attributes {
          ...FullEventFragment
        }
      }
    }
  }
`);

const searchEvents = graphql(/* GraphQL */ `
  query searchEvents(
    $limit: Int = 100
    $publicationState: PublicationState = LIVE
    $rawFilters: EventFiltersInput = {}
  ) {
    events(
      sort: ["eventType:ASC", "startAt:ASC", "publishedAt:ASC"]
      filters: $rawFilters
      pagination: { page: 1, pageSize: $limit }
      publicationState: $publicationState
    ) {
      data {
        id
        attributes {
          ...FullEventFragment
        }
      }
      meta {
        pagination {
          page
          pageSize
          total
          pageCount
        }
      }
    }
  }
`);

export const eventsApi = {
  fullEventFragment,
};

export const fetchEvents = async (params: {
  limit?: number;
  dateMin: Date;
  publicationState?: PublicationState;
  eventType?: EventTypeSlugs | null;
}) => {
  const { dateMin, eventType } = params;

  const rawFilters: EventFiltersInput = {
    startAt: { gte: dateMin.toISOString() },
    ...(eventType ? { eventType: { eq: eventType } } : {}),
  };

  return request(getGraphQLUrl(), searchEvents, {
    ...params,
    rawFilters,
  }).catch(getGraphqlRequestCatcher);
};

export const fetchEvent = async (params: { slug: string }) => {
  const { slug } = params;

  const client = new GraphQLClient(getGraphQLUrl(), {
    fetch,
  });
  return client
    .request(getEvent, { slug })
    .catch(getGraphqlRequestCatcher)
    .then((resp) => {
      const event = resp.events?.data?.[0];
      if (!event) {
        throw new HttpNotFound(`Event '${slug}' not found`);
      }
      return event;
    });
};

export type FetchEvent = FragmentType<typeof fullEventFragment>;
