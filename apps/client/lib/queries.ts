import { graphql } from "@/lib/__generated__";

export const BOOK_FIELDS = graphql(`
  fragment BookFields on Book {
    __typename
    id
    title
    year
    author {
      __typename
      name
    }
  }
`);

export const GET_BOOKS = graphql(`
  query GetBooks($first: Int, $after: String, $filter: String) {
    books(first: $first, after: $after, filter: $filter) {
      edges {
        node {
          __typename
          id
          title
          year
          author {
            __typename
            name
          }
        }
        cursor
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
`);

export const ADD_BOOK = graphql(`
  mutation AddBook($title: String!, $year: Int!, $authorId: ID!) {
    addBook(title: $title, year: $year, authorId: $authorId) {
      ...BookFields
    }
  }
`);

export const GET_AUTHORS = graphql(`
  query GetAuthors {
    authors {
      id
      name
    }
  }
`);
