"use client";

import { useQuery } from "@apollo/client/react";
import { Virtuoso } from "react-virtuoso";
import { GET_BOOKS } from "@/lib/queries";
import { useCallback, useDeferredValue, useEffect, useState } from "react";
import { GetBooksQuery } from "@/lib/__generated__/graphql";
import { useDebounce } from "@/hooks/useDebounce";

type BookEdge = NonNullable<GetBooksQuery["books"]["edges"][number]>;

const PAGE_SIZE = 20;
const FILTER_DEBOUNCE = 200;

export default function BookList() {
  const [searchTerm, setSearchTerm] = useState("");
  const filter = useDebounce(searchTerm, FILTER_DEBOUNCE);

  useEffect(() => console.log(filter), [filter]);

  const { data, loading, error, fetchMore } = useQuery(GET_BOOKS, {
    variables: {
      first: PAGE_SIZE,
      filter,
    },
  });

  // TODO 2: implement loadMore
  // - if !data?.books.pageInfo.hasNextPage, return early
  // - call fetchMore with variables: { first: PAGE_SIZE, after: data.books.pageInfo.endCursor }
  function loadMore() {
    // Don't load more if there is no next page
    if (!data?.books.pageInfo.hasNextPage) {
      return;
    }

    fetchMore({
      variables: {
        after: data?.books.pageInfo.endCursor,
        first: PAGE_SIZE,
        filter: searchTerm,
      },
    });
  }

  const edges = data?.books.edges ?? [];

  const renderItem = useCallback(
    (_: unknown, edge: BookEdge) => (
      <div>
        {edge.node.title} - {edge.node.author.name} ({edge.node.year})
      </div>
    ),
    [],
  );

  // TODO 3: render a Virtuoso list
  // props:
  //   data={edges}
  //   endReached={loadMore}
  //   style={{ height: "600px" }}
  //   itemContent={(_, edge) => (
  //     <div style={{ padding: "0.5rem 0", borderBottom: "1px solid #eee" }}>
  //       {edge.node.title} — {edge.node.author.name} ({edge.node.year})
  //     </div>
  //   )}
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
