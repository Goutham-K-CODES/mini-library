const dataStore = require('../lib/dataStore.js');

module.exports = function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  const { method } = req;

  switch (method) {
    case 'GET':
      // GET /api/books - Get all books
      const books = dataStore.getAllBooks();
      res.status(200).json(books);
      break;

    case 'POST':
      // POST /api/books - Add new book
      const { title, author } = req.body;
      
      if (!title || !author) {
        res.status(400).json({ error: 'Title and author are required' });
        return;
      }
      
      const newBook = dataStore.addBook(title, author);
      res.status(201).json(newBook);
      break;

    default:
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
};
