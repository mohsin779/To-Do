import React from "react";

const TodoLabelItem = ({ title, color, selected, onClick }) => {
  return (
    <div
      onClick={onClick}
      className={`label-item ${selected ? "label-item-active" : ""}`}
    >
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
