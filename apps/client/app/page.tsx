import { TypedDocumentNode, gql } from "@apollo/client";
import { getClient } from "@/lib/apollo-client";
import BookSearch from "@/components/BookSearch";
import AddBook from "@/components/AddBook";

import { GET_BOOKS } from "@/lib/queries";

export default async function HomePage() {
  const client = getClient();
  const { data } = await client.query({ query: GET_BOOKS });

  return (
    <main style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h1>Book Library</h1>

      <h2>All Books</h2>
      <ul>
        {data?.books.map((book) => (
          <li key={book.id}>
            {book.title} — {book.author.name} ({book.year})
          </li>
        ))}
      </ul>

      <hr style={{ margin: "2rem 0" }} />

      <h2>Search Books (Client)</h2>
      <BookSearch />

      <hr style={{ margin: "2rem 0" }} />

      <h2>Add a Book</h2>
      <AddBook />
    </main>
  );
}
