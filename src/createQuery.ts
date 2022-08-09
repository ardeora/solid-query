import { QueryObserver } from 'react-query/core'
import type { QueryFunction, QueryKey, QueryObserverResult } from 'react-query/lib/core/types'


import {  CreateQueryOptions, CreateQueryResult, SolidQueryKey } from './types'
import { mergeProps, createComputed } from 'solid-js'
import { createStore, reconcile } from 'solid-js/store';
import { parseQueryArgs } from './utils'
import { createBaseQuery } from './createBaseQuery';

// export function createQuery<
//   TQueryFnData = unknown,
//   TError = unknown,
//   TData = TQueryFnData,
//   TQueryKey extends QueryKey = QueryKey
// >(
//   options: CreateQueryOptions<TQueryFnData, TError, TData, TQueryKey>
// ): CreateQueryResult<TData, TError>
// export function createQuery<
//   TQueryFnData = unknown,
//   TError = unknown,
//   TData = TQueryFnData,
//   TQueryKey extends QueryKey = QueryKey
// >(
//   queryKey: SolidQueryKey,
//   options?: Omit<
//     CreateQueryOptions<TQueryFnData, TError, TData, TQueryKey>,
//     'queryKey'
//   >
// ): CreateQueryResult<TData, TError>
export function createQuery<
  TQueryFnData = unknown,
  TError = unknown,
  TData = TQueryFnData,
  TQueryKey extends () => readonly unknown[] = SolidQueryKey
>(
  queryKey: TQueryKey,
  queryFn: QueryFunction<TQueryFnData, ReturnType<TQueryKey>>,
  options?: Omit<
    CreateQueryOptions<TQueryFnData, TError, TData, TQueryKey>,
    'queryKey' | 'queryFn'
  >
): CreateQueryResult<TData, TError>
export function createQuery<
  TQueryFnData,
  TError,
  TData = TQueryFnData,
  TQueryKey extends () => readonly unknown[] = SolidQueryKey
>(
  arg1: TQueryKey | CreateQueryOptions<TQueryFnData, TError, TData, TQueryKey>,
  arg2?:
    | QueryFunction<TQueryFnData, ReturnType<TQueryKey>>
    | CreateQueryOptions<TQueryFnData, TError, TData, TQueryKey>,
  arg3?: CreateQueryOptions<TQueryFnData, TError, TData, TQueryKey>
): CreateQueryResult<TData, TError> {
  const [parsedOptions, setParsedOptions] = createStore(parseQueryArgs(arg1, arg2, arg3))

  createComputed(() => {
    const newParsedOptions = parseQueryArgs(arg1, arg2, arg3)
    setParsedOptions(newParsedOptions)
  })

  return createBaseQuery(parsedOptions, QueryObserver);
}
