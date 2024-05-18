// components/Chat.js
import { useState } from 'react';
import axios from 'axios';

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
    <div className="chat-container">
      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type your message here..."
      />
      <button onClick={sendMessage}>Send</button>
      <div className="response">{response}</div>
    </div>
  );
};

export default Chat;
