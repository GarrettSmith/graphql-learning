export const typeDefs = `#graphql
  type Author {
    id: ID!
    name: String!
    books: [Book!]!
  }

  type Book {
    id: ID!
    title: String!
    year: Int!
    author: Author!
  }

  type BookConnection {
    edges: [BookEdge!]!
    pageInfo: PageInfo!
  }

  type BookEdge {
    node: Book!
    cursor: String!
  }

  type PageInfo {
    hasNextPage: Boolean!
    endCursor: String
  }

  type Query {
    books(first: Int, after: String, filter: String): BookConnection!
    book(id: ID!): Book
    authors: [Author!]!
  }

  input AddBookInput {
    title: String!
    year: Int!
    authorId: ID!
  }

  type Mutation {
    addBook(input: AddBookInput!): Book!
  }
`;
