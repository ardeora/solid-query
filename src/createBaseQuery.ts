import { QueryObserver } from "@tanstack/query-core";
import type { QueryKey, QueryObserverResult } from "@tanstack/query-core";
import { CreateBaseQueryOptions } from "./types";
import { useQueryClient } from "./QueryClientProvider";
import { onMount, onCleanup, createComputed, createResource, on } from "solid-js";
import { createStore } from "solid-js/store";
import { shouldThrowError } from "./utils";

// Base Query Function that is used to create the query.
export function createBaseQuery<
  TQueryFnData,
  TError,
  TData,
  TQueryData,
  TQueryKey extends QueryKey,
>(
  options: CreateBaseQueryOptions<TQueryFnData, TError, TData, TQueryData, TQueryKey>,
  Observer: typeof QueryObserver,
): QueryObserverResult<TData, TError> {
  const queryClient = useQueryClient({ context: options.context });

  const defaultedOptions = queryClient.defaultQueryOptions(options);
  defaultedOptions._optimisticResults = "optimistic";
  const observer = new Observer(queryClient, defaultedOptions);

  const [state, setState] = createStore<QueryObserverResult<TData, TError>>(
    // @ts-ignore
    observer.getOptimisticResult(defaultedOptions),
  );

  console.log(state)

  const [dataResource, { refetch }] = createResource<TData | undefined>((_, info) => {
    const { refetching } = info as { refetching: false | QueryObserverResult<TData, TError> };

    if (!refetching && state.data) return state.data;

    return new Promise((resolve) => {
      if (refetching) {
        if (!(refetching.isFetching && refetching.isLoading)) { 
          resolve(refetching.data);
        }
      }
    });
  });

  const unsubscribe = observer.subscribe((result) => {
    console.log("result", result);
    if(result.isLoading && result.isFetching) {
      setState(result);
    }
    refetch(result);
  });

  onCleanup(() => unsubscribe());

  onMount(() => {
    observer.setOptions(defaultedOptions, { listeners: false });
  });

  createComputed(() => {
    const newDefaultedOptions = queryClient.defaultQueryOptions(options);
    observer.setOptions(newDefaultedOptions);
  });

  createComputed(
    on(
      () => dataResource.state,
      () => {
        const trackStates = ["pending", "ready", "errored"];
        if (trackStates.includes(dataResource.state)) {
          const currentState = observer.getCurrentResult();
          setState(currentState);
          if ( 
            currentState.isError && 
            !currentState.isFetching &&
            shouldThrowError(
              observer.options.useErrorBoundary,
              [
                currentState.error,
                observer.getCurrentQuery(),
              ]
            ) 
          ) {
            throw currentState.error;
          }
        }
      },
    ),
  );

  const handler = {
    get(
      target: QueryObserverResult<TData, TError>,
      prop: keyof QueryObserverResult<TData, TError>,
    ): any {
      if (prop === "data") {
        console.log(state.isLoading, state.isFetching, dataResource())
        if (state.isLoading && state.isFetching && dataResource()) {
          return undefined;
        }

        return dataResource();
      }
      return Reflect.get(target, prop);
    },
  };

  return new Proxy(state, handler) as QueryObserverResult<TData, TError>;
}
