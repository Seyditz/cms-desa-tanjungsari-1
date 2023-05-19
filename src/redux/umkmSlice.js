import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  umkmList: null,
  loading: null,
  error: null,
  showingDeleteModal: false,
  deletedData: null,
  alert: null,
  umkmInputData: {
    name: "",
    description: "",
    image: [],
    category: "",
  },
  loadingValue: 0,
  images: [],
};

export const umkmSlice = createSlice({
  name: "umkm",
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
    fetchUmkmListSuccess: (state, action) => {
      state.umkmList = action.payload;
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
      state.alert = action.payload;
    },
    setUmkmInputData: (state, action) => {
      state.umkmInputData[action.payload.key] = action.payload?.value;
    },
    setAllUmkmInputData: (state, action) => {
      state.umkmInputData = action.payload;
    },
    resetUmkmInputData: (state) => {
      state.umkmInputData = initialState.umkmInputData;
    },
    setLoadingValue: (state, action) => {
      state.loadingValue = action.payload;
    },
    setInitialInputData: (state, action) => {
      const { name, description, category, image } = action.payload;
      state.umkmInputData = { name, description, category, image };
    },
    addImages: (state, action) => {
      state.images.push(...action.payload);
    },
    removeImage: (state, action) => {
      state.images = state.images.filter((img) => img.id !== action.payload);
    },
    resetAllState: (state, action) => {
        state.images = []
    }
  },
});

export const {
  fetchStart,
  fetchSuccess,
  fetchUmkmListSuccess,
  fetchFailure,
  showDeleteModal,
  setDeletedData,
  showAlert,
  setUmkmInputData,
  setAllUmkmInputData,
  resetUmkmInputData,
  setLoadingValue,
  setInitialInputData,
  addImages,
  removeImage,
  resetAllState
} = umkmSlice.actions;

export default umkmSlice.reducer;
