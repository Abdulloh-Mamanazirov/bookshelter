let addCards = document.querySelector(".cards");
let addBookmarks = document.querySelector(".bookmarks");
let addPagination = document.querySelector(".pagination");

let noBook = document.querySelector("#info");
let totalBooks = document.querySelector("#totalBooks");
let bookmarkBtn = document.querySelector("#bookmarkBtn");
let moreBtn = document.querySelector("#moreBtn");
let order = document.querySelector(".order");
let logout = document.querySelector(".logout");

let input = document.querySelector("input");

logout.addEventListener("click", () => {
  localStorage.removeItem("token");
  window.location.reload();
});
if (!localStorage.getItem("token")) {
  window.location.replace("./pages/login.html");
}

order.addEventListener("click", () => {
  renderBooks();
  // Bitmagan *****************
  window.location.reload();
});
let orderType = '&'
let startIndex = 0


function renderBooks() {
  input.addEventListener("keyup", () => {
    fetch(
      `https://www.googleapis.com/books/v1/volumes?q=${
        input.value
      }&startIndex=${startIndex}&maxResults=6${orderType}`
    )
      .then((res) => res.json())
      .then((data) => {
        totalBooks.innerHTML = data.totalItems ? data.totalItems : 0;
        let paginationButtonsNumber = Math.floor(data.totalItems / 6);

        // Add Cards
        addCards.innerHTML = null;
        data.items.forEach((el) => {
          let cardDiv = document.createElement("div");
          cardDiv.className = "bookCard bg-white";

          let img = document.createElement("img");
          img.src = el.volumeInfo.imageLinks.thumbnail;
          img.alt = "Book Image";
          let h4 = document.createElement("h4");
          h4.className = "m-0 mt-3 bookname";
          h4.innerText =
            el.volumeInfo.title == undefined
              ? "No Information"
              : el.volumeInfo.title;
          let p1 = document.createElement("p");
          p1.className = "m-0 opacity-75 authors";
          p1.innerText =
            el.volumeInfo.authors == undefined
              ? "No Information"
              : el.volumeInfo.authors;
          let p2 = document.createElement("p2");
          p2.className = " opacity-75";
          p2.innerText =
            el.volumeInfo.publishedDate == undefined
              ? "No Information"
              : el.volumeInfo.publishedDate;
          let description = document.createElement("span");
          description.setAttribute("hidden", true);
          description.innerHTML = el.searchInfo?.textSnippet;
          let pageCount = document.createElement("span");
          pageCount.setAttribute("hidden", true);
          pageCount.innerHTML = el.volumeInfo.pageCount+'';
          let categories = document.createElement("span");
          categories.setAttribute("hidden", true);
          categories.innerHTML = el.volumeInfo.categories;
          let btnsDiv = document.createElement("div");
          btnsDiv.className =
            "btns d-flex align-items-center justify-content-between gap-3 mb-2";
          let bookmarkButton = document.createElement("button");
          bookmarkButton.className = "btn btn-warning flex-grow-1";
          bookmarkButton.innerText = "Bookmark";
          let moreInfoButton = document.createElement("button");
          moreInfoButton.setAttribute("data-bs-toggle", "offcanvas");
          moreInfoButton.setAttribute("data-bs-target", "#offcanvasRight");
          moreInfoButton.setAttribute("aria-controls", "offcanvasRight");
          moreInfoButton.className =
            "btn text-primary-emphasis bg-info-subtle flex-grow-1";
          moreInfoButton.innerText = "More Info";
          btnsDiv.appendChild(bookmarkButton);
          btnsDiv.appendChild(moreInfoButton);

          let a = document.createElement("a");
          a.className = "btn text-bg-secondary w-100";
          a.href = el.volumeInfo.previewLink;
          a.target = "_blank";
          a.innerText = "Read";

          cardDiv.appendChild(img);
          cardDiv.appendChild(h4);
          cardDiv.appendChild(p1);
          cardDiv.appendChild(p2);
          cardDiv.appendChild(description);
          cardDiv.appendChild(pageCount);
          cardDiv.appendChild(categories);
          cardDiv.appendChild(btnsDiv);
          cardDiv.appendChild(a);

          addCards.appendChild(cardDiv);

          // Bookmark button
          bookmarkButton.addEventListener("click", (e) => {
            let Info = {
              img: e.composedPath()[2].childNodes[0].currentSrc,
              author: e.composedPath()[2].childNodes[1].innerText,
              name: e.composedPath()[2].childNodes[2].innerText,
              year: e.composedPath()[2].childNodes[3].innerText,
              link: e.composedPath()[2].childNodes[5].href,
            };
            let bookInfo = JSON.parse(localStorage.bookInfo || "[]");
            bookInfo.push(Info);
            localStorage.bookInfo = JSON.stringify(bookInfo);
            renderBookmarks();
          });

          // More Info button
          moreInfoButton.addEventListener("click", (e) => {
            let offcanvas = document.createElement("div");
            offcanvas.className = "offcanvas offcanvas-end";
            offcanvas.id = "offcanvasRight";
            offcanvas.setAttribute("tabindex", "-1");
            offcanvas.setAttribute("aria-labelledby", "offcanvasRightLabel");

            let offcanvasHeader = document.createElement("div");
            offcanvasHeader.className = "offcanvas-header";
            let offcanvasName = document.createElement("h5");
            offcanvasName.className = "offcanvas-title";
            offcanvasName.id = "offcanvasRightLabel";
            offcanvasName.innerText = e.composedPath()[2].childNodes[1]
              .innerText
              ? e.composedPath()[2].childNodes[1].innerText
              : "No Information";
            let closeCanvas = document.createElement("button");
            closeCanvas.className = "btn-close";
            closeCanvas.setAttribute("type", "button");
            closeCanvas.setAttribute("data-bs-dismiss", "offcanvas");
            closeCanvas.setAttribute("aria-label", "Close");
            offcanvasHeader.appendChild(offcanvasName);
            offcanvasHeader.appendChild(closeCanvas);

            let offcanvasBody = document.createElement("div");
            offcanvasBody.className = "offcanvas-body";
            let canvasImg = document.createElement("img");
            canvasImg.className = "w-100";
            canvasImg.src = `${e.composedPath()[2].childNodes[0].currentSrc}`;
            let canvasDesc = document.createElement("p");
            canvasDesc.innerHTML = `${
              e.composedPath()[2].childNodes[4].innerText ? e.composedPath()[2].childNodes[4].innerText : "No Information"
            }`;
            let canvasAuthors = document.createElement("p");
            canvasAuthors.innerHTML = `Authors: ${
              e.composedPath()[2].childNodes[2].innerText ? e.composedPath()[2].childNodes[2].innerText : "No Information"
            }`;
            let canvasYear = document.createElement("p");
            canvasYear.innerHTML = `Year: ${
              e.composedPath()[2].childNodes[3].innerText ? e.composedPath()[2].childNodes[3].innerText : "No Information"
            }`;
            let canvasPages = document.createElement("p");
            canvasPages.innerHTML = `Pages: ${
              e.composedPath()[2].childNodes[5].innerText ? e.composedPath()[2].childNodes[5].innerText : "No Information"
            }`;
            let canvasCategories = document.createElement("p");
            canvasCategories.innerHTML = `Categories: ${
              e.composedPath()[2].childNodes[6].innerText ? e.composedPath()[2].childNodes[6].innerText : "No Information"
            }`;

            offcanvasBody.appendChild(canvasImg);
            offcanvasBody.appendChild(canvasDesc);
            offcanvasBody.appendChild(canvasAuthors);
            offcanvasBody.appendChild(canvasYear);
            offcanvasBody.appendChild(canvasPages);
            offcanvasBody.appendChild(canvasCategories);
            offcanvas.appendChild(offcanvasHeader);
            offcanvas.appendChild(offcanvasBody);
            
            document.body.appendChild(offcanvas);
          });

          // Add pagination buttons
          if (paginationButtonsNumber > 0) {
            addPagination.innerHTML = ''
            for (let i = 0; i < paginationButtonsNumber; i++) {
              let paginationButton = document.createElement('button')
              paginationButton.id = "paginationButton";
              paginationButton.className = "btn btn-secondary";
              paginationButton.innerHTML = i+1
              
            paginationButton.addEventListener("click", (e) => {
              e.target.className = 'btn btn-primary'
              
                startIndex =  startIndex+6;
                renderBooks();
              
            });
            addPagination.appendChild( paginationButton);
            }
          }
        });
        noBook.textContent = "";
      })
      .catch((error) => {
        noBook.textContent = "No results found :(";
        console.log("Error:", error);
      });
  });
}
renderBooks();
order.addEventListener("click", function () {
  orderType = "&orderBy=newest";
  renderBooks();
});
function renderBookmarks() {
  addBookmarks.innerHTML = "";
  let bookInfoLocalStorage = localStorage.getItem("bookInfo");
  bookInfoLocalStorage = JSON.parse(bookInfoLocalStorage);
  bookInfoLocalStorage.forEach((el) => {
    let bookmarkDiv = document.createElement("div");
    bookmarkDiv.className =
      "bookmark bg-secondary-subtle border rounded-4 mb-3 p-3 d-flex justify-content-between align-items-center";

    let detailsSpan = document.createElement("span");
    detailsSpan.className = "w-50";
    let bookmarkName = document.createElement("h5");
    bookmarkName.className = " m-0 bookmarkName";
    bookmarkName.textContent = el.author;
    let bookmarkAuthor = document.createElement("p");
    bookmarkAuthor.className = "fs-6 m-0 bookmarkAuthor";
    bookmarkAuthor.textContent = el.name;
    detailsSpan.appendChild(bookmarkName);
    detailsSpan.appendChild(bookmarkAuthor);

    let actionsSpan = document.createElement("span");
    actionsSpan.className = "w-50 d-flex justify-content-end";
    let readBook = document.createElement("a");
    readBook.href = el.link;
    readBook.target = "_blank";
    readBook.className = "fa-book";
    readBook.innerHTML = `<i class="fa-solid fa-book-open text-secondary fs-4" aria-hidden="true"></i>`;
    let delBook = document.createElement("i");
    delBook.className = "fa-solid fa-delete-left text-danger fs-4 ps-2";
    actionsSpan.appendChild(readBook);
    actionsSpan.appendChild(delBook);

    bookmarkDiv.appendChild(detailsSpan);
    bookmarkDiv.appendChild(actionsSpan);

    addBookmarks.appendChild(bookmarkDiv);

    delBook.addEventListener("click", (e) => {
      e.composedPath()[2].remove();
    })
  });
  
}
renderBookmarks();

