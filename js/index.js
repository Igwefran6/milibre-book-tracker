// Defining variables

const dialog = document.querySelector(".dialog");
const addNewBook = document.querySelector(".add-new-book");
const cancel = document.querySelector(".cancel");

const toggleNav = document.querySelector(".toggle-nav");

const navigation = document.querySelector(".navigation");

let opened;

/*Manipulation of the UI, such as making the dislog show and close, making the
toggle button to open navigation etc
*/

addNewBook.addEventListener("click", () => {
    dialog.showModal();
});

cancel.addEventListener("click", event => {
    event.preventDefault();
    dialog.close();
});

toggleNav.addEventListener("click", () => {
    navigation.classList.toggle("open");
});

class Book{
  constructor(title, author, pages, read){
    this.title = title
    this.author = author
    this.pages = pages
    this.read = read;
  }
}