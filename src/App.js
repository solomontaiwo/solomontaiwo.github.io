// src/App.js

import React, { useState, useEffect } from "react";
import "./App.css";
import { FaSun, FaMoon } from "react-icons/fa"; // Importing icons

function App() {
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  // Check for saved theme preference in localStorage or use system default
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setIsDarkTheme(savedTheme === "dark");
      document.body.classList.toggle("dark-theme", savedTheme === "dark");
    } else {
      // Check system theme preference
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
      <div className="profile-container">
        <div className="profile-content">
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
            </a>
            .
            <br /> <br />
            Currently pursuing a Master's Degree in Computer Engineering
            (specialist track in Artificial Intelligence and Data Analysis) at
            the{" "}
            <a
              href="https://www.polito.it/en/education/master-s-degree-programmes/computer-engineering"
              target="_blank"
              rel="noopener noreferrer"
            >
              Polytechnic University of Turin
            </a>{" "}
            and working as a Software Engineer at{" "}
            <a
              href="https://www.teleconsys.it/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Teleconsys
            </a>
            .
            <br /> <br />
            Technologies: C/C++, Python, Java, JavaScript, Ruby, PHP, SQL, Ruby
            on Rails, Vue.js, Quasar, Laravel, and more.
            <br /> <br />
            <h3>Projects</h3>
            <ul>
              <li>
                <a
                  href="https://solomontaiwo.github.io/casual-contact-us/"
                  target="_blank"
                  rel="noreferrer"
                >
                  Casual Contact Us
                </a>
              </li>
              <li>
                <a
                  href="https://solomontaiwo.github.io/i-consigli-della-nonna/"
                  target="_blank"
                  rel="noreferrer"
                >
                  I Consigli della Nonna alcolizzata
                </a>
              </li>
            </ul>
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;