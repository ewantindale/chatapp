import axios from 'axios';
import { createSlice } from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-cycle
import { AppThunk, RootState } from '../../store';
import api from '../../constants/api.json';

const chatSlice = createSlice({
  name: 'chat',
  initialState: {
    messages: null,
    isLoading: false,
    error: null,
  },
  reducers: {
    messagesLoading: (state) => {
      state.isLoading = true;
    },
    messagesLoaded: (state, action) => {
      state.messages = action.payload;
      state.isLoading = false;
    },
    chatError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export default chatSlice.reducer;

export const { messagesLoading, messagesLoaded, chatError } = chatSlice.actions;

export const selectMessages = (state: RootState) => state.chat.messages;

export const getMessages = (): AppThunk => {
  return async (dispatch, getState) => {
    const state = getState();
    const { currentRoom } = state.rooms;
    const roomId = currentRoom.id;
    try {
      const res = await axios.get(`${api.ROOMS}/${roomId}/messages`);
      dispatch(messagesLoaded(res.data));
    } catch (err) {
      dispatch(chatError(err.response.data.msg));
    }
  };
};

export const addMessage = (msg): AppThunk => {
  return async (dispatch, getState) => {
    const state = getState();
    const { user } = state.auth;
    const { currentRoom } = state.rooms;

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const body = JSON.stringify({
      body: msg,
      userId: user.id,
      roomId: currentRoom.id,
    });

    try {
      await axios.post(`${api.ROOMS}/${currentRoom.id}/messages`, body, config);
    } catch (err) {
      dispatch(chatError(err.response.data.msg));
    }
  };
};
