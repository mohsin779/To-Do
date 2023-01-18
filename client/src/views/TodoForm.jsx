import React, { useEffect, useMemo, useState } from "react";

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

import Center from "../components/Wrappers/Center";
import ActivityIndicator from "../components/ActivityIndicator";

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

  useEffect(() => {
    console.log(errors);
  }, [errors]);

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
      return todoApi.editTodo(formData, selectedItem._id);
    },
    onSuccess: data => {
      closeForm();
    },
  });

  const query = useQuery("GET_ALL_LABELS", () => todoApi.getLabels());

  // const [file, setFile] = useState(() => {
  //   return selectedItem.image
  //     ? { name: selectedItem.image.split("/")[selectedItem.image.length - 1] }
  //     : {};
  // });
  const [file, setFile] = useState({});

  const [imgSrc, setImgSrc] = useState(() => {
    return selectedItem.image ? selectedItem.image : "";
  });

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
    console.log(data);
    // return;
    const formData = new FormData();

    if (selectedItem._id && !file.name) {
    } else formData.append("image", file);
    labels.forEach(label => {
      formData.append("labels", label);
    });
    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("status", false);

    if (selectedItem._id) editTodoMutation.mutate(formData);
    else addTodoMutation.mutate(formData);

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

  const selectFile = e => {
    setFile(e.target.files[0]);
    let src = URL.createObjectURL(e.target.files[0]);
    setImgSrc(src);
  };

  const disableBtn = useMemo(() => {
    return (
      addTodoMutation.isLoading ||
      editTodoMutation.isLoading ||
      labels.length === 0 ||
      file.name == undefined
    );
  }, [addTodoMutation.isLoading, editTodoMutation.isLoading, labels, file]);

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit(onSubmit)}>
        {addTodoMutation.isLoading || editTodoMutation.isLoading ? (
          <div className="loading-container">
            <Center>
              <ActivityIndicator></ActivityIndicator>
            </Center>
          </div>
        ) : null}
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
                <div className="check-container" key={labelItem._id}>
                  <CheckBox
                    register={() => register("labels")}
                    value={labelItem._id}
                    // checked={labels.find(label => label == labelItem._id)}
                    text={labelItem.title}
                    onChangeStatus={() => {
                      onSelect(labelItem._id);
                    }}
                    id={labelItem._id}
                  />
                </div>
              ))
            : null}
        </div>

        <div className="file-container">
          <input
            className="file-upload"
            type="file"
            id="image"
            accept="image/*"
            onChange={selectFile}
          />
          <label htmlFor="image">
            {file.name ? file.name : "Choose an Image"}
          </label>
          {/* {!file.name ? (
            <div className="file-upload-error">
              {<Error>Please choose an image</Error>}
            </div>
          ) : null} */}
        </div>
        <div className="img-preview">
          {imgSrc ? <img src={imgSrc} /> : null}
        </div>
        <input
          // disabled={
          //   addTodoMutation.isLoading ||
          //   editTodoMutation ||
          //   !labels.length ||
          //   !file.name
          // }
          disabled={disableBtn}
          className="btn-primary"
          type="submit"
          value={selectedItem._id ? "Edit" : "Add"}
        />
      </form>
    </div>
  );
};

export default TodoForm;
