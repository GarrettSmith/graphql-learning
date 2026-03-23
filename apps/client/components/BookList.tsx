"use client";

import { useQuery } from "@apollo/client/react";
import { Virtuoso } from "react-virtuoso";
import { useDebounce } from "@/hooks/useDebounce";
import { graphql } from "@/lib/__generated__";
import { useCallback, useState } from "react";
import { GetBooksQuery } from "@/lib/__generated__/graphql";
import BookListItem, { BOOK_LIST_ITEM_FIELDS } from "./BookListItem";

const GET_BOOKS = graphql(`
  query GetBooks($first: Int, $after: String, $filter: String) {
    books(first: $first, after: $after, filter: $filter) {
      edges {
        node {
          ...BookListItemFields
        }
        cursor
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
`);

type BookEdge = NonNullable<GetBooksQuery["books"]["edges"][number]>;

const PAGE_SIZE = 20;
const FILTER_DEBOUNCE = 200;

export default function BookList() {
  const [searchTerm, setSearchTerm] = useState("");
  const filter = useDebounce(searchTerm, FILTER_DEBOUNCE);

  const { data, loading, error, fetchMore } = useQuery(GET_BOOKS, {
    variables: {
      first: PAGE_SIZE,
      filter,
    },
  });

  function loadMore() {
    // Don't load more if there is no next page
    if (!data?.books.pageInfo.hasNextPage) {
      return;
    }

    fetchMore({
      variables: {
        after: data?.books.pageInfo.endCursor,
        first: PAGE_SIZE,
        filter,
      },
    });
  }

  const edges = data?.books.edges ?? [];

  const renderItem = useCallback(
    (_: unknown, edge: BookEdge) => <BookListItem book={edge.node} />,
    [],
  );

  return (
    <>
      <input
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <Virtuoso
        data={edges}
        endReached={loadMore}
        itemContent={renderItem}
        style={{ height: "600px" }}
      />
    </>
  );
}
