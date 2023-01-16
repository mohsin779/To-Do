import React, { useEffect, useState } from "react";

import { useForm } from "react-hook-form";

import { yupResolver } from "@hookform/resolvers/yup";

import { todoSchema } from "../validations/TodoValidation";
import ReactDOM from "react-dom/client";

import Error from "../components/Error";
import { useMutation, useQuery } from "react-query";

import CheckBox from "../components/CheckBox";
import todoApi from "../api/todo";

import { useDispatch, useSelector } from "react-redux";
import { setSelectedItem, toggleShowForm } from "../stores/Todo/todoSlice";

const TodoForm = () => {
  const dispatch = useDispatch();

  const { selectedItem } = useSelector(state => state.todo);
  const [labels, setLabels] = useState(() =>
    selectedItem.labels ? selectedItem.labels.map(lbl => lbl._id) : []
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(todoSchema),
  });

  const addTodoMutation = useMutation({
    mutationFn: formData => {
      return todoApi.addTodo(formData);
    },
    onSuccess: data => {
      closeForm();
    },
  });
  const editTodoMutation = useMutation({
    mutationFn: formData => {
      return todoApi.addTodo(formData);
    },
    onSuccess: data => {
      closeForm();
    },
  });

  const query = useQuery("GET_ALL_LABELS", () => todoApi.getLabels());

  const [file, setFile] = useState({});

  const formInputs = [
    {
      placeholder: "Title",
      name: "title",
      type: "text",
      defVal: selectedItem.title,
    },
    {
      placeholder: "Description",
      name: "description",
      type: "textarea",
      defVal: selectedItem.description,
    },
  ];

  const closeForm = () => {
    dispatch(toggleShowForm());
    dispatch(setSelectedItem({}));
  };

  const onSubmit = async data => {
    const formData = new FormData();

    if (selectedItem) formData.append("image", file);
    labels.forEach(label => {
      formData.append("labels", label);
    });
    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("status", false);

    addTodoMutation.mutate(formData);

    for (const value of formData.values()) {
      console.log(value);
    }
  };

  const onSelect = id => {
    const itemIndex = labels.findIndex(label => label === id);

    const tempLabels = [...labels];
    if (itemIndex > -1) tempLabels.slice(0, itemIndex);
    else tempLabels.push(id);

    setLabels(tempLabels);
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <span onClick={closeForm} className="close">
            &times;
          </span>
        </div>
        {formInputs.length
          ? formInputs.map(inputItem => (
              <div className="inputs-container" key={inputItem.name}>
                {inputItem.type == "textarea" ? (
                  <textarea
                    defaultValue={inputItem.defVal}
                    className={`input-field ${
                      !errors[inputItem.name] ? "" : "error-msg"
                    }`}
                    type={inputItem.type}
                    {...register(inputItem.name)}
                    placeholder={inputItem.placeholder}
                  />
                ) : (
                  <input
                    defaultValue={inputItem.defVal}
                    className={`input-field ${
                      !errors[inputItem.name] ? "" : "error-msg"
                    }`}
                    type={inputItem.type}
                    {...register(inputItem.name)}
                    placeholder={inputItem.placeholder}
                  />
                )}
                {
                  <Error>
                    {errors[inputItem.name]
                      ? inputItem.errorMsg
                        ? inputItem.errorMsg
                        : errors[inputItem.name].message
                      : " "}
                  </Error>
                }
              </div>
            ))
          : null}
        <div className="labels-container">
          <p>Labels</p>
          {query.isSuccess
            ? query.data.map(labelItem => (
                <CheckBox
                  value={labels.find(label => label === labelItem._id)}
                  checked={labels.find(label => label === labelItem._id)}
                  key={labelItem._id}
                  text={labelItem.title}
                  onChangeStatus={() => {
                    onSelect(labelItem._id);
                  }}
                  id={labelItem._id}
                />
              ))
            : null}

          {/* <TodoLabelCircle />
          <p>work</p>
          <TodoLabelCircle />
          <TodoLabelCircle />
          <TodoLabelCircle /> */}
        </div>

        <div className="file-container">
          <input
            className="file-upload"
            type="file"
            id="image"
            accept="image/*"
            onChange={e => {
              setFile(e.target.files[0]);
            }}
          />
          <label htmlFor="image">
            {file.name ? file.name : "Choose an Image"}
          </label>
          {!file.name ? (
            <div className="file-upload-error">
              {<Error>Please choose an image</Error>}
            </div>
          ) : null}
        </div>
        <input
          disabled={addTodoMutation.isLoading}
          className="btn-primary"
          type="submit"
          value={selectedItem ? "Edit" : "Add"}
        />
      </form>
    </div>
  );
};

export default TodoForm;
