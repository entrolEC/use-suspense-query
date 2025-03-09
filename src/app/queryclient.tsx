import { isServer, QueryClient } from '@tanstack/query-core';

function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 100,
      },
    },
  });
}

let browserQueryClient: QueryClient | undefined = undefined;

export default function getQueryClient() {
  if (isServer) {
    return makeQueryClient();
  } else {
    if (!browserQueryClient) browserQueryClient = makeQueryClient();
    return browserQueryClient;
  }
}