/* eslint-disable no-param-reassign */
import axios from 'axios';
import { createSlice, createEntityAdapter, createAsyncThunk } from '@reduxjs/toolkit';
import routes from '../utilities/routes.js';

export const fetchChannels = createAsyncThunk(
  'channels/fetchChannels',
  async (token) => {
    const response = await axios.get(routes.channels(), {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
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
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchChannels.fulfilled, channelsAdapter.addMany);
  },
});

export const { setChannel } = channelsSlice.actions;
export const selectors = channelsAdapter.getSelectors((state) => state.channels);
export default channelsSlice.reducer;
