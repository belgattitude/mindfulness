import { getStrapiURL } from "./strapi.config";

export const getGraphQLUrl = (): string => getStrapiURL("/graphql");
