import React, { useRef, useState } from "react";
import { useMutation } from "react-query";
import todoApi from "../api/todo";
import CheckBox from "./CheckBox";
import TodoLabelCircle from "./TodoLabelCircle";

const TodoFooter = props => {
  const { item } = props;

  const [status, setStatus] = useState(item && item.status);

  const mutation = useMutation({
    mutationFn: formData => {
      return todoApi.changeStatus(formData, item._id);
    },
    onSuccess: data => {
      setStatus(data.data.post.status);
    },
  });

  const onChangeStatus = () => {
    const formData = new FormData();

    // Mapping Item to FormData
    Object.keys(item).forEach(key => {
      if (key !== "labels") formData.append(key, item[key]);
      else {
        item[key].forEach(label => {
          formData.append(key, label._id);
        });
      }
    });
    for (const value of formData.values()) {
      console.log(value);
    }

    // Updating status to new value
    formData.set("status", !status);
    setStatus(state => !state);
    // Deleting not needed keys
    formData.delete("_id");
    formData.delete("__v");

    // Sending Request
    mutation.mutate(formData);
  };

  const labels = item && item.labels ? item.labels.slice(0, 5) : [];

  return (
    <div className="item-footer" {...props}>
      <CheckBox
        text="Mark as Done"
        register={() => {}}
        checked={status}
        onChangeStatus={onChangeStatus}
        id={item && item._id}
      />
      {/* <div className="mad-container">
        <div className="round">
          <input
            ref={checkboxRef}
            type="checkbox"
            checked={status}
            onChange={onChangeStatus}
            id={item && item._id}
          />
          <label htmlFor={item && item._id}></label>
        </div>
        <p onClick={selectCheckbox} className="mad">
          Mark as Done
        </p>
      </div> */}
      <div className="todo-labels" data-testid="footer-labels">
        {labels.map(label => (
          <TodoLabelCircle key={label.color} color={label.color} />
        ))}
      </div>
    </div>
  );
};

export default TodoFooter;
