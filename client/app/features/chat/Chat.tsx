import React from 'react';
import { Link } from 'react-router-dom';
import routes from '../../constants/routes.json';
import styles from './Chat.css';

export default function Chat() {
  return (
    <div className={styles.container}>
      <h2>Chat</h2>

      <Link to={routes.HOME}>Logout</Link>
    </div>
  );
}
