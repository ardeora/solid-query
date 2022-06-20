import type { QueryClient } from "react-query/lib/core";
import { Component, createContext, useContext, JSX, onMount, onCleanup } from "solid-js";

export const QueryClientContext = createContext<QueryClient>();

interface Props {
  client: QueryClient;
  children: JSX.Element;
}

export const QueryClientProvider: Component<Props> = (props) => {
  if (!props.client) {
    throw new Error("No queryClient found.");
  }

  onMount(() => props.client.mount());
  onCleanup(() => props.client.unmount());

  return (
    <QueryClientContext.Provider value={props.client}>
      {props.children}
    </QueryClientContext.Provider>
  );
};

export const useQueryClient = () => {
  const queryClient = useContext(QueryClientContext)
  if (!queryClient) {
    throw new Error('No QueryClient set, use QueryClientProvider to set one');
  }
  return queryClient;
};
