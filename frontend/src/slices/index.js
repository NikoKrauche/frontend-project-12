import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authorizationSlice.js';
import messagesReducer from './messagesSlice.js';
import channelsReducer from './channelsSlice.js';
import modalReducer from './modalSlice.js';

export default configureStore({
  reducer: {
    auth: authReducer,
    messages: messagesReducer,
    channels: channelsReducer,
    modal: modalReducer,
  },
});
