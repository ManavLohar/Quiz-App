import { createSlice } from "@reduxjs/toolkit";

interface Counter {
  counter: number;
}

const initialState: Counter = {
  counter: 0,
};

export const counterSlice = createSlice({
  name: "counterSlice",
  initialState,
  reducers: {},
});

export const {} = counterSlice.actions;
export default counterSlice.reducer;
