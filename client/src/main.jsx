import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./assets/styles/index.scss";
import { Provider } from "react-redux";

import { QueryClientProvider, QueryClient } from "react-query";
import { store } from "./stores";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </Provider>
  </React.StrictMode>
);
