import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  booksState: {
    books: [],
    isLoadingBooks: false,
    errorStatus: false, // true or false
    errorMessage: "",
    allResults: 0,
  },
  // allBooksState: {
  //   allBooks: 
  // }
};

const bookSlice = createSlice({
  name: "bookSlice",
  initialState,
  reducers: {
    setLoading(state, { payload }) {
      state.booksState.isLoadingBooks = payload;
    },
    setBooks(state, { payload }) {
      state.booksState.books = [...state.booksState.books, ...payload];
      
    },
    setError(state, { payload }) {
      const { message, status } = payload;
      state.booksState.errorMessage = message;
      state.booksState.errorStatus = status;
    },
    setDefState(state) {
      state.booksState = initialState.booksState;
    },
    setAllResults(state, { payload }) {
      state.booksState.allResults = payload;
    }
    // setNewBooks(state, {payload}){
    //   state.booksState.books.push(payload)
    // },
  },
});

export const booksSliceActions = bookSlice.actions;

export default bookSlice.reducer;
