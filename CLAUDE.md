# graphql-learning — Claude context

## Monorepo layout

| Path | Purpose |
|------|---------|
| `apps/server/` | Apollo Server GraphQL API, runs on port 4000 |
| `apps/client/` | Next.js 15 App Router frontend, runs on port 3000 |

## Running the project

```bash
npm run dev:server   # starts the GraphQL API
npm run dev:client   # starts Next.js
```

Both apps must be running for the frontend to fetch data.

## Key files

| File | Role |
|------|------|
| `apps/server/src/schema.ts` | GraphQL type definitions |
| `apps/server/src/resolvers.ts` | Resolver functions + in-memory data |
| `apps/server/src/index.ts` | Apollo Server entry point |
| `apps/client/lib/apollo-client.ts` | Shared Apollo Client factory (`makeClient`, `getClient`) |
| `apps/client/components/ApolloWrapper.tsx` | `"use client"` provider boundary |
| `apps/client/app/layout.tsx` | Root layout — wraps app in ApolloWrapper |
| `apps/client/app/page.tsx` | Home page — Server Component, SSR fetch |

## Learning pattern

Each step follows the same structure:
1. Claude explains the concept and scaffolds the file
2. Human implements the TODO
3. Claude reviews, fixes any issues, and moves to the next step
