import BaseApi from "./BaseApi";
import { booksSliceActions } from "../bookSlice";

class BooksApi extends BaseApi {
  getBooksByParams(params) {
    return async (dispatch) => {
      try {
        dispatch(booksSliceActions.setDefState());
        dispatch(booksSliceActions.setLoading(true));

        const url = `${this.baseURL}${params}`;

        const { items } = await this.myFetch(url);

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
}

export default new BooksApi();
