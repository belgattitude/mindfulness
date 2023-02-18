import request from 'graphql-request';
import { graphql } from '@/gql/gql';
import { getGraphqlRequestCatcher } from '@/lib/getGraphqlRequestCatcher';
import { getGraphQLUrl } from '../config/graphql.config';

export const getContactPage = graphql(/* GraphQL */ `
  query getContactPage {
    contact {
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

export const fetchContactPage = async () => {
  // const { slug } = params;
  return request(getGraphQLUrl(), getContactPage, {})
    .catch(getGraphqlRequestCatcher)
    .then((resp) => {
      return resp;
    });
};
