/* eslint-disable no-param-reassign */
import axios from 'axios';
import { createSlice, createEntityAdapter, createAsyncThunk } from '@reduxjs/toolkit';
import routes from '../utilities/routes.js';

const header = (token) => ({
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

export const fetchChannels = createAsyncThunk(
  'channels/fetchChannels',
  async (token) => {
    const response = await axios.get(routes.channels(), header(token));
    return response.data;
  },
);

export const addChannelThunk = createAsyncThunk(
  'channels/addChannel',
  async ({ token, name }) => {
    const newChannel = { name };
    const response = await axios.post(routes.channels(), newChannel, header(token));
    return response.data;
  },
);

export const renameChannelThunk = createAsyncThunk(
  'channels/renameChannel',
  async ({ token, name, id }) => {
    const editedChannel = { name };
    const response = await axios.patch(routes.channels(id), editedChannel, header(token));
    return response.data;
  },
);

export const removeChannelThunk = createAsyncThunk(
  'channels/removeChannel',
  async ({ token, id }) => {
    const response = await axios.delete(routes.channels(id), header(token));
    return response.data;
  },
);

const channelsAdapter = createEntityAdapter();
const channelsSlice = createSlice({
  name: 'channels',
  initialState: channelsAdapter.getInitialState({
    currentChannel: '1',
  }),
  reducers: {
    setChannel(state, { payload }) {
      state.currentChannel = payload;
    },
    addChannel: channelsAdapter.addOne,
    renameChannel: channelsAdapter.updateOne,
    removeChannel: (state, { payload }) => {
      channelsAdapter.removeOne(state, payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchChannels.fulfilled, channelsAdapter.addMany)
      .addCase(addChannelThunk.fulfilled, (state, { payload }) => {
        state.currentChannel = payload.id;
      })
      .addCase(removeChannelThunk.fulfilled, (state, { payload }) => {
        const channelId = payload.id;
        channelsAdapter.removeOne(state, channelId);
        state.currentChannel = '1';
      });
  },
});

export const {
  setChannel, addChannel, renameChannel, removeChannel,
} = channelsSlice.actions;
export const selectors = channelsAdapter.getSelectors((state) => state.channels);
export default channelsSlice.reducer;
