// Temporary api with graphql-request - will have to change this, either
// - urql
// - phase out graphql
import { HttpNotFound } from "@httpx/exception";

import type { EventTypeSlugs } from "@/components/Event/utils";
import { getGraphqlClient } from "@/config/graphql-client.config";
import type { FragmentType } from "@/gql/fragment-masking";
import { graphql } from "@/gql/gql";
import type { EventFiltersInput, PublicationStatus } from "@/gql/graphql";
import { getGraphqlRequestCatcher } from "@/lib/getGraphqlRequestCatcher";

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
      documentId
      url
      caption
      alternativeText
    }
  }
`);

const getEvent = graphql(/* GraphQL */ `
  query getEvent($slug: String) {
    events(filters: { slug: { eq: $slug } }) {
      documentId
      ...FullEventFragment
    }
  }
`);

const searchEvents = graphql(/* GraphQL */ `
  query searchEvents(
    $limit: Int = 100
    $status: PublicationStatus = PUBLISHED
    $rawFilters: EventFiltersInput = {}
  ) {
    events(
      sort: ["startAt:ASC", "publishedAt:ASC"]
      filters: $rawFilters
      pagination: { page: 1, pageSize: $limit }
      status: $status
    ) {
      documentId
      ...FullEventFragment
    }
  }
`);

export const eventsApi = {
  fullEventFragment,
};

export const fetchEvents = async (params: {
  limit?: number;
  dateMin: Date;
  status?: PublicationStatus;
  eventType?: EventTypeSlugs | null;
}) => {
  const { dateMin, eventType } = params;

  const rawFilters: EventFiltersInput = {
    startAt: { gte: dateMin.toISOString() },
    ...(eventType ? { eventType: { eq: eventType } } : {}),
  };

  return getGraphqlClient
    .request(searchEvents, {
      ...params,
      rawFilters,
    })
    .catch(getGraphqlRequestCatcher);
};

export const fetchEvent = async (params: { slug: string }) => {
  const { slug } = params;

  return getGraphqlClient
    .request(getEvent, { slug })
    .catch(getGraphqlRequestCatcher)
    .then((resp) => {
      const event = resp.events?.[0];
      if (!event) {
        throw new HttpNotFound(`Event '${slug}' not found`);
      }
      return event;
    });
};

export type FetchEvent = FragmentType<typeof fullEventFragment>;
