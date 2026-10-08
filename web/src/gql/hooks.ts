/** Internal type. DO NOT USE DIRECTLY. */
type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
/** Internal type. DO NOT USE DIRECTLY. */
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
import type { DocumentTypeDecoration } from '@graphql-typed-document-node/core';
import { useQuery, type UseQueryOptions } from '@tanstack/react-query';

function fetcher<TData, TVariables>(endpoint: string, requestInit: RequestInit, query: TypedDocumentString<unknown, unknown>, variables?: TVariables) {
  return async (): Promise<TData> => {
    const res = await fetch(endpoint, {
      method: 'POST',
      ...requestInit,
      body: JSON.stringify({ query, variables }),
    });

    const json = await res.json();

    if (json.errors) {
      const { message } = json.errors[0];

      throw new Error(message);
    }

    return json.data;
  }
}
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
  and?: Array<unknown> | null | undefined;
  between?: Array<unknown> | null | undefined;
  contains?: unknown;
  containsi?: unknown;
  endsWith?: unknown;
  eq?: unknown;
  eqi?: unknown;
  gt?: unknown;
  gte?: unknown;
  in?: Array<unknown> | null | undefined;
  lt?: unknown;
  lte?: unknown;
  ne?: unknown;
  nei?: unknown;
  not?: DateTimeFilterInput | null | undefined;
  notContains?: unknown;
  notContainsi?: unknown;
  notIn?: Array<unknown> | null | undefined;
  notNull?: boolean | null | undefined;
  null?: boolean | null | undefined;
  or?: Array<unknown> | null | undefined;
  startsWith?: unknown;
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

export type FullEventFragmentFragment = { createdAt: unknown, updatedAt: unknown, publishedAt: unknown, slug: string, title: string, displayTitle: string | null, location: string | null, organizers: string | null, online: boolean, summary: string | null, description: string, startAt: unknown, endAt: unknown, cover: { documentId: string, url: string, caption: string | null, alternativeText: string | null } };

export type GetEventQueryVariables = Exact<{
  slug?: string | null | undefined;
}>;


export type GetEventQuery = { events: Array<{ documentId: string, createdAt: unknown, updatedAt: unknown, publishedAt: unknown, slug: string, title: string, displayTitle: string | null, location: string | null, organizers: string | null, online: boolean, summary: string | null, description: string, startAt: unknown, endAt: unknown, cover: { documentId: string, url: string, caption: string | null, alternativeText: string | null } } | null> };

export type SearchEventsQueryVariables = Exact<{
  limit?: number | null | undefined;
  status?: PublicationStatus | null | undefined;
  rawFilters?: EventFiltersInput | null | undefined;
}>;


export type SearchEventsQuery = { events: Array<{ documentId: string, createdAt: unknown, updatedAt: unknown, publishedAt: unknown, slug: string, title: string, displayTitle: string | null, location: string | null, organizers: string | null, online: boolean, summary: string | null, description: string, startAt: unknown, endAt: unknown, cover: { documentId: string, url: string, caption: string | null, alternativeText: string | null } } | null> };

export type GetHomePageQueryVariables = Exact<{ [key: string]: never; }>;


export type GetHomePageQuery = { home: { introduction: string | null } | null };

export type FullPageFragmentFragment = { createdAt: unknown, updatedAt: unknown, publishedAt: unknown, slug: string, title: string, summary: string | null, introduction: string | null, programmes: Array<{ documentId: string, createdAt: unknown, updatedAt: unknown, publishedAt: unknown, slug: string | null, title: string | null, description: string | null, summary: string | null, cover: { documentId: string, url: string, caption: string | null, alternativeText: string | null } } | null>, cover: { documentId: string, url: string, caption: string | null, alternativeText: string | null } | null };

export type SearchPagesQueryVariables = Exact<{
  limit?: number | null | undefined;
  status?: PublicationStatus | null | undefined;
}>;


