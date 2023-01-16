import React, { useState } from "react";
import todoApi from "../api/todo";
import useRefetchItems from "../hooks/useRefetchItems";
import { useDispatch } from "react-redux";
import { setSelectedItem, toggleShowForm } from "../stores/Todo/todoSlice";

const DropdownMenu = ({ item }) => {
  const query = useRefetchItems();

  const dispatch = useDispatch();

  const onDelete = async () => {
    await todoApi.deleteTodo(item.id);
    query.refetch();
  };

  const onEdit = () => {
    dispatch(toggleShowForm());
    dispatch(setSelectedItem(item));
  };

  return (
    <>
      <div data-testid="drop-down" className="drop-down">
        <div className="drop-down-item" onClick={onEdit}>
          Edit
        </div>
        <div className="drop-down-item" onClick={onDelete}>
          Delete
        </div>
      </div>
    </>
  );
};

export default DropdownMenu;
