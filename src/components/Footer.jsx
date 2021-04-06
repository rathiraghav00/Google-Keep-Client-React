import React from "react";

function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer>
      <p>
        Copyright ⓒ {year}. Please leave a feedback at rathi.raghav00@gmail.com
      </p>
    </footer>
  );
}

export default Footer;
