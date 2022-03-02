import React from "react";
import ReactDOM from "react-dom";
import "./css/reset.css";
import "./css/global.css";
import App from "./App";
import { Provider } from "./Context";

ReactDOM.render(
  <Provider>
    <App />
  </Provider>,
  document.getElementById("root")
);
