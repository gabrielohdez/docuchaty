// lib/documentProcessor.js
const fs = require('fs');
const path = require('path');
const pdf = require('pdf-parse');

const readPDFs = async () => {
  const documentsDir = path.join(process.cwd(), 'documents');
  const fileNames = fs.readdirSync(documentsDir);
  const pdfFiles = fileNames.filter(fileName => fileName.endsWith('.pdf'));

  const documents = [];
  for (const fileName of pdfFiles) {
    const filePath = path.join(documentsDir, fileName);
    const dataBuffer = fs.readFileSync(filePath);
    const data = await pdf(dataBuffer);
    documents.push({ fileName, content: data.text });
  }
  return documents;
};

module.exports = { readPDFs };