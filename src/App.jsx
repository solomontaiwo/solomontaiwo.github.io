import React, { useEffect, useState } from "react";
import {
  FaArrowRight,
  FaBriefcase,
  FaCode,
  FaDatabase,
  FaDownload,
  FaExternalLinkAlt,
  FaGithub,
  FaGraduationCap,
  FaHtml5,
  FaInstagram,
  FaJava,
  FaJsSquare,
  FaLayerGroup,
  FaLinkedin,
  FaNodeJs,
  FaPhp,
  FaReact,
} from "react-icons/fa";
import { useLanguage } from "./LanguageContext";
import { translations } from "./translations";
import "./App.css";

const projectCatalog = [
  {
    id: "exobabel",
    image: "/images/projects/exobabel/exobabel.png",
    link: "https://exobabel.wiki/",
    tech: ["React", "Python", "JavaScript", "ML"],
    category: "hackathon",
    status: "live",
  },
  {
    id: "soldisotto",
    image: "/images/projects/soldisotto/soldi-sotto.png",
    link: "https://solomontaiwo.github.io/soldi-sotto/",
    tech: ["React", "JavaScript", "CSS"],
    category: "webApp",
    status: "live",
  },
  {
    id: "artistRoom",
    image: "/images/projects/the-artist-room/the-artist-room.png",
    link: "https://github.com/solomontaiwo/the-artist-room/",
    tech: ["React", "VueJS", "PHP", "MySQL"],
    category: "university",
    status: "completed",
  },
  {
    id: "bibliotecaUnife",
    image: "/images/projects/bibliotecaUNIFE/BibliotecaUNIFE.png",
    link: "https://github.com/solomontaiwo/BibliotecaUNIFE",
    tech: ["Java", "Spring", "HTML", "SQL"],
    category: "repository",
    status: "completed",
  },
];

const getTechIcon = (tech) => {
  const icons = {
    React: <FaReact />,
    JavaScript: <FaJsSquare />,
    CSS: <FaCode />,
    "Node.js": <FaNodeJs />,
    MongoDB: <FaDatabase />,
    MySQL: <FaDatabase />,
    Java: <FaJava />,
    Spring: <FaCode />,
    HTML: <FaHtml5 />,
    PHP: <FaPhp />,
    API: <FaCode />,
    Python: <FaCode />,
    SQL: <FaDatabase />,
    ML: <FaLayerGroup />,
    VueJS: <FaCode />,
  };

  return icons[tech] || <FaCode />;
};

const sectionIcon = {
  experience: <FaBriefcase />,
  education: <FaGraduationCap />,
  focus: <FaCode />,
  engineering: <FaCode />,
  data: <FaDatabase />,
  delivery: <FaLayerGroup />,
};

