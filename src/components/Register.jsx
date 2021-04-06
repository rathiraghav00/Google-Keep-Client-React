import { Divider } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import axios from "axios";
import { Button } from "react-bootstrap";
const URL = "https://fierce-shore-80067.herokuapp.com/";

function Register(props) {
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
    axios
      .post(URL + "auth", {
        email_id: props.email,
        password: props.password,
      })
      .then((response) => {
        console.log("Successfully added new user");

        props.setKeepPage(props.email);
        props.setLoginPage(0);
        props.setRegPage(0);

        console.log("User Added");

        setBtn(1);
      })
      .catch((error) => {
        console.log("Error : ", error);
        alert("There was some error while registering you!");
      });
  }

  return (
    <div>
      <Header />
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

      <Button variant="link" onClick={handleClick}>
        Register - Submit
      </Button>

      {setBtn && <Route path="/" exact strict />}

      <h1>Hello Register</h1>
      <Footer />
    </div>
  );
}

export default Register;
