import { AiFillYoutube } from "solid-icons/ai";
import { Show } from "solid-js";
import { createQuery } from "../../src";
import Stats from "./Stats";

import { count, setCount } from "./App";

const YoutubeStats = () => {
  const query = createQuery<{ data: string }>(
    () => ["youtube", count()],
    async () => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          let toss = Math.random();
          if (toss > 0.05) resolve({ data: `33,581` });
          reject(new Error("Something went wrong"));
        }, 2000);
      }) as Promise<{ data: string }>;
    },
  );

  return (
    <div class="bg-gray-100 relative shadow rounded p-4 mb-4">
      {count()}
      <Show when={query.data}>
        <Stats
          label="Subscribers"
          value={query.data!.data}
          trend="up"
          change={412}
          icon={<AiFillYoutube class="h-14 w-14" color="#FF0000" />}
        />
      </Show>
    </div>
  );
};

export default YoutubeStats;
