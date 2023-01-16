import React from "react";

const TodoLabelItem = ({ title, color }) => {
  console.log("first");
  return (
    <div className="label-item">
      <span
        data-testid="circle-label"
        className="label-item-color"
        style={{ backgroundColor: color }}
      ></span>
      <p className="label-item-text">{title}</p>
    </div>
  );
};

export default TodoLabelItem;
