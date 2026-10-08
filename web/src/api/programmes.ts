// Temporary api with graphql-request - will have to change this, either
// - urql
// - phase out graphql
import { HttpNotFound } from "@httpx/exception";
import { request } from "graphql-request";

import { getGraphqlClient } from "@/config/graphql-client.config";
import { getGraphQLUrl } from "@/config/graphql.config";
import type { FragmentType } from "@/gql/fragment-masking";
import { graphql } from "@/gql/gql";
import type { PublicationStatus } from "@/gql/graphql";
import { withGraphqlRequestCatcher } from "@/lib/getGraphqlRequestCatcher";

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
  const resp = await withGraphqlRequestCatcher(
    getGraphqlClient.request(getProgramme, {
      slug,
    })
  );
  const programme = resp.programmes?.[0];
  if (!programme) {
    throw new HttpNotFound(`Programme '${slug}' not found`);
  }
  return programme;
};

export const fetchProgrammes = (params: {
  limit?: number;
  status?: PublicationStatus;
}) =>
  withGraphqlRequestCatcher(
    request(getGraphQLUrl(), searchProgrammes, {
      ...params,
    })
  );

export type FetchProgramme = FragmentType<typeof fullProgrammeFragment>;
