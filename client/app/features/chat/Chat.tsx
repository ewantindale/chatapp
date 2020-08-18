import React, { useReducer, useState } from 'react';
import { Link } from 'react-router-dom';
import routes from '../../constants/routes.json';
import styles from './Chat.css';

const initialState = { messages: [] };

function reducer(state, action) {
  switch (action.type) {
    case 'add_message':
      return { messages: [...state.messages, action.payload] };
    default:
      throw new Error();
  }
}

export default function Chat() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [message, setMessage] = useState('');

  function handleSubmit(event) {
    event.preventDefault();

    dispatch({
      type: 'add_message',
      payload: { author: 'ewan', text: message },
    });

    setMessage('');
  }

  function handleMessageChange(event) {
    setMessage(event.target.value);
  }
  return (
    <div className={styles.container}>
      <h2>Chat</h2>
      <Link to={routes.HOME}>Logout</Link>
      <div className={styles.messageContainer}>
        {state.messages.map((m) => (
          <div key={m.id} className={styles.message}>
            <div className={styles.author}>{m.author}</div>
            <div className={styles.text}>{m.text}</div>
          </div>
        ))}
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
