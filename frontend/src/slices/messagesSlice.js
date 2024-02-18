import axios from 'axios';
import { createSlice, createEntityAdapter, createAsyncThunk } from '@reduxjs/toolkit';

import { removeChannelThunk } from './channelsSlice.js';
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
      .addCase(fetchMessages.fulfilled, messagesAdapter.addMany)
      .addCase(removeChannelThunk.fulfilled, (state, { payload }) => {
        const channelId = payload.id;
        const messageIdsToRemove = Object.values(state.entities)
          .filter((message) => message.channelId === channelId)
          .map((message) => message.id);
        messagesAdapter.removeMany(state, messageIdsToRemove);
      });
  },
});

export const { addMessage } = messagesSlice.actions;
export const selectors = messagesAdapter.getSelectors((state) => state.messages);
export default messagesSlice.reducer;
