"use client";

import { useMemo, useState } from "react";
import { useQuery } from "@apollo/client/react";

import { GET_BOOKS } from "@/lib/queries";

export default function BookSearch() {
  const [searchTerm, setSearchTerm] = useState("");
  const bookQuery = useQuery(GET_BOOKS);

  const filteredBooks = useMemo(() => {
    if (searchTerm.length < 1) {
      return bookQuery.data?.books;
    }
    return bookQuery.data?.books.filter((book) =>
      book.title.toLocaleLowerCase().includes(searchTerm.toLowerCase()),
    );
  }, [bookQuery.data?.books, searchTerm]);

  if (bookQuery.loading) {
    return <p>Loading...</p>;
  }

  if (bookQuery.error) {
    return <p>Error: {bookQuery.error.message}</p>;
  }

  return (
    <>
      <input
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <ul>
        {filteredBooks?.map((book) => (
          <li key={book.id}>
            {book.title} - {book.author.name} ({book.year})
          </li>
        ))}
      </ul>
    </>
  );
}
