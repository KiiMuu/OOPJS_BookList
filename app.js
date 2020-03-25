// Book Constructor
function Book(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
}

// UI Constructor
function UI() {}

// add book to list
UI.prototype.addBookToList = function(book) {
    const list = document.getElementById('book-list');

    // create tr element
    const row = document.createElement('tr');
    // insert cols
    row.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td><a href="#" class="delete">X</a></td>
    `;

    list.appendChild(row);
}

// show alert
UI.prototype.showAlert = function(message, className) {
    const div = document.createElement('div');

    div.className = `alert ${className}`
    div.appendChild(document.createTextNode(message));

    const container = document.querySelector('.container');
    const form = document.querySelector('#book-form');

    container.insertBefore(div, form);

    setTimeout(function() {
        document.querySelector('.alert').remove();
    }, 3000);
}

// delete book
UI.prototype.deleteBook = function(target) {
    if (target.className === 'delete') {
        target.parentElement.parentElement.remove();
    }
}

// clear fields
UI.prototype.clearFields = function() {
    document.getElementById('title').value = '';
    document.getElementById('author').value = '';
    document.getElementById('isbn').value = '';
}

// Event Listeners
document.getElementById('book-form').addEventListener('submit', function(e) {
    e.preventDefault();

    // get form values
    const title = document.getElementById('title').value,
          author = document.getElementById('author').value,
          isbn = document.getElementById('isbn').value;
    
    // Instantiate Book
    const book = new Book(title, author, isbn);

    // Instantiate UI
    const ui = new UI();

    // validation
    if (title === '' || author === '' || isbn === '') {
        ui.showAlert('You must fill in all fields', 'error');
    } else {
        // add book to list
        ui.addBookToList(book);

        // show success alert
        ui.showAlert('Book added', 'success');

        // clear fields after adding
        ui.clearFields();
    }
});

// Event Listener for delete
document.getElementById('book-list').addEventListener('click', function(e) {
    e.preventDefault();

    // Instantiate UI
    const ui = new UI();

    // show alert
    ui.showAlert('Book deleted', 'success');

    ui.deleteBook(e.target);
});
