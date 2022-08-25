import { AiFillYoutube } from "solid-icons/ai";
import { HiSolidArrowSmUp } from "solid-icons/hi";
import { RiSystemLoader4Fill } from "solid-icons/ri";
import { Show } from "solid-js";
import { createQuery } from "../../src";

const YoutubeStats = () => {
  const query = createQuery<{ data: string }>(
    () => ["youtube"],
    async () => {
      console.log('Fetchingggg')
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          let toss = Math.random()
          if (toss > 0.51) {
            resolve({
              data: `33,581`,
            });
          }
          
          reject(new Error("Something went wrong"))
        }, 2000);
      }) as Promise<{ data: string }>;
    }
  );

  return (
    <div class="bg-gray-100 relative shadow rounded p-4 mb-4">
      <div>{query.isError && 'Errooorrr'}</div>
      <Show
        when={query.data}
        fallback={
          <div class="h-16 flex items-center justify-center">
            <RiSystemLoader4Fill class="h-10 w-10 text-gray-400 animate-spin" />
          </div>
        }
      >
        <div class="h-16 flex gap-5">
          <div class="aspect-square flex items-center justify-center">
            <AiFillYoutube class="h-14 w-14" color="#FF0000" />
          </div>
          <div class="flex-1 flex flex-col">
            <div class="font-semibold text-gray-500">Subscribers</div>
            <div class="flex-1 flex gap-2 items-end">
              <div class="text-3xl text-gray-700">
                {query.isSuccess && query.data.data}
              </div>
              <div class="flex ">
                <div>
                  <HiSolidArrowSmUp class="text-green-500" size={24} />
                </div>
                <div class="font-bold text-green-500">412</div>
              </div>
            </div>
          </div>
        </div>
      </Show>
    </div>
  );
};

export default YoutubeStats;
