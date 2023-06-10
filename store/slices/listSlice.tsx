import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: {
    task: "Enter Task Name ...",
    category: "",
    date: "2023-06-09",
    done: "",
    time: "00:00",
  },
};

const listSlice = createSlice({
  name: "editTodo",
  initialState,
  reducers: {
    setFormValues: (state, action) => {
      state.data = action.payload;
    },
  },
});
export const { setFormValues } = listSlice.actions;

export default listSlice.reducer;
