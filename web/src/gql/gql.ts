/* eslint-disable */
import * as types from './graphql';
import type { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
type Documents = {
    "\n  query getAboutPage {\n    about {\n      summary\n      description\n      cover {\n        url\n        alternativeText\n      }\n    }\n  }\n": typeof types.GetAboutPageDocument,
    "\n  query getContactPage {\n    contact {\n      summary\n      description\n      cover {\n        url\n        alternativeText\n      }\n    }\n  }\n": typeof types.GetContactPageDocument,
    "\n  fragment FullEventFragment on Event {\n    createdAt\n    updatedAt\n    publishedAt\n    slug\n    title\n    displayTitle\n    location\n    organizers\n    online\n    summary\n    description\n    startAt\n    endAt\n    cover {\n      documentId\n      url\n      caption\n      alternativeText\n    }\n  }\n": typeof types.FullEventFragmentFragmentDoc,
    "\n  query getEvent($slug: String) {\n    events(filters: { slug: { eq: $slug } }) {\n      documentId\n      ...FullEventFragment\n    }\n  }\n": typeof types.GetEventDocument,
    "\n  query searchEvents(\n    $limit: Int = 100\n    $status: PublicationStatus = PUBLISHED\n    $rawFilters: EventFiltersInput = {}\n  ) {\n    events(\n      sort: [\"startAt:ASC\", \"publishedAt:ASC\"]\n      filters: $rawFilters\n      pagination: { page: 1, pageSize: $limit }\n      status: $status\n    ) {\n      documentId\n      ...FullEventFragment\n    }\n  }\n": typeof types.SearchEventsDocument,
    "\n  query getHomePage {\n    home {\n      introduction\n    }\n  }\n": typeof types.GetHomePageDocument,
    "\n  fragment FullPageFragment on Page {\n    createdAt\n    updatedAt\n    publishedAt\n    slug\n    title\n    summary\n    introduction\n    programmes {\n      documentId\n      ...FullProgrammeFragment\n    }\n    cover {\n      documentId\n      url\n      caption\n      alternativeText\n    }\n  }\n": typeof types.FullPageFragmentFragmentDoc,
    "\n  query searchPages($limit: Int = 100, $status: PublicationStatus = PUBLISHED) {\n    pages(\n      sort: \"publishedAt:DESC\"\n      pagination: { page: 1, pageSize: $limit }\n      status: $status\n    ) {\n      documentId\n      ...FullPageFragment\n    }\n  }\n": typeof types.SearchPagesDocument,
    "\n  query getPage($slug: String) {\n    pages(filters: { slug: { eq: $slug } }) {\n      documentId\n      ...FullPageFragment\n    }\n  }\n": typeof types.GetPageDocument,
    "\n  fragment FullProgrammeFragment on Programme {\n    createdAt\n    updatedAt\n    publishedAt\n    slug\n    title\n    description\n    summary\n    cover {\n      documentId\n      url\n      caption\n      alternativeText\n    }\n  }\n": typeof types.FullProgrammeFragmentFragmentDoc,
    "\n  query searchProgrammes(\n    $limit: Int = 100\n    $status: PublicationStatus = PUBLISHED\n  ) {\n    programmes(\n      sort: \"publishedAt:DESC\"\n      pagination: { page: 1, pageSize: $limit }\n      status: $status\n    ) {\n      documentId\n      ...FullProgrammeFragment\n    }\n  }\n": typeof types.SearchProgrammesDocument,
    "\n  query getProgramme($slug: String) {\n    programmes(filters: { slug: { eq: $slug } }) {\n      documentId\n      ...FullProgrammeFragment\n    }\n  }\n": typeof types.GetProgrammeDocument,
};
const documents: Documents = {
    "\n  query getAboutPage {\n    about {\n      summary\n      description\n      cover {\n        url\n        alternativeText\n      }\n    }\n  }\n": types.GetAboutPageDocument,
    "\n  query getContactPage {\n    contact {\n      summary\n      description\n      cover {\n        url\n        alternativeText\n      }\n    }\n  }\n": types.GetContactPageDocument,
    "\n  fragment FullEventFragment on Event {\n    createdAt\n    updatedAt\n    publishedAt\n    slug\n    title\n    displayTitle\n    location\n    organizers\n    online\n    summary\n    description\n    startAt\n    endAt\n    cover {\n      documentId\n      url\n      caption\n      alternativeText\n    }\n  }\n": types.FullEventFragmentFragmentDoc,
    "\n  query getEvent($slug: String) {\n    events(filters: { slug: { eq: $slug } }) {\n      documentId\n      ...FullEventFragment\n    }\n  }\n": types.GetEventDocument,
    "\n  query searchEvents(\n    $limit: Int = 100\n    $status: PublicationStatus = PUBLISHED\n    $rawFilters: EventFiltersInput = {}\n  ) {\n    events(\n      sort: [\"startAt:ASC\", \"publishedAt:ASC\"]\n      filters: $rawFilters\n      pagination: { page: 1, pageSize: $limit }\n      status: $status\n    ) {\n      documentId\n      ...FullEventFragment\n    }\n  }\n": types.SearchEventsDocument,
    "\n  query getHomePage {\n    home {\n      introduction\n    }\n  }\n": types.GetHomePageDocument,
    "\n  fragment FullPageFragment on Page {\n    createdAt\n    updatedAt\n    publishedAt\n    slug\n    title\n    summary\n    introduction\n    programmes {\n      documentId\n      ...FullProgrammeFragment\n    }\n    cover {\n      documentId\n      url\n      caption\n      alternativeText\n    }\n  }\n": types.FullPageFragmentFragmentDoc,
    "\n  query searchPages($limit: Int = 100, $status: PublicationStatus = PUBLISHED) {\n    pages(\n      sort: \"publishedAt:DESC\"\n      pagination: { page: 1, pageSize: $limit }\n      status: $status\n    ) {\n      documentId\n      ...FullPageFragment\n    }\n  }\n": types.SearchPagesDocument,
    "\n  query getPage($slug: String) {\n    pages(filters: { slug: { eq: $slug } }) {\n      documentId\n      ...FullPageFragment\n    }\n  }\n": types.GetPageDocument,
    "\n  fragment FullProgrammeFragment on Programme {\n    createdAt\n    updatedAt\n    publishedAt\n    slug\n    title\n    description\n    summary\n    cover {\n      documentId\n      url\n      caption\n      alternativeText\n    }\n  }\n": types.FullProgrammeFragmentFragmentDoc,
    "\n  query searchProgrammes(\n    $limit: Int = 100\n    $status: PublicationStatus = PUBLISHED\n  ) {\n    programmes(\n      sort: \"publishedAt:DESC\"\n      pagination: { page: 1, pageSize: $limit }\n      status: $status\n    ) {\n      documentId\n      ...FullProgrammeFragment\n    }\n  }\n": types.SearchProgrammesDocument,
    "\n  query getProgramme($slug: String) {\n    programmes(filters: { slug: { eq: $slug } }) {\n      documentId\n      ...FullProgrammeFragment\n    }\n  }\n": types.GetProgrammeDocument,
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
export function graphql(source: "\n  query getAboutPage {\n    about {\n      summary\n      description\n      cover {\n        url\n        alternativeText\n      }\n    }\n  }\n"): (typeof documents)["\n  query getAboutPage {\n    about {\n      summary\n      description\n      cover {\n        url\n        alternativeText\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query getContactPage {\n    contact {\n      summary\n      description\n      cover {\n        url\n        alternativeText\n      }\n    }\n  }\n"): (typeof documents)["\n  query getContactPage {\n    contact {\n      summary\n      description\n      cover {\n        url\n        alternativeText\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment FullEventFragment on Event {\n    createdAt\n    updatedAt\n    publishedAt\n    slug\n    title\n    displayTitle\n    location\n    organizers\n    online\n    summary\n    description\n    startAt\n    endAt\n    cover {\n      documentId\n      url\n      caption\n      alternativeText\n    }\n  }\n"): (typeof documents)["\n  fragment FullEventFragment on Event {\n    createdAt\n    updatedAt\n    publishedAt\n    slug\n    title\n    displayTitle\n    location\n    organizers\n    online\n    summary\n    description\n    startAt\n    endAt\n    cover {\n      documentId\n      url\n      caption\n      alternativeText\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query getEvent($slug: String) {\n    events(filters: { slug: { eq: $slug } }) {\n      documentId\n      ...FullEventFragment\n    }\n  }\n"): (typeof documents)["\n  query getEvent($slug: String) {\n    events(filters: { slug: { eq: $slug } }) {\n      documentId\n      ...FullEventFragment\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query searchEvents(\n    $limit: Int = 100\n    $status: PublicationStatus = PUBLISHED\n    $rawFilters: EventFiltersInput = {}\n  ) {\n    events(\n      sort: [\"startAt:ASC\", \"publishedAt:ASC\"]\n      filters: $rawFilters\n      pagination: { page: 1, pageSize: $limit }\n      status: $status\n    ) {\n      documentId\n      ...FullEventFragment\n    }\n  }\n"): (typeof documents)["\n  query searchEvents(\n    $limit: Int = 100\n    $status: PublicationStatus = PUBLISHED\n    $rawFilters: EventFiltersInput = {}\n  ) {\n    events(\n      sort: [\"startAt:ASC\", \"publishedAt:ASC\"]\n      filters: $rawFilters\n      pagination: { page: 1, pageSize: $limit }\n      status: $status\n    ) {\n      documentId\n      ...FullEventFragment\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query getHomePage {\n    home {\n      introduction\n    }\n  }\n"): (typeof documents)["\n  query getHomePage {\n    home {\n      introduction\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment FullPageFragment on Page {\n    createdAt\n    updatedAt\n    publishedAt\n    slug\n    title\n    summary\n    introduction\n    programmes {\n      documentId\n      ...FullProgrammeFragment\n    }\n    cover {\n      documentId\n      url\n      caption\n      alternativeText\n    }\n  }\n"): (typeof documents)["\n  fragment FullPageFragment on Page {\n    createdAt\n    updatedAt\n    publishedAt\n    slug\n    title\n    summary\n    introduction\n    programmes {\n      documentId\n      ...FullProgrammeFragment\n    }\n    cover {\n      documentId\n      url\n      caption\n      alternativeText\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query searchPages($limit: Int = 100, $status: PublicationStatus = PUBLISHED) {\n    pages(\n      sort: \"publishedAt:DESC\"\n      pagination: { page: 1, pageSize: $limit }\n      status: $status\n    ) {\n      documentId\n      ...FullPageFragment\n    }\n  }\n"): (typeof documents)["\n  query searchPages($limit: Int = 100, $status: PublicationStatus = PUBLISHED) {\n    pages(\n      sort: \"publishedAt:DESC\"\n      pagination: { page: 1, pageSize: $limit }\n      status: $status\n    ) {\n      documentId\n      ...FullPageFragment\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query getPage($slug: String) {\n    pages(filters: { slug: { eq: $slug } }) {\n      documentId\n      ...FullPageFragment\n    }\n  }\n"): (typeof documents)["\n  query getPage($slug: String) {\n    pages(filters: { slug: { eq: $slug } }) {\n      documentId\n      ...FullPageFragment\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment FullProgrammeFragment on Programme {\n    createdAt\n    updatedAt\n    publishedAt\n    slug\n    title\n    description\n    summary\n    cover {\n      documentId\n      url\n      caption\n      alternativeText\n    }\n  }\n"): (typeof documents)["\n  fragment FullProgrammeFragment on Programme {\n    createdAt\n    updatedAt\n    publishedAt\n    slug\n    title\n    description\n    summary\n    cover {\n      documentId\n      url\n      caption\n      alternativeText\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query searchProgrammes(\n    $limit: Int = 100\n    $status: PublicationStatus = PUBLISHED\n  ) {\n    programmes(\n      sort: \"publishedAt:DESC\"\n      pagination: { page: 1, pageSize: $limit }\n      status: $status\n    ) {\n      documentId\n      ...FullProgrammeFragment\n    }\n  }\n"): (typeof documents)["\n  query searchProgrammes(\n    $limit: Int = 100\n    $status: PublicationStatus = PUBLISHED\n  ) {\n    programmes(\n      sort: \"publishedAt:DESC\"\n      pagination: { page: 1, pageSize: $limit }\n      status: $status\n    ) {\n      documentId\n      ...FullProgrammeFragment\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query getProgramme($slug: String) {\n    programmes(filters: { slug: { eq: $slug } }) {\n      documentId\n      ...FullProgrammeFragment\n    }\n  }\n"): (typeof documents)["\n  query getProgramme($slug: String) {\n    programmes(filters: { slug: { eq: $slug } }) {\n      documentId\n      ...FullProgrammeFragment\n    }\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;