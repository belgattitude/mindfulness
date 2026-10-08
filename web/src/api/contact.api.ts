import { getGraphqlClient } from "@/config/graphql-client.config";
import { graphql } from "@/gql/gql";
import { getGraphqlRequestCatcher } from "@/lib/getGraphqlRequestCatcher";

export const getContactPage = graphql(/* GraphQL */ `
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

export const fetchContactPage = async () =>
  getGraphqlClient
    .request(getContactPage)
    .catch(getGraphqlRequestCatcher)
    .then((resp) => {
      return resp;
    });
