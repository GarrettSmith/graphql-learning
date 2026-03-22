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

  type Query {
    books: [Book!]!
    book(id: ID!): Book
    authors: [Author!]!
  }

  type Mutation {
    addBook(title: String!, year: Int!, authorId: ID!): Book!
  }
`;