let t = {
  kind: "books#volume",
  id: "FuoWzgEACAAJ",
  etag: "k0NgXyaXD54",
  selfLink: "https://www.googleapis.com/books/v1/volumes/FuoWzgEACAAJ",
  volumeInfo: {
    title: "Harry Potter: Hogwarts Trunk Collectible Set",
    authors: ["Donald Lemke"],
    publishedDate: "2021-07-27",
    description:
      "An officially licensed collectible replica of Harry Potter's trunk for the Hogwarts School of Witchcraft and Wizardry featuring a wand pen, interactive journal, enamel pin, Marauder's map, Quidditch match ticket, and more! A perfect gift for fans of the Wizarding World, the kit includes: 4-1/4 x 7\" Hogwarts-themed journal with quotes, writing prompts, and photos throughout Harry Potter's Wand pen Chocolate frog enamel pin Replicas of Harry Potter's Hogwarts acceptance letter, a train ticket on the Hogwarts Express, a Marauder's map, and a ticket to a Quidditch match Keepsake box modeled after Harry's own trunk, featuring a lock and deluxe finishes",
    industryIdentifiers: [
      {
        type: "ISBN_10",
        identifier: "0762474734",
      },
      {
        type: "ISBN_13",
        identifier: "9780762474738",
      },
    ],
    readingModes: {
      text: false,
      image: false,
    },
    pageCount: 128,
    printType: "BOOK",
    maturityRating: "NOT_MATURE",
    allowAnonLogging: false,
    contentVersion: "preview-1.0.0",
    panelizationSummary: {
      containsEpubBubbles: false,
      containsImageBubbles: false,
    },
    imageLinks: {
      smallThumbnail:
        "http://books.google.com/books/content?id=FuoWzgEACAAJ&printsec=frontcover&img=1&zoom=5&source=gbs_api",
      thumbnail:
        "http://books.google.com/books/content?id=FuoWzgEACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api",
    },
    language: "en",
    previewLink:
      "http://books.google.co.uz/books?id=FuoWzgEACAAJ&dq=harry+potter&hl=&cd=21&source=gbs_api",
    infoLink:
      "http://books.google.co.uz/books?id=FuoWzgEACAAJ&dq=harry+potter&hl=&source=gbs_api",
    canonicalVolumeLink:
      "https://books.google.com/books/about/Harry_Potter_Hogwarts_Trunk_Collectible.html?hl=&id=FuoWzgEACAAJ",
  },
  saleInfo: {
    country: "UZ",
    saleability: "NOT_FOR_SALE",
    isEbook: false,
  },
  accessInfo: {
    country: "UZ",
    viewability: "NO_PAGES",
    embeddable: false,
    publicDomain: false,
    textToSpeechPermission: "ALLOWED",
    epub: {
      isAvailable: false,
    },
    pdf: {
      isAvailable: false,
    },
    webReaderLink:
      "http://play.google.com/books/reader?id=FuoWzgEACAAJ&hl=&source=gbs_api",
    accessViewStatus: "NONE",
    quoteSharingAllowed: false,
  },
  searchInfo: {
    textSnippet:
      "This high-quality collectible replica of Harry Potter&#39;s Hogwarts trunk from the Harry Potter films includes a keepsake box, wand pen, interactive journal, enamel pin, Marauder&#39;s Map and more!",
  },
};
