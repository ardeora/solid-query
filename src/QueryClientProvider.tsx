import type { QueryClient } from "react-query/lib/core";
import { Component, createContext, useContext } from "solid-js";

export const QueryClientContext = createContext<QueryClient>();

interface Props {
  client: QueryClient;
  children?: Element;
}

export const QueryClientProvider: Component<Props> = (props) => {
  if (!props.client) {
    throw new Error("No queryClient found.");
  }
  return (
    <QueryClientContext.Provider value={props.client}>
      {props.children}
    </QueryClientContext.Provider>
  );
};

export const useQueryClient = () => {
  return useContext(QueryClientContext);
};
