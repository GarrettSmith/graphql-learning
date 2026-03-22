"use client";

import { useState } from "react";
import { useMutation, useQuery } from "@apollo/client/react";
import { ADD_BOOK, GET_AUTHORS, GET_BOOKS } from "@/lib/queries";

// TODO(human): implement this component.
//
// 1. Call useMutation(ADD_BOOK) — destructure as [addBook, { loading, error }]
// 2. On form submit (handleSubmit):
//    - call addBook({ variables: { title, year: Number(year), authorId } })
//    - after it resolves, reset the form fields to ""
//    - pass refetchQueries: [{ query: GET_BOOKS }] to refetch the book list automatically
//      (import GET_BOOKS from "@/lib/queries")
// 3. Render a form with three inputs: title (text), year (number), authorId (text)
//    and a submit button that shows "Adding..." when loading
export default function AddBook() {
  const [title, setTitle] = useState("");
  const [year, setYear] = useState("");
  const [authorId, setAuthorId] = useState("");

  const authorsQuery = useQuery(GET_AUTHORS);
  const [addBook, { loading, error }] = useMutation(ADD_BOOK);

  async function handleSubmit(e: React.SubmitEvent) {
    e.preventDefault();
    try {
      const result = await addBook({
        variables: {
          title,
          year: parseInt(year),
          authorId: authorId,
        },
        refetchQueries: [{ query: GET_BOOKS }],
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
