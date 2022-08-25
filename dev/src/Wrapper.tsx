


import { Component, ErrorBoundary, Suspense } from "solid-js";
import { Loader } from "./App";
import TwitterStats from "./TwitterStats";
import YoutubeStats from "./YoutubeStats";
import InstagramStats from "./InstagramStats";
import ChipotleStats from "./ChipotleStats";

const App: Component = () => {
  return (
    <div>
        <ErrorBoundary fallback={(err, reset) => {
          return <button onClick={() => reset()}>Failed {err.message}</button>
        }}>
          <Suspense fallback={<Loader />}>
            <TwitterStats />          
            <YoutubeStats />
            <ChipotleStats />
            <InstagramStats />
          </Suspense>
        </ErrorBoundary>
    </div>
  );
};

export default App;
