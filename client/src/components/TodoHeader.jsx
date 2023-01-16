import React from "react";
import DropdownMenu from "./DropdownMenu";
import DotsIcon from "./icons/DotsIcon";

const TodoHeader = ({ title, id }) => {
  return (
    <div className="todo-header">
      <h3 className="todo-title">{title}</h3>
      <div className="drop-down-container">
        <button className="menu-btn">
          <DotsIcon />
        </button>
        <DropdownMenu id={id} />
      </div>
    </div>
  );
};

export default TodoHeader;
