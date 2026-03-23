# graphql-learning

A hands-on monorepo for learning GraphQL end-to-end: Apollo Server on the backend, Next.js 15 App Router + Apollo Client on the frontend.

## Structure

```
apps/
  server/   Apollo Server 5 GraphQL API — Node.js, TypeScript, port 4000
  client/   Next.js 15 frontend — TypeScript, React 19, Apollo Client 4, port 3000
```

## Environment setup

No `.env` files needed. No external services or database. Everything runs locally.

Required: check `.nvmrc` for the Node version and ensure it's active before running anything.

Install dependencies for both apps:

```bash
npm run install:all
```

## Commands

Run from the **repo root**:

```bash
# Start everything (server + client + codegen watch) concurrently
npm run dev

# Start apps individually
npm run dev:server       # GraphQL API at http://localhost:4000
npm run dev:client       # Next.js at http://localhost:3000

# GraphQL codegen (server must be running — introspects live schema)
npm run codegen          # run once
npm run codegen:watch    # watch mode

# Install deps for both apps
npm run install:all
```

Both apps must be running for the frontend to fetch data.

Run app-specific commands (build, lint, test) from within each app directory. See `apps/server/README.md` and `apps/client/README.md`.

## What's being learned

- GraphQL schema definition (types, queries, mutations, connections)
- Apollo Server resolvers — root, field, nested, DataLoader batching
- Cursor-based pagination
- Apollo Client in Next.js App Router — RSC vs Client Component split
- `useQuery`, `useMutation`, `fetchMore` for infinite scroll
- Fragment colocation with graphql-codegen client preset
- Apollo cache policies and cache eviction
