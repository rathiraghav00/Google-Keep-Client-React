import { Divider } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import axios from "axios";
import { Button } from "react-bootstrap";

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
    axios
      .get("http://localhost:3000/auth/" + props.email)
      .then((response) => {
        console.log(response.data);

        if (response.data.password === props.password) {
          props.setKeepPage(props.email);
          props.setLoginPage(0);
          props.setRegPage(0);

          console.log("User Authenticated");

          setBtn(1);
        } else {
          alert("Wrong UserName or Password!. Pls check again");
        }
      })
      .catch((error) => {
        console.log("Error : ", error);
      });
  }

  function handleRegBtn() {
    props.setKeepPage(0);
    props.setLoginPage(0);
    props.setRegPage(1);

    console.log("I have been clicked");

    setBtn(1);
  }

  return (
    <div>
      <Header />
      <div style={{ margin: "10% ", align: "center" }}>
        <br />
        <input
          className="form-group col-md-6"
          type="text"
          value={props.email}
          placeholder="Pls enter your Email ID"
          onChange={handleChangeEmail}
        ></input>

        <br />

        <input
          className="form-group col-md-6"
          type="text"
          align="center"
          value={props.password}
          placeholder="Pls enter your Email ID"
          onChange={handleChangePassword}
        ></input>

        <br />

        <Button variant="outline-warning" onClick={handleClick}>
          Login
        </Button>

        <br />

        <Button variant="link" onClick={handleRegBtn}>
          Don't have a account ? Register Here
        </Button>

        {setBtn && <Route path="/" exact strict />}
      </div>

      <Footer />
    </div>
  );
}

export default Login;
