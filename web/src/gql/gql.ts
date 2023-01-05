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
 * Therefore it is highly recommended to use the babel-plugin for production.
 */
const documents = {
    "\n  fragment RetraiteItem on Retraite {\n    createdAt\n    updatedAt\n    publishedAt\n    summary\n    description\n    start_at\n    end_at\n    cover {\n      data {\n        id\n        attributes {\n          url\n          caption\n          alternativeText\n        }\n      }\n    }\n  }\n": types.RetraiteItemFragmentDoc,
    "\n  query allRetraites($limit: Int = 100) {\n    retraites(\n      sort: \"publishedAt:DESC\"\n      filters: { start_at: { gte: \"2022-02-28T03:00:00.000Z\" } }\n      pagination: { page: 1, pageSize: $limit }\n    ) {\n      data {\n        id\n        attributes {\n          ...RetraiteItem\n        }\n      }\n      meta {\n        pagination {\n          page\n          pageSize\n          total\n          pageCount\n        }\n      }\n    }\n  }\n": types.AllRetraitesDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment RetraiteItem on Retraite {\n    createdAt\n    updatedAt\n    publishedAt\n    summary\n    description\n    start_at\n    end_at\n    cover {\n      data {\n        id\n        attributes {\n          url\n          caption\n          alternativeText\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  fragment RetraiteItem on Retraite {\n    createdAt\n    updatedAt\n    publishedAt\n    summary\n    description\n    start_at\n    end_at\n    cover {\n      data {\n        id\n        attributes {\n          url\n          caption\n          alternativeText\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query allRetraites($limit: Int = 100) {\n    retraites(\n      sort: \"publishedAt:DESC\"\n      filters: { start_at: { gte: \"2022-02-28T03:00:00.000Z\" } }\n      pagination: { page: 1, pageSize: $limit }\n    ) {\n      data {\n        id\n        attributes {\n          ...RetraiteItem\n        }\n      }\n      meta {\n        pagination {\n          page\n          pageSize\n          total\n          pageCount\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query allRetraites($limit: Int = 100) {\n    retraites(\n      sort: \"publishedAt:DESC\"\n      filters: { start_at: { gte: \"2022-02-28T03:00:00.000Z\" } }\n      pagination: { page: 1, pageSize: $limit }\n    ) {\n      data {\n        id\n        attributes {\n          ...RetraiteItem\n        }\n      }\n      meta {\n        pagination {\n          page\n          pageSize\n          total\n          pageCount\n        }\n      }\n    }\n  }\n"];

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
**/
export function graphql(source: string): unknown;

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;