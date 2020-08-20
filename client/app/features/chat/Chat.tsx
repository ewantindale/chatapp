import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import io from 'socket.io-client';
import moment from 'moment';
import { logout, selectUserInfo } from '../auth/authSlice';
import { selectCurrentRoom } from '../rooms/roomsSlice';
import { sendMessage, getMessages, selectMessages } from './chatSlice';
import UserInfo from '../../components/UserInfo';
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

  useEffect(() => {
    const socket = io('http://localhost:5001');

    socket.on('new_message', () => {
      console.log('received new_message');
      dispatch(getMessages());
    });

    return () => {
      socket.disconnect();
    };
  }, [dispatch]);

  function handleSubmit(event) {
    event.preventDefault();
    dispatch(sendMessage(message));

    setMessage('');
  }

  function handleMessageChange(event) {
    setMessage(event.target.value);
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h3>{currentRoom ? currentRoom.name : null}</h3>
        <UserInfo />
      </div>

      <div className={styles.messageContainer}>
        {messages && messages.length > 0
          ? messages.map((m) => (
              <div key={m.id} className={styles.message}>
                <div className={styles.messageHeading}>
                  <span className={styles.messageAuthor}>{m.user.name}</span>
                  <span className={styles.messageDate}>
                    {moment(m.createdAt).fromNow()}
                  </span>
                </div>
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
