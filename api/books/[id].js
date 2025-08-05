const dataStore = require('../../lib/dataStore.js');

module.exports = function handler(req, res) {
 
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  const { method, query } = req;
  const { id } = query;

  if (!id) {
    res.status(400).json({ error: 'Book ID required' });
    return;
  }

  switch (method) {
    case 'GET':
      
      const book = dataStore.getBook(id);
      if (!book) {
        res.status(404).json({ error: 'Book not found' });
        return;
      }
      res.status(200).json(book);
      break;

    case 'DELETE':
     
      const deleteResult = dataStore.deleteBook(id);
      res.status(200).json(deleteResult);
      break;

    default:
      res.setHeader('Allow', ['GET', 'DELETE']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
};
