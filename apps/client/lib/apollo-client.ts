import { HttpLink } from "@apollo/client";
import {
  ApolloClient,
  InMemoryCache,
  registerApolloClient,
} from "@apollo/client-integration-nextjs";

// RSC-side client — wrapped in React.cache() by registerApolloClient for per-request isolation.
// Use getClient() or the query() shorthand in Server Components.
export const { getClient, query } = registerApolloClient(
  () =>
    new ApolloClient({
      cache: new InMemoryCache(),
      link: new HttpLink({ uri: "http://localhost:4000/" }),
    })
);