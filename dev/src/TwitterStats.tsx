import { AiOutlineTwitter } from "solid-icons/ai";
import { HiSolidArrowSmDown } from "solid-icons/hi";
import { RiSystemLoader4Fill } from "solid-icons/ri";
import { Show } from "solid-js";
import { createQuery } from "../../src";
import Stats from "./Stats";

const TwitterStats = () => {
  const query = createQuery<{ data: string }>(
    () => ["twitter"],
    async () => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve({ data: "71,897",});
        }, 1000);
      }) as Promise<{ data: string }>;
    }
  );
{/* <AiOutlineTwitter class="h-14 w-14" color="#1DA1F2" /> */}
  return (
    <div class="bg-gray-100 relative shadow rounded p-4 mb-4">
      <Show when={query.data}>
        <Stats
          label="Followers"
          value={query.data!.data}
          trend="down"
          change={123}
          icon={<AiOutlineTwitter class="h-14 w-14" color="#1DA1F2" />}
        />
      </Show>
    </div>
  );
};

export default TwitterStats;
