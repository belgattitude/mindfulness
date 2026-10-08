/* eslint-disable */
/** Internal type. DO NOT USE DIRECTLY. */
type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
/** Internal type. DO NOT USE DIRECTLY. */
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
import type { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type BooleanFilterInput = {
  and?: Array<boolean | null | undefined> | null | undefined;
  between?: Array<boolean | null | undefined> | null | undefined;
  contains?: boolean | null | undefined;
  containsi?: boolean | null | undefined;
  endsWith?: boolean | null | undefined;
  eq?: boolean | null | undefined;
  eqi?: boolean | null | undefined;
  gt?: boolean | null | undefined;
  gte?: boolean | null | undefined;
  in?: Array<boolean | null | undefined> | null | undefined;
  lt?: boolean | null | undefined;
  lte?: boolean | null | undefined;
  ne?: boolean | null | undefined;
  nei?: boolean | null | undefined;
  not?: BooleanFilterInput | null | undefined;
  notContains?: boolean | null | undefined;
  notContainsi?: boolean | null | undefined;
  notIn?: Array<boolean | null | undefined> | null | undefined;
  notNull?: boolean | null | undefined;
  null?: boolean | null | undefined;
  or?: Array<boolean | null | undefined> | null | undefined;
  startsWith?: boolean | null | undefined;
};

export type DateTimeFilterInput = {
  and?: Array<string | null | undefined> | null | undefined;
  between?: Array<string | null | undefined> | null | undefined;
  contains?: string | null | undefined;
  containsi?: string | null | undefined;
  endsWith?: string | null | undefined;
  eq?: string | null | undefined;
  eqi?: string | null | undefined;
  gt?: string | null | undefined;
  gte?: string | null | undefined;
  in?: Array<string | null | undefined> | null | undefined;
  lt?: string | null | undefined;
  lte?: string | null | undefined;
  ne?: string | null | undefined;
  nei?: string | null | undefined;
  not?: DateTimeFilterInput | null | undefined;
  notContains?: string | null | undefined;
  notContainsi?: string | null | undefined;
  notIn?: Array<string | null | undefined> | null | undefined;
  notNull?: boolean | null | undefined;
  null?: boolean | null | undefined;
  or?: Array<string | null | undefined> | null | undefined;
  startsWith?: string | null | undefined;
};

export type EventFiltersInput = {
  and?: Array<EventFiltersInput | null | undefined> | null | undefined;
  createdAt?: DateTimeFilterInput | null | undefined;
  description?: StringFilterInput | null | undefined;
  displayTitle?: StringFilterInput | null | undefined;
  documentId?: IdFilterInput | null | undefined;
  endAt?: DateTimeFilterInput | null | undefined;
  eventType?: StringFilterInput | null | undefined;
  facebookLink?: StringFilterInput | null | undefined;
  location?: StringFilterInput | null | undefined;
  not?: EventFiltersInput | null | undefined;
  online?: BooleanFilterInput | null | undefined;
  or?: Array<EventFiltersInput | null | undefined> | null | undefined;
  organizers?: StringFilterInput | null | undefined;
  programmes?: ProgrammeFiltersInput | null | undefined;
  publishedAt?: DateTimeFilterInput | null | undefined;
  slug?: StringFilterInput | null | undefined;
  startAt?: DateTimeFilterInput | null | undefined;
  summary?: StringFilterInput | null | undefined;
  title?: StringFilterInput | null | undefined;
  universe?: StringFilterInput | null | undefined;
  updatedAt?: DateTimeFilterInput | null | undefined;
};

export type IdFilterInput = {
  and?: Array<string | number | null | undefined> | null | undefined;
  between?: Array<string | number | null | undefined> | null | undefined;
  contains?: string | number | null | undefined;
  containsi?: string | number | null | undefined;
  endsWith?: string | number | null | undefined;
  eq?: string | number | null | undefined;
  eqi?: string | number | null | undefined;
  gt?: string | number | null | undefined;
  gte?: string | number | null | undefined;
  in?: Array<string | number | null | undefined> | null | undefined;
  lt?: string | number | null | undefined;
  lte?: string | number | null | undefined;
  ne?: string | number | null | undefined;
  nei?: string | number | null | undefined;
  not?: IdFilterInput | null | undefined;
  notContains?: string | number | null | undefined;
  notContainsi?: string | number | null | undefined;
  notIn?: Array<string | number | null | undefined> | null | undefined;
  notNull?: boolean | null | undefined;
  null?: boolean | null | undefined;
  or?: Array<string | number | null | undefined> | null | undefined;
  startsWith?: string | number | null | undefined;
};

export type ProgrammeFiltersInput = {
  and?: Array<ProgrammeFiltersInput | null | undefined> | null | undefined;
  createdAt?: DateTimeFilterInput | null | undefined;
  description?: StringFilterInput | null | undefined;
  documentId?: IdFilterInput | null | undefined;
  events?: EventFiltersInput | null | undefined;
  not?: ProgrammeFiltersInput | null | undefined;
  or?: Array<ProgrammeFiltersInput | null | undefined> | null | undefined;
  publishedAt?: DateTimeFilterInput | null | undefined;
  slug?: StringFilterInput | null | undefined;
  summary?: StringFilterInput | null | undefined;
  title?: StringFilterInput | null | undefined;
  universe?: StringFilterInput | null | undefined;
  updatedAt?: DateTimeFilterInput | null | undefined;
};

export type PublicationStatus =
  | 'DRAFT'
  | 'PUBLISHED';

export type StringFilterInput = {
  and?: Array<string | null | undefined> | null | undefined;
  between?: Array<string | null | undefined> | null | undefined;
  contains?: string | null | undefined;
  containsi?: string | null | undefined;
  endsWith?: string | null | undefined;
  eq?: string | null | undefined;
  eqi?: string | null | undefined;
  gt?: string | null | undefined;
  gte?: string | null | undefined;
  in?: Array<string | null | undefined> | null | undefined;
  lt?: string | null | undefined;
  lte?: string | null | undefined;
  ne?: string | null | undefined;
  nei?: string | null | undefined;
  not?: StringFilterInput | null | undefined;
  notContains?: string | null | undefined;
  notContainsi?: string | null | undefined;
  notIn?: Array<string | null | undefined> | null | undefined;
  notNull?: boolean | null | undefined;
  null?: boolean | null | undefined;
  or?: Array<string | null | undefined> | null | undefined;
  startsWith?: string | null | undefined;
};

export type GetAboutPageQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAboutPageQuery = { about: { summary: string | null, description: string | null, cover: { url: string, alternativeText: string | null } | null } | null };

export type GetContactPageQueryVariables = Exact<{ [key: string]: never; }>;


export type GetContactPageQuery = { contact: { summary: string | null, description: string | null, cover: { url: string, alternativeText: string | null } | null } | null };

export type FullEventFragmentFragment = { createdAt: string | null, updatedAt: string | null, publishedAt: string | null, slug: string, title: string, displayTitle: string | null, location: string | null, organizers: string | null, online: boolean, summary: string | null, description: string, startAt: string, endAt: string, cover: { documentId: string, url: string, caption: string | null, alternativeText: string | null } } & { ' $fragmentName'?: 'FullEventFragmentFragment' };

export type GetEventQueryVariables = Exact<{
  slug?: string | null | undefined;
}>;


export type GetEventQuery = { events: Array<(
    { documentId: string }
    & { ' $fragmentRefs'?: { 'FullEventFragmentFragment': FullEventFragmentFragment } }
  ) | null> };

export type SearchEventsQueryVariables = Exact<{
  limit?: number | null | undefined;
  status?: PublicationStatus | null | undefined;
  rawFilters?: EventFiltersInput | null | undefined;
}>;


export type SearchEventsQuery = { events: Array<(
    { documentId: string }
    & { ' $fragmentRefs'?: { 'FullEventFragmentFragment': FullEventFragmentFragment } }
  ) | null> };

export type GetHomePageQueryVariables = Exact<{ [key: string]: never; }>;


export type GetHomePageQuery = { home: { introduction: string | null } | null };

export type FullPageFragmentFragment = { createdAt: string | null, updatedAt: string | null, publishedAt: string | null, slug: string, title: string, summary: string | null, introduction: string | null, programmes: Array<(
    { documentId: string }
    & { ' $fragmentRefs'?: { 'FullProgrammeFragmentFragment': FullProgrammeFragmentFragment } }
  ) | null>, cover: { documentId: string, url: string, caption: string | null, alternativeText: string | null } | null } & { ' $fragmentName'?: 'FullPageFragmentFragment' };

export type SearchPagesQueryVariables = Exact<{
  limit?: number | null | undefined;
  status?: PublicationStatus | null | undefined;
}>;


export type SearchPagesQuery = { pages: Array<(
    { documentId: string }
    & { ' $fragmentRefs'?: { 'FullPageFragmentFragment': FullPageFragmentFragment } }
  ) | null> };

export type GetPageQueryVariables = Exact<{
  slug?: string | null | undefined;
}>;


export type GetPageQuery = { pages: Array<(
    { documentId: string }
    & { ' $fragmentRefs'?: { 'FullPageFragmentFragment': FullPageFragmentFragment } }
  ) | null> };

export type FullProgrammeFragmentFragment = { createdAt: string | null, updatedAt: string | null, publishedAt: string | null, slug: string | null, title: string | null, description: string | null, summary: string | null, cover: { documentId: string, url: string, caption: string | null, alternativeText: string | null } } & { ' $fragmentName'?: 'FullProgrammeFragmentFragment' };

export type SearchProgrammesQueryVariables = Exact<{
  limit?: number | null | undefined;
  status?: PublicationStatus | null | undefined;
}>;


export type SearchProgrammesQuery = { programmes: Array<(
    { documentId: string }
    & { ' $fragmentRefs'?: { 'FullProgrammeFragmentFragment': FullProgrammeFragmentFragment } }
  ) | null> };

export type GetProgrammeQueryVariables = Exact<{
  slug?: string | null | undefined;
}>;


export type GetProgrammeQuery = { programmes: Array<(
    { documentId: string }
    & { ' $fragmentRefs'?: { 'FullProgrammeFragmentFragment': FullProgrammeFragmentFragment } }
  ) | null> };

export const FullEventFragmentFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FullEventFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Event"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"publishedAt"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"displayTitle"}},{"kind":"Field","name":{"kind":"Name","value":"location"}},{"kind":"Field","name":{"kind":"Name","value":"organizers"}},{"kind":"Field","name":{"kind":"Name","value":"online"}},{"kind":"Field","name":{"kind":"Name","value":"summary"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"startAt"}},{"kind":"Field","name":{"kind":"Name","value":"endAt"}},{"kind":"Field","name":{"kind":"Name","value":"cover"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"documentId"}},{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"caption"}},{"kind":"Field","name":{"kind":"Name","value":"alternativeText"}}]}}]}}]} as unknown as DocumentNode<FullEventFragmentFragment, unknown>;
export const FullProgrammeFragmentFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FullProgrammeFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Programme"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"publishedAt"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"summary"}},{"kind":"Field","name":{"kind":"Name","value":"cover"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"documentId"}},{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"caption"}},{"kind":"Field","name":{"kind":"Name","value":"alternativeText"}}]}}]}}]} as unknown as DocumentNode<FullProgrammeFragmentFragment, unknown>;
export const FullPageFragmentFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FullPageFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Page"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"publishedAt"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"summary"}},{"kind":"Field","name":{"kind":"Name","value":"introduction"}},{"kind":"Field","name":{"kind":"Name","value":"programmes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"documentId"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"FullProgrammeFragment"}}]}},{"kind":"Field","name":{"kind":"Name","value":"cover"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"documentId"}},{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"caption"}},{"kind":"Field","name":{"kind":"Name","value":"alternativeText"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FullProgrammeFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Programme"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"publishedAt"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"summary"}},{"kind":"Field","name":{"kind":"Name","value":"cover"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"documentId"}},{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"caption"}},{"kind":"Field","name":{"kind":"Name","value":"alternativeText"}}]}}]}}]} as unknown as DocumentNode<FullPageFragmentFragment, unknown>;
export const GetAboutPageDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getAboutPage"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"about"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"summary"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"cover"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"alternativeText"}}]}}]}}]}}]} as unknown as DocumentNode<GetAboutPageQuery, GetAboutPageQueryVariables>;
export const GetContactPageDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getContactPage"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"contact"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"summary"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"cover"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"alternativeText"}}]}}]}}]}}]} as unknown as DocumentNode<GetContactPageQuery, GetContactPageQueryVariables>;
export const GetEventDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getEvent"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"slug"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"events"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"filters"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"slug"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"eq"},"value":{"kind":"Variable","name":{"kind":"Name","value":"slug"}}}]}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"documentId"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"FullEventFragment"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FullEventFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Event"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"publishedAt"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"displayTitle"}},{"kind":"Field","name":{"kind":"Name","value":"location"}},{"kind":"Field","name":{"kind":"Name","value":"organizers"}},{"kind":"Field","name":{"kind":"Name","value":"online"}},{"kind":"Field","name":{"kind":"Name","value":"summary"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"startAt"}},{"kind":"Field","name":{"kind":"Name","value":"endAt"}},{"kind":"Field","name":{"kind":"Name","value":"cover"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"documentId"}},{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"caption"}},{"kind":"Field","name":{"kind":"Name","value":"alternativeText"}}]}}]}}]} as unknown as DocumentNode<GetEventQuery, GetEventQueryVariables>;
export const SearchEventsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"searchEvents"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"limit"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}},"defaultValue":{"kind":"IntValue","value":"100"}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"status"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"PublicationStatus"}},"defaultValue":{"kind":"EnumValue","value":"PUBLISHED"}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"rawFilters"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"EventFiltersInput"}},"defaultValue":{"kind":"ObjectValue","fields":[]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"events"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"sort"},"value":{"kind":"ListValue","values":[{"kind":"StringValue","value":"startAt:ASC","block":false},{"kind":"StringValue","value":"publishedAt:ASC","block":false}]}},{"kind":"Argument","name":{"kind":"Name","value":"filters"},"value":{"kind":"Variable","name":{"kind":"Name","value":"rawFilters"}}},{"kind":"Argument","name":{"kind":"Name","value":"pagination"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"page"},"value":{"kind":"IntValue","value":"1"}},{"kind":"ObjectField","name":{"kind":"Name","value":"pageSize"},"value":{"kind":"Variable","name":{"kind":"Name","value":"limit"}}}]}},{"kind":"Argument","name":{"kind":"Name","value":"status"},"value":{"kind":"Variable","name":{"kind":"Name","value":"status"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"documentId"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"FullEventFragment"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FullEventFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Event"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"publishedAt"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"displayTitle"}},{"kind":"Field","name":{"kind":"Name","value":"location"}},{"kind":"Field","name":{"kind":"Name","value":"organizers"}},{"kind":"Field","name":{"kind":"Name","value":"online"}},{"kind":"Field","name":{"kind":"Name","value":"summary"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"startAt"}},{"kind":"Field","name":{"kind":"Name","value":"endAt"}},{"kind":"Field","name":{"kind":"Name","value":"cover"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"documentId"}},{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"caption"}},{"kind":"Field","name":{"kind":"Name","value":"alternativeText"}}]}}]}}]} as unknown as DocumentNode<SearchEventsQuery, SearchEventsQueryVariables>;
export const GetHomePageDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getHomePage"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"home"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"introduction"}}]}}]}}]} as unknown as DocumentNode<GetHomePageQuery, GetHomePageQueryVariables>;
export const SearchPagesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"searchPages"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"limit"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}},"defaultValue":{"kind":"IntValue","value":"100"}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"status"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"PublicationStatus"}},"defaultValue":{"kind":"EnumValue","value":"PUBLISHED"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"pages"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"sort"},"value":{"kind":"StringValue","value":"publishedAt:DESC","block":false}},{"kind":"Argument","name":{"kind":"Name","value":"pagination"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"page"},"value":{"kind":"IntValue","value":"1"}},{"kind":"ObjectField","name":{"kind":"Name","value":"pageSize"},"value":{"kind":"Variable","name":{"kind":"Name","value":"limit"}}}]}},{"kind":"Argument","name":{"kind":"Name","value":"status"},"value":{"kind":"Variable","name":{"kind":"Name","value":"status"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"documentId"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"FullPageFragment"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FullProgrammeFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Programme"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"publishedAt"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"summary"}},{"kind":"Field","name":{"kind":"Name","value":"cover"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"documentId"}},{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"caption"}},{"kind":"Field","name":{"kind":"Name","value":"alternativeText"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FullPageFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Page"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"publishedAt"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"summary"}},{"kind":"Field","name":{"kind":"Name","value":"introduction"}},{"kind":"Field","name":{"kind":"Name","value":"programmes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"documentId"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"FullProgrammeFragment"}}]}},{"kind":"Field","name":{"kind":"Name","value":"cover"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"documentId"}},{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"caption"}},{"kind":"Field","name":{"kind":"Name","value":"alternativeText"}}]}}]}}]} as unknown as DocumentNode<SearchPagesQuery, SearchPagesQueryVariables>;
export const GetPageDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getPage"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"slug"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"pages"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"filters"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"slug"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"eq"},"value":{"kind":"Variable","name":{"kind":"Name","value":"slug"}}}]}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"documentId"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"FullPageFragment"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FullProgrammeFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Programme"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"publishedAt"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"summary"}},{"kind":"Field","name":{"kind":"Name","value":"cover"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"documentId"}},{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"caption"}},{"kind":"Field","name":{"kind":"Name","value":"alternativeText"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FullPageFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Page"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"publishedAt"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"summary"}},{"kind":"Field","name":{"kind":"Name","value":"introduction"}},{"kind":"Field","name":{"kind":"Name","value":"programmes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"documentId"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"FullProgrammeFragment"}}]}},{"kind":"Field","name":{"kind":"Name","value":"cover"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"documentId"}},{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"caption"}},{"kind":"Field","name":{"kind":"Name","value":"alternativeText"}}]}}]}}]} as unknown as DocumentNode<GetPageQuery, GetPageQueryVariables>;
export const SearchProgrammesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"searchProgrammes"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"limit"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}},"defaultValue":{"kind":"IntValue","value":"100"}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"status"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"PublicationStatus"}},"defaultValue":{"kind":"EnumValue","value":"PUBLISHED"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"programmes"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"sort"},"value":{"kind":"StringValue","value":"publishedAt:DESC","block":false}},{"kind":"Argument","name":{"kind":"Name","value":"pagination"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"page"},"value":{"kind":"IntValue","value":"1"}},{"kind":"ObjectField","name":{"kind":"Name","value":"pageSize"},"value":{"kind":"Variable","name":{"kind":"Name","value":"limit"}}}]}},{"kind":"Argument","name":{"kind":"Name","value":"status"},"value":{"kind":"Variable","name":{"kind":"Name","value":"status"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"documentId"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"FullProgrammeFragment"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FullProgrammeFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Programme"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"publishedAt"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"summary"}},{"kind":"Field","name":{"kind":"Name","value":"cover"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"documentId"}},{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"caption"}},{"kind":"Field","name":{"kind":"Name","value":"alternativeText"}}]}}]}}]} as unknown as DocumentNode<SearchProgrammesQuery, SearchProgrammesQueryVariables>;
export const GetProgrammeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getProgramme"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"slug"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"programmes"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"filters"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"slug"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"eq"},"value":{"kind":"Variable","name":{"kind":"Name","value":"slug"}}}]}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"documentId"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"FullProgrammeFragment"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FullProgrammeFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Programme"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"publishedAt"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"summary"}},{"kind":"Field","name":{"kind":"Name","value":"cover"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"documentId"}},{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"caption"}},{"kind":"Field","name":{"kind":"Name","value":"alternativeText"}}]}}]}}]} as unknown as DocumentNode<GetProgrammeQuery, GetProgrammeQueryVariables>;