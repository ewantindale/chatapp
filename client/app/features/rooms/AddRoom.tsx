import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createRoom } from './roomsSlice';
import styles from './AddRoom.css';

export default function AddRoom() {
  const dispatch = useDispatch();
  const [name, setName] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(createRoom(name));
    setName('');
  }

  return (
    <div className={styles.container}>
      <p>Add a new room</p>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button type="submit">+</button>
      </form>
    </div>
  );
}
