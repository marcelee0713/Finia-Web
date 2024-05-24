import { mutate } from "swr/_internal";

export const clearCache = () =>
  mutate(() => true, undefined, { revalidate: false });
