import { QueryClient } from "@tanstack/react-query";

/** Shared TanStack Query configuration for server state. */
export function makeQueryClient(): QueryClient {
  return new QueryClient({
    defaultOptions: {
      queries: { staleTime: 60_000, gcTime: 5 * 60_000, refetchOnWindowFocus: false, retry: 1 },
    },
  });
}
