import request from 'graphql-request';
import { graphql } from '@/gql/gql';
import { getGraphqlRequestCatcher } from '@/lib/getGraphqlRequestCatcher';
import { getGraphQLUrl } from '../config/graphql.config';

export const getAboutPage = graphql(/* GraphQL */ `
  query getAboutPage {
    about {
      data {
        attributes {
          summary
          description
          cover {
            data {
              attributes {
                url
                alternativeText
              }
            }
          }
        }
      }
    }
  }
`);

export const fetchAboutPage = async () => {
  // const { slug } = params;
  return request(getGraphQLUrl(), getAboutPage, {})
    .catch(getGraphqlRequestCatcher)
    .then((resp) => {
      return resp;
    });
};
