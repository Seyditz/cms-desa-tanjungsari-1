import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  postList: null,
  loading: null,
  error: null,
  showingDeleteModal: false,
  deletedData: null,
  alert: null,
  postInputData: {
    name: "",
    description: "",
    image: "",
    category: "",
  },
  loadingValue: 0
};

export const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    fetchStart: (state) => {
      state.loading = true;
      state.error = false;
    },
    fetchSuccess: (state) => {
      state.loading = false;
      state.error = false;
    },
    fetchPostListSuccess: (state, action) => {
      state.postList = action.payload;
    },
    fetchFailure: (state) => {
      state.loading = false;
      state.error = true;
    },
    showDeleteModal: (state, action) => {
      state.showingDeleteModal = action.payload;
    },
    setDeletedData: (state, action) => {
      state.deletedData = action.payload;
    },
    showAlert: (state, action) => {
      state.alert = action.payload
    },
    setPostInputData: (state, action) => {
      state.postInputData[action.payload.key] = action.payload?.value
    },
    setAllPostInputData: (state, action) => {
      state.postInputData = action.payload
    },
    resetPostInputData: (state) => {
      state.postInputData = initialState.postInputData
    },
    setLoadingValue: (state, action) => {
      state.loadingValue = action.payload
    },
    setInitialInputData: (state, action) => {
      const {name, description, category, image} = action.payload 
      state.postInputData = {name, description, category, image}
    }
  },
});

export const {
  fetchStart,
  fetchSuccess,
  fetchPostListSuccess,
  fetchFailure,
  showDeleteModal,
  setDeletedData,
  showAlert,
  setPostInputData,
  setAllPostInputData,
  resetPostInputData,
  setLoadingValue,
  setInitialInputData
} = postSlice.actions;

export default postSlice.reducer;
