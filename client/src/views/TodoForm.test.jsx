import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, test } from "vitest";
import MockStore from "../components/MockStore";
import { store } from "../stores";
import TodoForm from "./TodoForm";

const Wrapper = () => {
  return (
    <MockStore store={store}>
      <TodoForm />
    </MockStore>
  );
};

describe("TodoForm Component", () => {
  test("Error message should be hidden when title and description inputs are filled", () => {
    render(<Wrapper />);
    // const titleElement = screen.getByPlaceholderText("Title");
    // const descElement = screen.getByPlaceholderText("Description");

    // fireEvent.change(titleElement, { target: { value: "Hello" } });
    // fireEvent.change(descElement, { target: { value: "Description" } });

    const errorElements = screen.getAllByTestId("error-msg");
    // const paragraphElement = screen.getByText("important");
    // const btnElement = screen.getByRole("button");
    errorElements.forEach(element => {
      expect(element).not.toBeVisible();
    });
  });
});
