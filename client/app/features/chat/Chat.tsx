import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout, selectUserInfo } from '../auth/authSlice';
import styles from './Chat.css';

export default function Chat() {
  const [message, setMessage] = useState('');
  const dispatch = useDispatch();
  const { username } = useSelector(selectUserInfo);

  function handleSubmit(event) {
    event.preventDefault();

    setMessage('');
  }

  function handleMessageChange(event) {
    setMessage(event.target.value);
  }

  function handleLogoutClicked() {
    dispatch(logout());
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2>Chat</h2>
        <span className={styles.userInfo}>
          Logged in as
          {username}
        </span>
        <button
          type="button"
          onClick={handleLogoutClicked}
          className={styles.logoutButton}
        >
          Logout
        </button>
      </div>

      <div className={styles.messageContainer}>
        {/* {state.messages.map((m) => (
          <div key={m.id} className={styles.message}>
            <div className={styles.author}>{m.author}</div>
            <div className={styles.text}>{m.text}</div>
          </div>
        ))} */}
      </div>

      <form onSubmit={handleSubmit} className={styles.messageForm}>
        <input
          type="text"
          placeholder="message"
          value={message}
          onChange={handleMessageChange}
        />
      </form>
    </div>
  );
}
