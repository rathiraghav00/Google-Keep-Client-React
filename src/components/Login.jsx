import { Divider } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import axios from "axios";
import { Button } from "react-bootstrap";
const URL = "https://fierce-shore-80067.herokuapp.com/";

function Login(props) {
  const [btn, setBtn] = useState(0);

  const [error, setError] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    console.log("Email props", props.email);
    console.log("Password", props.password, props.password);
  }, [props.email, props.password]);

  function handleChangeEmail(event) {
    const { value } = event.target;
    console.log("Email value", value);
    props.setEmail(value);
  }

  function handleChangePassword(event) {
    const { value } = event.target;
    console.log("Password", value);
    props.setPassword(value);

    console.log("Email", props.email, props.email);
    console.log("Password", value, props.password);
  }

  function handleClick() {
    axios
      .get(URL + "auth/" + props.email)
      .then((response) => {
        console.log(response.data);

        if (response.data.password === props.password) {
          props.setKeepPage(props.email);
          props.setLoginPage(0);
          props.setRegPage(0);
          props.setPassword("");

          console.log("User Authenticated");

          setBtn(1);
        } else if (response.data.password) {
          alert("Wrong Password !!");
        } else {
          alert(
            "Email ID doesnot exist in the database. Please click on the Register Button"
          );
        }
      })
      .catch((error) => {
        console.log("Error : ", error);
      });
  }

  function handleRegBtn(event) {
    event.preventDefault();
    props.setKeepPage(0);
    props.setLoginPage(0);
    props.setRegPage(1);
    props.setEmail("");
    props.setPassword("");
    setBtn(1);

    console.log("Going to Registration Page");
  }

  function validate() {
    let email = props.email;
    let password = props.password;

    let errors = {};
    let isValid = true;

    if (!password) {
      isValid = false;
      errors["password"] = "Please enter a valid password";
    }

    if (!email) {
      isValid = false;
      errors["email"] = "Please enter a valid email address.";
    }

    if (typeof email !== "undefined") {
      var pattern = new RegExp(
        /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
      );

      if (!pattern.test(email)) {
        isValid = false;
        errors["email"] = "Please enter a valid email address.";
      }
    }

    console.log(errors, email, password);

    setError(errors);

    if (isValid) handleClick();

    return isValid;
  }

  return (
    <div>
      <Header status="Login Page" />
      <div style={{ margin: "10% ", align: "center" }}>
        <br />
        <input
          className="form-group col-md-6"
          type="text"
          value={props.email}
          placeholder="Enter your Email ID"
          onChange={handleChangeEmail}
        ></input>

        <div className="text-danger">{error.email}</div>

        <br />

        <input
          className="form-group col-md-6"
          type="text"
          align="center"
          value={props.password}
          placeholder="Enter your password"
          onChange={handleChangePassword}
        ></input>

        <div className="text-danger">{error.password}</div>

        <br />

        <Button variant="outline-warning" onClick={validate}>
          Login
        </Button>

        <br />

        <Button variant="link" onClick={handleRegBtn}>
          Don't have an account ? Register Here
        </Button>

        {setBtn && validate && <Route path="/" exact strict />}
      </div>

      <Footer />
    </div>
  );
}

export default Login;
