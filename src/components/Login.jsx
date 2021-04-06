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
    console.log("Login Button Clicked");

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
      <section className="ftco-section">
        <Header />
        <div className="container">
          <div className="row justify-content-center">
            <div clasNames="col-md-6 text-center mb-5">
              <h2 className="heading-section"></h2>
            </div>
          </div>
          <div className="row justify-content-center">
            <div className="col-md-7 col-lg-5">
              <div className="login-wrap p-4 p-md-5">
                <div className="icon d-flex align-items-center justify-content-center">
                  <span className="fa fa-user-o"></span>
                </div>
                <h3 className="text-center mb-4">Log In</h3>
                <form action="#" className="login-form">
                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control rounded-left"
                      required
                      value={props.email}
                      placeholder="Enter your Email ID"
                      onChange={handleChangeEmail}
                    />
                    <div className="text-danger">{error.email}</div>
                  </div>

                  <div className="form-group d-flex">
                    <input
                      type="password"
                      className="form-control rounded-left"
                      required
                      value={props.password}
                      placeholder="Enter your password"
                      onChange={handleChangePassword}
                    />
                    <div className="text-danger">{error.password}</div>
                  </div>
                  <div className="form-group">
                    <button
                      type="submit"
                      className="form-control btn btn-outline-primary rounded submit px-3"
                      onClick={validate}
                    >
                      Login
                    </button>
                  </div>

                  <div className="form-group d-md-flex">
                    <div className="w-50"></div>
                    <div className="w-50 text-md-right">
                      <a href="#" onClick={handleRegBtn}>
                        Want to register?
                      </a>
                    </div>
                  </div>
                </form>
                {setBtn && validate && <Route path="/" exact strict />}
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </section>

      {/* 
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

      */}
    </div>
  );
}

export default Login;

{
  /* <section class="ftco-section">
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-md-6 text-center mb-5">
        <h2 class="heading-section">Login Page</h2>
      </div>
    </div>
    <div class="row justify-content-center">
      <div class="col-md-7 col-lg-5">
        <div class="login-wrap p-4 p-md-5">
          <div class="icon d-flex align-items-center justify-content-center">
            <span class="fa fa-user-o"></span>
          </div>
          <h3 class="text-center mb-4">Sign In</h3>
          <form action="#" class="login-form">
            <div class="form-group">
              <input
                type="text"
                class="form-control rounded-left"
                placeholder="Username"
                required
              />
            </div>
            <div class="form-group d-flex">
              <input
                type="password"
                class="form-control rounded-left"
                placeholder="Password"
                required
              />
            </div>
            <div class="form-group">
              <button
                type="submit"
                class="form-control btn btn-primary rounded submit px-3"
              >
                Login
              </button>
            </div>
            <div class="form-group d-md-flex">
              <div class="w-50"></div>
              <div class="w-50 text-md-right">
                <a href="#">Forgot Password</a>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</section>; */
}
