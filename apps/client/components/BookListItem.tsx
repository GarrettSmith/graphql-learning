import Link from "next/link";
import { graphql, useFragment } from "@/lib/__generated__";
import type { FragmentType } from "@/lib/__generated__";

export const BOOK_LIST_ITEM_FIELDS = graphql(`
  fragment BookListItemFields on Book {
    id
    title
    year
    author {
      name
    }
  }
`);

export default function BookListItem({
  book,
}: {
  book: FragmentType<typeof BOOK_LIST_ITEM_FIELDS>;
}) {
  const data = useFragment(BOOK_LIST_ITEM_FIELDS, book);
  return (
    <Link href={`/books/${data.id}`} style={{ display: "block", padding: "0.5rem 0", borderBottom: "1px solid #eee" }}>
      {data.title} — {data.author.name} ({data.year})
    </Link>
  );
}
