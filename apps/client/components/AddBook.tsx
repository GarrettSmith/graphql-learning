"use client";

import { useState } from "react";
import { useMutation, useQuery } from "@apollo/client/react";
import { ADD_BOOK, GET_AUTHORS, GET_BOOKS } from "@/lib/queries";

export default function AddBook() {
  const [title, setTitle] = useState("");
  const [year, setYear] = useState("");
  const [authorId, setAuthorId] = useState("");

  const authorsQuery = useQuery(GET_AUTHORS);
  const [addBook, { loading, error }] = useMutation(ADD_BOOK, {
    update(cache, { data }) {
      const existing = cache.readQuery({ query: GET_BOOKS });
      cache.writeQuery({
        query: GET_BOOKS,
        data: {
          books: [...(existing?.books ?? []), data?.addBook],
        },
      });
    },
  });

  async function handleSubmit(e: React.SubmitEvent) {
    e.preventDefault();
    try {
      const result = await addBook({
        variables: {
          title,
          year: parseInt(year),
          authorId: authorId,
        },
        optimisticResponse: {
          addBook: {
            __typename: "Book",
            id: "temp-id",
            title,
            year: parseInt(year),
            author: { __typename: "Author", name: "" },
          },
        },
      });
      setTitle("");
      setYear("");
      setAuthorId("");
      console.log(
        `Added ${result.data?.addBook.title} - ${result.data?.addBook.author} (${result.data?.addBook.year})`,
      );
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "0.5rem",
        maxWidth: 300,
      }}
    >
      <input
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
        disabled={loading}
      />
      <input
        placeholder="Year"
        type="number"
        value={year}
        onChange={(e) => setYear(e.target.value)}
        required
        disabled={loading}
      />
      <select
        value={authorId}
        onChange={(e) => setAuthorId(e.target.value)}
        required
        disabled={loading || authorsQuery.loading}
      >
        <option value="" disabled>
          Author
        </option>
        {authorsQuery.data?.authors.map((author) => (
          <option key={author.id} value={author.id}>
            {author.name}
          </option>
        ))}
      </select>
      <button type="submit" disabled={loading}>
        {loading ? "Adding..." : "Add Book"}
      </button>
    </form>
  );
}
