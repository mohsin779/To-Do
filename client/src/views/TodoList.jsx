import React from "react";

import TodoItem from "../components/TodoItem";

import { useDispatch, useSelector } from "react-redux";
import { actions } from "../stores";

const TodoList = () => {
  const { setSelectedItem } = actions;

  const dispatch = useDispatch();
  const items = useSelector(state => state.todo.filteredItems);

  return (
    <section className="list-container">
      {items.map(todo => (
        <div
          data-testid="list-item"
          key={todo._id}
          onClick={() => {
            dispatch(setSelectedItem(todo));
          }}
        >
          <TodoItem todo={todo} />
        </div>
      ))}
    </section>
  );
};

export default TodoList;
