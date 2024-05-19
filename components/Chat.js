// components/Chat.js
import { useState } from 'react';
import axios from 'axios';
import styles from '../styles/Chat.module.css';
import Image from 'next/image';

const Chat = () => {
  const [message, setMessage] = useState('');
  const [response, setResponse] = useState('');

  const sendMessage = async () => {
    if (message.trim() === '') return; // No enviar mensajes vacíos
    try {
      const res = await axios.post('/api/chat', { message });
      setResponse(res.data.message);
      setMessage(''); // Limpiar el campo de texto después de enviar
    } catch (error) {
      setResponse('Error: ' + error.message);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className={styles.chatContainer}>
      <div className={styles.chatBox}>
        <div className={styles.header}>
          Calidad Comercial
        </div>
        <Image
          src="/logo.png"
          alt="Logo"
          className={styles.logo}
          width={150}
          height={150}
        />
        <textarea
          className={styles.textarea}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Escribe tu consulta aquí..."
        />
        <button className={styles.button} onClick={sendMessage}>Consultar</button>
        {response && <div className={styles.response}>{response}</div>}
      </div>
    </div>
  );
};

export default Chat;
