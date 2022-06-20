
import {  CreateQueryOptions, CreateQueryResult, SolidQueryKey } from './types'
import { QueryFunction, QueryKey, QueryOptions, QueryObserverOptions, QueryObserverResult } from 'react-query/lib/core/types'

export function isQueryKey(value: unknown): value is SolidQueryKey {
  return (Array.isArray(value) || typeof value === 'function') 
}

export function parseQueryArgs<
  TOptions extends CreateQueryOptions<any, any, any, TQueryKey>,
  TQueryKey extends QueryKey = QueryKey
>(
  arg1: SolidQueryKey | TOptions,
  arg2?: QueryFunction<any, TQueryKey> | TOptions,
  arg3?: TOptions
): TOptions {
  if(!isQueryKey(arg1)) {
    return arg1 as TOptions
  }

  if (typeof arg2 === 'function') {
    return { ...arg3, queryKey: arg1, queryFn: arg2 } as TOptions
  }

  return { ...arg2, queryKey: arg1 } as TOptions
}

const resolveObject = (obj: any) => {
  for (const key in obj) {
    if(typeof obj[key] === "function") {
      obj[key] = obj[key]()
    } else if (typeof obj[key] === "object") {
      resolveObject(obj[key])
    } else {
      obj[key] = obj[key]
    }
  }
  return obj
}

const deepCloneObject = (obj: any) => {
  let clone: any = {}

  for (const key in obj) {
    if (typeof obj[key] === "object") {
      if(Array.isArray(obj[key])) {
        clone[key] = deepCloneArray(obj[key])
      } else {
        clone[key] = deepCloneObject(obj[key])
      }
    } else {
      clone[key] = obj[key]
    }
  }

  return clone
}

const deepCloneArray = (arr: any[]): any[] => {
  return arr.map(item => {
    if(typeof item === "object") {
      if(Array.isArray(item)) {
        return deepCloneArray(item)
      } else {
        return deepCloneObject(item)
      }
    } else {
      return item
    }
  })
}

export function normalizeOptions<
  TQueryFnData = unknown,
  TError = unknown,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = any[]
>(
  options: CreateQueryOptions<TQueryFnData, TError, TData, TQueryKey>
  ): QueryOptions<TQueryFnData, TError, TData, TQueryKey>  {

    let queryKeyArray = []
    
    if (Array.isArray(options.queryKey)) {
      const clonedArray = deepCloneArray(options.queryKey)
      queryKeyArray = resolveObject(clonedArray);
    } else if (typeof options.queryKey === 'function') {
      queryKeyArray = options.queryKey()
    } else {
      throw Error('Query Key Needs To Be of Type function/array') 
    }

    // @ts-ignore
    return { ...options, queryKey: queryKeyArray }
}