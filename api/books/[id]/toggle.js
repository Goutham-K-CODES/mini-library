const dataStore = require('../../../lib/dataStore.js');

module.exports = function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
    return;
  }

  const { id } = req.query;
  
  if (!id) {
    res.status(400).json({ error: 'Book ID required' });
    return;
  }

  // Check if book exists
  const book = dataStore.getBook(id);
  if (!book) {
    res.status(404).json({ error: 'Book not found' });
    return;
  }

  // Toggle book issue status
  const result = dataStore.toggleBookStatus(id);
  res.status(200).json(result);
};
