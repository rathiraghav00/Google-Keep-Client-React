import React, { useState, useEffect } from "react";
import axios from "axios";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import Keep from "./Keep";

function App() {
  let l = parseInt(localStorage.getItem("loginPage")) || 0;
  let r = parseInt(localStorage.getItem("regPage")) || 0;
  let k = parseInt(localStorage.getItem("keepPage")) || 0;
  let em = localStorage.getItem("email") || "";
  let pass = localStorage.getItem("password") || "";

  if (r == 0 && k == 0) {
    l = 1;
  } else {
    l = 0;
  }

  const [loginPage, setLoginPage] = useState(l);
  const [regPage, setRegPage] = useState(r);
  const [keepPage, setKeepPage] = useState(k);
  const [email, setEmail] = useState(em);
  const [password, setPassword] = useState(pass);

  // localStorage.setItem("loginPage", loginPage);
  // localStorage.setItem("regPage", regPage);
  // localStorage.setItem("keepPage", keepPage);
  // localStorage.setItem("email", email);
  // localStorage.setItem("password", password);
  // Hello

  useEffect(() => {
    console.log("Inside App.jsx - UseEffect");

    localStorage.setItem("loginPage", loginPage);
    localStorage.setItem("regPage", regPage);
    localStorage.setItem("keepPage", keepPage);
    localStorage.setItem("email", email);
    localStorage.setItem("password", password);

    console.log("Login Page", loginPage);
    console.log("Reg Page", regPage);
    console.log("Keep Page", keepPage);
    console.log("Password", password);
    console.log("Email", email);
  }, [loginPage, regPage, keepPage, password, email]);

  return (
    <div>
      <Route
        path="/"
        exact
        strict
        render={({ match }) =>
          loginPage ? (
            <Login
              email={email}
              password={password}
              setLoginPage={setLoginPage}
              setRegPage={setRegPage}
              setKeepPage={setKeepPage}
              setEmail={setEmail}
              setPassword={setPassword}
            />
          ) : regPage ? (
            <Register
              email={email}
              password={password}
              setLoginPage={setLoginPage}
              setRegPage={setRegPage}
              setKeepPage={setKeepPage}
              setEmail={setEmail}
              setPassword={setPassword}
            />
          ) : (
            <Keep
              email={email}
              password={password}
              setLoginPage={setLoginPage}
              setRegPage={setRegPage}
              setKeepPage={setKeepPage}
              setEmail={setEmail}
              setPassword={setPassword}
            />
          )
        }
      />
    </div>
  );
}

export default App;
