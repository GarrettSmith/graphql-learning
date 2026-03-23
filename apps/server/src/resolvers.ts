import { books, authors } from "./stores";
import { Book, Author, BookConnection } from "./types";
import { Context } from "./context";

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
      return books.find((book) => book.id === args.id);
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
    addBook: (
      _: unknown,
      args: { title: string; year: number; authorId: string },
    ): Book => {
      const newBook: Book = {
        id: String(books.length + 1),
        title: args.title,
        year: args.year,
        authorId: args.authorId,
      };
      books.push(newBook);
      return newBook;
    },
  },
};
