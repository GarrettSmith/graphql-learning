# apps/client — agent context

> For commands and environment setup see [README.md](README.md).

Next.js 15 App Router frontend. Apollo Client 4, graphql-codegen client preset, Tailwind, Virtuoso, Sonner.

## Key files

| File | Role |
|------|------|
| `lib/apollo-client.ts` | RSC Apollo client — `getClient()` and `query()` for Server Components |
| `components/ApolloWrapper.tsx` | Client boundary — `ApolloNextAppProvider` + `makeClient` + `ErrorLink` |
| `app/layout.tsx` | Root layout — mounts `ApolloWrapper` and `Toaster` |
| `app/page.tsx` | Home page — `BookList` + `AddBook` |
| `app/books/[id]/page.tsx` | Book detail page — Client Component, fetches by ID, handles `NOT_FOUND` |
| `components/BookList.tsx` | Paginated, filterable, virtualized book list |
| `components/BookListItem.tsx` | Single book row — defines and owns its GraphQL fragment |
| `components/AddBook.tsx` | Mutation form — evicts cache on success |
| `hooks/useDebounce.ts` | Debounce hook for search input |
| `lib/__generated__/` | Auto-generated types and typed `graphql()` tag — never edit manually |
| `codegen.ts` | graphql-codegen config — introspects `http://localhost:4000` |
| `next.config.ts` | Rewrites `/api/graphql` → `http://localhost:4000` |

## Apollo client architecture

Two clients coexist intentionally:

**RSC client (`lib/apollo-client.ts`)** — uses `registerApolloClient` which wraps the factory in `React.cache()` for per-request isolation. Prevents cache bleed between concurrent SSR requests. Use `getClient()` or `query()` in Server Components.

**Client client (`ApolloWrapper.tsx`)** — `ApolloNextAppProvider` + `makeClient` factory, browser singleton. Targets `/api/graphql` (relative URL → Next.js rewrite → avoids CORS). Includes `ErrorLink` that pipes all GraphQL errors to Sonner toasts.

Must import `ApolloClient` from `@apollo/client-integration-nextjs`, not `@apollo/client` — the base package's types are incompatible with `ApolloNextAppProvider`.

## Cache policies

`books` field uses `keyArgs: ["filter"]` — each distinct filter value gets its own cache bucket. Without this, changing the search term would merge results from different queries into a corrupted list.

The `merge` function deduplicates incoming edges by cursor before appending. This makes `fetchMore` idempotent — re-fetching a page that's already cached won't produce duplicates.

## Key decisions

**Fragment colocation** — `BookListItem` defines `BOOK_LIST_ITEM_FIELDS` and exports it. `BookList` spreads it in `GET_BOOKS`. Data requirements live next to the component that uses them, not scattered across parent queries. Fragment masking enforces this at the type level.

**Cache eviction after mutation** — `AddBook` calls `cache.evict({ fieldName: "books" }) + cache.gc()` rather than `refetchQueries`. This invalidates all `books` cache entries regardless of filter/cursor combination, and Apollo re-fetches lazily on next read. `refetchQueries` would fire an immediate redundant request.

**Virtuoso for the list** — 200 books is manageable but renders poorly in a plain list. Virtuoso renders only visible rows. `endReached` callback drives infinite scroll naturally.

**Debounced filter** — 200ms debounce on the search input before passing `filter` to the query. Without this, every keystroke fires a new network request.

**`/api/graphql` rewrite** — Client Components use a relative URL so the same code works in dev and prod. Without the rewrite, the browser would hit `localhost:4000` directly which fails in non-dev environments and causes CORS issues.

## Anti-patterns

- Don't edit `lib/__generated__/` — overwritten by codegen.
- Don't use the raw `gql` tag — use the typed `graphql()` tag from `lib/__generated__` to keep types in sync.
- Don't run codegen without the server running.
