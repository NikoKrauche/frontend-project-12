/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const modalSlice = createSlice({
  name: 'channels',
  initialState: {
    isShow: false,
    modalType: null,
    id: null,
  },
  reducers: {
    modalOpen(state, { payload }) {
      const { type, id } = payload;
      state.isShow = true;
      state.modalType = type;
      state.id = id;
    },
    modalClose(state) {
      state.isShow = false;
      state.modalType = null;
      state.id = null;
    },
  },
});

export const { modalOpen, modalClose } = modalSlice.actions;
export const selectors = (state) => state.modal;
export default modalSlice.reducer;
