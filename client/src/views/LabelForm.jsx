import React from "react";

import { useForm } from "react-hook-form";

import { yupResolver } from "@hookform/resolvers/yup";

import { labelSchema } from "../validations/TodoValidation";

import Error from "../components/Error";
import { useMutation } from "react-query";

import todoApi from "../api/todo";

import { useDispatch } from "react-redux";
import { ActivityIndicator, Center } from "../components";
import { actions } from "../stores";

const LabelForm = () => {
  const { toggleLabelForm } = actions;
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(labelSchema),
  });

  const addLabelMutation = useMutation({
    mutationFn: formData => {
      return todoApi.addLabel(formData);
    },
    onSuccess: data => {
      closeForm();
    },
  });

  const formInputs = [
    {
      placeholder: "Title",
      name: "title",
      type: "text",
      defVal: "",
    },
    {
      placeholder: "Color",
      name: "color",
      type: "color",
      defVal: "",
    },
  ];

  const closeForm = () => {
    dispatch(toggleLabelForm());
  };

  const onSubmit = async data => {
    addLabelMutation.mutate({ title: data.title, color: data.color });
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit(onSubmit)}>
        {addLabelMutation.isLoading ? (
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
                {inputItem.type === "color" ? (
                  <div className="color-container">
                    <label htmlFor={inputItem.name}>Color:</label>
                    <input
                      id={inputItem.name}
                      defaultValue={inputItem.defVal}
                      className={`color-picker ${
                        !errors[inputItem.name] ? "" : "error-msg"
                      }`}
                      type={inputItem.type}
                      {...register(inputItem.name)}
                      placeholder={inputItem.placeholder}
                    />
                  </div>
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

        <input
          disabled={addLabelMutation.isLoading}
          className="btn-primary"
          type="submit"
          value={"Add Label"}
        />
      </form>
    </div>
  );
};

export default LabelForm;
