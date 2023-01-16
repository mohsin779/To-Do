import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  filteredItems: [],
  selectedItem: {},
  selectedLabel: null,
  loading: false,
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
    setSelectedLabel: (state, action) => {
      // if (state.selectedLabel === null) {
      //   state.filteredItems = state.items;
      //   return;
      // }
      console.log(action.payload);

      const filteredItems = state.items.filter(
        item =>
          item.labels
            .map(label => label._id)
            .findIndex(
              item => item == action.payload || action.payload === null
            ) > -1
      );

      state.selectedLabel = action.payload;
      state.filteredItems = filteredItems;
    },
  },
});

export const { setSelectedItem, setSelectedLabel, setItems, toggleShowForm } =
  todoSlice.actions;
export default todoSlice.reducer;
