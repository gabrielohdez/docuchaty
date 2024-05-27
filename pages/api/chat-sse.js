// pages/api/chat-sse.js
import axios from 'axios';
import { readTXTFiles } from '../../lib/documentProcessor';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  const { document, message } = req.query;

  if (!document || !message) {
    return res.status(400).json({ message: 'Document and message are required' });
  }

  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');

  const sendMessage = (message) => {
    res.write(`data: ${JSON.stringify({ message })}\n\n`);
  };

  const sendError = (message) => {
    res.write(`event: error\ndata: ${JSON.stringify({ message })}\n\n`);
  };

  try {
    console.log('Reading TXT files...');
    const documents = await readTXTFiles([document]);
    console.log('Documents read:', documents);

    console.log('Generating response...');
    const documentContent = documents.map(doc => doc.content).join('\n');
    const response = await axios.post('https://api.openai.com/v1/chat/completions', {
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: 'You are an assistant that provides information based on the following documents.' },
        { role: 'system', content: documentContent },
        { role: 'user', content: message },
      ],
    }, {
      headers: {
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
    });

    const gptMessage = response.data.choices[0].message.content;
    console.log('GPT Message:', gptMessage);

    sendMessage(gptMessage);
  } catch (error) {
    console.error('Error in handler:', error.message);
    sendError(error.message);
  } finally {
    res.end();
  }
}
