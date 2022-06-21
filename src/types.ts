import type { Context, Accessor } from "solid-js";
import type { QueryClient } from 'react-query/lib/core/queryClient'
import { QueryFunction, QueryKey, QueryObserverOptions, QueryObserverResult } from 'react-query/lib/core/types'

export interface ContextOptions {
  /**
   * Use this to pass your React Query context. Otherwise, `defaultContext` will be used.
   */
  context?: Context<QueryClient | undefined>
}


export type SolidQueryKey = readonly unknown[] | (() => unknown[]);

export interface CreateBaseQueryOptions<
  TQueryFnData = unknown,
  TError = unknown,
  TData = TQueryFnData,
  TQueryData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey
> extends ContextOptions,
    QueryObserverOptions<TQueryFnData, TError, TData, TQueryData, TQueryKey> {}

export interface CreateQueryOptions<
  TQueryFnData = unknown,
  TError = unknown,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey
> extends Omit<CreateBaseQueryOptions<
    TQueryFnData,
    TError,
    TData,
    TQueryFnData,
    TQueryKey
  >, 'queryKey'> {
  queryKey?: SolidQueryKey;
}

export type CreateBaseQueryResult<
  TData = unknown,
  TError = unknown
> = QueryObserverResult<TData, TError>

export type CreateQueryResult<
  TData = unknown,
  TError = unknown
> = CreateBaseQueryResult<TData, TError>