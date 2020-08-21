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
import AddRoom from './AddRoom';

import styles from './Rooms.css';

export default function Rooms() {
  const dispatch = useDispatch();
  const rooms = useSelector(selectRooms);
  const roomsLoading = useSelector(selectRoomsLoading);
  const currentRoom = useSelector(selectCurrentRoom);

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

  // Whenever we fetch the list of rooms, check if we are in a room and if not, join the first one.
  useEffect(() => {
    if (rooms && currentRoom === null) {
      dispatch(switchRoom(rooms[0]));
    }
  }, [rooms, dispatch, currentRoom]);

  if (!rooms || roomsLoading) return <p>Loading rooms...</p>;

  return (
    <div className={styles.container}>
      <h3>Rooms</h3>
      {rooms.map((room) =>
        currentRoom && room.id === currentRoom.id ? (
          <div key={room.id} className={styles.currentRoom}>
            {room.name}
          </div>
        ) : (
          <div
            key={room.id}
            className={styles.room}
            onClick={() => dispatch(switchRoom(room))}
          >
            {room.name}
            <div>
              {/* <button
                type="button"

                className={styles.joinButton}
              >
                Join
              </button> */}
              {/* <button
                type="button"
                onClick={() => dispatch(deleteRoom(room.id))}
                className={styles.deleteButton}
              >
                Delete
              </button> */}
            </div>
          </div>
        )
      )}
      <AddRoom />
    </div>
  );
}
