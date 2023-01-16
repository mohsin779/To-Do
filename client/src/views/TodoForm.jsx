import React, { useEffect, useRef, useState } from "react";
import client from "../api/client";

import { useForm } from "react-hook-form";

import { yupResolver } from "@hookform/resolvers/yup";

import { todoSchema } from "../validations/TodoValidation";

import Error from "../components/Error";
import { useMutation, useQuery } from "react-query";
import CloseIcon from "../components/icons/CloseIcon";
import TodoLabelCircle from "../components/TodoLabelCircle";
import CheckBox from "../components/CheckBox";
import todoApi from "../api/todo";

const TodoForm = ({ setShowAddTodo }) => {
  const [labels, setLabels] = useState([]);

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

  const query = useQuery("GET_ALL_LABELS", () => todoApi.getLabels());

  const [file, setFile] = useState({});

  const formInputs = [
    {
      placeholder: "Title",
      name: "title",
      type: "text",
    },
    {
      placeholder: "Description",
      name: "description",
      type: "textarea",
    },
  ];

  const closeForm = () => {
    setShowAddTodo(false);
  };

  const onSubmit = async data => {
    const formData = new FormData();

    formData.append("image", file);
    labels.forEach(label => {
      formData.append("labels", label);
      formData.append("labels", "");
    });
    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("status", false);

    addTodoMutation.mutate(formData);

    // for(let i=0;i<2;i++){
    //   formData.append
    // }

    for (const value of formData.values()) {
      console.log(value);
    }

    // const res = await client.post("./api/post/add-post", formData, {
    //   headers: {
    //     "Content-Type": "multipart/form-data",
    //   },
    // });

    // console.log(res.data);
  };

  useEffect(() => {
    console.log(labels, "LABELS");
  }, [labels]);

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
                    className={`input-field ${
                      !errors[inputItem.name] ? "" : "error-msg"
                    }`}
                    type={inputItem.type}
                    {...register(inputItem.name)}
                    placeholder={inputItem.placeholder}
                  />
                ) : (
                  <input
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
        <input className="btn-primary" type="submit" value="Add" />
      </form>
    </div>
  );
};

export default TodoForm;
