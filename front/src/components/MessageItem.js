import React from 'react';

function MessageItem({ message }) {
  const date = new Date(message.date * 1000).toLocaleString();
  return (
    <li>
      <p>{message.content}</p>
      <small>- {message.name}, {date}</small>
    </li>
  );
}

export default MessageItem;
