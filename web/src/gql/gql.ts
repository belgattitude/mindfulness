/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "\n  query getAboutPage {\n    about {\n      data {\n        attributes {\n          summary\n          description\n          cover {\n            data {\n              attributes {\n                url\n                alternativeText\n              }\n            }\n          }\n        }\n      }\n    }\n  }\n": types.GetAboutPageDocument,
    "\n  query getContactPage {\n    contact {\n      data {\n        attributes {\n          summary\n          description\n          cover {\n            data {\n              attributes {\n                url\n                alternativeText\n              }\n            }\n          }\n        }\n      }\n    }\n  }\n": types.GetContactPageDocument,
    "\n  fragment FullEventFragment on Event {\n    createdAt\n    updatedAt\n    publishedAt\n    slug\n    title\n    displayTitle\n    location\n    organizers\n    online\n    summary\n    description\n    startAt\n    endAt\n    cover {\n      data {\n        id\n        attributes {\n          url\n          caption\n          alternativeText\n        }\n      }\n    }\n  }\n": types.FullEventFragmentFragmentDoc,
    "\n  query getEvent($slug: String) {\n    events(filters: { slug: { eq: $slug } }) {\n      data {\n        id\n        attributes {\n          ...FullEventFragment\n        }\n      }\n    }\n  }\n": types.GetEventDocument,
    "\n  query searchEvents(\n    $limit: Int = 100\n    $publicationState: PublicationState = LIVE\n    $dateMin: DateTime = \"2020-02-28T03:00:00.000Z\"\n  ) {\n    events(\n      sort: \"publishedAt:DESC\"\n      filters: { startAt: { gte: $dateMin } }\n      pagination: { page: 1, pageSize: $limit }\n      publicationState: $publicationState\n    ) {\n      data {\n        id\n        attributes {\n          ...FullEventFragment\n        }\n      }\n      meta {\n        pagination {\n          page\n          pageSize\n          total\n          pageCount\n        }\n      }\n    }\n  }\n": types.SearchEventsDocument,
    "\n  query getHomePage {\n    home {\n      data {\n        attributes {\n          introduction\n        }\n      }\n    }\n  }\n": types.GetHomePageDocument,
    "\n  fragment FullPageFragment on Page {\n    createdAt\n    updatedAt\n    publishedAt\n    slug\n    title\n    summary\n    introduction\n    programmes {\n      data {\n        id\n        attributes {\n          ...FullProgrammeFragment\n        }\n      }\n    }\n    cover {\n      data {\n        id\n        attributes {\n          url\n          caption\n          alternativeText\n        }\n      }\n    }\n  }\n": types.FullPageFragmentFragmentDoc,
    "\n  query searchPages(\n    $limit: Int = 100\n    $publicationState: PublicationState = LIVE\n  ) {\n    pages(\n      sort: \"publishedAt:DESC\"\n      pagination: { page: 1, pageSize: $limit }\n      publicationState: $publicationState\n    ) {\n      data {\n        id\n        attributes {\n          ...FullPageFragment\n        }\n      }\n      meta {\n        pagination {\n          page\n          pageSize\n          total\n          pageCount\n        }\n      }\n    }\n  }\n": types.SearchPagesDocument,
    "\n  query getPage($slug: String) {\n    pages(filters: { slug: { eq: $slug } }) {\n      data {\n        id\n        attributes {\n          ...FullPageFragment\n        }\n      }\n    }\n  }\n": types.GetPageDocument,
    "\n  fragment FullProgrammeFragment on Programme {\n    createdAt\n    updatedAt\n    publishedAt\n    slug\n    title\n    description\n    cover {\n      data {\n        id\n        attributes {\n          url\n          caption\n          alternativeText\n        }\n      }\n    }\n  }\n": types.FullProgrammeFragmentFragmentDoc,
    "\n  query searchProgrammes(\n    $limit: Int = 100\n    $publicationState: PublicationState = LIVE\n  ) {\n    programmes(\n      sort: \"publishedAt:DESC\"\n      pagination: { page: 1, pageSize: $limit }\n      publicationState: $publicationState\n    ) {\n      data {\n        id\n        attributes {\n          ...FullProgrammeFragment\n        }\n      }\n      meta {\n        pagination {\n          page\n          pageSize\n          total\n          pageCount\n        }\n      }\n    }\n  }\n": types.SearchProgrammesDocument,
    "\n  query getProgramme($slug: String) {\n    programmes(filters: { slug: { eq: $slug } }) {\n      data {\n        id\n        attributes {\n          ...FullProgrammeFragment\n        }\n      }\n    }\n  }\n": types.GetProgrammeDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query getAboutPage {\n    about {\n      data {\n        attributes {\n          summary\n          description\n          cover {\n            data {\n              attributes {\n                url\n                alternativeText\n              }\n            }\n          }\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query getAboutPage {\n    about {\n      data {\n        attributes {\n          summary\n          description\n          cover {\n            data {\n              attributes {\n                url\n                alternativeText\n              }\n            }\n          }\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query getContactPage {\n    contact {\n      data {\n        attributes {\n          summary\n          description\n          cover {\n            data {\n              attributes {\n                url\n                alternativeText\n              }\n            }\n          }\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query getContactPage {\n    contact {\n      data {\n        attributes {\n          summary\n          description\n          cover {\n            data {\n              attributes {\n                url\n                alternativeText\n              }\n            }\n          }\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment FullEventFragment on Event {\n    createdAt\n    updatedAt\n    publishedAt\n    slug\n    title\n    displayTitle\n    location\n    organizers\n    online\n    summary\n    description\n    startAt\n    endAt\n    cover {\n      data {\n        id\n        attributes {\n          url\n          caption\n          alternativeText\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  fragment FullEventFragment on Event {\n    createdAt\n    updatedAt\n    publishedAt\n    slug\n    title\n    displayTitle\n    location\n    organizers\n    online\n    summary\n    description\n    startAt\n    endAt\n    cover {\n      data {\n        id\n        attributes {\n          url\n          caption\n          alternativeText\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query getEvent($slug: String) {\n    events(filters: { slug: { eq: $slug } }) {\n      data {\n        id\n        attributes {\n          ...FullEventFragment\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query getEvent($slug: String) {\n    events(filters: { slug: { eq: $slug } }) {\n      data {\n        id\n        attributes {\n          ...FullEventFragment\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query searchEvents(\n    $limit: Int = 100\n    $publicationState: PublicationState = LIVE\n    $dateMin: DateTime = \"2020-02-28T03:00:00.000Z\"\n  ) {\n    events(\n      sort: \"publishedAt:DESC\"\n      filters: { startAt: { gte: $dateMin } }\n      pagination: { page: 1, pageSize: $limit }\n      publicationState: $publicationState\n    ) {\n      data {\n        id\n        attributes {\n          ...FullEventFragment\n        }\n      }\n      meta {\n        pagination {\n          page\n          pageSize\n          total\n          pageCount\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query searchEvents(\n    $limit: Int = 100\n    $publicationState: PublicationState = LIVE\n    $dateMin: DateTime = \"2020-02-28T03:00:00.000Z\"\n  ) {\n    events(\n      sort: \"publishedAt:DESC\"\n      filters: { startAt: { gte: $dateMin } }\n      pagination: { page: 1, pageSize: $limit }\n      publicationState: $publicationState\n    ) {\n      data {\n        id\n        attributes {\n          ...FullEventFragment\n        }\n      }\n      meta {\n        pagination {\n          page\n          pageSize\n          total\n          pageCount\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query getHomePage {\n    home {\n      data {\n        attributes {\n          introduction\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query getHomePage {\n    home {\n      data {\n        attributes {\n          introduction\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment FullPageFragment on Page {\n    createdAt\n    updatedAt\n    publishedAt\n    slug\n    title\n    summary\n    introduction\n    programmes {\n      data {\n        id\n        attributes {\n          ...FullProgrammeFragment\n        }\n      }\n    }\n    cover {\n      data {\n        id\n        attributes {\n          url\n          caption\n          alternativeText\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  fragment FullPageFragment on Page {\n    createdAt\n    updatedAt\n    publishedAt\n    slug\n    title\n    summary\n    introduction\n    programmes {\n      data {\n        id\n        attributes {\n          ...FullProgrammeFragment\n        }\n      }\n    }\n    cover {\n      data {\n        id\n        attributes {\n          url\n          caption\n          alternativeText\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query searchPages(\n    $limit: Int = 100\n    $publicationState: PublicationState = LIVE\n  ) {\n    pages(\n      sort: \"publishedAt:DESC\"\n      pagination: { page: 1, pageSize: $limit }\n      publicationState: $publicationState\n    ) {\n      data {\n        id\n        attributes {\n          ...FullPageFragment\n        }\n      }\n      meta {\n        pagination {\n          page\n          pageSize\n          total\n          pageCount\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query searchPages(\n    $limit: Int = 100\n    $publicationState: PublicationState = LIVE\n  ) {\n    pages(\n      sort: \"publishedAt:DESC\"\n      pagination: { page: 1, pageSize: $limit }\n      publicationState: $publicationState\n    ) {\n      data {\n        id\n        attributes {\n          ...FullPageFragment\n        }\n      }\n      meta {\n        pagination {\n          page\n          pageSize\n          total\n          pageCount\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query getPage($slug: String) {\n    pages(filters: { slug: { eq: $slug } }) {\n      data {\n        id\n        attributes {\n          ...FullPageFragment\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query getPage($slug: String) {\n    pages(filters: { slug: { eq: $slug } }) {\n      data {\n        id\n        attributes {\n          ...FullPageFragment\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment FullProgrammeFragment on Programme {\n    createdAt\n    updatedAt\n    publishedAt\n    slug\n    title\n    description\n    cover {\n      data {\n        id\n        attributes {\n          url\n          caption\n          alternativeText\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  fragment FullProgrammeFragment on Programme {\n    createdAt\n    updatedAt\n    publishedAt\n    slug\n    title\n    description\n    cover {\n      data {\n        id\n        attributes {\n          url\n          caption\n          alternativeText\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query searchProgrammes(\n    $limit: Int = 100\n    $publicationState: PublicationState = LIVE\n  ) {\n    programmes(\n      sort: \"publishedAt:DESC\"\n      pagination: { page: 1, pageSize: $limit }\n      publicationState: $publicationState\n    ) {\n      data {\n        id\n        attributes {\n          ...FullProgrammeFragment\n        }\n      }\n      meta {\n        pagination {\n          page\n          pageSize\n          total\n          pageCount\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query searchProgrammes(\n    $limit: Int = 100\n    $publicationState: PublicationState = LIVE\n  ) {\n    programmes(\n      sort: \"publishedAt:DESC\"\n      pagination: { page: 1, pageSize: $limit }\n      publicationState: $publicationState\n    ) {\n      data {\n        id\n        attributes {\n          ...FullProgrammeFragment\n        }\n      }\n      meta {\n        pagination {\n          page\n          pageSize\n          total\n          pageCount\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query getProgramme($slug: String) {\n    programmes(filters: { slug: { eq: $slug } }) {\n      data {\n        id\n        attributes {\n          ...FullProgrammeFragment\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query getProgramme($slug: String) {\n    programmes(filters: { slug: { eq: $slug } }) {\n      data {\n        id\n        attributes {\n          ...FullProgrammeFragment\n        }\n      }\n    }\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;