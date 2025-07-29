import {
  MutationCache,
  QueryCache,
  QueryClient,
  QueryClientConfig,
} from "@tanstack/react-query";
import { toast } from "react-toastify";

function createTitle(errorMsg: string, actionType: "query" | "mutation") {
  const action = actionType === "query" ? "fetch" : "update";
  return `could not ${action} data: ${
    errorMsg ?? "error connecting to server"
  }`;
}

function errorHandler(title: string) {
  const id = "react-query-toast";

  toast.error(title, {
    toastId: id,
  });
}

export const queryClientOptions: QueryClientConfig = {
  defaultOptions: {
    queries: {
      staleTime: 600000, // 10 minutes
      gcTime: 900000, // 15 minutes
      refetchOnWindowFocus: false,
    },
  },
  queryCache: new QueryCache({
    onError: (error) => {
      const title = createTitle(error.message, "query");
      errorHandler(title);
    },
  }),
  mutationCache: new MutationCache({
    onError: (error) => {
      const title = createTitle(error.message, "mutation");
      errorHandler(title);
    },
  }),
};

export const queryClient = new QueryClient(queryClientOptions);
