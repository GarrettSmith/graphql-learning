# graphql-learning — agent context

> For commands, environment setup, and project overview see [README.md](README.md).

A learning monorepo: Apollo Server 5 (port 4000) + Next.js 15 App Router (port 3000).

## Architecture

```
Browser
  └── Next.js (3000)
        ├── Server Components  →  getClient() / query()  →  Apollo Server (4000)
        └── Client Components  →  ApolloNextAppProvider  →  /api/graphql (rewrite → 4000)
```

The Next.js rewrite at `/api/graphql → http://localhost:4000` lets client-side components use a relative URL, avoiding CORS. See `apps/client/next.config.ts`.

**Two separate Apollo clients exist intentionally:**
- `apps/client/lib/apollo-client.ts` — RSC side, `registerApolloClient` gives per-request cache isolation
- `apps/client/components/ApolloWrapper.tsx` — client side, singleton via `ApolloNextAppProvider`

## Key decisions & trade-offs

**In-memory data store** — no database. Intentional for a learning project; mutations survive only for the server process lifetime.

**DataLoader for authors** — batches per-request author lookups to avoid N+1 when resolving `Book.author`. A new loader is created per request (via context factory) so batching is scoped correctly and doesn't bleed between requests.

**Cursor-based pagination** — Relay-style, base64-encoded book IDs as cursors. Chosen over offset pagination because offsets become inconsistent when data is mutated mid-scroll.

**Cache eviction after mutation** — `cache.evict({ fieldName: "books" })` instead of `refetchQueries`. Avoids a redundant network round-trip; Apollo re-fetches only when something reads the field again.

**Fragment masking** — `useFragment` from codegen keeps data requirements colocated with the component that uses them. `BookListItem` owns its fragment; `BookList` composes it.

**`keyArgs: ["filter"]` in type policies** — different filter values get separate cache buckets, so switching filters doesn't corrupt pagination state. The merge function deduplicates by cursor for idempotent infinite scroll.

## Anti-patterns

- Don't import from `@apollo/client` directly in Next.js integration code — use `@apollo/client-integration-nextjs`. The base package's types won't satisfy `ApolloNextAppProvider`.
- Don't run `codegen` without the server running — it introspects the live schema over HTTP.
- Don't add a persistent database — keep it in-memory.

## Learning pattern

Each concept follows: Claude explains + scaffolds → you implement the TODO → Claude reviews and moves on.

See `apps/server/CLAUDE.md` and `apps/client/CLAUDE.md` for app-specific file maps and decisions.
