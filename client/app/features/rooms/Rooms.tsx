import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import io from 'socket.io-client';
import {
  switchRoom,
  getRooms,
  selectRooms,
  selectRoomsLoading,
  selectCurrentRoom,
  deleteRoom,
} from './roomsSlice';
import { selectUserInfo } from '../auth/authSlice';
import AddRoom from './AddRoom';

import styles from './Rooms.css';

export default function Rooms() {
  const dispatch = useDispatch();
  const rooms = useSelector(selectRooms);
  const roomsLoading = useSelector(selectRoomsLoading);
  const currentRoom = useSelector(selectCurrentRoom);
  const userInfo = useSelector(selectUserInfo);

  // Fetch rooms initially
  useEffect(() => {
    dispatch(getRooms());
  }, [dispatch]);

  // Fetch rooms when we receive a message via socket that the rooms have been updated
  useEffect(() => {
    const socket = io('http://localhost:5001');

    socket.on('rooms_changed', () => {
      console.log('rooms_changed');
      dispatch(getRooms());
    });

    return () => {
      socket.disconnect();
    };
  }, [dispatch]);

  if (!rooms || roomsLoading) return <p>Loading rooms...</p>;

  return (
    <div className={styles.container}>
      <h3>Rooms</h3>
      {rooms.map((room) => (
        <div
          key={room.id}
          className={
            currentRoom && currentRoom.id === room.id
              ? styles.currentRoom
              : styles.room
          }
          onClick={() => dispatch(switchRoom(room))}
        >
          <span className={styles.roomName}>{room.name}</span>

          {/* {userInfo.id === room.userId ? (
            <button
              type="button"
              onClick={() => dispatch(deleteRoom(room.id))}
              className={styles.deleteButton}
            >
              X
            </button>
          ) : null} */}
        </div>
      ))}
      {/* <AddRoom /> */}
    </div>
  );
}
