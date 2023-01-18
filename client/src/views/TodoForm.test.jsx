import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import MockStore from "../utils/MockStore";
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
  test("Error messages should be visible when button is clicked and fields are empty", () => {
    render(<Wrapper />);
    const errorElements = screen.getAllByTestId("error-msg");
    const btnElement = screen.getByRole("button");
    fireEvent.click(btnElement);
    errorElements.forEach(element => {
      expect(element).toBeVisible();
    });
  });
});
