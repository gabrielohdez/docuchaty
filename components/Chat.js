// components/Chat.js
import { useState } from 'react';
import axios from 'axios';
import styles from '../styles/Chat.module.css';
import Image from 'next/image';

const Chat = () => {
  const [message, setMessage] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (message.trim() === '') return; // No enviar mensajes vacíos
    setLoading(true);
    try {
      const res = await axios.post('/api/chat', { message });
      setResponse(res.data.message);
      setMessage(''); // Limpiar el campo de texto después de enviar
    } catch (error) {
      setResponse('Error: ' + error.message);
    } finally {
      setLoading(false);
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
          DocuChaty
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
        <button className={styles.button} onClick={sendMessage} disabled={loading}>Consultar</button>
        {loading && <p className={styles.loading}>Consultando...</p>}
        {response && <div className={styles.response}>{response}</div>}
      </div>
    </div>
  );
};

export default Chat;
