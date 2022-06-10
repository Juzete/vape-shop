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
    setLiquidsList: (state, action) => {
      state.liquidsList = action.payload;
    },
    openAdminModal: (state, action) => {
      state.modalIsOpen = true;
      state.modalState = action.payload;
    },
    closeAdminModal: (state) => {
      state.modalIsOpen = false;
      state.modalState = "";
      state.currentModalId = "";
    },
    setCurrentModalId: (state, action) => {
      state.currentModalId = action.payload;
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
      state.liquidsList[liquidIndex] = {
        ...state.liquidsList[liquidIndex],
        ...action.payload,
      };
    },
  },
});

export const {
  addLiquid,
  openAdminModal,
  closeAdminModal,
  deleteLiquid,
  editLiquid,
  setCurrentModalId,
  setLiquidsList,
} = liquidSlice.actions;

export default liquidSlice.reducer;
