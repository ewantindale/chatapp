import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import io from 'socket.io-client';
import moment from 'moment';
import { selectCurrentRoom } from '../rooms/roomsSlice';
import { sendMessage, getMessages, selectMessages } from './chatSlice';
import UserInfo from '../../components/UserInfo';
import styles from './Chat.css';

export default function Chat() {
  const [message, setMessage] = useState('');
  const currentRoom = useSelector(selectCurrentRoom);
  const dispatch = useDispatch();
  const messages = useSelector(selectMessages);

  const messagesEndRef = useRef(null);

  function scrollToBottom() {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'auto' });
    }
  }
  useEffect(scrollToBottom, [messages]);

  useEffect(() => {
    dispatch(getMessages());
  }, [currentRoom, dispatch]);

  useEffect(() => {
    if (!currentRoom) {
      return;
    }
    const socket = io(`http://localhost:5001?room=${currentRoom.id}`);

    socket.on('new_message', () => {
      console.log('received new_message');
      dispatch(getMessages());
    });

    return () => {
      socket.disconnect();
    };
  }, [dispatch, currentRoom]);

  function handleSubmit(event) {
    event.preventDefault();
    if (!currentRoom) {
      return;
    }
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
