// Temporary api with graphql-request - will have to change this, either
// - urql
// - phase out graphql
import { HttpNotFound } from '@httpx/exception';
import request from 'graphql-request';
import { getGraphQLUrl } from '@/config/graphql.config';
import type { FragmentType } from '@/gql/fragment-masking';
import { graphql } from '@/gql/gql';
import type { PublicationState } from '@/gql/graphql';
import { getGraphqlRequestCatcher } from '@/lib/getGraphqlRequestCatcher';

export const fullProgrammeFragment = graphql(/* GraphQL */ `
  fragment FullProgrammeFragment on Programme {
    createdAt
    updatedAt
    publishedAt
    slug
    title
    description
    summary
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
    events {
      data {
        attributes {
          displayTitle
          location
          startAt
          endAt
        }
      }
    }
  }
`);

const searchProgrammes = graphql(/* GraphQL */ `
  query searchProgrammes(
    $limit: Int = 100
    $publicationState: PublicationState = LIVE
  ) {
    programmes(
      sort: "publishedAt:DESC"
      pagination: { page: 1, pageSize: $limit }
      publicationState: $publicationState
    ) {
      data {
        id
        attributes {
          ...FullProgrammeFragment
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

const getProgramme = graphql(/* GraphQL */ `
  query getProgramme($slug: String) {
    programmes(filters: { slug: { eq: $slug } }) {
      data {
        id
        attributes {
          ...FullProgrammeFragment
        }
      }
    }
  }
`);

export const fetchProgramme = async (params: { slug: string }) => {
  const { slug } = params;
  return request(getGraphQLUrl(), getProgramme, {
    slug,
  })
    .catch(getGraphqlRequestCatcher)
    .then((resp) => {
      const event = resp.programmes?.data?.[0];
      if (!event) {
        throw new HttpNotFound(`Programme '${slug}' not found`);
      }
      return event;
    });
};

export const fetchProgrammes = async (params: {
  limit?: number;
  publicationState?: PublicationState;
}) => {
  return request(getGraphQLUrl(), searchProgrammes, {
    ...params,
  }).catch(getGraphqlRequestCatcher);
};

export type FetchProgramme = FragmentType<typeof fullProgrammeFragment>;
