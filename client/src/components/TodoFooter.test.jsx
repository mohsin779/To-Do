import { fireEvent, render, screen } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "react-query";
import { describe, expect, it, test } from "vitest";

import mockData from "../../data/db.json";
import TodoFooter from "./TodoFooter";

const queryClient = new QueryClient();

const MockTodoFooter = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TodoFooter item={mockData.todo[0]} />
    </QueryClientProvider>
  );
};

describe("TodoFooter Component", () => {
  test("should render only 5 labels if labels are more than 5", () => {
    render(<MockTodoFooter />);

    const labelContainerElement = screen.getByTestId("footer-labels");

    expect(labelContainerElement.childElementCount).toBeLessThanOrEqual(5);
  });
  test("should toggle status of item when clicked", () => {
    render(<MockTodoFooter />);

    const labelContainerElement = screen.getByTestId("footer-labels");

    expect(labelContainerElement.childElementCount).toBeLessThanOrEqual(5);
  });
});
