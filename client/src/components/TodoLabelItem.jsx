import React from "react";
import { useMutation } from "react-query";
import todoApi from "../api/todo";

const TodoLabelItem = ({
  id,
  title,
  color,
  selected,
  refetch,
  onClick,
  deleteable,
}) => {
  const mutation = useMutation({
    mutationFn: labelId => {
      return todoApi.deleteLabel(labelId);
    },
    onSuccess: data => {
      refetch();
    },
  });

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
      {deleteable ? (
        <div>
          <span
            onClick={e => {
              e.stopPropagation();
              mutation.mutate(id);
            }}
            className="close del-label"
          >
            &times;
          </span>
        </div>
      ) : null}
    </div>
  );
};

export default TodoLabelItem;
