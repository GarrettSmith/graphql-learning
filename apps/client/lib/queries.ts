import { TypedDocumentNode, gql } from "@apollo/client";

const BOOK_FIELDS = gql`
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
`;

export interface GetBooksResult {
  books: {
    id: string;
    title: string;
    year: number;
    author: { name: string };
  }[];
}

export const GET_BOOKS: TypedDocumentNode<GetBooksResult> = gql`
  query GetBooks {
    books {
      ...BookFields
    }
  }
  ${BOOK_FIELDS}
`;

export interface AddBookResult {
  addBook: {
    __typename: "Book";
    id: string;
    title: string;
    year: number;
    author: { __typename: "Author"; name: string };
  };
}

export interface AddBookVariables {
  title: string;
  year: number;
  authorId: string;
}

export const ADD_BOOK: TypedDocumentNode<AddBookResult, AddBookVariables> = gql`
  mutation AddBook($title: String!, $year: Int!, $authorId: ID!) {
    addBook(title: $title, year: $year, authorId: $authorId) {
      ...BookFields
    }
  }
  ${BOOK_FIELDS}
`;

export interface GetAuthorsResult {
  authors: {
    id: string;
    name: string;
  }[];
}

export const GET_AUTHORS: TypedDocumentNode<GetAuthorsResult> = gql`
  query GetAuthors {
    authors {
      id
      name
    }
  }
`;
