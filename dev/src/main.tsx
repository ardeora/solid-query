/* @refresh reload */
import { render } from "solid-js/web";

import { QueryClient, QueryClientProvider } from "../../src";

import "./index.css";
import App from "./App";

const client = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

render(
  () => (
    <QueryClientProvider client={client}>
      <App />
    </QueryClientProvider>
  ),
  document.getElementById("root") as HTMLElement,
);
