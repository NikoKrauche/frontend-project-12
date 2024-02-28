import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';

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
});

export const { setChannel } = channelsSlice.actions;
export const selectors = channelsAdapter.getSelectors((state) => state.channels);
export default channelsSlice.reducer;
