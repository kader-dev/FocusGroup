import React from "react";
import ReactDOM from "react-dom";

import App from "./App.jsx";
import { createStore } from "redux";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";

ReactDOM.render(
  <div>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </div>,
  document.getElementById("root")
);
