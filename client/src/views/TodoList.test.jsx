import { render } from "@testing-library/react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { describe, expect, test } from "vitest";
import MockStore from "../utils/MockStore";
import { store } from "../stores";
import { setItems } from "../stores/Todo/todoSlice";
import TodoList from "./TodoList";
import data from "../../data/db.json";

const MockTodoList = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setItems(data.todo));
  }, []);

  return <TodoList />;
};

const Wrapper = () => {
  return (
    <MockStore store={store}>
      <MockTodoList />
    </MockStore>
  );
};

describe("TodoList Component", () => {
  test("length of elements and items should be same", () => {
    render(<Wrapper />);

    const listElement = document.querySelector(".list-container");

    expect(listElement.childElementCount).toBe(data.todo.length);
  });
});
