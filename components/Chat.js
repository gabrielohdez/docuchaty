// components/Chat.js
import { useState } from 'react';
import axios from 'axios';
import styles from '../styles/Chat.module.css';

const Chat = () => {
  const [message, setMessage] = useState('');
  const [response, setResponse] = useState('');

  const sendMessage = async () => {
    try {
      const res = await axios.post('/api/chat', { message });
      setResponse(res.data.message);
    } catch (error) {
      setResponse('Error: ' + error.message);
    }
  };

  return (
    <div className={styles.chatContainer}>
      <div className={styles.chatBox}>
        <textarea
          className={styles.textarea}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message here..."
        />
        <button className={styles.button} onClick={sendMessage}>Send</button>
        {response && <div className={styles.response}>{response}</div>}
      </div>
    </div>
  );
};

export default Chat;
