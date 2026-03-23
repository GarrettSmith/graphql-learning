# apps/server — agent context

> For commands and environment setup see [README.md](README.md).

Apollo Server 5 GraphQL API. TypeScript ESM, no compile step in dev (nodemon + tsx).

## Key files

| File | Role |
|------|------|
| `src/index.ts` | Entry point — wires server, schema, resolvers, context |
| `src/schema.ts` | GraphQL SDL type definitions |
| `src/resolvers.ts` | All query, mutation, and field resolvers |
| `src/context.ts` | Per-request context factory — creates DataLoader instances |
| `src/stores.ts` | In-memory data arrays (books, authors) — the "database" |
| `src/types.ts` | TypeScript interfaces mirroring the GraphQL schema |

## Architecture

```
Request
  └── Apollo Server
        ├── schema.ts   (SDL)
        ├── resolvers.ts
        └── context.ts  (per-request: { authorLoader: DataLoader })
```

Data lives in module-level arrays in `stores.ts`. Mutations mutate these arrays directly — changes are lost on server restart.

## Key decisions

**DataLoader is created per request in the context factory, not as a module-level singleton.** A singleton would batch across requests and could serve stale or cross-contaminated data. The 50ms artificial delay in the loader exists to make batching observable during learning.

**Cursor encoding** — cursors are base64-encoded book IDs. Simple and deterministic. Tradeoff: not stable if IDs change, but fine for an in-memory setup.

**Pagination slicing** — filter is applied before cursor/limit so `first`/`after` always operate on the filtered result set, not the full store. `hasNextPage` is `endIndex < filteredBooks.length`.

**`NOT_FOUND` error code** — `book(id)` throws `GraphQLError` with `extensions.code: "NOT_FOUND"` so the client can distinguish a missing record from a server fault and render the right message.

## Anti-patterns

- Don't make DataLoader a module-level singleton — must be per-request.
- Don't use offset pagination — offsets shift when records are inserted mid-scroll.
