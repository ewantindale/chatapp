import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  switchRoom,
  getRooms,
  selectRooms,
  selectRoomsLoading,
  selectCurrentRoom,
} from './roomsSlice';

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
          <div key={room.id} className={styles.room}>
            {room.name}

            <button
              type="button"
              onClick={() => dispatch(switchRoom(room))}
              className={styles.joinButton}
            >
              Join
            </button>
          </div>
        )
      )}
    </div>
  );
}
