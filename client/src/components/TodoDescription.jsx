import React from "react";

const TodoDescription = props => {
  return (
    <div className="description-container">
      <p className="todo-description" {...props}>
        {props.description}
      </p>
    </div>
  );
};

export default TodoDescription;
