import React from "react";
import todoApi from "../api/todo";

const DropdownMenu = ({ id }) => {
  const onDelete = async () => {
    await todoApi.deleteTodo(id);
  };
  const onEdit = async () => {};

  return (
    <div data-testid="drop-down" className="drop-down">
      <div className="drop-down-item" onClick={onEdit}>
        Edit
      </div>
      <div className="drop-down-item" onClick={onDelete}>
        Delete
      </div>
    </div>
  );
};

export default DropdownMenu;
