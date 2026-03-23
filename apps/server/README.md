# apps/server

Apollo Server 5 GraphQL API. TypeScript, ESM modules, no compile step in development (tsx/nodemon).

## Environment setup

No `.env` file needed. Server listens on port 4000 by default. No external services or database — data is in-memory.

## Commands

```bash
npm run dev      # Start with nodemon + tsx (hot reload, no compile step)
npm run build    # Compile TypeScript to dist/
npm run start    # Run compiled output from dist/
```

## Schema

The API exposes books and authors:

- `Query.books(first, after, filter)` — cursor-paginated, filterable book list
- `Query.book(id)` — single book; returns `NOT_FOUND` GraphQL error if missing
- `Query.authors` — full author list
- `Mutation.addBook(input)` — adds a book to the in-memory store

Book and Author are related: `Book.author` is resolved via DataLoader, `Author.books` is filtered from the store.
