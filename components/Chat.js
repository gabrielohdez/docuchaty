// components/Chat.js
import { useState } from 'react';
import axios from 'axios';
import { Box, Button, CircularProgress, Container, Paper, TextField, Typography } from '@mui/material';
import Image from 'next/image';

const Chat = ({ selectedOption }) => {
  const [message, setMessage] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (message.trim() === '') return; // No enviar mensajes vacíos
    setLoading(true);
    try {
      const res = await axios.post('/api/chat', { message, document: selectedOption });
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
          <Button variant="contained" color="primary" onClick={sendMessage} disabled={loading}>
            Send
          </Button>
          {loading && <CircularProgress sx={{ marginTop: 2 }} />}
          {response && (
            <Paper elevation={1} sx={{ padding: 2, marginTop: 2, width: '100%' }}>
              <Typography>{response}</Typography>
            </Paper>
          )}
        </Box>
      </Paper>
    </Container>
  );
};

export default Chat;
