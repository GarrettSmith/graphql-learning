"use client";

import { ApolloNextAppProvider } from "@apollo/experimental-nextjs-app-support/AppRouter";
import { makeClient } from "@/lib/apollo-client";

export default function ApolloWrapper({ children }: { children: React.ReactNode }) {
  return <ApolloNextAppProvider makeClient={makeClient}>{children}</ApolloNextAppProvider>;
}
