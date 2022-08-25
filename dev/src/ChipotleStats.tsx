import { AiFillYoutube } from "solid-icons/ai";
import { HiSolidArrowSmUp } from "solid-icons/hi";
import { RiSystemLoader4Fill } from "solid-icons/ri";
import { Show } from "solid-js";
import { createQuery } from "../../src";

const ChipotleStats = () => {
  const query = createQuery<{ data: string }>(
    () => ["chipotle"],
    async () => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve({
            data: "2,152",
          });
        }, 1250);
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
            <img
              class="h-12"
              src="https://upload.wikimedia.org/wikipedia/en/thumb/3/3b/Chipotle_Mexican_Grill_logo.svg/800px-Chipotle_Mexican_Grill_logo.svg.png"
            ></img>
          </div>
          <div class="flex-1 flex flex-col">
            <div class="font-semibold text-gray-500">Burrito Bowls</div>
            <div class="flex-1 flex gap-2 items-end">
              <div class="text-3xl text-gray-700">
                {query.isSuccess && query.data.data}
              </div>
              <div class="flex ">
                <div>
                  <HiSolidArrowSmUp class="text-green-500" size={24} />
                </div>
                <div class="font-bold text-green-500">12</div>
              </div>
            </div>
          </div>
        </div>
      </Show>
    </div>
  );
};

export default ChipotleStats;
