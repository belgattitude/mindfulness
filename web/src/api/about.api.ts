import { getGraphqlClient } from "@/config/graphql-client.config";
import { graphql } from "@/gql/gql";
import { withGraphqlRequestCatcher } from "@/lib/getGraphqlRequestCatcher";

export const getAboutPage = graphql(/* GraphQL */ `
  query getAboutPage {
    about {
      summary
      description
      cover {
        url
        alternativeText
      }
    }
  }
`);

export const fetchAboutPage = () =>
  withGraphqlRequestCatcher(getGraphqlClient.request(getAboutPage));
