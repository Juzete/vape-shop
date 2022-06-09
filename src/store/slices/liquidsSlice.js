import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  liquidsList: [],
  modalIsOpen: false,
  modalState: "",
  currentModalId: "",
};

export const liquidSlice = createSlice({
  name: "liquid",
  initialState,
  reducers: {
    addLiquid: (state, action) => {
      state.liquidsList.push(action.payload);
    },
    openModal: (state, action) => {
      state.modalIsOpen = true;
      state.modalState = action.payload;
    },
    closeModal: (state) => {
      state.modalIsOpen = false;
      state.modalState = "";
      state.currentModalId = "";
    },
    deleteLiquid: (state, action) => {
      state.liquidsList = state.liquidsList.filter(
        (item) => action.payload.indexOf(item.id) === -1
      );
    },
    editLiquid: (state, action) => {
      const liquidIndex = state.liquidsList.findIndex(
        (item) => item.id === action.payload.id
      );
      console.log(action.payload);
      state.liquidsList[liquidIndex] = {
        ...state.liquidsList[liquidIndex],
        ...action.payload,
      };
    },
    setCurrentModalId: (state, action) => {
      state.currentModalId = action.payload;
    },
  },
});

export const {
  addLiquid,
  openModal,
  closeModal,
  deleteLiquid,
  editLiquid,
  setCurrentModalId,
} = liquidSlice.actions;

export default liquidSlice.reducer;