export type SearchPagesQuery = { pages: Array<{ documentId: string, createdAt: unknown, updatedAt: unknown, publishedAt: unknown, slug: string, title: string, summary: string | null, introduction: string | null, programmes: Array<{ documentId: string, createdAt: unknown, updatedAt: unknown, publishedAt: unknown, slug: string | null, title: string | null, description: string | null, summary: string | null, cover: { documentId: string, url: string, caption: string | null, alternativeText: string | null } } | null>, cover: { documentId: string, url: string, caption: string | null, alternativeText: string | null } | null } | null> };

export type GetPageQueryVariables = Exact<{
  slug?: string | null | undefined;
}>;


export type GetPageQuery = { pages: Array<{ documentId: string, createdAt: unknown, updatedAt: unknown, publishedAt: unknown, slug: string, title: string, summary: string | null, introduction: string | null, programmes: Array<{ documentId: string, createdAt: unknown, updatedAt: unknown, publishedAt: unknown, slug: string | null, title: string | null, description: string | null, summary: string | null, cover: { documentId: string, url: string, caption: string | null, alternativeText: string | null } } | null>, cover: { documentId: string, url: string, caption: string | null, alternativeText: string | null } | null } | null> };

export type FullProgrammeFragmentFragment = { createdAt: unknown, updatedAt: unknown, publishedAt: unknown, slug: string | null, title: string | null, description: string | null, summary: string | null, cover: { documentId: string, url: string, caption: string | null, alternativeText: string | null } };

export type SearchProgrammesQueryVariables = Exact<{
  limit?: number | null | undefined;
  status?: PublicationStatus | null | undefined;
}>;


export type SearchProgrammesQuery = { programmes: Array<{ documentId: string, createdAt: unknown, updatedAt: unknown, publishedAt: unknown, slug: string | null, title: string | null, description: string | null, summary: string | null, cover: { documentId: string, url: string, caption: string | null, alternativeText: string | null } } | null> };

export type GetProgrammeQueryVariables = Exact<{
  slug?: string | null | undefined;
}>;


export type GetProgrammeQuery = { programmes: Array<{ documentId: string, createdAt: unknown, updatedAt: unknown, publishedAt: unknown, slug: string | null, title: string | null, description: string | null, summary: string | null, cover: { documentId: string, url: string, caption: string | null, alternativeText: string | null } } | null> };


export class TypedDocumentString<TResult, TVariables>
  extends String
  implements DocumentTypeDecoration<TResult, TVariables>
{
  __apiType?: NonNullable<DocumentTypeDecoration<TResult, TVariables>['__apiType']>;
  private value: string;
  public __meta__?: Record<string, any> | undefined;

  constructor(value: string, __meta__?: Record<string, any> | undefined) {
    super(value);
    this.value = value;
    this.__meta__ = __meta__;
  }

  override toString(): string & DocumentTypeDecoration<TResult, TVariables> {
    return this.value;
  }
}
export const FullEventFragmentFragmentDoc = new TypedDocumentString(`
    fragment FullEventFragment on Event {
  createdAt
  updatedAt
  publishedAt
  slug
  title
  displayTitle
  location
  organizers
  online
  summary
  description
  startAt
  endAt
  cover {
    documentId
    url
    caption
    alternativeText
  }
}
    `, {"fragmentName":"FullEventFragment"});
export const FullProgrammeFragmentFragmentDoc = new TypedDocumentString(`
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
    `, {"fragmentName":"FullProgrammeFragment"});
export const FullPageFragmentFragmentDoc = new TypedDocumentString(`
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
}`, {"fragmentName":"FullPageFragment"});
export const GetAboutPageDocument = new TypedDocumentString(`
    query getAboutPage {
  about {
    summary
    description
    cover {
      url
      alternativeText
    }
  }
}
    `);

export const useGetAboutPageQuery = <
      TData = GetAboutPageQuery,
      TError = unknown
    >(
      dataSource: { endpoint: string, fetchParams?: RequestInit },
      variables?: GetAboutPageQueryVariables,
      options?: Omit<UseQueryOptions<GetAboutPageQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<GetAboutPageQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<GetAboutPageQuery, TError, TData>(
      {
    queryKey: variables === undefined ? ['getAboutPage'] : ['getAboutPage', variables],
    queryFn: fetcher<GetAboutPageQuery, GetAboutPageQueryVariables>(dataSource.endpoint, dataSource.fetchParams || {}, GetAboutPageDocument, variables),
    ...options
  }
    )};

