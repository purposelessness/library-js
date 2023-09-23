import {Book} from './book-repository.entities.js';

export {BookRepositoryController};

class BookRepositoryController {
  constructor(bookRepository) {
    this.bookRepository = bookRepository;
  }

  getBooks = async (req, res, next) => {
    try {
      let books_json;
      if (req.query.sortKey && req.query.sortDirection) {
        books_json = this.bookRepository.getAll(req.query.sortKey,
            req.query.sortDirection);
      } else {
        books_json = this.bookRepository.getAll();
      }
      books_json = JSON.stringify(books_json);
      res.status(200).send(books_json);
    } catch (err) {
      console.warn(
          `[BookRepository][Controller] Error while getting books: ${err.message}`);
      next(err);
    }
  };

  getBook = async (req, res, next) => {
    try {
      const isbn = parseInt(req.params.isbn);
      res.status(200).send(await this.bookRepository.get(isbn));
    } catch (err) {
      console.warn(
          `[BookRepository][Controller] Error while getting book: ${err.code}, ${err.message}`);
      next(err);
    }
  };

  addBook = async (req, res, next) => {
    try {
      const book = new Book(req.body.title, req.body.author, req.body.year);
      res.status(201).send(await this.bookRepository.add(book));
    } catch (err) {
      console.warn(
          `[BookRepository][Controller] Error while adding book: ${err.message}`);
      next(err);
    }
  };

  deleteBook = async (req, res, next) => {
    try {
      const isbn = parseInt(req.params.isbn);
      await this.bookRepository.delete(isbn);
      res.status(204).send();
    } catch (err) {
      console.warn(
          `[BookRepository][Controller] Error while deleting book: ${err.message}`);
      next(err);
    }
  };

  saveBooks = async (req, res, next) => {
    try {
      await this.bookRepository.save();
      res.status(204).send();
    } catch (err) {
      console.warn(
          `[BookRepository][Controller] Error while saving books: ${err.message}`);
      next(err);
    }
  };
}