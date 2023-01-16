import * as yup from "yup";

export const todoSchema = yup.object().shape({
  title: yup.string().required(),
  description: yup.string().required(),
  image: yup.object().shape({
    // file: yup
    //   .array()
    //   // .object()
    //   // .shape({
    //   //   name: yup.string().required(),
    //   // })
    //   .required("File required"),
  }),
});
