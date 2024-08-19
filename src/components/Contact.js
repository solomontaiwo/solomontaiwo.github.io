import React from "react";

function Contact() {
  return (
    <div className="contact-section">
      <h1 id="contact" className="contact-title">
        Contact me
      </h1>
      <div className="text-center">
        <p>
          Need more? Don't hesitate to reach out via the contact links below if
          you have any inquiries or opportunities to discuss.
        </p>
        <a
          href="https://www.linkedin.com/in/solomon-taiwo-7a151b1a3/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <i className="fab fa-linkedin"></i> LinkedIn
        </a>{" "}
        -
        <a
          href="https://www.instagram.com/solomon.taiwo/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <i className="fab fa-instagram"></i> Instagram
        </a>{" "}
        -
        <a
          href="https://github.com/solomontaiwo/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <i className="fab fa-github"></i> Github
        </a>{" "}
        -
        <a href="mailto:taiwo.o.solomon@gmail.com">
          <i className="fab fa-envelope"></i> E-mail
        </a>
      </div>
    </div>
  );
}

export default Contact;
