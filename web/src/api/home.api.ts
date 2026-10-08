import { getGraphqlClient } from "@/config/graphql-client.config";
import { graphql } from "@/gql/gql";
import { withGraphqlRequestCatcher } from "@/lib/getGraphqlRequestCatcher";

export const getHomePage = graphql(/* GraphQL */ `
  query getHomePage {
    home {
      introduction
    }
  }
`);

export const fetchHome = async () => {
  const resp = await withGraphqlRequestCatcher(
    getGraphqlClient.request(getHomePage)
  );
  return {
    introduction: resp.home?.introduction ?? "",
  };
};
