import { getGraphqlClient } from "@/config/graphql-client.config";
import { graphql } from "@/gql/gql";
import { getGraphqlRequestCatcher } from "@/lib/getGraphqlRequestCatcher";

export const getHomePage = graphql(/* GraphQL */ `
  query getHomePage {
    home {
      introduction
    }
  }
`);

export const fetchHome = async () =>
  getGraphqlClient
    .request(getHomePage)
    .catch(getGraphqlRequestCatcher)
    .then((resp) => {
      return {
        introduction: resp.home?.introduction ?? "",
      };
    });
