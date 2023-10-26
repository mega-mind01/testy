var mod = document.querySelector(".hmodal");
var rmod = document.querySelector(".rmodal");
var exit = document.querySelector(".exit");
var rexit = document.querySelector(".rexit");
var subBtn = document.querySelector("#sub");
var rsubBtn = document.querySelector("#rsub");
var addBook = document.getElementById("addNew");
var favourite = document.getElementById("favourites");


exit.onclick = function () {
    mod.style.display = "none";
};


addBook.addEventListener("click", viewMod);

favourite.addEventListener("click", renderFavouriteBook);

function viewMod() {
    mod.style.display = "block";
}

subBtn.onclick = function () {
    var title = document.getElementById("input-title").value;
    var author = document.getElementById("input-author").value;
    var year = document.getElementById("input-year").value;
    var price = document.getElementById("input-price").value;
    var img = document.getElementById("input-img").value;
    var extract = document.getElementById("input-extract").value;

    let book = {
        title: title,
        author: author,
        year: year,
        price: price,
        image: img,
        extract: extract,
        favourite: false
    };

    saveBook(book);
    document.getElementById("input-title").value = "";
    document.getElementById("input-author").value = "";
    document.getElementById("input-year").value = "";
    document.getElementById("input-price").value = "";
    document.getElementById("input-img").value = "";
    document.getElementById("input-extract").value = "";
};

function saveBook(bookObject) {
    let books = localStorage.getItem("books");
    if (books == null) {
        books = [];
    } else {
        books = JSON.parse(books);
    }
    books.push(bookObject);
    localStorage.setItem("books", JSON.stringify(books));
}

function fetchBook() {
    let books = localStorage.getItem("books");
    if (books !== null) {
        return JSON.parse(books);
    } else {
        return [];
    }
}

function removeBook(title, author) {
    let books = fetchBook();
    let indexToDelete = -1;

    books.forEach((book, index) => {
        if (book.title === title && book.author === author) {
            indexToDelete = index;
        }
    });

    if (indexToDelete !== -1) {
        books.splice(indexToDelete, 1);
        localStorage.setItem("books", JSON.stringify(books));
    }
    renderBook();
}

function AddFavourite(title, author) {
    let books = fetchBook();
    let indexT = -1;

    books.forEach((book, index) => {
        if (book.title === title && book.author === author) {
            indexT = index;
        }
    });

    if (indexT !== -1) {
        let bookNow = books[indexT] ;
        if (bookNow.favourite == false)
        {
            bookNow.favourite = true;
        }
        else if (bookNow.favourite == true)
        {
            bookNow.favourite = false;
        }
        localStorage.setItem("books", JSON.stringify(books));
    }
    renderBook();
}

var search = document.getElementById("search-btn");
var searchbox = document.getElementById("search-box");

search.addEventListener("click", function() {
    searchBook(searchbox.value);
})
function searchBook(title) {
    let books = fetchBook();
    let indexBook = -1;

    books.forEach((book, index) => {
        if (book.title === title) {
            indexBook = index;
        }
    });

    if (indexBook !== -1) {
        DisplayModal(books[indexBook]);
    }
}


var main = document.querySelector("#featured");

function renderBook() {
    let books = fetchBook();
    main.innerHTML = "";

    var row = document.createElement("div");
    row.className = "row move";

    for (let i = 0; i < books.length; i++) {
        const book = books[i];

        var box = document.createElement("div");
        box.className = "col-sm-12 col-md-4 box";

        var para = document.createElement("p");

        var span1 = document.createElement("span")
        span1.className = "fa fa-minus-square";

        span1.onclick = function () {
            removeBook(book.title, book.author);
        };

        var span2 = document.createElement("span")
        span2.className = "fa fa-heart enter";

        span2.onclick = function () {
           AddFavourite(book.title, book.author);
        };

        para.appendChild(span1);
        para.appendChild(span2);

        var image = document.createElement("img");
        image.src = book.image;
        image.className = "job";

        image.onclick = function () {
            DisplayModal(book);
        };

        var title = document.createElement("h3");
        title.innerHTML = book.title;

        var author = document.createElement("p");
        author.className = "auth";
        author.innerHTML = "Author: " + book.author;

        var year = document.createElement("p");
        year.innerHTML = "Year: " + book.year;

        var price = document.createElement("p");
        price.innerHTML = "Price: $" + book.price;

        box.appendChild(para);
        box.appendChild(image);
        box.appendChild(title);
        box.appendChild(author);
        box.appendChild(year);
        box.appendChild(price);
        row.appendChild(box);

        if (book.favourite == true)
        {
            span2.style.color = "red";
        }
    }

    main.appendChild(row);
}

function renderFavouriteBook() {
    let books = fetchBook();
    main.innerHTML = "";

    var row = document.createElement("div");
    row.className = "row move";

    for (let i = 0; i < books.length; i++) {
        var book;
        if (books[i].favourite == true)
        {
            book = books[i];
        }
        else{
            continue;
        }

        var box = document.createElement("div");
        box.className = "col-sm-12 col-md-4";

        var image = document.createElement("img");
        image.src = book.image;
        image.className = "job";

        image.onclick = function () {
            DisplayModal(book);
        };

        var title = document.createElement("h3");
        title.innerHTML = book.title;

        var author = document.createElement("p");
        author.className = "auth";
        author.innerHTML = "Author: " + book.author;

        var year = document.createElement("p");
        year.innerHTML = "Year: " + book.year;

        var price = document.createElement("p");
        price.innerHTML = "Price: $" + book.price;

        box.appendChild(image);
        box.appendChild(title);
        box.appendChild(author);
        box.appendChild(year);
        box.appendChild(price);
        row.appendChild(box);
    }

    main.appendChild(row);
}

var modal = document.querySelector(".mymodal");
var modalImage = document.querySelector(".mymodal .modalImage");
var modalTitle = document.querySelector(".mymodal .title");
var modalauth = document.querySelector(".mymodal .auth");
var modalabout = document.querySelector(".mymodal .about");
var modalexit = document.querySelector(".k-exit")

function DisplayModal(book) {
    modal.style.display = "block";
    modalImage.src = book.image;
    modalTitle.innerHTML = book.title;
    modalauth.innerHTML = book.author;
    modalabout.innerHTML = book.extract;
}

modalexit.onclick = function () {
    modal.style.display = "none";
};


document.addEventListener("DOMContentLoaded", function () {
    renderBook();
});