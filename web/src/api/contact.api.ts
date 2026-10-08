import { getGraphqlClient } from "@/config/graphql-client.config";
import { graphql } from "@/gql/gql";
import { withGraphqlRequestCatcher } from "@/lib/getGraphqlRequestCatcher";

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

export const fetchContactPage = () =>
  withGraphqlRequestCatcher(getGraphqlClient.request(getContactPage));
