import { useState } from "react";
import BookItems from "./BookItems";
import "../css/SearchInput.css";
import LoadMoreBtn from "./LoadMoreBtn";

import { useSelector, useDispatch } from "react-redux";
import BooksApi from "../api/BooksApi";
import Preloader from "./Preloader";

// https://github.com/fugr-ru/frontend-javascript-test-2

export default function SearchInput() {
  const dispatch = useDispatch();
  // const [allBooks, setAllBooks] = useState([]);
  const [lastIndex, setLastIndex] = useState(30);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");
  const [categoryQ, setCategoryQ] = useState("");
  const [sortingBy, setSortingBy] = useState("relevance");
  const [viewBook, setViewBook] = useState("");

  const { books, isLoadingBooks, errorStatus, errorMessage, allResults } = useSelector(
    (state) => state.bookSlice.booksState
  );

  const handleInputChange = (event) => setQuery(event.target.value);

  const sortingChange = (event) => setSortingBy(event.target.value);


  // useEffect(() => dispatch(BooksApi.setDefState()));

  console.log(isLoadingBooks)

  const getBooks = (e) => {
    e.preventDefault();
    dispatch(BooksApi.setDefState());
    let params = `q=${query}+intitle:${query}${categoryQ}&orderBy=${sortingBy}&maxResults=30`;
    dispatch(BooksApi.getBooksByParams(params));
  };

  // function getMoreBooks() {
  //   let url = `https://www.googleapis.com/books/v1/volumes?q=${query}+intitle:${query}${categoryQ}&orderBy=${sortingBy}&maxResults=30&startIndex=${lastIndex}`;

  //   fetch(url)
  //     .then((response) => response.json())
  //     .then((responseData) => {
  //       // console.log(responseData)
  //       setAllBooks(books.items.concat(responseData.items));
  //     });

  //   setLastIndex(lastIndex + 31);
  // }

  const getMoreBooks = () => {
    let params = `q=${query}+intitle:${query}${categoryQ}&orderBy=${sortingBy}&maxResults=30&startIndex=${lastIndex}`
    dispatch(BooksApi.getBooksByParams(params));
    setLastIndex(lastIndex + 31);
  };


  function categoryChange(event) {
    setCategory(event.target.value);
    event.target.value === "all"
      ? setCategoryQ("")
      : setCategoryQ("+subject:" + event.target.value);
  }

  return (
    <div className="search">
      <div className="search__container">
        <form className="search__form" onSubmit={getBooks}>
          <input
            type="text"
            placeholder="Search of books..."
            className="search__input"
            onChange={handleInputChange}
            value={query}
          />
          <div>
            <label>
              Category:
              <select value={sortingBy} onChange={sortingChange}>
                <option value="relevance">relevance</option>
                <option value="newest">newest</option>
              </select>
            </label>
            <label>
              Category:
              <select value={category} onChange={categoryChange}>
                <option value="all">all</option>
                <option value="art">art</option>
                <option value="biography">biography</option>
                <option value="computers">computers</option>
                <option value="history">history</option>
                <option value="medical">medical</option>
                <option value="poetry">poetry</option>
              </select>
            </label>
          </div>

          <input type="submit" value="Search..." />
        </form>
      </div>
      <Preloader isLoading={isLoadingBooks}/>
      <BookItems books={books} category={category} setView={setViewBook} allResults={allResults}/>
      <LoadMoreBtn
        books={books}
        getMoreBooks={getMoreBooks}
        viewBook={viewBook}
      />
    </div>
  );
}
