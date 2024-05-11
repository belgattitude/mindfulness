import { graphql } from '@/gql/gql';
import { getGraphqlRequestCatcher } from '@/lib/getGraphqlRequestCatcher';
import { getGraphqlClient } from '@/config/graphql-client.config';

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
  return getGraphqlClient
    .request(getHomePage)
    .catch(getGraphqlRequestCatcher)
    .then((resp) => {
      return {
        introduction: resp.home?.data?.attributes?.introduction ?? '',
      };
    });
};
