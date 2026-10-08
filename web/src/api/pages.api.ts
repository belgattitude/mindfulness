import { HttpNotFound } from "@httpx/exception";
import request from "graphql-request";

import { getGraphqlClient } from "@/config/graphql-client.config";
import type { FragmentType } from "@/gql/fragment-masking";
import { graphql } from "@/gql/gql";
import type { PublicationStatus } from "@/gql/graphql";
import { getGraphqlRequestCatcher } from "@/lib/getGraphqlRequestCatcher";

import { getGraphQLUrl } from "../config/graphql.config";

export const fullPageFragment = graphql(/* GraphQL */ `
  fragment FullPageFragment on Page {
    createdAt
    updatedAt
    publishedAt
    slug
    title
    summary
    introduction
    programmes {
      documentId
      ...FullProgrammeFragment
    }
    cover {
      documentId
      url
      caption
      alternativeText
    }
  }
`);

const searchPages = graphql(/* GraphQL */ `
  query searchPages($limit: Int = 100, $status: PublicationStatus = PUBLISHED) {
    pages(
      sort: "publishedAt:DESC"
      pagination: { page: 1, pageSize: $limit }
      status: $status
    ) {
      documentId
      ...FullPageFragment
    }
  }
`);

const getPage = graphql(/* GraphQL */ `
  query getPage($slug: String) {
    pages(filters: { slug: { eq: $slug } }) {
      documentId
      ...FullPageFragment
    }
  }
`);

export const fetchPages = async (params: {
  limit?: number;
  status?: PublicationStatus;
}) =>
  request(getGraphQLUrl(), searchPages, {
    ...params,
  }).catch(getGraphqlRequestCatcher);

export const fetchPage = async (params: {
  slug: string;
  status?: PublicationStatus;
}) =>
  getGraphqlClient
    .request(getPage, params)
    .catch(getGraphqlRequestCatcher)
    .then((resp) => {
      const event = resp.pages?.[0];
      if (!event) {
        throw new HttpNotFound(`Page '${params.slug}' not found`);
      }
      return event;
    });

export type FetchPage = FragmentType<typeof fullPageFragment>;
