const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());


let books = [
  { id: Date.now(), title: 'Java', author: 'Unknown', issued: false },
  { id: Date.now() + 1, title: 'C', author: 'Unknown', issued: false },
  { id: Date.now() + 2, title: 'The Miracle of Life', author: 'Unknown', issued: false }
];


app.get('/books', (req, res) => {
  res.json(books);
});


app.post('/books', (req, res) => {
  const { title, author } = req.body;
  const newBook = {
    id: Date.now(),
    title,
    author,
    issued: false
  };
  books.push(newBook);
  res.json(newBook);
});


app.post('/books/:id/toggle', (req, res) => {
  const id = parseInt(req.params.id);
  books = books.map(book =>
    book.id === id ? { ...book, issued: !book.issued } : book
  );
  res.json({ success: true });
});


app.delete('/books/:id', (req, res) => {
  const id = parseInt(req.params.id);
  books = books.filter(book => book.id !== id);
  res.json({ success: true });
});

app.listen(5000, () => console.log('Server started on port 5000'));
