import request from 'graphql-request';
import { graphql } from '@/gql/gql';
import { getGraphqlRequestCatcher } from '@/lib/getGraphqlRequestCatcher';
import { getGraphQLUrl } from '../config/graphql.config';

export const getHomePage = graphql(/* GraphQL */ `
  query getHomePage {
    home {
      data {
        attributes {
          introduction
        }
      }
    }
  }
`);

export const fetchHome = async () => {
  // const { slug } = params;
  return request(getGraphQLUrl(), getHomePage, {})
    .catch(getGraphqlRequestCatcher)
    .then((resp) => {
      return {
        introduction: resp.home?.data?.attributes?.introduction ?? '',
      };
    });
};
