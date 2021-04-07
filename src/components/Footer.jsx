import React from "react";

function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer>
      <p>
        Copyright ⓒ {year}.
        <a href="https://docs.google.com/forms/d/e/1FAIpQLSffDJqB2tpa3MTmyeL15oVpfERTvYy1nl-GhQ7z-Fz4_yEuDg/viewform?vc=0&c=0&w=1&flr=0&gxids=7628">
          Please leave a feedback
        </a>
      </p>
    </footer>
  );
}

export default Footer;
