import React, { useEffect } from "react";
import { useQuery } from "react-query";
import todoApi from "../api/todo";
import TodoItem from "../components/TodoItem";

const TodoList = ({ items, setSelected, selected }) => {
  // if (isLoading) {
  //   return (
  //     <section className="list-container">
  //       <h3>Something Went Wrong, Please try again</h3>
  //     </section>
  //   );
  // }

  const onSelect = id => {
    setSelected(id);
  };

  return (
    <section className="list-container">
      {items.map(todo => (
        <div
          key={todo._id}
          onClick={() => {
            onSelect(todo._id);
          }}
        >
          <TodoItem
            selected={todo._id === selected ? true : false}
            todo={todo}
          />
        </div>
      ))}
    </section>
  );
};

export default TodoList;
