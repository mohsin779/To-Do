import * as yup from "yup";

export const todoSchema = yup.object().shape({
  title: yup.string().required(),
  description: yup.string().required(),
  image: yup.mixed().test("required", "Please select an image", value => {
    return value && value.length;
  }),

  labels: yup.lazy(value =>
    typeof value === "object"
      ? yup
          .mixed()
          .test("LabelArray_Test", "Please select atleast one label", value => {
            if (value.length < 1) return false;
            else return true;
          })
          .required("Required field")
          .typeError("Please select atleast one label")
      : yup
          .string()
          .test("LabelID_Test", "Please select atleast one Label", value => {
            if (value === "false" || value === "true") return false;
            else return true;
          })
          .required("Required field")
  ),
});
export const labelSchema = yup.object().shape({
  title: yup.string().required(),
  color: yup.string().required(),
});
