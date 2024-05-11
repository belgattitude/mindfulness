import { graphql } from '@/gql/gql';
import { getGraphqlRequestCatcher } from '@/lib/getGraphqlRequestCatcher';
import { getGraphqlClient } from '@/config/graphql-client.config';

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
  return getGraphqlClient
    .request(getAboutPage)
    .catch(getGraphqlRequestCatcher)
    .then((resp) => {
      return resp;
    });
};
