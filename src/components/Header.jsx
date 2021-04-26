import React from "react";

function Header(props) {
  return (
    <header>
      <h1>Keep {props.status}</h1>
    </header>
  );
}

export default Header;
