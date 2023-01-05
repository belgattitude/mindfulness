import { graphql } from '@/gql/gql';

const retraiteFragment = graphql(/* GraphQL */ `
  fragment RetraiteItem on Retraite {
    createdAt
    updatedAt
    publishedAt
    summary
    description
    start_at
    end_at
    cover {
      data {
        id
        attributes {
          url
          caption
          alternativeText
        }
      }
    }
  }
`);

//   filters: { start_at: { gte: "2022-02-28T03:00:00.000Z" } }
// sort: ["publishedAt:DESC"]
const allRetraites = graphql(/* GraphQL */ `
  query allRetraites($limit: Int = 100) {
    retraites(
      sort: "publishedAt:DESC"
      filters: { start_at: { gte: "2022-02-28T03:00:00.000Z" } }
      pagination: { page: 1, pageSize: $limit }
    ) {
      data {
        id
        attributes {
          ...RetraiteItem
        }
      }
      meta {
        pagination {
          page
          pageSize
          total
          pageCount
        }
      }
    }
  }
`);

export const eventsApi = {
  retraiteFragment,
  allRetraites,
};