export const GetContactPageDocument = new TypedDocumentString(`
    query getContactPage {
  contact {
    summary
    description
    cover {
      url
      alternativeText
    }
  }
}
    `);

export const useGetContactPageQuery = <
      TData = GetContactPageQuery,
      TError = unknown
    >(
      dataSource: { endpoint: string, fetchParams?: RequestInit },
      variables?: GetContactPageQueryVariables,
      options?: Omit<UseQueryOptions<GetContactPageQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<GetContactPageQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<GetContactPageQuery, TError, TData>(
      {
    queryKey: variables === undefined ? ['getContactPage'] : ['getContactPage', variables],
    queryFn: fetcher<GetContactPageQuery, GetContactPageQueryVariables>(dataSource.endpoint, dataSource.fetchParams || {}, GetContactPageDocument, variables),
    ...options
  }
    )};

export const GetEventDocument = new TypedDocumentString(`
    query getEvent($slug: String) {
  events(filters: { slug: { eq: $slug } }) {
    documentId
    ...FullEventFragment
  }
}
    fragment FullEventFragment on Event {
  createdAt
  updatedAt
  publishedAt
  slug
  title
  displayTitle
  location
  organizers
  online
  summary
  description
  startAt
  endAt
  cover {
    documentId
    url
    caption
    alternativeText
  }
}`);

export const useGetEventQuery = <
      TData = GetEventQuery,
      TError = unknown
    >(
      dataSource: { endpoint: string, fetchParams?: RequestInit },
      variables?: GetEventQueryVariables,
      options?: Omit<UseQueryOptions<GetEventQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<GetEventQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<GetEventQuery, TError, TData>(
      {
    queryKey: variables === undefined ? ['getEvent'] : ['getEvent', variables],
    queryFn: fetcher<GetEventQuery, GetEventQueryVariables>(dataSource.endpoint, dataSource.fetchParams || {}, GetEventDocument, variables),
    ...options
  }
    )};

export const SearchEventsDocument = new TypedDocumentString(`
    query searchEvents($limit: Int = 100, $status: PublicationStatus = PUBLISHED, $rawFilters: EventFiltersInput = {  }) {
  events(
    sort: ["startAt:ASC", "publishedAt:ASC"]
    filters: $rawFilters
    pagination: { page: 1, pageSize: $limit }
    status: $status
  ) {
    documentId
    ...FullEventFragment
  }
}
    fragment FullEventFragment on Event {
  createdAt
  updatedAt
  publishedAt
  slug
  title
  displayTitle
  location
  organizers
  online
  summary
  description
  startAt
  endAt
  cover {
    documentId
    url
    caption
    alternativeText
  }
}`);

export const useSearchEventsQuery = <
      TData = SearchEventsQuery,
      TError = unknown
    >(
      dataSource: { endpoint: string, fetchParams?: RequestInit },
      variables?: SearchEventsQueryVariables,
      options?: Omit<UseQueryOptions<SearchEventsQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<SearchEventsQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<SearchEventsQuery, TError, TData>(
      {
    queryKey: variables === undefined ? ['searchEvents'] : ['searchEvents', variables],
    queryFn: fetcher<SearchEventsQuery, SearchEventsQueryVariables>(dataSource.endpoint, dataSource.fetchParams || {}, SearchEventsDocument, variables),
    ...options
  }
    )};

export const GetHomePageDocument = new TypedDocumentString(`
    query getHomePage {
  home {
    introduction
  }
}
    `);

