import { Divider } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";

function Login(props) {
  const [btn, setBtn] = useState(0);

  function handleChangeEmail(event) {
    const { value } = event.target;
    console.log("Email", value);
    props.setEmail(value);
  }

  function handleChangePassword(event) {
    const { value } = event.target;
    console.log("Password", value);
    props.setPassword(value);
  }

  function handleClick() {
    props.setKeepPage(1);
    props.setLoginPage(0);
    props.setRegPage(0);

    console.log("I have been clicked");

    setBtn(1);
  }

  return (
    <div>
      <input
        type="text"
        value={props.email}
        placeholder="Pls enter your Email ID"
        onChange={handleChangeEmail}
      ></input>

      <input
        type="text"
        value={props.password}
        placeholder="Pls enter your Email ID"
        onChange={handleChangePassword}
      ></input>

      <button onClick={handleClick}>Click Me</button>

      {setBtn && <Route path="/" exact strict />}

      <h1>Hello Login</h1>
    </div>
  );
}

export default Login;
