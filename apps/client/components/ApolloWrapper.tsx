"use client";

import { HttpLink } from "@apollo/client";
import {
  ApolloClient,
  ApolloNextAppProvider,
  InMemoryCache,
} from "@apollo/client-integration-nextjs";

// Client-side factory — ApolloNextAppProvider calls this once and holds the singleton.
// Must use ApolloClient from @apollo/client-integration-nextjs (the streaming-wrapped version),
// not the base @apollo/client — otherwise the types won't satisfy ApolloNextAppProvider.
function makeClient() {
  return new ApolloClient({
    cache: new InMemoryCache(),
    link: new HttpLink({ uri: "/api/graphql" }),
  });
}

export default function ApolloWrapper({ children }: { children: React.ReactNode }) {
  return <ApolloNextAppProvider makeClient={makeClient}>{children}</ApolloNextAppProvider>;
}