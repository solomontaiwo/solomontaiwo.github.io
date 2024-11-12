import React, { useState, useEffect } from "react";
import { FaSun, FaMoon, FaGithub, FaLinkedin, FaInstagram, FaSpinner } from "react-icons/fa";
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
  const [loadedImages, setLoadedImages] = useState(Array(projects.length).fill(false));

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

  const handleImageLoad = (index) => {
    setLoadedImages((prevLoadedImages) => {
      const updatedLoadedImages = [...prevLoadedImages];
      updatedLoadedImages[index] = true;
      return updatedLoadedImages;
    });
  };

  return (
    <div className={`theme-container ${isDarkTheme ? "dark-theme" : "light-theme"}`}>
      <div className="App">
        {/* Profile Section */}
        <div className="profile-section">
          <div className="profile">
            <img src="/images/solomon-profile-photo.jpg" alt="Solomon Taiwo" className="profile-photo" />
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

          {/* Who Am I Section */}
          <div className="who-am-i">
            <h3>Who Am I?</h3>
            <p>
              I'm <strong>Solomon Taiwo</strong>, a Software Engineer at <a href="https://www.teleconsys.it" target="_blank" rel="noopener noreferrer">Teleconsys</a> and a Master's student in <strong>Computer Engineering (Artificial Intelligence and Data Analysis)</strong> at <a href="https://www.polito.it/en" target="_blank" rel="noopener noreferrer">Polytechnic University of Turin</a>.
            </p>
            <p>
              I'm passionate about building practical applications that enhance everyday life. Want to build something together? Connect with me on my socials!
            </p>
          </div>
        </div>

        {/* Project Grid */}
        <div className="projects">
          <div className="project-grid">
            {projects.map((project, i) => (
              <a
                href={project.link}
                target="_blank"
                rel="noreferrer"
                key={i}
                className={`project ${loadedImages[i] ? "fade-in" : "loading"}`}
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                {/* Mostra lo spinner solo se le immagini precedenti sono caricate o è la prima */}
                {(!loadedImages[i] || (i > 0 && !loadedImages[i - 1])) && (
                  <div className="spinner">
                    <FaSpinner className="spin-icon" />
                  </div>
                )}
                <img
                  src={project.image}
                  alt={project.title}
                  className="project-image"
                  onLoad={() => handleImageLoad(i)}
                  style={{ display: loadedImages[i] ? "block" : "none" }}
                />
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
