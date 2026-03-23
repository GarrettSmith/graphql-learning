import AddBook from "@/components/AddBook";
import BookList from "@/components/BookList";

export default async function HomePage() {
  return (
    <main style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h1>Book Library</h1>
      <BookList />

      <hr style={{ margin: "2rem 0" }} />

      <h2>Add a Book</h2>
      <AddBook />
    </main>
  );
}
