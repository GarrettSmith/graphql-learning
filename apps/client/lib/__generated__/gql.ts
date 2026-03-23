/* eslint-disable */
import * as types from './graphql';
import type { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
type Documents = {
    "\n  query GetBook($id: ID!) {\n    book(id: $id) {\n      id\n      title\n      year\n      author {\n        name\n      }\n    }\n  }\n": typeof types.GetBookDocument,
    "\n  mutation AddBook($input: AddBookInput!) {\n    addBook(input: $input) {\n      __typename\n      id\n      title\n      year\n      author {\n        __typename\n        name\n      }\n    }\n  }\n": typeof types.AddBookDocument,
    "\n  query GetAuthors {\n    authors {\n      id\n      name\n    }\n  }\n": typeof types.GetAuthorsDocument,
    "\n  query GetBooks($first: Int, $after: String, $filter: String) {\n    books(first: $first, after: $after, filter: $filter) {\n      edges {\n        node {\n          ...BookListItemFields\n        }\n        cursor\n      }\n      pageInfo {\n        hasNextPage\n        endCursor\n      }\n    }\n  }\n": typeof types.GetBooksDocument,
    "\n  fragment BookListItemFields on Book {\n    id\n    title\n    year\n    author {\n      name\n    }\n  }\n": typeof types.BookListItemFieldsFragmentDoc,
};
const documents: Documents = {
    "\n  query GetBook($id: ID!) {\n    book(id: $id) {\n      id\n      title\n      year\n      author {\n        name\n      }\n    }\n  }\n": types.GetBookDocument,
    "\n  mutation AddBook($input: AddBookInput!) {\n    addBook(input: $input) {\n      __typename\n      id\n      title\n      year\n      author {\n        __typename\n        name\n      }\n    }\n  }\n": types.AddBookDocument,
    "\n  query GetAuthors {\n    authors {\n      id\n      name\n    }\n  }\n": types.GetAuthorsDocument,
    "\n  query GetBooks($first: Int, $after: String, $filter: String) {\n    books(first: $first, after: $after, filter: $filter) {\n      edges {\n        node {\n          ...BookListItemFields\n        }\n        cursor\n      }\n      pageInfo {\n        hasNextPage\n        endCursor\n      }\n    }\n  }\n": types.GetBooksDocument,
    "\n  fragment BookListItemFields on Book {\n    id\n    title\n    year\n    author {\n      name\n    }\n  }\n": types.BookListItemFieldsFragmentDoc,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetBook($id: ID!) {\n    book(id: $id) {\n      id\n      title\n      year\n      author {\n        name\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetBook($id: ID!) {\n    book(id: $id) {\n      id\n      title\n      year\n      author {\n        name\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation AddBook($input: AddBookInput!) {\n    addBook(input: $input) {\n      __typename\n      id\n      title\n      year\n      author {\n        __typename\n        name\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation AddBook($input: AddBookInput!) {\n    addBook(input: $input) {\n      __typename\n      id\n      title\n      year\n      author {\n        __typename\n        name\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetAuthors {\n    authors {\n      id\n      name\n    }\n  }\n"): (typeof documents)["\n  query GetAuthors {\n    authors {\n      id\n      name\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetBooks($first: Int, $after: String, $filter: String) {\n    books(first: $first, after: $after, filter: $filter) {\n      edges {\n        node {\n          ...BookListItemFields\n        }\n        cursor\n      }\n      pageInfo {\n        hasNextPage\n        endCursor\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetBooks($first: Int, $after: String, $filter: String) {\n    books(first: $first, after: $after, filter: $filter) {\n      edges {\n        node {\n          ...BookListItemFields\n        }\n        cursor\n      }\n      pageInfo {\n        hasNextPage\n        endCursor\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment BookListItemFields on Book {\n    id\n    title\n    year\n    author {\n      name\n    }\n  }\n"): (typeof documents)["\n  fragment BookListItemFields on Book {\n    id\n    title\n    year\n    author {\n      name\n    }\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;