import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App.jsx";
import { createStore } from "redux";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store/store";
import { SidebarProvider } from "./screens/dashboard/SidebarContext";
import { Windmill } from "@windmill/react-ui";
ReactDOM.render(
  <SidebarProvider>
    <BrowserRouter>
      <Provider store={store}>
        <Windmill>
          <App />
        </Windmill>
      </Provider>
    </BrowserRouter>
  </SidebarProvider>,
  document.getElementById("root")
);
