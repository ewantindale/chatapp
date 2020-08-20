import axios from 'axios';
import { createSlice } from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-cycle
import { AppThunk, RootState } from '../../store';
import api from '../../constants/api.json';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: localStorage.getItem('token'),
    isAuthenticated: false,
    isLoading: false,
    user: null,
    error: null,
  },
  reducers: {
    userLoading: (state) => {
      state.isLoading = true;
    },
    userLoaded: (state, action) => {
      state.isAuthenticated = true;
      state.isLoading = false;
      state.user = action.payload;
    },
    loginSuccess: (state, action) => {
      localStorage.setItem('token', action.payload.token);
      state.isAuthenticated = true;
      state.token = action.payload.token;
      state.user = action.payload.user;
      state.error = null;
    },
    loginFail: (state) => {
      localStorage.removeItem('token');
      state.token = null;
      state.user = null;
      state.isAuthenticated = false;
      state.isLoading = false;
    },
    logout: (state) => {
      localStorage.removeItem('token');
      state.token = null;
      state.user = null;
      state.isAuthenticated = false;
      state.isLoading = false;
      state.error = null;
    },
    authError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export default authSlice.reducer;

export const {
  userLoading,
  userLoaded,
  loginSuccess,
  loginFail,
  logout,
  authError,
} = authSlice.actions;

export const login = (name: string, password: string): AppThunk => {
  return async (dispatch) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const body = JSON.stringify({ name, password });

    try {
      const res = await axios.post(api.AUTH, body, config);
      dispatch(loginSuccess(res.data));
    } catch (err) {
      dispatch(authError(err.response.data.msg));
      dispatch(loginFail());
    }
  };
};

export const register = (name: string, password: string): AppThunk => {
  return async (dispatch) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const body = JSON.stringify({ name, password });

    try {
      const res = await axios.post(api.USERS, body, config);
      dispatch(loginSuccess(res.data));
    } catch (err) {
      dispatch(authError(err.response.data.msg));
      dispatch(loginFail());
    }
  };
};

export const selectIsAuthenticated = (state: RootState) =>
  state.auth.isAuthenticated;

export const selectUserInfo = (state: RootState) => state.auth.user;

export const selectError = (state: RootState) => state.auth.error;

// This helper function supplies the authentication token and is used in requests to private routes
// Maybe move it to /utils
export const tokenConfig = (getState) => {
  const { token } = getState().auth;

  const config = {
    headers: {
      'Content-type': 'application/json',
    },
  };

  if (token) {
    config.headers['x-auth-token'] = token;
  }

  return config;
};
