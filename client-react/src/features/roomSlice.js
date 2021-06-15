import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

const roomSlice = createSlice({
  name: "room",
  initialState: {
    rooms: [],
  },
  reducers: {
    create: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { create } = roomSlice.actions;

export default roomSlice.reducer;
