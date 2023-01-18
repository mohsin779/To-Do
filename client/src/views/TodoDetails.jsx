import React from "react";

import { useSelector } from "react-redux";
import { TodoDescription, TodoHeader } from "../components";

const TodoDetails = () => {
  const item = useSelector(state => state.todo.selectedItem);

  return (
    <section className="details">
      <>
        <TodoHeader item={item} />
        <div className="img-container">
          {item.image ? <img src={item.image} /> : null}
        </div>
        <TodoDescription description={item.description} />
      </>
    </section>
  );
};

export default TodoDetails;
