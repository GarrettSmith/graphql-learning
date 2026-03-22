import DataLoader from "dataloader";

import { authors } from "./stores";

const getAuthorLoader = () =>
  new DataLoader(async (ids: readonly string[]) => {
    await new Promise((resolve) => setTimeout(resolve, 50));
    return ids.map((id) => authors.find((a) => a.id === id));
  });

export const context = async () => ({
  authorLoader: getAuthorLoader(),
});

export type Context = Awaited<ReturnType<typeof context>>;
