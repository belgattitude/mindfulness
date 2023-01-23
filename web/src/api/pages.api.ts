import { HttpNotFound } from '@httpx/exception';
import request from 'graphql-request';
import type { FragmentType } from '@/gql/fragment-masking';
import { graphql } from '@/gql/gql';
import type { PublicationState } from '@/gql/graphql';
import { getGraphqlRequestCatcher } from '@/lib/getGraphqlRequestCatcher';
import { getGraphQLUrl } from '../config/graphql.config';

export const fullPageFragment = graphql(/* GraphQL */ `
  fragment FullPageFragment on Page {
    createdAt
    updatedAt
    publishedAt
    title
    summary
    introduction
    programmes {
      data {
        id
        attributes {
          ...FullProgrammeFragment
        }
      }
    }
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

const searchPages = graphql(/* GraphQL */ `
  query searchPages(
    $limit: Int = 100
    $publicationState: PublicationState = LIVE
  ) {
    pages(
      sort: "publishedAt:DESC"
      pagination: { page: 1, pageSize: $limit }
      publicationState: $publicationState
    ) {
      data {
        id
        attributes {
          ...FullPageFragment
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

const getPage = graphql(/* GraphQL */ `
  query getPage($slug: String) {
    pages(filters: { slug: { eq: $slug } }) {
      data {
        id
        attributes {
          ...FullPageFragment
        }
      }
    }
  }
`);

export const fetchPages = async (params: {
  limit?: number;
  publicationState?: PublicationState;
}) => {
  return request(getGraphQLUrl(), searchPages, {
    ...params,
  }).catch(getGraphqlRequestCatcher);
};

export const fetchPage = async (params: {
  slug: string;
  publicationState?: PublicationState;
}) => {
  return request(getGraphQLUrl(), getPage, {
    ...params,
  })
    .catch(getGraphqlRequestCatcher)
    .then((resp) => {
      const event = resp.pages?.data?.[0];
      if (!event) {
        throw new HttpNotFound(`Page '${params.slug}' not found`);
      }
      return event;
    });
};

export type FetchPage = FragmentType<typeof fullPageFragment>;
