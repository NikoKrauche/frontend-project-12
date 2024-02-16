/* eslint-disable no-param-reassign */
import axios from 'axios';
import { createSlice, createEntityAdapter, createAsyncThunk } from '@reduxjs/toolkit';
import routes from '../utilities/routes.js';

const header = (token) => ({
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

export const fetchMessages = createAsyncThunk(
  'messages/fetchMessages',
  async (token) => {
    const response = await axios.get(routes.messages(), header(token));
    return response.data;
  },
);

export const sendMessage = createAsyncThunk(
  'messages/sendMessages',
  async ({ token, newMessage }) => {
    const response = await axios.post(routes.messages(), newMessage, header(token));
    return response.data;
  },
);

const messagesAdapter = createEntityAdapter();
const messagesSlice = createSlice({
  name: 'messages',
  initialState: messagesAdapter.getInitialState(),
  reducers: {
    addMessage: messagesAdapter.addOne,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMessages.fulfilled, messagesAdapter.addMany);
  },
});
export const { addMessage } = messagesSlice.actions;
export const selectors = messagesAdapter.getSelectors((state) => state.messages);
export default messagesSlice.reducer;
