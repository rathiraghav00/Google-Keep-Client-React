import React from "react";
function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer>
      <p
        style={{
          position: "fixed",
          bottom: "0",
          width: "100%",
          height: "0.5rem",
          display: "relative",
        }}
      >
        Copyright ⓒ {year}.
        <a href={process.env.REACT_APP_FB_LINK}> Please leave a feedback</a>
      </p>
    </footer>
  );
}

export default Footer;
