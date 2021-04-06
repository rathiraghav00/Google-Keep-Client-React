import React, { useState, useEffect } from "react";
import axios from "axios";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import Keep1 from "./Keep1";

function App() {
  const [loginPage, setLoginPage] = useState(1);
  const [regPage, setRegPage] = useState(0);
  const [keepPage, setKeepPage] = useState(0);

  return (
    <div>
      <Route
        path="/"
        exact
        strict
        render={({ match }) =>
          loginPage ? <Login /> : regPage ? <Register /> : <Keep1 />
        }
      />
    </div>
  );
}

export default App;
