const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

// MongoDB Connection
mongoose.connect('<your-mongodb-uri>', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB Atlas'))
.catch(err => console.error(err));

// Mongoose Model
const Book = require('./models/Book');

// CRUD Endpoints

// GET all books
app.get('/books', async (req, res) => {
  const books = await Book.find();
  res.json(books);
});

// GET book by ID
app.get('/books/:id', async (req, res) => {
  const book = await Book.findById(req.params.id);
  res.json(book);
});

// POST create a new book
app.post('/books', async (req, res) => {
  const newBook = new Book(req.body);
  await newBook.save();
  res.json(newBook);
});

// DELETE book by ID
app.delete('/books/:id', async (req, res) => {
  await Book.findByIdAndDelete(req.params.id);
  res.json({ message: 'Book deleted' });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));