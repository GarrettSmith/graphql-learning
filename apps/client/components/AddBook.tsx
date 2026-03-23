"use client";

import { useState } from "react";
import { useMutation, useQuery } from "@apollo/client/react";
import { graphql } from "@/lib/__generated__";

const ADD_BOOK = graphql(`
  mutation AddBook($input: AddBookInput!) {
    addBook(input: $input) {
      __typename
      id
      title
      year
      author {
        __typename
        name
      }
    }
  }
`);

const GET_AUTHORS = graphql(`
  query GetAuthors {
    authors {
      id
      name
    }
  }
`);

export default function AddBook() {
  const [title, setTitle] = useState("");
  const [year, setYear] = useState("");
  const [authorId, setAuthorId] = useState("");

  const authorsQuery = useQuery(GET_AUTHORS);
  const [addBook, { loading, error }] = useMutation(ADD_BOOK, {
    update(cache) {
      cache.evict({ fieldName: "books" });
      cache.gc();
    },
  });

  async function handleSubmit(e: React.SubmitEvent) {
    e.preventDefault();
    try {
      await addBook({
        variables: {
          input: { title, year: parseInt(year), authorId },
        },
      });
      setTitle("");
      setYear("");
      setAuthorId("");
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
