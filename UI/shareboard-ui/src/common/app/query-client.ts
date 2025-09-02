import {
  QueryClient,
  QueryClientConfig,
} from "@tanstack/react-query";


export const queryClientOptions: QueryClientConfig = {
  defaultOptions: {
    queries: {
      staleTime: 600000, // 10 minutes
      gcTime: 900000, // 15 minutes
      refetchOnWindowFocus: false,
    },
  },
};

export const queryClient = new QueryClient(queryClientOptions);
