interface Author {
  id: string;
  name: string;
}

interface Book {
  id: string;
  title: string;
  year: number;
  authorId: string;
}

// In-memory "database"
const authors: Author[] = [
  { id: "1", name: "Frank Herbert" },
  { id: "2", name: "Ursula K. Le Guin" },
  { id: "3", name: "Isaac Asimov" },
];

const books: Book[] = [
  { id: "1", title: "Dune", year: 1965, authorId: "1" },
  { id: "2", title: "The Left Hand of Darkness", year: 1969, authorId: "2" },
  { id: "3", title: "Foundation", year: 1951, authorId: "3" },
  { id: "4", title: "Dune Messiah", year: 1969, authorId: "1" },
];

export const resolvers = {
  Query: {
    books: () => books,

    book: (_: unknown, args: { id: string }) => {
      return books.find((book) => book.id === args.id);
    },

    authors: () => authors,
  },

  // Field resolvers — GraphQL calls these when a client asks for nested data.
  // "parent" here is the Book object returned by the Query resolver above.
  Book: {
    author: (parent: Book) =>
      authors.find((a) => a.id === parent.authorId),
  },

  Author: {
    books: (parent: Author) =>
      books.filter((b) => b.authorId === parent.id),
  },

  Mutation: {
    addBook: (_: unknown, args: { title: string; year: number; authorId: string }): Book => {
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
