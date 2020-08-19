import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './Home.css';
import { login, selectError } from '../features/auth/authSlice';

export default function Home(): JSX.Element {
  const dispatch = useDispatch();
  const error = useSelector(selectError);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  function handleSubmit(e) {
    e.preventDefault();

    dispatch(login(username, password));
  }

  return (
    <div className={styles.container} data-tid="container">
      <h2>chat app</h2>
      <form className={styles.loginForm} onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="username"
          className={styles.input}
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="password"
          className={styles.input}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Log In</button>
        <span className={styles.errorMessage}>{error}</span>
      </form>
    </div>
  );
}
