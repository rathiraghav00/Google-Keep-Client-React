import React from "react";

function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer>
      <p>
        Copyright ⓒ {year}. Please leave a feedback at
        mindYourOwnBusiness@gmail.com
      </p>
    </footer>
  );
}

export default Footer;
