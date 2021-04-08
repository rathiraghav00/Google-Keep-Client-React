import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import axios from "axios";
const URL = process.env.REACT_APP_API_ADDRESS_NAME;

function Register(props) {
  const [btn, setBtn] = useState(0);

  const [error, setError] = useState({
    email: "",
    password: "",
  });

  function handleChangeEmail(event) {
    const { value } = event.target;

    props.setEmail(value);
    props.setLoginPage(0);
    props.setRegPage(1);
    props.setKeepPage(0);
  }

  function handleChangePassword(event) {
    const { value } = event.target;

    props.setPassword(value);
    props.setLoginPage(0);
    props.setRegPage(1);
    props.setKeepPage(0);
  }

  function handleClick(event) {
    event.preventDefault();

    axios
      .get(URL + "auth/" + props.email)
      .then((response) => {
        if (response.data.password) {
          alert(
            "Email ID already exists in the database. Please Login or select another Email ID"
          );
        } else {
          axios
            .post(URL + "auth", {
              email_id: props.email,
              password: props.password,
            })
            .then((response) => {
              props.setKeepPage(props.email);
              props.setLoginPage(0);
              props.setRegPage(0);
              props.setPassword("");

              setBtn(1);
            })
            .catch((error) => {
              alert("There was some error while registering you!");
            });
        }
      })
      .catch((error) => {});
  }

  function validate(event) {
    event.preventDefault();

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

    setError(errors);

    if (isValid) handleClick(event);

    return isValid;
  }

  function handleLogBtn(event) {
    event.preventDefault();
    props.setKeepPage(0);
    props.setLoginPage(1);
    props.setRegPage(0);
    props.setEmail("");
    props.setPassword("");
    setBtn(1);
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
                <h3 className="text-center mb-4">Register</h3>
                <form action="#" className="login-form">
                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control rounded-left"
                      autocomplete="off"
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
                      autocomplete="off"
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
                      Register
                    </button>
                  </div>

                  <div className="form-group d-md-flex">
                    <div className="w-50"></div>
                    <div className="w-50 text-md-right">
                      <a href="#" onClick={handleLogBtn}>
                        Want to Login?
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

export default Register;
