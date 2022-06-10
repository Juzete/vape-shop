import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  email: null,
  token: null,
  id: null,
  modalIsOpen: false,
  order: {},
  checkedPositions: [],
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action) {
      state.email = action.payload.email;
      state.token = action.payload.token;
      state.id = action.payload.id;
    },
    removeUser(state) {
      state.email = null;
      state.token = null;
      state.id = null;
    },
    openUserModal: (state) => {
      state.modalIsOpen = true;
    },
    closeUserModal: (state) => {
      state.modalIsOpen = false;
      state.modalState = "";
      state.currentModalId = "";
    },
    addOrder: (state, action) => {
      state.order = action.payload;
    },
    setCheckedPositions: (state, action) => {
      state.checkedPositions = action.payload;
    },
  },
});

export const {
  setUser,
  removeUser,
  openUserModal,
  closeUserModal,
  addOrder,
  setCheckedPositions,
} = userSlice.actions;

export default userSlice.reducer;
