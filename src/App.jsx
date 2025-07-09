import React, { useState, useEffect } from "react";
import { FaSun, FaMoon, FaGithub, FaLinkedin, FaInstagram, FaSpinner, FaExternalLinkAlt, FaCode, FaGraduationCap, FaBriefcase, FaGlobe, FaDesktop, FaReact, FaJsSquare, FaCss3Alt, FaNodeJs, FaDatabase, FaJava, FaHtml5, FaWordpress, FaPhp, FaBootstrap, FaPlay, FaCheckCircle, FaCog, FaTag, FaArrowRight } from "react-icons/fa";
import { useLanguage } from "./LanguageContext";
import { translations } from "./translations";
import "./App.css";

// Helper functions for tech icons and status
const getTechIcon = (tech) => {
  const icons = {
    "React": <FaReact />,
    "JavaScript": <FaJsSquare />,
    "CSS": <FaCss3Alt />,
    "Node.js": <FaNodeJs />,
    "MongoDB": <FaDatabase />,
    "MySQL": <FaDatabase />,
    "Java": <FaJava />,
    "Spring": <FaCode />,
    "HTML": <FaHtml5 />,
    "WordPress": <FaWordpress />,
    "PHP": <FaPhp />,
    "Bootstrap": <FaBootstrap />,
    "API": <FaCode />
  };
  return icons[tech] || <FaCode />;
};

const getStatusIcon = (status) => {
  const icons = {
    "Live": <FaPlay />,
    "Completed": <FaCheckCircle />,
    "In Development": <FaCog />
  };
  return icons[status] || <FaCog />;
};

const getStatusColor = (status) => {
  const colors = {
    "Live": "#28a745",
    "Completed": "#007bff", 
    "In Development": "#ffc107"
  };
  return colors[status] || "#6c757d";
};

const projects = [
  {
    title: "SoldiSotto",
    image: "/images/projects/soldisotto/soldi-sotto.png",
    link: "https://solomontaiwo.github.io/soldi-sotto/",
    tech: ["React", "JavaScript"],
    category: "Web App",
    status: "Live",
    gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
  },
  {
    title: "The Artist Room",
    image: "/images/projects/the-artist-room/the-artist-room.png",
    link: "https://github.com/solomontaiwo/the-artist-room/",
    tech: ["React", "VueJS", "PHP", "MySQL"],
    category: "University Project",
    status: "Completed",
    gradient: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)"
  },
  {
    title: "BibliotecaUNIFE",
    image: "/images/projects/bibliotecaUNIFE/BibliotecaUNIFE.png",
    link: "https://github.com/solomontaiwo/bibliotecaUNIFE/",
    tech: ["PHP", "MySQL"],
    category: "University Project",
    status: "Completed",
    gradient: "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)"
  },
  {
    title: "InformaticaUnife",
    image: "/images/projects/informaticaUnife/informaticaUnife.png",
    link: "https://github.com/solomontaiwo/InformaticaUnife/",
    tech: ["C", "Java", "Python", "Matlab", "Shell", "Assembly"],
    category: "Repository",
    status: "Completed",
    gradient: "linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)"
  },
  {
    title: "I consigli della nonna",
    image: "/images/projects/i-consigli-della-nonna/i-consigli-della-nonna.png",
    link: "https://solomontaiwo.github.io/grandma-drunken-advices/",
    tech: ["React", "Bootstrap"],
    category: "Web App",
    status: "Live",
    gradient: "linear-gradient(135deg, #a1c4fd 0%, #c2e9fb 100%)"
  },
  {
    title: "K-Shop Graphics",
    image: "/images/projects/kshopgraphics/kshopgraphics.png",
    link: "https://kshopgraphics.com/",
    tech: ["WordPress", "PHP", "JavaScript", "CSS", "HTML"],
    category: "E-commerce",
    status: "Live",
    gradient: "linear-gradient(135deg, #fad0c4 0%, #ffd1ff 100%)"
  }
];

