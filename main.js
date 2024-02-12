class Library {
    constructor() {
        this.library = [];
    }

    get Library() {
        return this.library;
    }

    addBookToLibrary(author, title, pages, read) {
        this.library.push(new Book(author, title, pages, read));
        screen.renderTable();
    }
    
    removeBook(id) {
        this.library.splice(id, 1);
        screen.renderTable();
    }
}

class Book {
    constructor(author, title, pages, read) {
        this.author = author;
        this.title = title;
        this.pages = pages;
        this.read = read;
    }

    toggleRead() {
        this.read = this.read === "yes" ? "no" : "yes";
        screen.renderTable();
    }


}

class Screen {
    constructor() {
        this.table = document.querySelector("table");
        this.tableBody = document.querySelector("tbody");
        this.dialog = document.querySelector("dialog");
        this.showButton = document.querySelector("dialog + button");
        this.closeButton = document.querySelector("dialog > button");
        this.form = document.querySelector("form");
    }

    renderTable() {
        this.tableBody.innerHTML = "";

        for (let i = 0; i < myLibrary.library.length; i++) {
            let row = document.createElement("tr");

            let author = document.createElement("td")
            author.textContent = myLibrary.library[i].author;

            let title = document.createElement("td");
            title.textContent = myLibrary.library[i].title;

            let pages = document.createElement("td");
            pages.textContent = myLibrary.library[i].pages;

            let read = document.createElement("td");
            read.textContent = myLibrary.library[i].read;

            let removeButton = document.createElement("button");
            removeButton.textContent = "Remove"

            removeButton.addEventListener("click", () => {
                myLibrary.removeBook(i);
            })

            let readButton = document.createElement("button");
            readButton.textContent = `Mark ${myLibrary.library[i].read === "yes" ? "unread" : "read"}`;

            readButton.addEventListener("click", () => {
                myLibrary.library[i].toggleRead();
            })

            row.append(author, title, pages, read, removeButton, readButton);

            this.tableBody.appendChild(row);
        }
    }

    addEventListeners() {
        this.showButton.addEventListener("click", () => {
            this.dialog.showModal();
        })

        this.closeButton.addEventListener("click", () => {
            this.dialog.close();
        })

        this.form.addEventListener("submit", (e) => {
            e.preventDefault();

            let author = document.querySelector("#author").value;
            let title = document.querySelector("#title").value;
            let pages = document.querySelector("#pages").value;
            let read = document.querySelector("#yes").checked === true ? "yes" : "no";

            myLibrary.addBookToLibrary(author, title, pages, read);

            this.dialog.close();

            this.form.reset();
        })
    }
}

const myLibrary = new Library();
const screen = new Screen();
screen.addEventListeners();