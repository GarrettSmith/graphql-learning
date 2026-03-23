# apps/client

Next.js 15 App Router frontend. Fetches data from the GraphQL API at `http://localhost:4000` (proxied through `/api/graphql`).

## Environment setup

No `.env` file needed. Requires the server running at `http://localhost:4000`. Codegen also requires the server running — it introspects the live schema.

## Commands

```bash
npm run dev             # Start Next.js dev server at http://localhost:3000
npm run build           # Production build
npm run start           # Serve production build
npm run lint            # Run ESLint
npm run codegen         # Generate types from live schema (server must be running)
npm run codegen:watch   # Codegen in watch mode
```

## Pages

| Route | Description |
|-------|-------------|
| `/` | Book list with search filter and infinite scroll, plus add-book form |
| `/books/[id]` | Book detail page |

## Key dependencies

| Package | Purpose |
|---------|---------|
| `@apollo/client` | GraphQL client |
| `@apollo/client-integration-nextjs` | Apollo + Next.js App Router compatibility |
| `@graphql-codegen/cli` + `client-preset` | Type-safe query/fragment generation |
| `react-virtuoso` | Virtualized list rendering |
| `sonner` | Toast notifications |
| `tailwindcss` | Styling |
