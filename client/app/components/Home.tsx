import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './Home.css';
import { register, login, selectError } from '../features/auth/authSlice';

export default function Home(): JSX.Element {
  const dispatch = useDispatch();
  const error = useSelector(selectError);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  function handleLogin(e) {
    e.preventDefault();

    dispatch(login(username, password));
  }

  function handleRegister(e) {
    e.preventDefault();

    dispatch(register(username, password));
  }

  return (
    <div className={styles.container} data-tid="container">
      <h2>chat app</h2>
      <form className={styles.loginForm}>
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
        <button type="submit" onClick={handleLogin}>
          Log In
        </button>
        <button type="submit" onClick={handleRegister}>
          Register
        </button>
        <span className={styles.errorMessage}>{error}</span>
      </form>
    </div>
  );
}
