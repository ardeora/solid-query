import { AiFillYoutube } from "solid-icons/ai";
import { HiSolidArrowSmUp } from "solid-icons/hi";
import { RiSystemLoader4Fill } from "solid-icons/ri";
import { Show } from "solid-js";
import { createQuery } from "../../src";
import Stats from "./Stats";

const ChipotleStats = () => {
  const query = createQuery<{ data: string }>(
    () => ["chipotle"],
    async () => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve({ data: "2,152",});
        }, 1250);
      }) as Promise<{ data: string }>;
    }
  );

  return (
    <div class="bg-gray-100 relative shadow rounded p-4 mb-4">
      <Show
        when={query.data}
      >
        <Stats
          label="Burrito Bowls"
          value={query.data!.data}
          trend="up"
          change={3}
          icon={<img class="h-12" src="https://upload.wikimedia.org/wikipedia/en/thumb/3/3b/Chipotle_Mexican_Grill_logo.svg/800px-Chipotle_Mexican_Grill_logo.svg.png"></img>}
        />
      </Show>
    </div>
  );
};

export default ChipotleStats;
