import { GraphQLClient } from 'graphql-request';
import { getGraphQLUrl } from '@/config/graphql.config';

export const getGraphqlClient = new GraphQLClient(getGraphQLUrl(), {
  next: {
    revalidate: process.env.NODE_ENV === 'development' ? 0 : 1,
  },
});
