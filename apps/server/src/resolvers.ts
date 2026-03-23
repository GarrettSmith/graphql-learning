import { books, authors } from "./stores";
import { Book, Author, BookConnection, AddBookInput } from "./types";
import { Context } from "./context";
import { GraphQLError } from "graphql/error";

const encodeCursor = (book: Book) =>
  Buffer.from(String(book.id)).toString("base64");
const decodeCursor = (cursor: string) =>
  Buffer.from(cursor, "base64").toString();

export const resolvers = {
  Query: {
    books: (
      _: unknown,
      args: { first?: number; after?: string; filter?: string },
    ): BookConnection => {
      const filteredBooks = args.filter
        ? books.filter((book) =>
            book.title.toLowerCase().includes(args.filter!.toLowerCase()),
          )
        : books;
      const startId = args.after ? decodeCursor(args.after) : null;
      const startIndex = startId
        ? filteredBooks.findIndex((book) => book.id === startId) + 1
        : 0;
      const endIndex = startIndex + (args.first ?? 10);
      const page = filteredBooks.slice(startIndex, endIndex);
      const edges = page.map((book) => ({
        node: book,
        cursor: encodeCursor(book),
      }));
      const pageInfo = {
        hasNextPage: endIndex < filteredBooks.length,
        endCursor: edges[edges.length - 1]?.cursor ?? null,
      };
      return {
        edges,
        pageInfo,
      };
    },

    book: (_: unknown, args: { id: string }) => {
      const found = books.find((book) => book.id === args.id);
      if (!found) {
        throw new GraphQLError(`Book with id ${args.id} not found`, {
          extensions: { code: "NOT_FOUND" },
        });
      }
      return found;
    },

    authors: () => authors,
  },

  // Field resolvers — GraphQL calls these when a client asks for nested data.
  // "parent" here is the Book object returned by the Query resolver above.
  Book: {
    author: async (parent: Book, _: unknown, context: Context) => {
      return context.authorLoader.load(parent.authorId);
    },
  },

  Author: {
    books: (parent: Author) => books.filter((b) => b.authorId === parent.id),
  },

  Mutation: {
    addBook: (_: unknown, args: { input: AddBookInput }): Book => {
      const {
        input: { title, year, authorId },
      } = args;
      const newBook: Book = {
        id: String(books.length + 1),
        title,
        year,
        authorId,
      };
      books.push(newBook);
      return newBook;
    },
  },
};
