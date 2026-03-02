// Array to store all books
const myLibrary = [];

// Book constructor
function Book(title, author, pages, read) {
    this.id = crypto.randomUUID();   // unique identifier
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

// Prototype method to toggle read status
Book.prototype.toggleRead = function() {
    this.read = !this.read;
};

// Function to add a book to the library array
function addBookToLibrary(title, author, pages, read) {
    const newBook = new Book(title, author, pages, read);
    myLibrary.push(newBook);
    displayBooks();   // refresh the display
}

// Function to remove a book by its id
function removeBook(bookId) {
    const index = myLibrary.findIndex(book => book.id === bookId);
    if (index !== -1) {
        myLibrary.splice(index, 1);
        displayBooks();
    }
}

// Function to display all books in the grid
function displayBooks() {
    const container = document.getElementById('libraryContainer');
    container.innerHTML = '';   // clear previous cards

    myLibrary.forEach(book => {
        // Create card element
        const card = document.createElement('div');
        card.classList.add('book-card');
        card.dataset.id = book.id;   // store the unique id

        // Title
        const title = document.createElement('h3');
        title.textContent = book.title;

        // Author
        const author = document.createElement('p');
        author.classList.add('author');
        author.textContent = `by ${book.author}`;

        // Pages
        const pages = document.createElement('p');
        pages.classList.add('pages');
        pages.textContent = `${book.pages} pages`;

        // Read status badge
        const readStatus = document.createElement('span');
        readStatus.classList.add('read-status');
        if (book.read) {
            readStatus.classList.add('read');
            readStatus.textContent = '✓ Read';
        } else {
            readStatus.classList.add('not-read');
            readStatus.textContent = '📖 Not read';
        }

        // Action buttons container
        const actions = document.createElement('div');
        actions.classList.add('card-actions');

        // Toggle read button
        const toggleBtn = document.createElement('button');
        toggleBtn.classList.add('toggle-read');
        toggleBtn.textContent = 'Toggle read';
        toggleBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            const bookId = card.dataset.id;
            const targetBook = myLibrary.find(b => b.id === bookId);
            if (targetBook) {
                targetBook.toggleRead();    // using prototype method
                displayBooks();              // re-render
            }
        });

        // Remove button
        const removeBtn = document.createElement('button');
        removeBtn.classList.add('remove-btn');
        removeBtn.textContent = 'Remove';
        removeBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            const bookId = card.dataset.id;
            removeBook(bookId);
        });

        actions.appendChild(toggleBtn);
        actions.appendChild(removeBtn);

        // Assemble card
        card.appendChild(title);
        card.appendChild(author);
        card.appendChild(pages);
        card.appendChild(readStatus);
        card.appendChild(actions);

        container.appendChild(card);
    });
}

// ---------- DIALOG AND FORM HANDLING ----------
const newBookBtn = document.getElementById('newBookBtn');
const dialog = document.getElementById('bookDialog');
const closeDialogBtn = document.getElementById('closeDialogBtn');
const bookForm = document.getElementById('bookForm');

// Open dialog when "New Book" is clicked
newBookBtn.addEventListener('click', () => {
    bookForm.reset();   // clear previous inputs
    dialog.showModal();
});

// Close dialog (cancel button)
closeDialogBtn.addEventListener('click', () => {
    dialog.close();
});

// Handle form submission
bookForm.addEventListener('submit', (event) => {
    event.preventDefault();   // prevent page reload

    // Get form values
    const title = document.getElementById('title').value.trim();
    const author = document.getElementById('author').value.trim();
    const pages = parseInt(document.getElementById('pages').value);
    const read = document.getElementById('read').checked;

    // Basic validation (already required by HTML, but double-check)
    if (title && author && pages > 0) {
        addBookToLibrary(title, author, pages, read);
        dialog.close();        // close modal
    } else {
        alert('Please fill all fields correctly.');
    }
});

// ---------- INITIAL BOOKS (for testing) ----------
addBookToLibrary('The Hobbit', 'J.R.R. Tolkien', 295, true);
addBookToLibrary('1984', 'George Orwell', 328, false);
addBookToLibrary('To Kill a Mockingbird', 'Harper Lee', 281, true);
addBookToLibrary('Dune', 'Frank Herbert', 412, false);

// Display the initial library
displayBooks();
