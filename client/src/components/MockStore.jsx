import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { Provider, useSelector } from "react-redux";

const queryClient = new QueryClient();

const MockStore = ({ children, store }) => {
  // const todo = useSelector(state => state.todo);

  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>{children}</Provider>
    </QueryClientProvider>
  );
};

export default MockStore;
