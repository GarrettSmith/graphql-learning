"use client";

import { useQuery } from "@apollo/client/react";
import { graphql } from "@/lib/__generated__";
import { useParams } from "next/navigation";
import Link from "next/link";
import { CombinedGraphQLErrors } from "@apollo/client";

const GET_BOOK = graphql(`
  query GetBook($id: ID!) {
    book(id: $id) {
      id
      title
      year
      author {
        name
      }
    }
  }
`);

export default function BookPage() {
  const { id } = useParams<{ id: string }>();
  const { data, loading, error } = useQuery(GET_BOOK, {
    variables: { id },
  });

  if (loading) return <p>Loading...</p>;

  // TODO: handle error — check error.graphQLErrors[0].extensions?.code
  // and show a "not found" message if code === "NOT_FOUND"
  if (error) {
    if (!CombinedGraphQLErrors.is(error)) {
      return <p>Error: {error.message}</p>;
    }
    const code = error.errors[0]?.extensions?.code;
    switch (code) {
      case "NOT_FOUND":
        return <p>Book not found</p>;
      default:
        return <p>GraphQL error: {error.message}</p>;
    }
  }

  const book = data?.book;
  if (!book) return null;

  return (
    <main style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <Link href="/">← Back</Link>
      <h1>{book.title}</h1>
      <p>Author: {book.author.name}</p>
      <p>Year: {book.year}</p>
    </main>
  );
}
