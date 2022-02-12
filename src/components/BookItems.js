import { useState } from "react";
import BookImg from "./BookImg";
import "../css/BookItems.css";

const BookItems = ({ books, categorie, setView }) => {
  const [viewBook, setViewBook] = useState("");

  function viewBtnClick(id) {
    setViewBook(id);
    setView(id);
  }

  function viewBtnBackClick(id) {
    setViewBook("");
    setView("");
  }

  if (!books) return null;

  if (viewBook) {
    let item = books.find((item) => item.id === viewBook);

    const book = item.volumeInfo;
    let src;
    let category;

    if (book.categories) {
      category = "[" + book.categories + "]";
    } else {
      category = null;
    }

    if (!book.imageLinks) {
      src = null;
    } else {
      if (
        book.imageLinks.smallThumbnail &&
        book.imageLinks.smallThumbnail !== undefined
      ) {
        src = book.imageLinks.smallThumbnail;
      } else {
        src = book.imageLinks.Thumbnail;
      }
    }

    return (
      <div className="view-book">
        <div className="view-book__img-conteiner">
          <BookImg src={src} title={book.title} />
        </div>
        <div className="view-book__text-conteiner">
          <span className="categories">{category}</span>
          <p className="title">{book.title}</p>
          <p className="authors">{book.authors}</p>
          <p className="view-book__description">{book.description}</p>
          <button onClick={viewBtnBackClick}>View All Book....</button>
        </div>
      </div>
    );
  }

  return (
    <>
      <ul className="books-list">
        {books.map((item, i) => {
          const book = item.volumeInfo;
          let src;
          let category;
          let id = item.id;

          if (book.categories) {
            category = "[" + book.categories + "]";
          } else {
            category = null;
          }

          if (!book.imageLinks) {
            src = null;
          } else {
            if (
              book.imageLinks.smallThumbnail &&
              book.imageLinks.smallThumbnail !== undefined
            ) {
              src = book.imageLinks.smallThumbnail;
            } else {
              src = book.imageLinks.Thumbnail;
            }
          }

          return (
            <li className="books-list__item" key={item.etag}>
              <button
                onClick={() => viewBtnClick(id)}
                className="bookViuweBtn"
                type="button"
              >
                <div>
                  <BookImg src={src} title={book.title} />
                  <p className="categories">{category}</p>
                  <p className="title">{book.title}</p>
                  <p className="authors">{book.authors}</p>
                </div>
              </button>
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default BookItems;
