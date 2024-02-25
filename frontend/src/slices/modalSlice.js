/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const modalSlice = createSlice({
  name: 'channels',
  initialState: {
    isShow: false,
    modal: null,
    id: null,
  },
  reducers: {
    modalOpen(state, { payload }) {
      const { modal, id } = payload;
      state.isShow = true;
      state.modal = modal;
      state.id = id;
    },
    modalClose(state) {
      state.isShow = false;
      state.modal = null;
      state.id = null;
    },
  },
});

export const { modalOpen, modalClose } = modalSlice.actions;
export const selectors = (state) => state.modal;
export default modalSlice.reducer;
