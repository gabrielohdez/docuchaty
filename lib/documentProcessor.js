// lib/documentProcessor.js
const fs = require('fs');
const path = require('path');
const pdf = require('pdf-parse');

const readPDFs = async (files) => {
  try {
    const documentsDir = path.join(process.cwd(), 'documents');
    const documents = [];
    for (const fileName of files) {
      const filePath = path.join(documentsDir, `${fileName}.pdf`);
      const dataBuffer = fs.readFileSync(filePath);
      const data = await pdf(dataBuffer);
      documents.push({ fileName, content: data.text });
    }

    return documents;
  } catch (error) {
    console.error('Error reading PDFs:', error.message);
    throw new Error('Error reading PDF documents');
  }
};

module.exports = { readPDFs };
