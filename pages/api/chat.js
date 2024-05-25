// pages/api/chat.js
import axios from 'axios';
import { readPDFs } from '../../lib/documentProcessor';

const cache = {};

const getCachedResponse = (message) => {
  return cache[message];
};

const cacheResponse = (message, response) => {
  cache[message] = response;
};

const generateResponse = async (message, documents) => {
  try {
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

    return response.data.choices[0].message.content;
  } catch (error) {
    console.error('Error in generateResponse:', error.message);
    throw new Error('Error generating response from OpenAI');
  }
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Only POST requests allowed' });
  }

  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ message: 'Message is required' });
  }

  const cachedResponse = getCachedResponse(message);
  if (cachedResponse) {
    return res.status(200).json({ message: cachedResponse });
  }

  try {
    console.log('Reading PDFs...');
    const documents = await readPDFs();
    console.log('Documents read:', documents);

    console.log('Generating response...');
    const gptMessage = await generateResponse(message, documents);
    console.log('GPT Message:', gptMessage);

    cacheResponse(message, gptMessage);
    res.status(200).json({ message: gptMessage });
  } catch (error) {
    console.error('Error in handler:', error.message);
    res.status(500).json({ message: error.message });
  }
}
