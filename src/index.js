import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";

const email = "123@gmail.com";

ReactDOM.render(<App email_address={email} />, document.getElementById("root"));
