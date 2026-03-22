import { ApolloClient, InMemoryCache } from "@apollo/client";
import { registerApolloClient } from "@apollo/experimental-nextjs-app-support/rsc";

// Shared factory — used by both server and client.
// Server: registerApolloClient wraps it in React.cache() for per-request isolation.
// Client: ApolloNextAppProvider calls it once and holds the singleton.
export const makeClient = () =>
  new ApolloClient({
    cache: new InMemoryCache(),
    uri: "http://localhost:4000/",
  });

export const { getClient } = registerApolloClient(makeClient);
