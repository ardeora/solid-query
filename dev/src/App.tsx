import { Component, createSignal, Show, Suspense } from "solid-js";
import { RiSystemLoader4Fill } from "solid-icons/ri";
import { Table } from "./Table";
import TwitterStats from "./TwitterStats";
import YoutubeStats from "./YoutubeStats";
import InstagramStats from "./InstagramStats";
import ChipotleStats from "./ChipotleStats";

import Wrapper from "./Wrapper";

export const Loader = () => {
  return (
    <div class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
      <RiSystemLoader4Fill class="h-10 w-10 text-gray-500 animate-spin" />
    </div>
  );
};

const App: Component = () => {
  const [count, setCount] = createSignal(0);

  const interval = setInterval(() => {
    setCount((c) => c + 1);
  });

  return (
    <div class="h-screen flex items-center justify-center">
      <div class="bg-gray-200 shadow relative min-w-[24rem] p-4 min-h-[36rem] rounded-md">
        <h1 class="text-gray-600 mb-4 font-medium text-xl">Dashboard</h1>
        <Show when={count() > 150}>
          <Wrapper />
        </Show>
      </div>
    </div>
  );
};

export default App;
