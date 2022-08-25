import { AiOutlineTwitter } from "solid-icons/ai";
import { HiSolidArrowSmDown } from "solid-icons/hi";
import { RiSystemLoader4Fill } from "solid-icons/ri";
import { Show } from "solid-js";
import { createQuery } from "../../src";

const TwitterStats = () => {
  const query = createQuery<{ data: string }>(
    () => ["twitter"],
    async () => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve({
            data: "71,897",
          });
        }, 1000);
      }) as Promise<{ data: string }>;
    }
  );

  return (
    <div class="bg-gray-100 relative shadow rounded p-4 mb-4">
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
            <AiOutlineTwitter class="h-14 w-14" color="#1DA1F2" />
          </div>
          <div class="flex-1 flex flex-col">
            <div class="font-semibold text-gray-500">Followers</div>
            <div class="flex-1 flex gap-2 items-end">
              <div class="text-3xl text-gray-700">
                {query.isSuccess && query.data.data}
              </div>
              <div class="flex ">
                <div>
                  <HiSolidArrowSmDown class="text-red-500" size={24} />
                </div>
                <div class="font-bold text-red-500">123</div>
              </div>
            </div>
          </div>
        </div>
      </Show>
    </div>
  );
};

export default TwitterStats;
