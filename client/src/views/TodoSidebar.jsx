import React, { useEffect } from "react";
import { useQuery } from "react-query";
import todoApi from "../api/todo";
import TodoLabelItem from "../components/TodoLabelItem";
import { useDispatch, useSelector } from "react-redux";
import {
  setItems,
  setSelectedItem,
  setSelectedLabel,
  toggleLabelForm,
  toggleShowForm,
} from "../stores/Todo/todoSlice";

const TodoSidebar = () => {
  const dispatch = useDispatch();

  const selectedLabel = useSelector(state => state.todo.selectedLabel);
  const itemsQuery = useQuery(
    ["GET_FILTETRED_ITEMS", selectedLabel],
    () => todoApi.getTodos(selectedLabel),
    {
      onSuccess: data => {
        console.log(data);
        dispatch(setItems(data));
      },
    }
  );
  const query = useQuery(["GET_ALL_LABELS"], () => todoApi.getLabels());

  const showForm = () => {
    dispatch(toggleShowForm());
    dispatch(setSelectedItem({}));
  };
  const showLabelForm = () => {
    dispatch(toggleLabelForm());
  };

  const onSelect = id => {
    dispatch(setSelectedLabel(id));
  };

  return (
    <section className="side-bar">
      <h1>todo</h1>
      <button onClick={showForm} className="btn-primary">
        Add New Task
      </button>
      <button onClick={showLabelForm} className="btn-primary btn-label">
        Add New Label
      </button>
      <div className="lbl-container">
        <TodoLabelItem
          onClick={() => {
            onSelect(null);
          }}
          selected={selectedLabel === null}
          key={"all"}
          title={"All"}
          color={"#e0d38a"}
        />
        {query.isSuccess
          ? query.data.map(label => (
              <TodoLabelItem
                selected={selectedLabel === label._id}
                onClick={() => {
                  onSelect(label._id);
                }}
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
