// components/Chat.js
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Button, CircularProgress, Container, Paper, TextField, Typography } from '@mui/material';
import Image from 'next/image';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

const Chat = ({ selectedOption }) => {
  const [message, setMessage] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [chatHistory, setChatHistory] = useState([]);
  
  useEffect(() => {
    if (selectedOption) {
      setChatHistory([`Usted está consultando: ${selectedOption.replace('_', ' ')}`]);
    }
  }, [selectedOption]);

  const sendMessage = async () => {
    if (message.trim() === '') return; // No enviar mensajes vacíos
    setLoading(true);
    try {
      const res = await axios.post('/api/chat', { message, document: selectedOption });
      setResponse(res.data.message);
      setChatHistory([...chatHistory, `You: ${message}`, `Bot: ${res.data.message}`]);
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

  const clearChat = () => {
    setChatHistory([]);
    setResponse('');
  };

  const copyResponse = () => {
    navigator.clipboard.writeText(response).then(() => {
      alert('Respuesta copiada al portapapeles');
    }, (err) => {
      console.error('Error al copiar la respuesta: ', err);
    });
  };

  return (
    <Container maxWidth="sm" sx={{ marginTop: 4 }}>
      <Paper elevation={3} sx={{ padding: 2 }}>
        <Box display="flex" flexDirection="column" alignItems="center">
          <Typography variant="h4" component="div" gutterBottom>
            DocuChaty
          </Typography>
          <Image
            src="/logo.png"
            alt="Logo"
            width={150}
            height={150}
            style={{ marginBottom: 20 }}
          />
          <TextField
            fullWidth
            multiline
            minRows={4}
            variant="outlined"
            placeholder="Type your message here..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            sx={{ marginBottom: 2 }}
          />
          <Box display="flex" justifyContent="space-between" width="100%" sx={{ marginBottom: 2 }}>
            <Button variant="contained" color="primary" onClick={sendMessage} disabled={loading}>
              Send
            </Button>
            <Button variant="contained" color="secondary" onClick={clearChat}>
              Clear Chat
            </Button>
          </Box>
          {loading && <CircularProgress sx={{ marginTop: 2 }} />}
          {response && (
            <Box width="100%" sx={{ marginBottom: 2 }}>
              <Paper elevation={1} sx={{ padding: 2, marginTop: 2, width: '100%' }}>
                <Typography>{response}</Typography>
              </Paper>
              <Button
                variant="outlined"
                color="primary"
                startIcon={<ContentCopyIcon />}
                onClick={copyResponse}
                sx={{ marginTop: 1 }}
              >
                Copy Response
              </Button>
            </Box>
          )}
          <Box width="100%" sx={{ marginTop: 2 }}>
            {chatHistory.map((chat, index) => (
              <Typography key={index} variant="body1" sx={{ marginBottom: 1 }}>
                {chat}
              </Typography>
            ))}
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default Chat;
