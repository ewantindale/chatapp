import React from 'react';
import Chat from '../features/chat/Chat';
import Rooms from '../features/rooms/Rooms';

export default function ChatPage() {
  return (
    <div style={{ display: 'flex', flexDirection: 'row' }}>
      <Rooms />
      <Chat />
    </div>
  );
}
