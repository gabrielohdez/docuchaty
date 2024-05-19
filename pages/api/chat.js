// pages/api/chat.js
import axios from 'axios';
import { readPDFs } from '../../lib/documentProcessor';

const generateResponse = async (message, documents) => {
  // Aquí puedes utilizar los documentos para generar una respuesta más contextual
  // Para simplificar, vamos a concatenar el contenido de todos los documentos

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
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Only POST requests allowed' });
  }

  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ message: 'Message is required' });
  }

  try {
    const documents = await readPDFs();
    const gptMessage = await generateResponse(message, documents);
    res.status(200).json({ message: gptMessage });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
