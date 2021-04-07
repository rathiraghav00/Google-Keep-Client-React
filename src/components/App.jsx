import React, { useState, useEffect } from "react";
import axios from "axios";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import Keep from "./Keep";

// localStorage.clear();

function App() {
  const [loginPage, setLoginPage] = useState(0);
  const [regPage, setRegPage] = useState(0);
  const [keepPage, setKeepPage] = useState(0);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // localStorage.setItem("loginPage", loginPage);
  // localStorage.setItem("regPage", regPage);
  // localStorage.setItem("keepPage", keepPage);
  // localStorage.setItem("email", email);
  // localStorage.setItem("password", password);

  useEffect(() => {
    console.log("Inside App.jsx - UseEffect");

    let l = parseInt(localStorage.getItem("loginPage")) || 0;
    setLoginPage(l);
    // console.log("Login Page", l);

    let r = parseInt(localStorage.getItem("regPage")) || 0;
    setRegPage(r);
    // console.log("Reg Page", r);

    let k = parseInt(localStorage.getItem("keepPage")) || 0;
    setKeepPage(k);
    // console.log("Keep Page", k);

    let em = localStorage.getItem("email") || "";
    setEmail(em);

    let pass = localStorage.getItem("password") || "";
    setPassword(pass);

    if (r == 0 && k == 0) {
      l = 1;
    } else {
      l = 0;
    }

    setLoginPage(l);

    console.log("Login Page", l);

    console.log("Login Page", loginPage);
    console.log("Reg Page", regPage);
    console.log("Keep Page", keepPage);
    console.log("Password", pass);
    console.log("Email", em);
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
