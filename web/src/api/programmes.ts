// Temporary api with graphql-request - will have to change this, either
// - urql
// - phase out graphql
import request from 'graphql-request';
import type { FragmentType } from '@/gql/fragment-masking';
import { graphql } from '@/gql/gql';
import type { PublicationState } from '@/gql/graphql';
import { getGraphqlRequestCatcher } from '@/lib/getGraphqlRequestCatcher';
import { getGraphQLUrl } from '../config/graphql.config';

export const fullProgrammeFragment = graphql(/* GraphQL */ `
  fragment FullProgrammeFragment on Programme {
    createdAt
    updatedAt
    publishedAt
    slug
    title
    description
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

export const fetchProgrammes = async (params: {
  limit?: number;
  publicationState?: PublicationState;
}) => {
  return request(getGraphQLUrl(), searchProgrammes, {
    ...params,
  }).catch(getGraphqlRequestCatcher);
};

export type FetchProgramme = FragmentType<typeof fullProgrammeFragment>;
