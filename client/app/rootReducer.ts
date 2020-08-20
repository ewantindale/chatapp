import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import { History } from 'history';
import authReducer from './features/auth/authSlice';
import roomsReducer from './features/rooms/roomsSlice';
import chatReducer from './features/chat/chatSlice';

export default function createRootReducer(history: History) {
  return combineReducers({
    router: connectRouter(history),
    auth: authReducer,
    rooms: roomsReducer,
    chat: chatReducer,
  });
}
