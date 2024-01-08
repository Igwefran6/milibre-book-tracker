// Defining variables

const dialog = document.querySelector(".dialog");

const navigation = document.querySelector(".navigation");

/*Manipulation of the UI, such as making the dislog show and close, making the
toggle button to open navigation etc
*/

class Book {
    constructor(title, author, pages, read) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
    }

    static setBookToLocalStorage() {
        localStorage.setItem("book", "work book set");
    }

    static getBookFromLocalStorage() {
        return localStorage.getItem("book");
    }

    static displayBooks() {
        this.setBookToLocalStorage();
        console.log((this.title = title));
    }
}

// Necessary Events
document.querySelector(".ok").addEventListener("click", event => {
    // event.preventDefault();
    Book.displayBooks();
    dialog.close();
});

document.querySelector(".add-new-book").addEventListener("click", () => {
    dialog.showModal();
});

document.querySelector(".cancel").addEventListener("click", event => {
    event.preventDefault();
    dialog.close();
});

document.querySelector(".toggle-nav").addEventListener("click", () => {
    navigation.classList.toggle("open");
});

let title = document.querySelector("#book-title").value,
    author = document.querySelector("#book-author").value,
    pages = document.querySelector("#book-page-count").value,
    isRead = document.querySelector("#isRead").checked;

let book = new Book(title, author, pages, isRead);
