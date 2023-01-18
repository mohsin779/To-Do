import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { Provider, useSelector } from "react-redux";

const queryClient = new QueryClient();

const MockStore = ({ children, store }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>{children}</Provider>
    </QueryClientProvider>
  );
};

export default MockStore;
