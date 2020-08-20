import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout, selectUserInfo } from '../auth/authSlice';
import { selectCurrentRoom } from '../rooms/roomsSlice';
import { sendMessage, getMessages, selectMessages } from './chatSlice';
import styles from './Chat.css';

export default function Chat() {
  const [message, setMessage] = useState('');
  const currentRoom = useSelector(selectCurrentRoom);
  const dispatch = useDispatch();
  const { name } = useSelector(selectUserInfo);
  const messages = useSelector(selectMessages);

  const messagesEndRef = useRef(null);

  function scrollToBottom() {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView(false);
    }
  }

  useEffect(scrollToBottom, [messages]);

  useEffect(() => {
    dispatch(getMessages());
  }, [currentRoom, dispatch]);

  function handleSubmit(event) {
    event.preventDefault();
    dispatch(sendMessage(message));

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
        <h3>{currentRoom ? currentRoom.name : null}</h3>
        <span className={styles.userInfo}>
          Logged in as
          {` ${name}`}
          <button
            type="button"
            onClick={handleLogoutClicked}
            className={styles.logoutButton}
          >
            Logout
          </button>
        </span>
      </div>

      <div className={styles.messageContainer}>
        {messages && messages.length > 0
          ? messages.map((m) => (
              <div key={m.id} className={styles.message}>
                <div className={styles.messageDate}>{m.createdAt}</div>
                <div className={styles.messageAuthor}>{m.user.name}</div>
                <div className={styles.messageBody}>{m.body}</div>
              </div>
            ))
          : null}
        <div ref={messagesEndRef} />
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
