import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isAuthenticated: false,
    user: JSON.parse(localStorage.getItem('userData')),
    error: null,
  },
  reducers: {
    loginSuccess: (state, action) => {
      localStorage.setItem('userData', JSON.stringify(action.payload));
      state.isAuthenticated = true;
      state.user = action.payload;
    },
    loginFailure: (state, action) => {
      state.isAuthenticated = false;
      state.user = null;
      state.error = action.payload;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.error = null;
      localStorage.removeItem('userData');
    },
  },
});

export const {
  loginSuccess,
  loginFailure,
  logout,
} = authSlice.actions;

export const { actions } = authSlice;
export const selectors = (state) => state.auth;
export default authSlice.reducer;
