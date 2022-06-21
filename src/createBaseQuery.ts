import { QueryObserver } from 'react-query/core'
import type { QueryKey, QueryObserverResult } from 'react-query/lib/core/types'
import {  CreateBaseQueryOptions } from './types'
import { useQueryClient } from "./QueryClientProvider";
import { onMount, onCleanup, createComputed } from 'solid-js';
import { createStore } from 'solid-js/store';

export function createBaseQuery<
  TQueryFnData,
  TError,
  TData,
  TQueryData,
  TQueryKey extends QueryKey
>(
  options: CreateBaseQueryOptions<
    TQueryFnData,
    TError,
    TData,
    TQueryData,
    TQueryKey
  >,
  Observer: typeof QueryObserver
): QueryObserverResult<TData, TError> {

  const queryClient = useQueryClient();

  const defaultedOptions = queryClient.defaultQueryOptions(options)
  defaultedOptions._optimisticResults = 'optimistic';
  const observer = new QueryObserver(queryClient, defaultedOptions);

  const [state, setState] = createStore<QueryObserverResult<TData, TError>>(
    // @ts-ignore
    observer.getOptimisticResult(defaultedOptions),
  );

  observer.updateResult();

  const unsubscribe = observer.subscribe((result) => {
    const reconciledResult = result;
    // @ts-ignore
    setState(reconciledResult);
  });

  onCleanup(() => unsubscribe());

  onMount(() => {
    // Do not notify on updates because of changes in the options because
    // these changes should already be reflected in the optimistic result.
    observer.setOptions(defaultedOptions, { listeners: false });
  });

  createComputed(() => {
    const defaultedOptions = queryClient.defaultQueryOptions(options)
    observer.setOptions(defaultedOptions)
  })

  return state;
}