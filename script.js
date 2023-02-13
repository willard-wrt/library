const myLibrary = [];

class Book {
  constructor(title, author, pages, status) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.status = status;
  }
}

function addBookToLibrary(title, author, pages, status) {
  const book = new Book(title, author, pages, status);
  myLibrary.push(book);
  showBooks();
}

function showNumbers() {
  const bookRead = document.querySelector('#total-read');
  const bookTotal = document.querySelector('#total-books');
  const bookPages = document.querySelector('#total-pages');
  let readCount = 0;
  let readPageCount = 0;
  let pageCount = 0;
  bookTotal.textContent = ` ${myLibrary.length}`;

  for (i = 0; i < myLibrary.length; i += 1) {
    if (myLibrary[i].status === true) {
      readCount += 1;
      readPageCount += parseInt(myLibrary[i].pages);
    }
    pageCount += parseInt(myLibrary[i].pages);
  }
  bookPages.textContent = ` ${readPageCount}/${pageCount}`;
  bookRead.textContent = ` ${readCount}`;
}

function showBooks() {
  const bookList = document.querySelector('.main-library');
  showNumbers();
  bookList.textContent = '';
  for (let i = 0; i < myLibrary.length; i++) {
    const bookCard = document.createElement('div');
    const bookText = document.createElement('div');
    const bookBtn = document.createElement('div');
    bookCard.classList.add('book');
    bookList.appendChild(bookCard);
    bookText.classList.add('text-book');
    bookCard.appendChild(bookText);
    bookBtn.classList.add('button-book');
    bookCard.appendChild(bookBtn);
    //  Assign its own index in myLibrary array
    bookCard.dataset.index = i;

    //  Title
    const bookTitle = document.createElement('p');
    bookTitle.textContent = myLibrary[i].title;
    bookText.appendChild(bookTitle);

    //  Author
    const bookAuthor = document.createElement('p');
    bookAuthor.textContent = `By: ${myLibrary[i].author}`;
    bookText.appendChild(bookAuthor);

    //  Pages
    const bookPages = document.createElement('p');
    bookPages.textContent = `${myLibrary[i].pages} pages`;
    bookText.appendChild(bookPages);

    // Status
    const bookStatus = document.createElement('button');
    let statusText = '';
    console.log(myLibrary[i].status);
    if (myLibrary[i].status === true) {
      bookStatus.classList.add('btn', 'green-btn');
      statusText = 'Read';
    } else {
      bookStatus.classList.add('btn', 'red-btn');
      statusText = 'Not Read';
    }
    bookStatus.textContent = statusText;
    bookBtn.appendChild(bookStatus);

    // Remove Button
    const bookRemove = document.createElement('button');
    bookRemove.classList.add('btn', 'remove');
    bookRemove.textContent = 'Remove';
    bookBtn.appendChild(bookRemove);
  }
}

function getBookInfo(event) {
  event.preventDefault();
  const title = document.getElementById('title').value;
  const author = document.getElementById('author').value;
  const pages = document.getElementById('pages').value;
  const status = document.getElementById('checkbox').checked;
  addBookToLibrary(title, author, pages, status);
}

function clickEvent() {
  document.addEventListener('click', (event) => {
    const { target } = event;
    const book = target.parentNode.parentNode.dataset.index;
    if (target.id === 'add-book') {
      getBookInfo(event);
    } else if (target.classList.contains('remove')) {
      console.log('remove pressed');
      myLibrary.splice(book, 1);
      console.log(myLibrary);
      showBooks();
    } else if (target.classList.contains('green-btn')) {
      target.classList.remove('green-btn');
      target.classList.add('red-btn');
      target.textContent = 'Not Read';
      myLibrary[book].status = false;
      console.log(myLibrary);
      showNumbers();
    } else if (target.classList.contains('red-btn')) {
      target.classList.remove('red-btn');
      target.classList.add('green-btn');
      target.textContent = 'Read';
      myLibrary[book].status = true;
      console.log(myLibrary);
      showNumbers();
    }
  });
}

clickEvent();
