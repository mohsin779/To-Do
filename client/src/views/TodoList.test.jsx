import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { useEffect } from "react";
import { useSelector } from "react-redux";

import { describe, expect, test } from "vitest";
import { store } from "../stores";
import { setSelectedItem } from "../stores/Todo/todoSlice";
import TodoForm from "../views/TodoForm";
import DropdownMenu from "./DropdownMenu";
import MockStore from "./MockStore";
import TodoList from "./TodoList";

const mockItems = [];

const Wrapper = () => {
  return (
    <MockStore store={store}>
      <TodoList />
    </MockStore>
  );
};

describe("TodoList Component", () => {
  test("should be ", () => {
    render(<Wrapper />);
    // const listElements=screen.
    const dropdownElement = screen.getByTestId("ddm");
    expect(dropdownElement).toBeVisible();
  });
});
