import React, { useState, useEffect } from "react";
import "./App.css";
import { FaSun, FaMoon, FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa";

function App() {
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setIsDarkTheme(savedTheme === "dark");
      document.body.classList.toggle("dark-theme", savedTheme === "dark");
    } else {
      const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)").matches;
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
      <div className="panel">
        {/* Profile Section */}
        <div className="profile">
          <img
            src="/images/solomon-profile-photo.jpg"
            alt="Solomon Taiwo"
            className="profile-photo"
          />
          <div className="profile-info">
            <h1>Solomon Taiwo</h1>
            <p>Computer Science Graduate and Aspiring Artificial Intelligence Engineer</p>
            <p>
              Currently pursuing a Master's Degree in Computer Engineering (Artificial Intelligence
              and Data Analysis) at the{" "}
              <a
                href="https://www.polito.it/en/education/master-s-degree-programmes/computer-engineering"
                target="_blank"
                rel="noopener noreferrer"
              >
                Polytechnic University of Turin
              </a>
            </p>
            <p>
              Working as a Software Engineer at{" "}
              <a
                href="https://www.teleconsys.it/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Teleconsys
              </a>
            </p>
          </div>
          <div className="social-links">
            <a
              href="https://github.com/solomontaiwo"
              target="_blank"
              rel="noopener noreferrer"
              className="social-link"
            >
              <FaGithub />
            </a>
            <a
              href="https://www.linkedin.com/in/solomon-taiwo-7a151b1a3/"
              target="_blank"
              rel="noopener noreferrer"
              className="social-link"
            >
              <FaLinkedin />
            </a>
            <a
              href="https://www.instagram.com/solomon.taiwo/"
              target="_blank"
              rel="noopener noreferrer"
              className="social-link"
            >
              <FaInstagram />
            </a>
            <button className="theme-toggle" onClick={toggleTheme}>
              {isDarkTheme ? <FaSun /> : <FaMoon />}
            </button>
          </div>
        </div>

        {/* Projects Section */}
        <div className="projects">
          <h2>Projects</h2>
          <div className="project-grid">
            <div className="project">
              <a href="https://solomontaiwo.github.io/soldi-sotto/" target="_blank" rel="noreferrer">
                <img
                  src="/images/projects/soldisotto/soldi-sotto.png"
                  alt="SoldiSotto"
                  className="project-image"
                />
                <div className="project-info">
                  <h3>SoldiSotto</h3>
                  <p>A personal finance tracking app, powered by React and Firebase.</p>
                </div>
              </a>
            </div>
            <div className="project">
              <a href="https://kshopgraphics.com/" target="_blank" rel="noreferrer">
                <img
                  src="/images/projects/kshopgraphics/full-hd-kshopgraphics.png"
                  alt="kshopgraphics"
                  className="project-image"
                />
                <div className="project-info">
                  <h3>K-Shop Graphics</h3>
                  <p>E-commerce built with WooCommerce.</p>
                </div>
              </a>
            </div>
            <div className="project">
              <a href="https://github.com/solomontaiwo/the-artist-room/" target="_blank" rel="noreferrer">
                <img
                  src="/images/projects/the-artist-room/full-hd/full-hd-home-the-artist-room.png"
                  alt="theartistroom"
                  className="project-image"
                />
                <div className="project-info">
                  <h3>The Artist Room</h3>
                  <p>University project where users can book rooms. Made with Laravel.</p>
                </div>
              </a>
            </div>
            <div className="project">
              <a href="https://github.com/solomontaiwo/bibliotecaUNIFE/" target="_blank" rel="noreferrer">
                <img
                  src="/images/projects/bibliotecaUNIFE/full-hd-BibliotecaUNIFE.png"
                  alt="bibliotecaUNIFE"
                  className="project-image"
                />
                <div className="project-info">
                  <h3>BibliotecaUNIFE</h3>
                  <p>University project to test SQL queries, developed in HTML/CSS and PHP.</p>
                </div>
              </a>
            </div>
            <div className="project">
              <a href="https://github.com/solomontaiwo/InformaticaUnife/" target="_blank" rel="noreferrer">
                <img
                  src="/images/projects/InformaticaUnife/informaticaUnife.png"
                  alt="InformaticaUnife"
                  className="project-image"
                />
                <div className="project-info">
                  <h3>InformaticaUnife</h3>
                  <p>Repository with useful resources for university students.</p>
                </div>
              </a>
            </div>
            <div className="project">
              <a href="https://solomontaiwo.github.io/i-consigli-della-nonna/" target="_blank" rel="noreferrer">
                <img
                  src="/images/projects/i-consigli-della-nonna/i-consigli-della-nonna.png"
                  alt="I consigli della nonna"
                  className="project-image"
                />
                <div className="project-info">
                  <h3>I consigli della nonna</h3>
                  <p>Another casual React project. Made on another sleepless night.</p>
                </div>
              </a>
            </div>
            <div className="project">
              <a href="https://github.com/solomontaiwo/InformaticaUnife/" target="_blank" rel="noreferrer">
                <img
                  src="/images/projects/casual-contact-us/casual-contact-us.png"
                  alt="Casual Contact Us"
                  className="project-image"
                />
                <div className="project-info">
                  <h3>Casual Contact Us</h3>
                  <p>A REALLY casual game made on a sleepless night. First React project.</p>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
