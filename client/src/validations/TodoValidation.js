import * as yup from "yup";

export const todoSchema = yup.object().shape({
  title: yup.string().required(),
  description: yup.string().required(),
  // image: yup.object().shape({
  //   file: yup

  //     .object()
  //     .shape({
  //       name: yup.string(),
  //     })
  //     .required("File required"),
  // }),
  // labels: yup.array().required("Please select a label"),
});
export const labelSchema = yup.object().shape({
  title: yup.string().required(),
  color: yup.string().required(),
});
