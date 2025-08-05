

class DataStore {
  constructor() {
    this.books = [
      { id: 1, title: 'Java', author: 'Unknown', issued: false },
      { id: 2, title: 'C', author: 'Unknown', issued: false },
      { id: 3, title: 'The Miracle of Life', author: 'Unknown', issued: false }
    ];
    this.nextId = 4;
  }

  getAllBooks() {
    return this.books;
  }

  addBook(title, author) {
    const newBook = {
      id: this.nextId++,
      title,
      author,
      issued: false
    };
    this.books.push(newBook);
    return newBook;
  }

  toggleBookStatus(id) {
    const bookId = parseInt(id);
    this.books = this.books.map(book =>
      book.id === bookId ? { ...book, issued: !book.issued } : book
    );
    return { success: true };
  }

  deleteBook(id) {
    const bookId = parseInt(id);
    this.books = this.books.filter(book => book.id !== bookId);
    return { success: true };
  }

  getBook(id) {
    const bookId = parseInt(id);
    return this.books.find(book => book.id === bookId);
  }
}


const dataStore = new DataStore();

module.exports = dataStore;