export const useGetHomePageQuery = <
      TData = GetHomePageQuery,
      TError = unknown
    >(
      dataSource: { endpoint: string, fetchParams?: RequestInit },
      variables?: GetHomePageQueryVariables,
      options?: Omit<UseQueryOptions<GetHomePageQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<GetHomePageQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<GetHomePageQuery, TError, TData>(
      {
    queryKey: variables === undefined ? ['getHomePage'] : ['getHomePage', variables],
    queryFn: fetcher<GetHomePageQuery, GetHomePageQueryVariables>(dataSource.endpoint, dataSource.fetchParams || {}, GetHomePageDocument, variables),
    ...options
  }
    )};

export const SearchPagesDocument = new TypedDocumentString(`
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
}`);

export const useSearchPagesQuery = <
      TData = SearchPagesQuery,
      TError = unknown
    >(
      dataSource: { endpoint: string, fetchParams?: RequestInit },
      variables?: SearchPagesQueryVariables,
      options?: Omit<UseQueryOptions<SearchPagesQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<SearchPagesQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<SearchPagesQuery, TError, TData>(
      {
    queryKey: variables === undefined ? ['searchPages'] : ['searchPages', variables],
    queryFn: fetcher<SearchPagesQuery, SearchPagesQueryVariables>(dataSource.endpoint, dataSource.fetchParams || {}, SearchPagesDocument, variables),
    ...options
  }
    )};

export const GetPageDocument = new TypedDocumentString(`
    query getPage($slug: String) {
  pages(filters: { slug: { eq: $slug } }) {
    documentId
    ...FullPageFragment
  }
}
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
}`);

export const useGetPageQuery = <
      TData = GetPageQuery,
      TError = unknown
    >(
      dataSource: { endpoint: string, fetchParams?: RequestInit },
      variables?: GetPageQueryVariables,
      options?: Omit<UseQueryOptions<GetPageQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<GetPageQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<GetPageQuery, TError, TData>(
      {
    queryKey: variables === undefined ? ['getPage'] : ['getPage', variables],
    queryFn: fetcher<GetPageQuery, GetPageQueryVariables>(dataSource.endpoint, dataSource.fetchParams || {}, GetPageDocument, variables),
    ...options
  }
    )};

export const SearchProgrammesDocument = new TypedDocumentString(`
    query searchProgrammes($limit: Int = 100, $status: PublicationStatus = PUBLISHED) {
  programmes(
    sort: "publishedAt:DESC"
    pagination: { page: 1, pageSize: $limit }
    status: $status
  ) {
    documentId
    ...FullProgrammeFragment
  }
}
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
}`);

export const useSearchProgrammesQuery = <
      TData = SearchProgrammesQuery,
      TError = unknown
    >(
      dataSource: { endpoint: string, fetchParams?: RequestInit },
      variables?: SearchProgrammesQueryVariables,
      options?: Omit<UseQueryOptions<SearchProgrammesQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<SearchProgrammesQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<SearchProgrammesQuery, TError, TData>(
      {
    queryKey: variables === undefined ? ['searchProgrammes'] : ['searchProgrammes', variables],
    queryFn: fetcher<SearchProgrammesQuery, SearchProgrammesQueryVariables>(dataSource.endpoint, dataSource.fetchParams || {}, SearchProgrammesDocument, variables),
    ...options
  }
    )};

export const GetProgrammeDocument = new TypedDocumentString(`
    query getProgramme($slug: String) {
  programmes(filters: { slug: { eq: $slug } }) {
    documentId
    ...FullProgrammeFragment
  }
}
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
}`);

export const useGetProgrammeQuery = <
      TData = GetProgrammeQuery,
      TError = unknown
    >(
      dataSource: { endpoint: string, fetchParams?: RequestInit },
      variables?: GetProgrammeQueryVariables,
      options?: Omit<UseQueryOptions<GetProgrammeQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<GetProgrammeQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<GetProgrammeQuery, TError, TData>(
      {
    queryKey: variables === undefined ? ['getProgramme'] : ['getProgramme', variables],
    queryFn: fetcher<GetProgrammeQuery, GetProgrammeQueryVariables>(dataSource.endpoint, dataSource.fetchParams || {}, GetProgrammeDocument, variables),
    ...options
  }
    )};
