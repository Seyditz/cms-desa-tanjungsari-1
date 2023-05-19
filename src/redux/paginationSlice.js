import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  page: 1,
  paginationData: null,
};

export const paginationSlice = createSlice({
  name: "pagination",
  initialState,
  reducers: {
    changePage: (state, action) => {
      state.page = action.payload;
    },
    setPaginationData: (state, action) => {
      state.paginationData = action.payload;
    },
  },
});

export const { changePage, setPaginationData } = paginationSlice.actions;

export default paginationSlice.reducer;
