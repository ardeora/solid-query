import { QueryObserver } from 'react-query/core'
import type { QueryFunction, QueryKey, QueryObserverResult } from 'react-query/lib/core/types'


import {  CreateQueryOptions, CreateQueryResult, SolidQueryKey } from './types'
import { mergeProps, createComputed } from 'solid-js'
import { createStore, reconcile } from 'solid-js/store';
import { normalizeOptions, parseQueryArgs } from './utils'
import { createBaseQuery } from './createBaseQuery';

export function createQuery<
  TQueryFnData = unknown,
  TError = unknown,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey
>(
  options: CreateQueryOptions<TQueryFnData, TError, TData, TQueryKey>
): CreateQueryResult<TData, TError>
export function createQuery<
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
export function createQuery<
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
export function createQuery<
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
  const [normalizedOptions, setNormalizedOptions] = createStore(normalizeOptions(parsedOptions))

  createComputed(() => {
    const parsedOptions = parseQueryArgs(arg1, arg2, arg3)
    const normalizedOptions = normalizeOptions(parsedOptions)

    setNormalizedOptions(normalizedOptions)
  })



  return createBaseQuery(normalizedOptions, QueryObserver);
}
