import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import App from "./components/App";
require("dotenv").config();

ReactDOM.render(
  <div>
    <Router>
      <App />
    </Router>
  </div>,
  document.getElementById("root")
);
