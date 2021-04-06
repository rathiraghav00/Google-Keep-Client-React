import { Divider } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";

function Keep1(props) {
  return (
    <div>
      <Header />
      <h1>Hello Keep1 {props.email}</h1>

      <Footer />
    </div>
  );
}

export default Keep1;