function App() {
  const [loadedImages, setLoadedImages] = useState(() => Array(projectCatalog.length).fill(false));
  const { language } = useLanguage();
  const t = translations[language];
  const contactEmail = "taiwo.o.solomon@gmail.com";

  useEffect(() => {
    if (typeof window === "undefined") {
      return undefined;
    }

    const elements = document.querySelectorAll(".reveal");
    if (!("IntersectionObserver" in window)) {
      elements.forEach((element) => element.classList.add("is-visible"));
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.16, rootMargin: "0px 0px -6% 0px" }
    );

    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  const handleImageLoad = (index) => {
    setLoadedImages((previous) => {
      const updated = [...previous];
      updated[index] = true;
      return updated;
    });
  };

  return (
    <div className="theme-container">
      <div className="ambient-bg" aria-hidden="true" />

      <nav className="navbar navbar-expand-lg fixed-top top-nav" aria-label="Main navigation">
        <div className="container">
          <a className="navbar-brand" href="#home">
            Solomon Taiwo
          </a>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>

          <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
            <ul className="navbar-nav align-items-lg-center me-lg-2">
              <li className="nav-item">
                <a className="nav-link" href="#about">
                  {t.nav.about}
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#skills">
                  {t.nav.skills}
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#projects">
                  {t.nav.projects}
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#contact">
                  {t.nav.contact}
                </a>
              </li>
            </ul>

            <a className="nav-cta" href="#contact">
              {t.nav.cta}
            </a>
          </div>
        </div>
      </nav>

      <main>
        <section id="home" className="hero-section section-spacing">
          <div className="container">
            <div className="surface-card hero-shell reveal">
              <div className="hero-layout">
                <article className="hero-main">
                  <h1 className="hero-title">
                    {t.hero.greeting} <span>{t.hero.name}</span>
                  </h1>
                  <p className="hero-role">{t.hero.role}</p>
                  <p className="hero-description">{t.hero.description}</p>

                  <div className="action-row">
                    <a href="#projects" className="action-btn action-btn-primary">
                      {t.hero.primaryCta}
                      <FaArrowRight />
                    </a>
                    <a
                      href="/curriculum-taiwo.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="action-btn action-btn-ghost"
                    >
                      <FaDownload />
                      {t.hero.secondaryCta}
                    </a>

                    <div className="social-row social-row-inline" aria-label={t.hero.socialLabel}>
                      <a
                        href="https://github.com/solomontaiwo"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="social-link"
                        aria-label="GitHub"
                      >
                        <FaGithub />
                      </a>
                      <a
                        href="https://www.linkedin.com/in/solomon-taiwo-7a151b1a3/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="social-link"
                        aria-label="LinkedIn"
                      >
                        <FaLinkedin />
                      </a>
                      <a
                        href="https://www.instagram.com/solomon.taiwo/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="social-link"
                        aria-label="Instagram"
                      >
                        <FaInstagram />
                      </a>
                    </div>
                  </div>

                  <ul className="quick-facts" aria-label={t.hero.factsLabel}>
                    {t.hero.quickFacts.map((fact) => (
                      <li key={fact}>{fact}</li>
                    ))}
                  </ul>
                </article>

                <aside className="hero-visual reveal delay-1">
                  <div className="hero-visual-card">
                    <img src="/images/solomon-profile-photo.jpg" alt={t.hero.imageAlt} className="hero-visual-image" loading="eager" />
                  </div>
                </aside>
              </div>
            </div>
          </div>
        </section>

        <section id="about" className="section-spacing">
          <div className="container">
            <header className="section-heading text-center reveal">
              <p className="section-kicker">{t.about.eyebrow}</p>
              <h2 className="section-title">{t.about.title}</h2>
            </header>

            <div className="about-layout">
              <article className="surface-card about-main reveal delay-1">
                <p>{t.about.intro}</p>
                <ul className="timeline-list">
                  {t.about.timeline.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </article>

              <div className="row g-3 about-cards">
                {Object.entries(t.about.cards).map(([key, card], index) => (
                  <div className="col-md-6 col-xl-4" key={key}>
                    <article className="surface-card info-card h-100 reveal" style={{ "--delay": `${index * 80}ms` }}>
                      <span className="icon-dot">{sectionIcon[key]}</span>
                      <h3>{card.title}</h3>
                      <p>{card.description}</p>
                    </article>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="skills" className="section-spacing section-alt">
          <div className="container">
            <header className="section-heading text-center reveal">
              <p className="section-kicker">{t.skills.eyebrow}</p>
              <h2 className="section-title">{t.skills.title}</h2>
              <p className="section-subtitle">{t.skills.subtitle}</p>
            </header>

            <div className="row g-4">
              {t.skills.groups.map((group, index) => (
                <div className="col-lg-4" key={group.id}>
                  <article className="surface-card skill-card h-100 reveal" style={{ "--delay": `${index * 80}ms` }}>
                    <div className="skill-head">
                      <span className="icon-dot">{sectionIcon[group.id]}</span>
                      <h3>{group.title}</h3>
                    </div>

                    <div className="chip-list">
                      {group.items.map((item) => (
                        <span className="skill-chip" key={item}>
                          {item}
                        </span>
                      ))}
                    </div>
                  </article>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="projects" className="section-spacing">
          <div className="container">
            <header className="section-heading text-center reveal">
              <p className="section-kicker">{t.projects.eyebrow}</p>
              <h2 className="section-title">{t.projects.title}</h2>
              <p className="section-subtitle">{t.projects.subtitle}</p>
            </header>

            <div className="row g-4">
              {projectCatalog.map((project, index) => {
                const content = t.projects.items[project.id];
                return (
                  <div key={project.id} className="col-lg-6">
                    <article className="surface-card project-card reveal" style={{ "--delay": `${index * 80}ms` }}>
                      <a
                        className="project-media"
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${t.projects.viewProject} ${content.title}`}
                      >
                        <span className={`status-badge status-${project.status}`}>{t.projects.status[project.status]}</span>
                        <span className="category-badge">{t.projects.categories[project.category]}</span>
                        {!loadedImages[index] && <span className="image-skeleton" aria-hidden="true" />}
                        <img
                          src={project.image}
                          alt={content.title}
                          loading="lazy"
                          className={`project-image ${loadedImages[index] ? "is-ready" : ""}`}
                          onLoad={() => handleImageLoad(index)}
                        />
                      </a>

                      <div className="project-content">
                        <h3>{content.title}</h3>
                        <p className="project-description">{content.description}</p>
                        <p className="project-impact">{content.impact}</p>

                        <div className="chip-list">
                          {project.tech.map((tech) => (
                            <span className="skill-chip" key={`${project.id}-${tech}`}>
                              {getTechIcon(tech)} {tech}
                            </span>
                          ))}
                        </div>

                        <a href={project.link} target="_blank" rel="noopener noreferrer" className="project-link">
                          {t.projects.viewProject}
                          <FaExternalLinkAlt />
                        </a>
                      </div>
                    </article>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <section id="contact" className="section-spacing section-alt">
          <div className="container">
            <header className="section-heading text-center reveal">
              <p className="section-kicker">{t.contact.eyebrow}</p>
              <h2 className="section-title">{t.contact.title}</h2>
              <p className="section-subtitle">{t.contact.subtitle}</p>
            </header>

            <div className="row g-4 justify-content-center">
              <div className="col-md-6 col-lg-4">
                <a href="https://github.com/solomontaiwo" target="_blank" rel="noopener noreferrer" className="surface-card contact-card reveal">
                  <FaGithub />
                  <h3>{t.contact.actions.github}</h3>
                  <p>@solomontaiwo</p>
                </a>
              </div>

              <div className="col-md-6 col-lg-4">
                <a
                  href="https://www.linkedin.com/in/solomon-taiwo-7a151b1a3/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="surface-card contact-card reveal delay-1"
                >
                  <FaLinkedin />
                  <h3>{t.contact.actions.linkedin}</h3>
                  <p>{t.contact.linkedinText}</p>
                </a>
              </div>
            </div>

            <div className="contact-cta text-center reveal delay-2">
              <a href={`mailto:${contactEmail}`} className="action-btn action-btn-primary">
                {t.contact.primaryCta}
                <FaArrowRight />
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="container d-flex flex-column flex-md-row justify-content-between align-items-center gap-2">
          <p className="mb-0">&copy; {new Date().getFullYear()} Solomon Taiwo</p>
          <p className="mb-0">{t.footer.madeWith}</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
