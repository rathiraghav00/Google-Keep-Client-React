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

  function handleClick(event) {
    event.preventDefault();
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

        <br />

        <input
          className="form-group col-md-6"
          type="text"
          align="center"
          value={props.password}
          placeholder="Enter your password"
          onChange={handleChangePassword}
        ></input>

        <br />

        <Button variant="outline-warning" onClick={handleClick}>
          Login
        </Button>

        <br />

        <Button variant="link" onClick={handleRegBtn}>
          Don't have an account ? Register Here
        </Button>

        {setBtn && <Route path="/" exact strict />}
      </div>

      <Footer />
    </div>
  );
}

export default Login;
