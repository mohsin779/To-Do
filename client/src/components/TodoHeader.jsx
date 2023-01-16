import React from "react";
import DropdownMenu from "./DropdownMenu";
import DotsIcon from "./icons/DotsIcon";

const TodoHeader = ({ item }) => {
  return (
    <div className="todo-header">
      <h3 className="todo-title">{item.title}</h3>
      <div className="drop-down-container">
        <button className="menu-btn">
          <DotsIcon />
        </button>
        <DropdownMenu item={item} />
      </div>
    </div>
  );
};

export default TodoHeader;
