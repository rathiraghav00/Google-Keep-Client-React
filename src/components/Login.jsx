import React, { useState } from "react";
import { Route } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import axios from "axios";
const URL = process.env.REACT_APP_API_ADDRESS_NAME;

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
    props.setLoginPage(1);
    props.setRegPage(0);
    props.setKeepPage(0);
    console.log("Update value and email", value, props.email);
  }

  function handleChangePassword(event) {
    const { value } = event.target;
    console.log("Password", value);
    props.setPassword(value);
    props.setLoginPage(1);
    props.setRegPage(0);
    props.setKeepPage(0);

    console.log("Update value and password", value, props.password);
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
          alert("Email ID does not exist in the database. Please check again");
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

  function validate(event) {
    event.preventDefault();
    console.log("Login Button Clicked");

    let email = props.email;
    let password = props.password;

    let errors = {};
    let isValid = true;

    if (!password || password == null) {
      isValid = false;
      errors["password"] = "Please enter a valid password";
    }

    if (!email || email == null) {
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

    if (isValid) handleClick(event);

    return isValid;
  }

  return (
    <div>
      <section className="ftco-section">
        <Header />
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-6 text-center mb-5">
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
    </div>
  );
}

export default Login;
