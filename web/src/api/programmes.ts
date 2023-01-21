// Temporary api with graphql-request - will have to change this, either
// - urql
// - phase out graphql
import { HttpNotFound, HttpServiceUnavailable } from '@httpx/exception';
import dayjs from 'dayjs';
import request from 'graphql-request';
import type { FragmentType } from '@/gql/fragment-masking';
import { graphql } from '@/gql/gql';
import type { PublicationState } from '@/gql/graphql';
import { isHttpFetchErrorLike } from '@/lib/typeguards';

const graphqlUrl = process.env.NEXT_PUBLIC_STRAPI_API_URL + '/graphql';

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

const catcher = (e: unknown) => {
  // grahql-request is not really cool at all
  if (
    // covers server-side node-fetch
    (isHttpFetchErrorLike(e) &&
      ['ECONNREFUSED', 'ECONNRESET'].includes(e?.code ?? '')) ||
    // covers cross-fetch / browser-ponyfill on client side
    (e instanceof Error && e.message.match(/network(.*)fail/i))
  ) {
    const details = [
      'code' in e ? e.code : undefined,
      'message' in e ? e.message : undefined,
    ]
      .filter((v) => typeof v === 'string')
      .join(', ');

    throw new HttpServiceUnavailable({
      url: graphqlUrl,
      message: `Cannot contact the server (${details})`,
    });
  }
  throw e;
};

export const fetchProgrammes = async (params: {
  limit?: number;
  publicationState?: PublicationState;
}) => {
  return request(graphqlUrl, searchProgrammes, {
    ...params,
  }).catch(catcher);
};

export type FetchProgramme = FragmentType<typeof fullProgrammeFragment>;
