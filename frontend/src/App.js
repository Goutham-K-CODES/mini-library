import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [books, setBooks] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newAuthor, setNewAuthor] = useState('');

  const fetchBooks = async () => {
    const res = await axios.get('http://localhost:5000/books');
    setBooks(res.data);
  };

  const toggleIssue = async (id, issued) => {
    if (issued) {
      
      await axios.delete(`http://localhost:5000/books/${id}`);
    } else {
     
      await axios.post(`http://localhost:5000/books/${id}/toggle`);
    }
    fetchBooks();
  };

  const addBook = async () => {
    await axios.post('http://localhost:5000/books', {
      title: newTitle,
      author: newAuthor
    });
    setNewTitle('');
    setNewAuthor('');
    setShowModal(false);
    fetchBooks();
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  return (
    <div className="App">
      <h1>Mini Library App</h1>
      <button className='add-btn' onClick={() => setShowModal(true)}>+</button>

      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {books.map(book => (
            <tr key={book.id}>
              <td>{book.title}</td>
              <td>{book.author}</td>
              <td>{book.issued ? 'Issued' : 'Available'}</td>
              <td>
                <button onClick={() => toggleIssue(book.id, book.issued)}>
                  {book.issued ? 'Return' : 'Issue'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

     
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h3>Add a New Book</h3>
            <input
              type="text"
              placeholder="Title"
              value={newTitle}
              onChange={e => setNewTitle(e.target.value)}
            />
            <input
              type="text"
              placeholder="Author"
              value={newAuthor}
              onChange={e => setNewAuthor(e.target.value)}
            />
            <button onClick={addBook}>Add</button>
            <button onClick={() => setShowModal(false)}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
