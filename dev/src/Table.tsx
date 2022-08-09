import { createQuery } from '../../src';
import { createSignal, For, createEffect } from 'solid-js';
import { CgSpinner } from 'solid-icons/cg';
import { IoSyncCircleOutline } from 'solid-icons/io';

interface TableData {
  name: string;
  city: string;
  company: string;
  title: string;
  id: string;
}

function timeout(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export const Table = () => {
  const [page, setPage] = createSignal(1);

  const query = createQuery(
    () => ['users', page()],
    async ({ queryKey }) => {
      const [id, pageNo] = queryKey;
      await timeout(750);
      const results = await fetch(
        `https://62b01cd2b0a980a2ef4a699c.mockapi.io/v1/test?page=${pageNo}&limit=10`
      ).then((d) => d.json());
      console.log(results);
      return results as TableData[];
    }, {
      refetchInterval: 5000
    }
  );

  createEffect(() => {
    console.log('Query Data', query.data, query.isLoading, query.isFetching);
  });

  return (
    <div class="px-4 sm:px-6 lg:px-8 mx-auto">
      <div class="mt-8 flex flex-col">
        <div class="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div class="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <div class="min-h-[578px] overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
              <table class="min-w-full divide-y divide-gray-300">
                <thead class="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                    >
                      Name
                    </th>
                    <th
                      scope="col"
                      class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Company
                    </th>
                    <th
                      scope="col"
                      class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Title
                    </th>
                    <th
                      scope="col"
                      class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      City
                    </th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-gray-200 bg-white">
                  <For each={query.data}>
                    {(person) => (
                      <tr>
                        <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                          {person.name}
                        </td>
                        <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {person.company}
                        </td>
                        <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {person.title}
                        </td>
                        <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {person.city}
                        </td>
                      </tr>
                    )}
                  </For>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <div class="mt-4 gap-2 flex">
        <button
          type="button"
          class="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-500 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
          onClick={() => setPage((p) => (p <= 1 ? 1 : p - 1))}
        >
          Previous
        </button>
        <button
          type="button"
          class="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-500 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto disabled:bg-indigo-300"
          onClick={() => setPage((p) => (p >= 10 ? 10 : p + 1))}
        >
          Next
        </button>
        <span class="flex items-center mr-1 text-gray-500">
          {query.isLoading ? <>Initial Loading</> : null}
          {!query.isPreviousData && query.isFetching && !query.isLoading ? (
            <>
              Background Refresh &nbsp;{' '}
              <IoSyncCircleOutline class="animate-spin" size={20} />
            </>
          ) : null}
        </span>
        <div class="flex-1 flex text-sm items-center justify-center">
          {query.isLoading ? (
            <CgSpinner class="animate-spin" size={24} />
          ) : null}
        </div>

        <span class="flex items-center text-gray-500">{page()} / 10</span>
      </div>
    </div>
  );
};
