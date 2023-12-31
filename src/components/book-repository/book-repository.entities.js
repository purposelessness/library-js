export {Book};

class Book {
  constructor(title, author, year) {
    this.isbn = null;
    this.title = title;
    this.author = author;
    this.year = year;
    this.reader = null;
  }

  static fromObject(obj) {
    return Object.assign(new Book(), obj);
  }

  getDueDate() {
    return this.reader ? this.reader.dueDate : null;
  }

  setReader(name, date) {
    this.reader = {
      name: name,
      dueDate: date,
    };
  }

  removeReader() {
    this.reader = null;
  }

  isAvailable() {
    return this.reader === null;
  }

  isOverdue() {
    // Check if the book is overdue by comparing the due date with today's date
    const today = new Date();
    const dueDate = new Date(this.reader.dueDate);
    return dueDate < today;
  }

  isValid() {
    return typeof this.title === 'string' && this.title.length > 0 &&
        typeof this.author === 'string' && this.author.length > 0 &&
        typeof this.year === 'string' && this.year.length > 0;
  }
}