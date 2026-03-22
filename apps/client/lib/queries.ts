import { TypedDocumentNode, gql } from "@apollo/client";

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
      id
      title
      year
      author {
        name
      }
    }
  }
`;

export interface AddBookResult {
  addBook: {
    id: string;
    title: string;
    year: number;
    author: { name: string };
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
      id
      title
      year
      author {
        name
      }
    }
  }
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
