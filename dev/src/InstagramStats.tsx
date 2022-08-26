import { Show } from "solid-js";
import { createQuery } from "../../src";
import Stats from './Stats';

const InstagramStats = () => {
  const query = createQuery<{ data: string }>(
    () => ["instagram"],
    async () => {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({data: `14,581`});
        }, 2000);
      }) as Promise<{ data: string }>;
    }
  );

  return (
    <div class="bg-gray-100 relative shadow rounded p-4 mb-4">
      <Show when={query.data}>
        <Stats 
          label="Followers" 
          value={query.data!.data}  
          trend="down"
          change={6}
          icon={<img class="h-12" src="https://upload.wikimedia.org/wikipedia/commons/9/95/Instagram_logo_2022.svg"></img>}
        />
      </Show>
    </div>
  );
};

export default InstagramStats;
