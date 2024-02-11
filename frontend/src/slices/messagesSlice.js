import axios from 'axios';
import { createSlice, createEntityAdapter, createAsyncThunk } from '@reduxjs/toolkit';
import routes from '../utilities/routes.js';

export const fetchMessages = createAsyncThunk(
  'messages/fetchMessages',
  async (token) => {
    const response = await axios.get(routes.getMessages(), {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  },
);

const messagesAdapter = createEntityAdapter();
const messagesSlice = createSlice({
  name: 'messages',
  initialState: messagesAdapter.getInitialState(),
  extraReducers: (builder) => {
    builder
      .addCase(fetchMessages.fulfilled, messagesAdapter.addMany);
  },
});

export const selectors = messagesAdapter.getSelectors((state) => state.messages);
export default messagesSlice.reducer;
