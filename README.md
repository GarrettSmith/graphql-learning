# graphql-learning

A hands-on monorepo for learning GraphQL with Apollo Server and Next.js.

## Structure

```
apps/
  server/   Apollo Server (GraphQL API) — Node.js + TypeScript
  client/   Next.js frontend — TypeScript, React, Apollo Client
```

## Running

From the root, use npm scripts to delegate to each app:

```bash
# Run the GraphQL API (http://localhost:4000)
npm run dev:server

# Run the Next.js frontend (http://localhost:3000)
npm run dev:client
```

Or run each app directly from its own directory:

```bash
cd apps/server && npm run dev
cd apps/client && npm run dev
```

## What's being learned

- GraphQL schema definition (types, queries, mutations)
- Apollo Server resolvers (root, field, nested)
- Apollo Client in Next.js App Router
- SSR with `getClient()` in Server Components
- Interactive data fetching with `useQuery` in Client Components
- Writing mutations with `useMutation`
