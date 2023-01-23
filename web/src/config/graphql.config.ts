import { getStrapiURL } from './strapi.config';

export const getGraphQLUrl = (): string => {
  return getStrapiURL('/graphql');
};
