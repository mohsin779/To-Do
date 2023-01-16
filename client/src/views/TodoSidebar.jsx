import React, { useEffect } from "react";
import { useQuery } from "react-query";
import todoApi from "../api/todo";
import TodoLabelItem from "../components/TodoLabelItem";

const TodoSidebar = ({ setShowAddTodo }) => {
  const query = useQuery(["getLalkmokadbels"], () => todoApi.getLabels());

  const showForm = () => {
    setShowAddTodo(true);
  };

  return (
    <section className="side-bar">
      <h1>todo</h1>
      <button onClick={showForm} className="btn-primary">
        Add New Task
      </button>
      <div>
        {query.isSuccess
          ? query.data.map(label => (
              <TodoLabelItem
                key={label.title}
                title={label.title}
                color={label.color}
              />
            ))
          : null}
      </div>
    </section>
  );
};

export default TodoSidebar;
