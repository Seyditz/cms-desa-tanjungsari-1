import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userList: null,
  loading: null,
  error: null,
  showingDeleteModal: false,
  deletedData: null,
  alert: null,
  userInputData: {
    username: "",
    password: "",
    confirmPassword: "",
  },
  loadingValue: 0
};

export const userListSlice = createSlice({
  name: "userList",
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
    fetchUserListSuccess: (state, action) => {
      state.userList = action.payload;
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
    setUserInputData: (state, action) => {
      state.userInputData[action.payload.key] = action.payload.value
    },
    setAllUserInputData: (state, action) => {
      state.userInputData = action.payload
    },
    resetUserInputData: (state) => {
      state.userInputData = initialState.userInputData
    },
    setLoadingValue: (state, action) => {
      state.loadingValue = action.payload
    },
  },
});

export const {
  fetchStart,
  fetchSuccess,
  fetchUserListSuccess,
  fetchFailure,
  showDeleteModal,
  setDeletedData,
  showAlert,
  setUserInputData,
  setAllUserInputData,
  resetUserInputData,
  setLoadingValue
} = userListSlice.actions;

export default userListSlice.reducer;
