import { Component, createSignal, Show, Suspense } from "solid-js";
import { RiSystemLoader4Fill } from "solid-icons/ri";
import { Table } from "./Table";
import TwitterStats from "./TwitterStats";
import YoutubeStats from "./YoutubeStats";
import InstagramStats from "./InstagramStats";
import ChipotleStats from "./ChipotleStats";

import Dashboard from "./Dashboard";

import { createMutation } from "../../src/";

export const Loader = () => {
  return (
    <div class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
      <RiSystemLoader4Fill class="h-10 w-10 text-gray-500 animate-spin" />
    </div>
  );
};

export const [count, setCount] = createSignal(0);

const App: Component = () => {
  

  return (
    <div class="h-screen flex items-center justify-center">
      <div class="bg-gray-200 shadow relative min-w-[24rem] p-4 min-h-[36rem] rounded-md">
        <h1 class="text-gray-600 mb-4 font-medium text-xl">Dashboard {count()}</h1>
        <Dashboard />

        <button 
          class="bg-rose-500 text-white font-medium py-2 px-4 rounded-md"
          onClick={() => setCount(count() - 1)}
        >Back</button>
        <button 
          class="bg-purple-500 text-white font-medium py-2 px-4 rounded-md"
          onClick={() => setCount(count() + 1)}
        >Hello</button>
      </div>
    </div>
  );
};

export default App;
