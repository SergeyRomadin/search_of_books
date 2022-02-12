import { configureStore } from "@reduxjs/toolkit";
import bookSlice from "./bookSlice";

export const store = configureStore({
  reducer: {
    bookSlice,
  },
});
