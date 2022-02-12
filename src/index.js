import React from "react";
import App from "./App";

import { render } from "react-dom";
import "./css/index.css";

import { store } from "./store";
import { Provider } from "react-redux";

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
