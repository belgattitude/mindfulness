// Temporary api with graphql-request - will have to change this, either
// - urql
// - phase out graphql
import { HttpNotFound } from '@httpx/exception';
import dayjs from 'dayjs';
import request from 'graphql-request';
import type { FragmentType } from '@/gql/fragment-masking';
import { graphql } from '@/gql/gql';
import type { PublicationState } from '@/gql/graphql';
import { getGraphqlRequestCatcher } from '@/lib/getGraphqlRequestCatcher';
import { getGraphQLUrl } from '../config/graphql.config';

const fullEventFragment = graphql(/* GraphQL */ `
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
    $dateMin: DateTime = "2020-02-28T03:00:00.000Z"
  ) {
    events(
      sort: "publishedAt:DESC"
      filters: { startAt: { gte: $dateMin } }
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
  dateMin?: string;
  publicationState?: PublicationState;
}) => {
  const { dateMin } = params;

  return request(getGraphQLUrl(), searchEvents, {
    ...params,
    dateMin: dateMin ? dayjs(dateMin).toDate() : undefined,
  }).catch(getGraphqlRequestCatcher);
};

export const fetchEvent = async (params: { slug: string }) => {
  const { slug } = params;
  return request(getGraphQLUrl(), getEvent, {
    slug,
  })
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
