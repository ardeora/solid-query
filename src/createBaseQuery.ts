import { QueryObserver } from '@tanstack/query-core'
import type { QueryKey, QueryObserverResult } from '@tanstack/query-core'
import { CreateBaseQueryOptions } from './types'
import { useQueryClient } from './QueryClientProvider'
import {
  onMount,
  onCleanup,
  createComputed,
  createResource,
  on
} from 'solid-js'
import { createStore } from 'solid-js/store'

// Base Query Function that is used to create the query.
export function createBaseQuery<
  TQueryFnData,
  TError,
  TData,
  TQueryData,
  TQueryKey extends QueryKey,
>(
  options: CreateBaseQueryOptions<
    TQueryFnData,
    TError,
    TData,
    TQueryData,
    TQueryKey
  >,
  Observer: typeof QueryObserver,
): QueryObserverResult<TData, TError> {
  const queryClient = useQueryClient()

  const defaultedOptions = queryClient.defaultQueryOptions(options)
  defaultedOptions._optimisticResults = 'optimistic'
  const observer = new Observer(queryClient, defaultedOptions)

  const [state, setState] = createStore<QueryObserverResult<TData, TError>>(
    // @ts-ignore
    observer.getOptimisticResult(defaultedOptions),
  )

  const [dataResource, { refetch }] = createResource<TData | undefined>((_, info) => {
    return new Promise((resolve) => {
      // ?? What is happening here?? I have NO IDEA WHY INFO PUTS
      // THE DATA IN the refetching property instead of the value property
      const { refetching } = info as { refetching: false | QueryObserverResult<TData, TError>}
      if (refetching) {
        if (refetching.isSuccess) resolve(refetching.data)
        if (refetching.isError && !refetching.isFetching) {
          throw refetching.error
        }
      }
    })
  })

  const unsubscribe = observer.subscribe((result) => {  
    refetch(result)
  })

  onCleanup(() => unsubscribe())

  onMount(() => {
    observer.setOptions(defaultedOptions, { listeners: false })
  })

  createComputed(() => {
    const newDefaultedOptions = queryClient.defaultQueryOptions(options)
    observer.setOptions(newDefaultedOptions)
  })

  createComputed(on(() => dataResource.state, () => {
    const trackStates = ['pending', 'ready', 'errored'];
    if(trackStates.includes(dataResource.state)) {
      setState(observer.getCurrentResult())
    }
  }))

  const handler = {
    get(
      target: QueryObserverResult<TData, TError>,
      prop: keyof QueryObserverResult<TData, TError>,
    ): any {
      if (prop === 'data') {
        return dataResource()
      }
      return Reflect.get(target, prop)
    },
  }

  return new Proxy(state, handler) as QueryObserverResult<TData, TError>
}