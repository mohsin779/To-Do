import * as yup from "yup";

export const todoSchema = yup.object().shape({
  title: yup.string().required(),
  description: yup.string().required(),
  image: yup.mixed().test("required", "Please select an image", value => {
    return value && value.length;
  }),

  labels: yup.mixed(),
  // labels: yup.array().min(1).required().test()
  // labels: yup.boolean().oneOf([true, false], "H").default(false).required(),

  // labels: yup.array().min(1).required("Please select a label"),
});
export const labelSchema = yup.object().shape({
  title: yup.string().required(),
  color: yup.string().required(),
});
