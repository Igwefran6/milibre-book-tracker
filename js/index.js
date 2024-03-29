// Defining variables

const dialog = document.querySelector(".dialog");

const navigation = document.querySelector(".navigation");

/*Manipulation of the UI, such as making the dislog show and close, making the
toggle button to open navigation etc
*/

class Book {
    constructor(title, author, pages, isRead) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.isRead = isRead;
    }

    static addBookToLocalStorage() {
        let books = Book.getBookFromLocalStorage();
        books.push(getBookDetailsFromDialog());

        localStorage.setItem("books", JSON.stringify(books));
        Book.addBookToHTMLPage(books[books.length - 1]);
    }

    static getBookFromLocalStorage() {
        const storedBooks = localStorage.getItem("books");
        return JSON.parse(storedBooks) || [];
    }

    static addBookToHTMLPage(book) {
        let newBook = `<div class="book">
                    <div class="book-image">
                        <img
                            src="https://picsum.photos/seed/${randomSeed()}/200/200"
                            alt="book-image"
                        />
                    </div>
                    <div class="book-panel">
                        <div class="book-title">
                            <p class="overflow-ellipsis">${book.title}</p>
                        </div>
                        <div class="book-author">
                            <p class="overflow-ellipsis">${book.author}</p>
                        </div>
                        <div class="other-book-items">
                            <div class="pages">${book.pages} pages</div>
                            <div class="edit">Edit</div>
                            <div>Status: ${
                                book.isRead ? "Read" : "Not Read"
                            }</div>
                            <div class="delete">Delete</div>
                            <div>${
                                book.isRead ? "Completed" : "In progress"
                            }</div>
                        </div>
                    </div>
                </div>`;
        const htmlBookCard = document.querySelector(".books");
        htmlBookCard.innerHTML += newBook;
        clearDialog();
        anyBookYet();
    }

    static removeBookFromLocalStorage(bookTitle) {
        const storedBooks = JSON.parse(localStorage.getItem("books"));

        // Find the index of the book in the array
        const indexToFind = bookTitle.trim();

        const indexToRemove = storedBooks.findIndex(
            obj => obj["title"] === indexToFind
        );

        if (indexToRemove !== -1) {
            storedBooks.splice(indexToRemove, 1);
        }

        // Save the updated array back to local storage
        localStorage.setItem("books", JSON.stringify(storedBooks));
        anyBookYet();
    }

    static deleteBook(event) {
        const bookDiv = event.target.closest(".book");
        const bookTitle =
            event.target.closest(".book-panel").childNodes[1].textContent;

        if (bookDiv) {
            setTimeout(function () {
                bookDiv.remove();
                Book.removeBookFromLocalStorage(bookTitle);
            }, 500);
        }
    }

    static editBook(event) {
        document.removeEventListener("submit", handleSubmitEvent);
        const eventFromParam = event;
        putDivDetailsToDialog(eventFromParam);
        function handleEdit(event) {
            event.preventDefault();
            dialog.close();

            let targetBook = eventFromParam.target
                .closest(".book-panel")
                .childNodes[1].textContent.trim();

            let detailsOnDialog = getBookDetailsFromDialog();
            let storedBooks = JSON.parse(localStorage.getItem("books"));

            let bookIndex = storedBooks.findIndex(
                obj => obj.title.trim() === targetBook
            );

            if (bookIndex !== -1) {
                storedBooks.splice(bookIndex, 1, detailsOnDialog);
                localStorage.setItem("books", JSON.stringify(storedBooks));
                clearDialog();
                setTimeout(function () {
                    updateDiv(eventFromParam);
                }, 250);
            }

            function updateDiv(targetBook) {
                eventFromParam.target.closest(".book-panel").innerHTML = `
                        <div class="book-title">
                            <p class="overflow-ellipsis">${
                                detailsOnDialog.title
                            }</p>
                        </div>
                        <div class="book-author">
                            <p class="overflow-ellipsis">${
                                detailsOnDialog.author
                            }</p>
                        </div>
                        <div class="other-book-items">
                            <div class="pages">${
                                detailsOnDialog.pages
                            } pages</div>
                            <div class="edit">Edit</div>
                            <div>Status: ${
                                detailsOnDialog.isRead ? "Read" : "Not Read"
                            }</div>
                            <div class="delete">Delete</div>
                            <div>${
                                detailsOnDialog.isRead
                                    ? "Completed"
                                    : "In progress"
                            }</div>
                
                    `;
            }

            document.removeEventListener("submit", handleEdit);
            document.addEventListener("submit", handleSubmitEvent);
        }
        document.addEventListener("submit", handleEdit);
    }
}

// Necessary Events
function handleSubmitEvent(event) {
    event.preventDefault();
    Book.addBookToLocalStorage();
    dialog.close();
}

document.addEventListener("submit", handleSubmitEvent);

document.querySelector(".add-new-book").addEventListener("click", () => {
    dialog.showModal();
});

document.querySelector(".cancel").addEventListener("click", event => {
    dialog.close();
});

document.querySelector(".toggle-nav").addEventListener("click", () => {
    navigation.classList.toggle("open");
});

function getBookDetailsFromDialog() {
    let [title, author, pages, isRead] = [
        "#book-title",
        "#book-author",
        "#book-page-count",
        "#isRead"
    ].map(selector => document.querySelector(selector).value);

    isRead = document.querySelector("#isRead").checked;

    return new Book(title, author, pages, isRead);
}

// Initializing/displaying stored books in local storage

if (localStorage.getItem("books") === null) {
} else {
    let book = JSON.parse(localStorage.getItem("books"));
    book.forEach(function (book) {
        Book.addBookToHTMLPage(book);
    });
}

// using event delegate to remove book
const htmlBookCard = document.querySelector(".books");

/* Add a click event listener to the container. This is necessary for delete and edit button*/
htmlBookCard.addEventListener("click", function (event) {
    // Check if the clicked element has the class "delete"
    let containDelete = event.target.classList.contains("delete");
    if (containDelete) {
        Book.deleteBook(event);
    }

    const containEdit = event.target.classList.contains("edit");
    if (containEdit) {
        dialog.showModal();
        Book.editBook(event);
    }
});

function anyBookYet() {
    let isThereBookInPage = document.querySelector(".books");
    let div = document.querySelector(".no-books-yet");
    if (isThereBookInPage.innerHTML) {
        div.style.display = "none";
    } else {
        setTimeout(function () {
            div.style.display = "block";
        }, 100);
    }
}

function clearDialog() {
    let [title, author, pages] = [
        "#book-title",
        "#book-author",
        "#book-page-count",
        "#isRead"
    ].map(selector => (document.querySelector(selector).value = ""));
    
    document.querySelector("#isRead").checked = false
}

function putDivDetailsToDialog(param) {
    let bookPanel = param.target.closest(".book-panel");

    document.querySelector("#book-title").value =
        bookPanel.childNodes[1].textContent.trim();
    document.querySelector("#book-author").value =
        bookPanel.childNodes[3].textContent.trim();
    document.querySelector("#book-page-count").value = parseInt(
        bookPanel.childNodes[5].childNodes[1].textContent.trim()
    );

    let checkBox = document.querySelector("#isRead");

    let checkboxStatus =
        bookPanel.childNodes[5].childNodes[5].textContent.trim();

    checkboxStatus === "Status: Read"
        ? (checkBox.checked = true)
        : (checkBox.checked = false);
}

function randomSeed() {
    return JSON.stringify(Math.floor(Math.random() * 1001));
}

anyBookYet();
