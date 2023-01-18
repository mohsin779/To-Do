import React, { useEffect } from "react";
import { useQuery } from "react-query";
import todoApi from "../api/todo";
import TodoDescription from "../components/TodoDescription";
import TodoFooter from "../components/TodoFooter";
import TodoHeader from "../components/TodoHeader";

import { useDispatch, useSelector } from "react-redux";

const TodoDetails = () => {
  const item = useSelector(state => state.todo.selectedItem);

  return (
    <section className="details">
      <>
        <TodoHeader item={item} />
        <div className="img-container">
          {item.image ? <img src={item.image} /> : null}
        </div>
        <TodoDescription
          description={item.description}
          style={{
            textOverflow: "unset",
            whiteSpace: "normal",
            flex: 1,
            overflowY: "scroll",
          }}
        />
      </>
    </section>
  );
};

export default TodoDetails;
