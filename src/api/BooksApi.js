import BaseApi from "./BaseApi";
import { booksSliceActions } from "../bookSlice";

class BooksApi extends BaseApi {
  baseURL = "https://www.googleapis.com/books/v1/volumes?";

  getBooksByParams(params) {
    return async (dispatch) => {
      try {
        dispatch(booksSliceActions.setLoading(true));

        const url = `${this.baseURL}${params}`;

        const { items, totalItems } = await this.myFetch(url);

        dispatch(booksSliceActions.setAllResults(totalItems))
        dispatch(booksSliceActions.setBooks(items));
      } catch (e) {
        dispatch(
          booksSliceActions.setError({ status: true, message: e.message })
        );
      } finally {
        dispatch(booksSliceActions.setLoading(false));
      }
    };
  }
  setDefState() {
    return (dispatch) => dispatch(booksSliceActions.setDefState());
  }
}

export default new BooksApi();
