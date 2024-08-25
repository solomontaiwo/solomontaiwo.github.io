import React, { useState, useEffect } from "react";
import "./App.css";
import { FaSun, FaMoon } from "react-icons/fa";

function App() {
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setIsDarkTheme(savedTheme === "dark");
      document.body.classList.toggle("dark-theme", savedTheme === "dark");
    } else {
      const prefersDarkScheme = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      setIsDarkTheme(prefersDarkScheme);
      document.body.classList.toggle("dark-theme", prefersDarkScheme);
    }
  }, []);

  const toggleTheme = () => {
    setIsDarkTheme((prevTheme) => {
      const newTheme = !prevTheme;
      document.body.classList.toggle("dark-theme", newTheme);
      localStorage.setItem("theme", newTheme ? "dark" : "light");
      return newTheme;
    });
  };

  return (
    <div className="App">
      <nav className="navbar">
        <ul>
          <li>
            <a href="https://github.com/solomontaiwo">Github</a>
          </li>
          <li>
            <a href="https://www.linkedin.com/in/solomon-taiwo-7a151b1a3/">
              LinkedIn
            </a>
          </li>
          <li>
            <a href="https://www.instagram.com/solomon.taiwo/">Instagram</a>
          </li>
          <button className="theme-toggle" onClick={toggleTheme}>
            {isDarkTheme ? <FaSun /> : <FaMoon />}
          </button>
        </ul>
      </nav>
      {/* Centering the profile content */}
      <div
        className="profile-content"
        style={{
          maxWidth: "800px",
          margin: "0 auto",
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <img
          src="/images/solomon-profile-photo.jpg"
          alt="Solomon Taiwo"
          className="profile-photo"
        />
        <h1>Solomon Taiwo</h1>
        <p>
          Bachelor's Degree in Computer Science at the{" "}
          <a
            href="https://corsi.unife.it/informatica"
            target="_blank"
            rel="noopener noreferrer"
          >
            University of Ferrara
          </a>{" "}
          and currently pursuing a Master's Degree in Computer Engineering
          (Artificial Intelligence and Data Analysis) at the{" "}
          <a
            href="https://www.polito.it/en/education/master-s-degree-programmes/computer-engineering"
            target="_blank"
            rel="noopener noreferrer"
          >
            Polytechnic University of Turin
          </a>
          {"."}
          <br /> <br />
          Working as a Software Engineer at{" "}
          <a
            href="https://www.teleconsys.it/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Teleconsys
          </a>
          .
          <hr />
          <h3>Some projects</h3>
          <a
            href="https://solomontaiwo.github.io/SoldiSotto/"
            target="_blank"
            rel="noreferrer"
          >
            SoldiSotto
          </a>
          <br />
          <a
            href="https://solomontaiwo.github.io/casual-contact-us/"
            target="_blank"
            rel="noreferrer"
          >
            Casual Contact Us
          </a>
          <br />
          <a
            href="https://solomontaiwo.github.io/i-consigli-della-nonna/"
            target="_blank"
            rel="noreferrer"
          >
            I consigli della nonna
          </a>
          <br />
          <a
            href="https://github.com/solomontaiwo/The-Artist-Room/"
            target="_blank"
            rel="noreferrer"
          >
            The Artist Room
          </a>
          <br />
          <a
            href="https://www.kshopgraphics.com/"
            target="_blank"
            rel="noreferrer"
          >
            K-Shop Graphics
          </a>
        </p>
      </div>
    </div>
  );
}

export default App;
