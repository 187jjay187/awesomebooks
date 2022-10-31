const uid = () => Date.now().toString(36) + Math.random().toString(36).substr(2);

const booksSection = document.getElementById('library');
const form = document.getElementById('form-id');
const empty = document.getElementById('empty-id');

function showEmpty() {
  empty.classList.replace('hide', 'show');
}

function hideEmpty() {
  empty.classList.replace('show', 'hide');
}

let library = [];

class Book {
  constructor(id, title, author) {
    this.id = id;
    this.title = title;
    this.author = author;
  }

  addBook = () => {
    library.push(this);
  };

  removeBook = () => {
    library = library.filter((book) => book.id !== this.id);
  };
}

const book1 = new Book(uid(), 'Html', 'Jack');
const book2 = new Book(uid(), 'JavaScript', 'Jane');

library.push(book1);
library.push(book2);

function toggleEmpty() {
  if (!library.length) {
    showEmpty();
  } else {
    hideEmpty();
  }
}

const addRemoveListener = (book) => {
  document.getElementById(`remove-${book.id}`).addEventListener('click', (e) => {
    e.preventDefault();
    book.removeBook();
    toggleEmpty();
    const bookID = document.getElementById(`book-${book.id}`);
    if (bookID.parentNode) {
      bookID.parentNode.removeChild(bookID);
    }
  });
};

const appendBook = (book) => {
  const bookElement = document.createElement('div');
  bookElement.id = `book-${book.id}`;
  bookElement.className = 'book';
  bookElement.innerHTML = `
    <p>${book.title} by ${book.author}</p>
    <button id="remove-${book.id}" class="remove">Remove</button>
  `;

  booksSection.appendChild(bookElement);
  toggleEmpty();
};

library.forEach((book) => {
  appendBook(book);
  addRemoveListener(book);
});

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const bookTitle = document.getElementById('title');
  const bookAuthor = document.getElementById('author');
  const book = new Book(uid(), bookTitle.value, bookAuthor.value);
  book.addBook();
  appendBook(book);
  addRemoveListener(book);
  localStorage.removeItem('data');
  bookAuthor.value = '';
  bookTitle.value = '';
});
