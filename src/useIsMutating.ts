import {
  notifyManager,
  MutationKey,
  MutationFilters,
  parseMutationFilterArgs,
} from '@tanstack/query-core'
import { ContextOptions } from './types'
import { useQueryClient } from './QueryClientProvider'

interface Options extends ContextOptions {}

export function useIsMutating(
  filters?: MutationFilters,
  options?: Options,
): number
export function useIsMutating(
  mutationKey?: MutationKey,
  filters?: Omit<MutationFilters, 'mutationKey'>,
  options?: Options,
): number
export function useIsMutating(
  arg1?: MutationKey | MutationFilters,
  arg2?: Omit<MutationFilters, 'mutationKey'> | Options,
  arg3?: Options,
): number {
  const [filters, options = {}] = parseMutationFilterArgs(arg1, arg2, arg3)

  const queryClient = useQueryClient({ context: options.context })
  const mutationCache = queryClient.getMutationCache()

  return 1
}