function App() {
  const [themeMode, setThemeMode] = useState('auto'); // 'auto', 'light', 'dark'
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const [loadedImages, setLoadedImages] = useState(Array(projects.length).fill(false));
  const { language, toggleLanguage } = useLanguage();
  const t = translations[language];

  // Funzione per applicare il tema in base alla modalità
  const applyTheme = (mode, systemPrefersDark) => {
    if (mode === 'auto') {
      setIsDarkTheme(systemPrefersDark);
    } else {
      setIsDarkTheme(mode === 'dark');
    }
  };

  useEffect(() => {
    // Pulisci vecchi dati del localStorage
    const oldTheme = localStorage.getItem("theme");
    if (oldTheme) {
      localStorage.removeItem("theme");
    }

    const savedThemeMode = localStorage.getItem("theme-mode") || 'auto';
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const systemPrefersDark = mediaQuery.matches;

    setThemeMode(savedThemeMode);
    applyTheme(savedThemeMode, systemPrefersDark);
  }, []);

  // Effetto separato per gestire i cambiamenti del tema di sistema
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    const handleSystemThemeChange = (e) => {
      if (themeMode === 'auto') {
        setIsDarkTheme(e.matches);
      }
    };

    // Aggiungi listener solo se il tema è auto
    if (themeMode === 'auto') {
      mediaQuery.addEventListener('change', handleSystemThemeChange);
    }

    // Cleanup
    return () => {
      mediaQuery.removeEventListener('change', handleSystemThemeChange);
    };
  }, [themeMode]);

  const toggleTheme = () => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const systemPrefersDark = mediaQuery.matches;
    
    let newMode;
    if (themeMode === 'auto') {
      // Se è auto, passa al contrario del sistema
      newMode = systemPrefersDark ? 'light' : 'dark';
    } else if (themeMode === 'light') {
      newMode = 'dark';
    } else {
      newMode = 'auto';
    }
    
    setThemeMode(newMode);
    localStorage.setItem("theme-mode", newMode);
    applyTheme(newMode, systemPrefersDark);
  };

  // Funzione per ottenere l'icona del tema corrente
  const getThemeIcon = () => {
    if (themeMode === 'auto') {
      return <FaDesktop />;
    } else if (themeMode === 'light') {
      return <FaMoon />;
    } else {
      return <FaSun />;
    }
  };

  // Funzione per ottenere il tooltip del tema
  const getThemeTooltip = () => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const systemPrefersDark = mediaQuery.matches;
    
    if (themeMode === 'auto') {
      const nextMode = systemPrefersDark ? 'light' : 'dark';
      return `${t.theme.auto} → ${nextMode === 'light' ? t.theme.toLight : t.theme.toDark}`;
    } else if (themeMode === 'light') {
      return `${t.theme.toLight} → ${t.theme.toDark}`;
    } else {
      return `${t.theme.toDark} → ${t.theme.toAuto}`;
    }
  };

  const handleImageLoad = (index) => {
    setLoadedImages((prevLoadedImages) => {
      const updatedLoadedImages = [...prevLoadedImages];
      updatedLoadedImages[index] = true;
      return updatedLoadedImages;
    });
  };

  useEffect(() => {
    const preloadImages = async () => {
      await Promise.all(
        projects.map(
          (project) =>
            new Promise((resolve) => {
              const img = new Image();
              img.src = project.image;
              img.onload = resolve;
              img.onerror = resolve;
            })
        )
      );
      setLoadedImages(Array(projects.length).fill(true));
    };
    preloadImages();
  }, []);

  return (
    <div className={`theme-container ${isDarkTheme ? "dark-theme" : "light-theme"}`}>
      {/* Navigation */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-transparent fixed-top">
        <div className="container">
          <a className="navbar-brand fw-bold" href="#home">
            Solomon Taiwo
          </a>
          <div className="d-flex align-items-center">
            <ul className="navbar-nav me-3 flex-row">
              <li className="nav-item me-3">
                <a className="nav-link" href="#about">{t.nav.about}</a>
              </li>
              <li className="nav-item me-3">
                <a className="nav-link" href="#projects">{t.nav.projects}</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#contact">{t.nav.contact}</a>
              </li>
            </ul>
            <div className="d-flex gap-2">
              <button className="language-toggle-btn" onClick={toggleLanguage} title={`Switch to ${language === 'it' ? 'English' : 'Italiano'}`}>
                <FaGlobe className="me-1" />
                {language === 'it' ? 'EN' : 'IT'}
              </button>
              <button className={`theme-toggle-btn ${themeMode === 'auto' ? 'theme-auto' : ''}`} onClick={toggleTheme} title={getThemeTooltip()}>
                {getThemeIcon()}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="hero-section min-vh-100 d-flex align-items-center">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6 mb-5 mb-lg-0">
              <div className="hero-content">
                <h1 className="display-4 fw-bold mb-4">
                  {t.hero.greeting} <span className="text-gradient">Solomon</span>
                </h1>
                <p className="lead mb-4">
                  {t.hero.description}
                </p>
                <p className="mb-4">
                  {t.hero.passion}
                </p>
                <div className="d-flex flex-wrap gap-3 mb-4">
                  <a href="#projects" className="btn btn-primary btn-lg">
                    <FaCode className="me-2" />
                    {t.hero.viewProjects}
                  </a>
                  <a href="#contact" className="btn btn-outline-primary btn-lg">
                    {t.hero.collaborate}
                  </a>
                </div>
                <div className="social-links-hero">
                  <a href="https://github.com/solomontaiwo" target="_blank" rel="noopener noreferrer" className="social-btn me-3">
                    <FaGithub />
                  </a>
                  <a href="https://www.linkedin.com/in/solomon-taiwo-7a151b1a3/" target="_blank" rel="noopener noreferrer" className="social-btn me-3">
                    <FaLinkedin />
                  </a>
                  <a href="https://www.instagram.com/solomon.taiwo/" target="_blank" rel="noopener noreferrer" className="social-btn">
                    <FaInstagram />
                  </a>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="hero-image text-center">
                <div className="profile-container">
                  <img 
                    src="/images/solomon-profile-photo.jpg" 
                    alt="Solomon Taiwo" 
                    className="profile-image img-fluid rounded-circle shadow-lg"
                  />
                  <div className="profile-decoration"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-5">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 mx-auto text-center mb-5">
              <h2 className="display-5 fw-bold mb-4">{t.about.title}</h2>
              <p className="lead">
                {t.about.subtitle}
              </p>
            </div>
          </div>
          <div className="row g-4">
            <div className="col-md-4">
              <div className="card h-100 border-0 shadow-sm">
                <div className="card-body text-center p-4">
                  <div className="icon-circle mb-3">
                    <FaBriefcase className="fs-2" />
                  </div>
                  <h5 className="card-title">{t.about.experience.title}</h5>
                  <p className="card-text">
                    {t.about.experience.description}
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card h-100 border-0 shadow-sm">
                <div className="card-body text-center p-4">
                  <div className="icon-circle mb-3">
                    <FaGraduationCap className="fs-2" />
                  </div>
                  <h5 className="card-title">{t.about.education.title}</h5>
                  <p className="card-text">
                    {t.about.education.description}
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card h-100 border-0 shadow-sm">
                <div className="card-body text-center p-4">
                  <div className="icon-circle mb-3">
                    <FaCode className="fs-2" />
                  </div>
                  <h5 className="card-title">{t.about.skills.title}</h5>
                  <p className="card-text">
                    {t.about.skills.description}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-5 bg-light-section">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 mx-auto text-center mb-5">
              <h2 className="display-5 fw-bold mb-4">{t.projects.title}</h2>
              <p className="lead">
                {t.projects.subtitle}
              </p>
            </div>
          </div>
          <div className="row g-4">
            {projects.map((project, i) => (
              <div key={i} className="col-lg-4 col-md-6">
                <div className={`project-card-modern h-100 ${loadedImages[i] ? "loaded" : "loading"}`}>
                  {/* Background Gradient Overlay */}
                  <div className="project-gradient" style={{ background: project.gradient }}></div>
                  
                  {/* Status Badge */}
                  <div className="project-status-badge" style={{ backgroundColor: getStatusColor(project.status) }}>
                    {getStatusIcon(project.status)}
                    <span className="ms-1">{project.status}</span>
                  </div>
                  
                  {/* Category Tag */}
                  <div className="project-category-tag">
                    <FaTag className="me-1" />
                    {project.category}
                  </div>
                  
                  {/* Image Container */}
                  <div className="project-image-container">
                    {!loadedImages[i] && (
                      <div className="project-loader-modern">
                        <FaSpinner className="fa-spin fs-1" />
                        <div className="loading-text mt-2">Loading...</div>
                      </div>
                    )}
                    <img
                      src={project.image}
                      alt={project.title}
                      className="project-image-modern"
                      onLoad={() => handleImageLoad(i)}
                      style={{ display: loadedImages[i] ? "block" : "none" }}
                    />
                    <div className="project-image-overlay">
                      <div className="project-preview-badge">
                        <FaExternalLinkAlt />
                      </div>
                    </div>
                  </div>
                  
                  {/* Content */}
                  <div className="project-content-modern">
                    <div className="project-header">
                      <h4 className="project-title-modern">{project.title}</h4>
                      <p className="project-description-modern">{t.projects.projectDescriptions[project.title]}</p>
                    </div>
                    
                    {/* Tech Stack with Icons */}
                    <div className="project-tech-stack">
                      {project.tech.slice(0, 4).map((tech, index) => (
                        <div key={index} className="tech-icon-wrapper" title={tech}>
                          {getTechIcon(tech)}
                          <span className="tech-name">{tech}</span>
                        </div>
                      ))}
                      {project.tech.length > 4 && (
                        <div className="tech-more">+{project.tech.length - 4}</div>
                      )}
                    </div>
                    
                    {/* CTA Button */}
                    <div className="project-cta">
                      <a 
                        href={project.link} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="btn-project-modern"
                      >
                        <span>{t.projects.viewProject}</span>
                        <FaArrowRight className="btn-icon" />
                      </a>
                    </div>
                  </div>
                  

                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-5">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 mx-auto text-center">
              <h2 className="display-5 fw-bold mb-4">{t.contact.title}</h2>
              <p className="lead mb-4">
                {t.contact.subtitle}
              </p>
              <div className="d-flex justify-content-center gap-3 mb-4">
                <a href="https://github.com/solomontaiwo" target="_blank" rel="noopener noreferrer" className="btn btn-dark btn-lg">
                  <FaGithub className="me-2" />
                  {t.contact.github}
                </a>
                <a href="https://www.linkedin.com/in/solomon-taiwo-7a151b1a3/" target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-lg">
                  <FaLinkedin className="me-2" />
                  {t.contact.linkedin}
                </a>
                <a href="mailto:solomon.taiwo@studenti.polito.it" className="btn btn-outline-primary btn-lg">
                  {t.contact.email}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-4 bg-dark text-white">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-6">
              <p className="mb-0">&copy; {new Date().getFullYear()} Solomon Taiwo</p>
            </div>
            <div className="col-md-6 text-md-end">
              <p className="mb-0">{t.footer.madeWith}</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
