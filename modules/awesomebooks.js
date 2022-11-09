const uid = () => Date.now().toString(36) + Math.random().toString(36).substr(2);

const booksSection = document.getElementById('library');
const form = document.getElementById('form-id');
const empty = document.getElementById('empty-id');

function displayEmpty() {
  empty.classList.toggle('hide');
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

const addRemoveListener = (book) => {
  document.getElementById(`remove-${book.id}`).addEventListener('click', (e) => {
    e.preventDefault();
    book.removeBook();
    localStorage.setItem('library', JSON.stringify(library));
    if (!library.length) {
      displayEmpty();
    }
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
    <p class="booktext">${book.title} by ${book.author}</p>
    <button id="remove-${book.id}" class="remove"><i class="fa-solid fa-trash-can"></i> remove</button>
  `;

  booksSection.appendChild(bookElement);
  if (library.length === 1) {
    displayEmpty();
  }
};

if (localStorage.getItem('library')) {
  const libraryData = JSON.parse(localStorage.getItem('library'));
  libraryData.forEach((book) => {
    const newBook = new Book(book.id, book.title, book.author);
    library.push(newBook);
    appendBook(newBook);
    addRemoveListener(newBook);
  });
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const bookTitle = document.getElementById('title');
  const bookAuthor = document.getElementById('author');
  const book = new Book(uid(), bookTitle.value, bookAuthor.value);
  book.addBook();
  localStorage.setItem('library', JSON.stringify(library));
  appendBook(book);
  addRemoveListener(book);
  localStorage.removeItem('formData');
  bookAuthor.value = '';
  bookTitle.value = '';
});

const listElement = document.getElementById('booklisttitle');
const formElement = document.getElementById('addnewbooktitle');
const contactElement = document.getElementById('contactBtn');
const listBody = document.querySelector('.empty hide');
const formBody = document.getElementById('form-id');
const contactBody = document.querySelector('.contact-class');

listElement.addEventListener('click', () => {
  listBody.style.display = 'block';
  formBody.style.display = 'none';
  contactBody.style.display = 'none';
});

formElement.addEventListener('click', () => {
  formBody.style.display = 'block';
  listBody.style.display = 'none';
  contactBody.style.display = 'none';
});

contactElement.addEventListener('click', () => {
  contactBody.style.display = 'flex';
  listBody.style.display = 'none';
  formBody.style.display = 'none';
});
