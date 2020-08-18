import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import routes from '../constants/routes.json';
import styles from './Home.css';

export default function Home(): JSX.Element {
  const history = useHistory();
  return (
    <div className={styles.container} data-tid="container">
      <h2>chat app</h2>
      <form
        className={styles.loginForm}
        onSubmit={(e) => {
          e.preventDefault();
          history.push(routes.CHAT);
        }}
      >
        <input type="text" placeholder="username" className={styles.input} />
        <input
          type="password"
          placeholder="password"
          className={styles.input}
        />
        <button type="submit">Log In</button>
      </form>

      {/* <Link to={routes.COUNTER}>to Counter</Link> */}
    </div>
  );
}
