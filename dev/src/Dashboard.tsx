


import { Component, ErrorBoundary, Suspense } from "solid-js";
import { Loader } from "./App";
import TwitterStats from "./TwitterStats";
import YoutubeStats from "./YoutubeStats";
import InstagramStats from "./InstagramStats";
import ChipotleStats from "./ChipotleStats";

const ErrorFallback = ({ reset } : { reset: () => void}) => {
  return (
    <div class="border-dashed border-4 flex-col gap-3 flex items-center justify-center border-red-400 h-[496px] rounded-md" >
      <div class="text-red-600">Something went wrong</div>
      <button onClick={reset} class="px-6 py-2 text-sm rounded-md bg-red-200 font-medium hover:bg-red-300/60 text-red-600">Try again</button>
    </div>
  );
}

const Dashboard: Component = () => {
  return (
    <div>
        <ErrorBoundary fallback={(err, reset) =>  <ErrorFallback reset={reset} />}>
          <Suspense fallback={<Loader />}>
            <TwitterStats /> 
            {/* Youtube Stats Errors 50% of the time */}         
            <YoutubeStats />
            <ChipotleStats />
            <InstagramStats />
          </Suspense>
        </ErrorBoundary>
    </div>
  );
};

export default Dashboard;
