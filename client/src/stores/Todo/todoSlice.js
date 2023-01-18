import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  filteredItems: [],
  selectedItem: {},
  selectedLabel: null,
  loading: false,
  labelForm: false,
  showForm: false,
};

const todoSlice = createSlice({
  name: "todoSlice",
  initialState,
  reducers: {
    toggleShowForm: state => {
      state.showForm = !state.showForm;
    },
    setSelectedItem: (state, action) => {
      state.selectedItem = action.payload;
    },
    setItems: (state, action) => {
      state.items = action.payload;
      state.filteredItems = action.payload;
    },
    toggleLabelForm: state => {
      state.labelForm = !state.labelForm;
    },

    setSelectedLabel: (state, action) => {
      state.selectedLabel = action.payload;
    },
  },
});

export const {
  setSelectedItem,
  setSelectedLabel,
  setItems,
  toggleShowForm,
  toggleLabelForm,
} = todoSlice.actions;
export default todoSlice.reducer;
