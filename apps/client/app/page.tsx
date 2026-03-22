import { gql } from "@apollo/client";
import { getClient } from "@/lib/apollo-client";

interface Book {
  id: string;
  title: string;
  year: number;
  author: {
    name: string
  };
}

const GET_BOOKS = gql`
  query GetBooks {
    books {
      id
      title
      year
      author {
        name
      }
    }
  }
`;

// TODO(human): implement this Server Component.
// 1. Call getClient() to get the Apollo client
// 2. Call client.query({ query: GET_BOOKS }) — it's async, so await it
// 3. Pull `data` out of the result and render a <ul> listing each book as:
//    "Title — Author (Year)"
export default async function HomePage() {
  const client = getClient();
  const books = await client.query<Book[]>({ query: GET_BOOKS });

  return (
    <ul>
      {books.data?.map(book => (
        <li key={book.id}>
          {book.title} ({book.year}) - {book.author.name}
        </li>
      ))}
    </ul>
  )
}
