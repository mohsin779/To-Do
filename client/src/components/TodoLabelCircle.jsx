import React from "react";

const TodoLabelCircle = ({ color }) => {
  return (
    <span
      data-testid="circle"
      className="label-item-circle"
      style={{ backgroundColor: color ? color : "transparent" }}
    ></span>
  );
};

export default TodoLabelCircle;
