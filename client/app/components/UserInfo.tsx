import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logout, selectUserInfo } from '../features/auth/authSlice';
import styles from './UserInfo.css';

export default function UserInfo() {
  const dispatch = useDispatch();
  const { name } = useSelector(selectUserInfo);

  return (
    <div className={styles.container}>
      Logged in as
      {` ${name}`}
      <button
        type="button"
        onClick={() => dispatch(logout())}
        className={styles.loginButton}
      >
        Log Out
      </button>
    </div>
  );
}
