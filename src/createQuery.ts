import { QueryObserver } from 'react-query/lib/core/'
import type { QueryFunction, QueryKey, QueryObserverResult } from 'react-query/lib/core/types'
import { normalizeOptions, parseQueryArgs } from './utils'
// import { UseQueryOptions, UseQueryResult } from './types'
// import { useBaseQuery } from './useBaseQuery'

import {  CreateQueryOptions, CreateQueryResult, SolidQueryKey } from './types'
import { useQueryClient } from "./QueryClientProvider";
import { onMount, onCleanup, createComputed } from 'solid-js';
import { createStore, reconcile } from 'solid-js/store';
// HOOK

export function useQuery<
  TQueryFnData = unknown,
  TError = unknown,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey
>(
  options: CreateQueryOptions<TQueryFnData, TError, TData, TQueryKey>
): CreateQueryResult<TData, TError>
export function useQuery<
  TQueryFnData = unknown,
  TError = unknown,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey
>(
  queryKey: SolidQueryKey,
  options?: Omit<
    CreateQueryOptions<TQueryFnData, TError, TData, TQueryKey>,
    'queryKey'
  >
): CreateQueryResult<TData, TError>
export function useQuery<
  TQueryFnData = unknown,
  TError = unknown,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey
>(
  queryKey: SolidQueryKey,
  queryFn: QueryFunction<TQueryFnData, TQueryKey>,
  options?: Omit<
    CreateQueryOptions<TQueryFnData, TError, TData, TQueryKey>,
    'queryKey' | 'queryFn'
  >
): CreateQueryResult<TData, TError>
export function useQuery<
  TQueryFnData,
  TError,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey
>(
  arg1: SolidQueryKey | CreateQueryOptions<TQueryFnData, TError, TData, TQueryKey>,
  arg2?:
    | QueryFunction<TQueryFnData, TQueryKey>
    | CreateQueryOptions<TQueryFnData, TError, TData, TQueryKey>,
  arg3?: CreateQueryOptions<TQueryFnData, TError, TData, TQueryKey>
): CreateQueryResult<TData, TError> {
  const parsedOptions = parseQueryArgs(arg1, arg2, arg3)
  const normalizedOptions = normalizeOptions(parsedOptions)
  const queryClient = useQueryClient();

  const defaultedOptions = queryClient!.defaultQueryOptions(normalizedOptions)
  const observer = new QueryObserver(queryClient!, defaultedOptions);

  const [state, setState] = createStore<QueryObserverResult<TData, TError>>(
    // @ts-ignore
    observer.getOptimisticResult(defaultedOptions),
  );

  observer.updateResult();

  const unsubscribe = observer.subscribe((result) => {
    const reconciledResult = reconcile(result);
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
    const parsedOptions = parseQueryArgs(arg1, arg2, arg3)
    const normalizedOptions = normalizeOptions(parsedOptions)
    observer.setOptions(normalizedOptions)
  })

  return state;
}
