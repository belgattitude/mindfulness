// Temporary api with graphql-request - will have to change this, either
// - urql
// - phase out graphql
import { HttpNotFound } from "@httpx/exception";
import request from "graphql-request";

import { getGraphqlClient } from "@/config/graphql-client.config";
import { getGraphQLUrl } from "@/config/graphql.config";
import type { FragmentType } from "@/gql/fragment-masking";
import { graphql } from "@/gql/gql";
import type { PublicationStatus } from "@/gql/graphql";
import { getGraphqlRequestCatcher } from "@/lib/getGraphqlRequestCatcher";

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
      documentId
      url
      caption
      alternativeText
    }
  }
`);

const searchProgrammes = graphql(/* GraphQL */ `
  query searchProgrammes(
    $limit: Int = 100
    $status: PublicationStatus = PUBLISHED
  ) {
    programmes(
      sort: "publishedAt:DESC"
      pagination: { page: 1, pageSize: $limit }
      status: $status
    ) {
      documentId
      ...FullProgrammeFragment
    }
  }
`);

const getProgramme = graphql(/* GraphQL */ `
  query getProgramme($slug: String) {
    programmes(filters: { slug: { eq: $slug } }) {
      documentId
      ...FullProgrammeFragment
    }
  }
`);

export const fetchProgramme = async (params: { slug: string }) => {
  const { slug } = params;
  return getGraphqlClient
    .request(getProgramme, {
      slug,
    })
    .catch(getGraphqlRequestCatcher)
    .then((resp) => {
      const event = resp.programmes?.[0];
      if (!event) {
        throw new HttpNotFound(`Programme '${slug}' not found`);
      }
      return event;
    });
};

export const fetchProgrammes = async (params: {
  limit?: number;
  status?: PublicationStatus;
}) =>
  request(getGraphQLUrl(), searchProgrammes, {
    ...params,
  }).catch(getGraphqlRequestCatcher);

export type FetchProgramme = FragmentType<typeof fullProgrammeFragment>;
