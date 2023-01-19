import { configureStore } from "@reduxjs/toolkit";
import todoSlice, {
  setItems,
  setSelectedItem,
  setSelectedLabel,
  toggleLabelForm,
  toggleShowForm,
} from "./Todo/todoSlice";

export const store = configureStore({
  reducer: {
    todo: todoSlice,
  },
});

export const actions = {
  setSelectedItem,
  setSelectedLabel,
  setItems,
  toggleShowForm,
  toggleLabelForm,
};
