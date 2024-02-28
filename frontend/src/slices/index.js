import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authorizationSlice.js';
import channelsReducer from './channelsSlice.js';
import modalReducer from './modalSlice.js';

import { chatApi } from '../services/chatApi.js';

export default configureStore({
  reducer: {
    auth: authReducer,
    channels: channelsReducer,
    modal: modalReducer,
    [chatApi.reducerPath]: chatApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(chatApi.middleware),
});
