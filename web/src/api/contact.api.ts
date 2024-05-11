import { graphql } from '@/gql/gql';
import { getGraphqlRequestCatcher } from '@/lib/getGraphqlRequestCatcher';
import { getGraphqlClient } from '@/config/graphql-client.config';

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
  return getGraphqlClient
    .request(getContactPage)
    .catch(getGraphqlRequestCatcher)
    .then((resp) => {
      return resp;
    });
};
