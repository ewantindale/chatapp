import axios from 'axios';
import { createSlice } from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-cycle
import { AppThunk, RootState } from '../../store';
import api from '../../constants/api.json';

const roomsSlice = createSlice({
  name: 'rooms',
  initialState: {
    rooms: null,
    currentRoom: null,
    isLoading: false,
    error: null,
  },
  reducers: {
    roomsLoading: (state) => {
      state.isLoading = true;
    },
    roomsLoaded: (state, action) => {
      state.isLoading = false;
      state.rooms = action.payload;
    },
    roomsError: (state, action) => {
      state.error = action.payload;
    },
    switchRoom: (state, action) => {
      state.currentRoom = action.payload;
    },
    addRoom: (state, action) => {
      state.rooms = [...state.rooms, action.payload];
    },
    removeRoom: (state, action) => {
      state.rooms = state.rooms.filter((i) => i.id !== action.payload);
    },
  },
});

export default roomsSlice.reducer;

export const {
  roomsLoading,
  roomsLoaded,
  roomsError,
  switchRoom,
  addRoom,
  removeRoom,
} = roomsSlice.actions;

export const getRooms = (): AppThunk => {
  return async (dispatch) => {
    try {
      const res = await axios.get(api.ROOMS);
      dispatch(roomsLoaded(res.data));
    } catch (err) {
      dispatch(roomsError(err.response.data.msg));
    }
  };
};

export const createRoom = (name): AppThunk => {
  return async (dispatch) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const body = JSON.stringify({ name: name });
    try {
      const res = await axios.post(api.ROOMS, body, config);
      dispatch(addRoom(res.data));
    } catch (err) {
      dispatch(roomsError(err.response.data.msg));
    }
  };
};

export const deleteRoom = (id): AppThunk => {
  return async (dispatch) => {
    try {
      await axios.delete(`${api.ROOMS}/${id}`);
      dispatch(removeRoom(id));
    } catch (err) {
      dispatch(roomsError(err.response.data.msg));
    }
  };
};

export const selectRooms = (state: RootState) => state.rooms.rooms;
export const selectRoomsLoading = (state: RootState) => state.rooms.isLoading;
export const selectCurrentRoom = (state: RootState) => state.rooms.currentRoom;
