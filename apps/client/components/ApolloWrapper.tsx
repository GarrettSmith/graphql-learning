"use client";

import { HttpLink } from "@apollo/client";
import { ApolloLink } from "@apollo/client/link";
import { ErrorLink } from "@apollo/client/link/error";
import {
  ApolloClient,
  ApolloNextAppProvider,
  InMemoryCache,
} from "@apollo/client-integration-nextjs";
import { toast } from "sonner";

const errorLink = new ErrorLink(({ error, operation, forward }) => {
  toast.error(error.message);
  forward(operation);
});

// Client-side factory — ApolloNextAppProvider calls this once and holds the singleton.
// Must use ApolloClient from @apollo/client-integration-nextjs (the streaming-wrapped version),
// not the base @apollo/client — otherwise the types won't satisfy ApolloNextAppProvider.
function makeClient() {
  return new ApolloClient({
    cache: new InMemoryCache({
      typePolicies: {
        Query: {
          fields: {
            books: {
              keyArgs: ["filter"],
              merge(existing, incoming) {
                // Deduplicate by cursors
                const existingEdges = existing?.edges ?? [];
                const existingCursors = new Set(
                  existingEdges.map((e: { cursor: string }) => e.cursor),
                );
                const newEdges = incoming.edges.filter(
                  (e: { cursor: string }) => !existingCursors.has(e.cursor),
                );
                return {
                  ...incoming,
                  edges: [...existingEdges, ...newEdges],
                };
              },
            },
          },
        },
      },
    }),
    link: ApolloLink.from([errorLink, new HttpLink({ uri: "/api/graphql" })]),
  });
}

export default function ApolloWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ApolloNextAppProvider makeClient={makeClient}>
      {children}
    </ApolloNextAppProvider>
  );
}
