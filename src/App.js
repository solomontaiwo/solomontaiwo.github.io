import React, { useState, useEffect } from "react";
import { FaSun, FaMoon, FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa";
import "./App.css";

const projects = [
  {
    title: "SoldiSotto",
    image: "/images/projects/soldisotto/soldi-sotto.png",
    link: "https://solomontaiwo.github.io/soldi-sotto/",
  },
  {
    title: "K-Shop Graphics",
    image: "/images/projects/kshopgraphics/full-hd-kshopgraphics.png",
    link: "https://kshopgraphics.com/",
  },
  {
    title: "The Artist Room",
    image: "/images/projects/the-artist-room/full-hd/full-hd-home-the-artist-room.png",
    link: "https://github.com/solomontaiwo/the-artist-room/",
  },
  {
    title: "BibliotecaUNIFE",
    image: "/images/projects/bibliotecaUNIFE/full-hd-BibliotecaUNIFE.png",
    link: "https://github.com/solomontaiwo/bibliotecaUNIFE/",
  },
  {
    title: "InformaticaUnife",
    image: "/images/projects/informaticaUnife/informaticaUnife.png",
    link: "https://github.com/solomontaiwo/InformaticaUnife/",
  },
  {
    title: "I consigli della nonna",
    image: "/images/projects/i-consigli-della-nonna/i-consigli-della-nonna.png",
    link: "https://solomontaiwo.github.io/i-consigli-della-nonna/",
  },
];

function App() {
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const initialTheme = savedTheme ? savedTheme === "dark" : prefersDarkScheme;

    setIsDarkTheme(initialTheme);
  }, []);

  const toggleTheme = () => {
    setIsDarkTheme((prevTheme) => {
      const newTheme = !prevTheme;
      localStorage.setItem("theme", newTheme ? "dark" : "light");
      return newTheme;
    });
  };

  return (
    <div className={`theme-container ${isDarkTheme ? "dark-theme" : "light-theme"}`}>
      <div className="App">
        {/* Profile Section */}
        <div className="profile">
          <img src="/images/solomon-profile-photo.jpg" alt="Solomon Taiwo" className="profile-photo" />
          <h2>Solomon Taiwo</h2>
          <div className="social-links">
            <a href="https://github.com/solomontaiwo" target="_blank" rel="noopener noreferrer" className="social-link">
              <FaGithub />
            </a>
            <a href="https://www.linkedin.com/in/solomon-taiwo-7a151b1a3/" target="_blank" rel="noopener noreferrer" className="social-link">
              <FaLinkedin />
            </a>
            <a href="https://www.instagram.com/solomon.taiwo/" target="_blank" rel="noopener noreferrer" className="social-link">
              <FaInstagram />
            </a>
            <button className="theme-toggle" onClick={toggleTheme}>
              {isDarkTheme ? <FaSun /> : <FaMoon />}
            </button>
          </div>
        </div>

        {/* Griglia dei Progetti */}
        <div className="projects">
          <div className="project-grid">
            {projects.map((project, i) => (
              <a href={project.link} target="_blank" rel="noreferrer" key={i} className="project">
                <img src={project.image} alt={project.title} className="project-image" />
                <div className="project-info">
                  <h3>{project.title}</h3>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
