import { getGraphqlClient } from "@/config/graphql-client.config";
import { graphql } from "@/gql/gql";
import { getGraphqlRequestCatcher } from "@/lib/getGraphqlRequestCatcher";

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

export const fetchAboutPage = async () =>
  getGraphqlClient
    .request(getAboutPage)
    .catch(getGraphqlRequestCatcher)
    .then((resp) => {
      return resp;
    });
