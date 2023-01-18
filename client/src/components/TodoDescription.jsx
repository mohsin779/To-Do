import React from "react";

const TodoDescription = props => {
  return (
    <p className="todo-description" {...props}>
      {props.description}
    </p>
  );
};

export default TodoDescription;
