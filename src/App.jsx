import React, { useEffect, useState } from "react";
import { FaArrowRight, FaArrowUp, FaExternalLinkAlt, FaMoon, FaSun, FaBars, FaTimes } from "react-icons/fa";
import { useLanguage } from "./LanguageContext";
import { translations } from "./translations";
import "./App.css";

const projectCatalog = [
  {
    id: "securityQuiz",
    sortDate: "2026-08-30",
    image: "/images/projects/security-quiz/security-quiz.svg",
    link: "https://sicurezza-sistemi-informativi-quiz.pages.dev/",
    tech: ["HTML", "CSS", "JavaScript", "PWA", "Cloudflare", "CI/CD"],
    category: "webApp",
    status: "live",
  },
  {
    id: "seenary",
    sortDate: "2026-07-26",
    image: "/images/projects/seenary/seenary.png",
    link: "https://main.d10eewmnsih3qy.amplifyapp.com/",
    tech: ["Next.js", "Java", "Spring", "AWS", "CI/CD"],
    category: "webApp",
    status: "live",
  },
  {
    id: "eventfinder",
    sortDate: "2026-06-21",
    image: "/images/projects/eventfinder/eventfinder.png",
    link: "https://event-planner-cuhua6hpb8bwc7ft.italynorth-01.azurewebsites.net/",
    tech: ["Next.js", "TypeScript", "API", "CI/CD"],
    category: "webApp",
    status: "live",
  },
  {
    id: "isHormuzOpen",
    sortDate: "2026-06-21",
    image: "/images/projects/is-hormuz-open/is-hormuz-open.png",
    link: "https://is-hormuz-open.com/",
    tech: ["TypeScript", "Cloudflare", "Hono", "CI/CD"],
    category: "webApp",
    status: "live",
  },
  // {
  //   id: "ruggine",
  //   sortDate: "2026-03-09",
  //   image: "/images/projects/ruggine/ruggine.svg",
  //   link: "https://github.com/solomontaiwo/rust-project",
  //   tech: ["Rust", "React", "WebSocket", "SQLite"],
  //   category: "university",
  //   status: "completed",
  // },
  {
    id: "exobabel",
    sortDate: "2025-10-05",
    image: "/images/projects/exobabel/exobabel.png",
    link: "https://witty-field-0719a7f03.2.azurestaticapps.net/",
    tech: ["React", "Python", "JavaScript", "ML"],
    category: "hackathon",
    status: "live",
  },
  {
    id: "soldisotto",
    sortDate: "2024-11-12",
    image: "/images/projects/soldisotto/soldi-sotto.png",
    link: "https://solomontaiwo.github.io/soldi-sotto/",
    tech: ["React", "JavaScript", "CSS"],
    category: "webApp",
    status: "live",
  },
  // Progetti archiviati: mantenuti come riferimento, ma non mostrati nel portfolio.
  // {
  //   id: "artistRoom",
  //   sortDate: "2023-06-30",
  //   image: "/images/projects/the-artist-room/the-artist-room.png",
  //   link: "https://github.com/solomontaiwo/the-artist-room/",
  //   tech: ["React", "VueJS", "PHP", "MySQL"],
  //   category: "university",
  //   status: "completed",
  // },
  // {
  //   id: "bibliotecaUnife",
  //   sortDate: "2022-06-30",
  //   image: "/images/projects/bibliotecaUNIFE/BibliotecaUNIFE.png",
  //   link: "https://github.com/solomontaiwo/BibliotecaUNIFE",
  //   tech: ["Java", "Spring", "HTML", "SQL"],
  //   category: "repository",
  //   status: "completed",
  // },
];

const selectedIds = ["seenary", "securityQuiz", "isHormuzOpen"];
const selectedProjects = selectedIds.map(id => projectCatalog.find(project => project.id === id));
const otherProjects = projectCatalog.filter(project => !selectedIds.includes(project.id));

function ProjectCard({ project, t, featured = false }) {
  const content = t.projects.items[project.id];
  return (
    <article className={`project-card${featured ? " project-featured" : ""}`}>
      <a className="project-media" href={project.link} target="_blank" rel="noopener noreferrer" aria-label={`${t.projects.viewProject}: ${content.title}`}>
        <img src={project.image} alt={content.title} loading="lazy" />
      </a>
      <div className="project-copy">
        <p className="eyebrow">{featured ? t.projects.featured : t.projects.categories[project.category]} <span className="project-status">{t.projects.status[project.status]}</span></p>
        <h3>{content.title}</h3>
        <p>{content.description}</p>
        <p className="project-impact">{content.impact}</p>
        <ul className="tech-list" aria-label={t.skills.title}>{project.tech.map(tech => <li key={tech}>{tech}</li>)}</ul>
        <a className="text-link" href={project.link} target="_blank" rel="noopener noreferrer">{t.projects.viewProject}<FaExternalLinkAlt aria-hidden="true" /></a>
      </div>
    </article>
  );
}

function App() {
  const { language, setLanguage } = useLanguage();
  const t = translations[language] || translations.en;
  const [menuOpen, setMenuOpen] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [theme, setTheme] = useState(() => document.documentElement.getAttribute("data-theme") || "light");
  const toggleTheme = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.setAttribute("data-theme", next);
    try { window.localStorage.setItem("theme", next); } catch { /* Theme still works when storage is unavailable. */ }
  };
  useEffect(() => {
    const onScroll = () => setShowBackToTop(window.scrollY > 500);
    const onKey = event => { if (event.key === "Escape" && document.getElementById("menu-toggle")?.getAttribute("aria-expanded") === "true") { setMenuOpen(false); document.getElementById("menu-toggle")?.focus(); } };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("keydown", onKey);
    return () => { window.removeEventListener("scroll", onScroll); window.removeEventListener("keydown", onKey); };
  }, []);
  return (
    <div className="portfolio">
      <a className="skip-link" href="#main">{t.nav.skip}</a>
      <header className="site-header">
        <div className="page-width header-inner">
          <a className="brand" href="#home" onClick={() => setMenuOpen(false)}>Solomon Taiwo<span aria-hidden="true"> /</span></a>
          <button id="menu-toggle" className="icon-button menu-toggle" type="button" aria-label={t.nav.menu} aria-expanded={menuOpen} aria-controls="main-navigation" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <FaTimes /> : <FaBars />}</button>
          <nav id="main-navigation" className={`main-navigation${menuOpen ? " is-open" : ""}`} aria-label={t.nav.navigation}>
            <a href="#projects" onClick={() => setMenuOpen(false)}>{t.nav.projects}</a>
            <a href="#about" onClick={() => setMenuOpen(false)}>{t.nav.about}</a>
            <a href="#contact" onClick={() => setMenuOpen(false)}>{t.nav.contact}</a>
            <div className="nav-controls"><button className="icon-button language-button" type="button" onClick={() => setLanguage(language === "it" ? "en" : "it")} aria-label={t.nav.languageLabel}>{t.nav.langSwitch}</button><button className="icon-button" type="button" onClick={toggleTheme} aria-label={t.nav.themeToggle}>{theme === "dark" ? <FaSun /> : <FaMoon />}</button></div>
          </nav>
        </div>
      </header>
      <main id="main" className="page-width">
        <section id="home" className="hero">
          <div className="hero-copy"><p className="eyebrow">{t.hero.role}</p><h1>{t.hero.headline[0]}<br /><span>{t.hero.headline[1]}</span></h1><p className="hero-description">{t.hero.description}</p><div className="hero-actions"><a className="primary-button" href="#projects">{t.hero.primaryCta}<FaArrowRight aria-hidden="true" /></a><a className="text-link" href="#contact">{t.nav.cta}<FaArrowRight aria-hidden="true" /></a></div></div>
          <figure className="portrait"><img src="/images/solomon-profile-photo.jpg" alt={t.hero.imageAlt} fetchPriority="high" /><figcaption>Solomon Taiwo <span>Software Engineer</span></figcaption></figure>
        </section>
        <section id="projects" className="page-section">
          <div className="section-heading"><h2>{t.projects.title}</h2><p className="eyebrow">01 — {t.projects.eyebrow}</p></div>
          <ProjectCard project={selectedProjects[0]} t={t} featured />
          <div className="project-grid">{selectedProjects.slice(1).map(project => <ProjectCard key={project.id} project={project} t={t} />)}</div>
          <div id="other-projects" className="project-grid additional-projects" hidden={!expanded}>{otherProjects.map(project => <ProjectCard key={project.id} project={project} t={t} />)}</div>
          <button className="secondary-button more-projects" type="button" aria-expanded={expanded} aria-controls="other-projects" onClick={() => setExpanded(!expanded)}>{expanded ? t.projects.showLess : `${t.projects.showMore} (${otherProjects.length})`}<span aria-hidden="true">{expanded ? "−" : "+"}</span></button>
        </section>
        <section id="about" className="page-section profile-layout"><div><p className="eyebrow">02 — {t.about.eyebrow}</p><h2>{t.about.title}</h2><p className="profile-intro">{t.about.intro}</p></div><div className="education"><h3>{t.about.cards.education.title}</h3><ul>{t.about.timeline.map(item => <li key={item}>{item}</li>)}</ul></div></section>
        <section id="skills" className="page-section"><p className="eyebrow">03 — {t.skills.eyebrow}</p><h2 className="visually-hidden">{t.skills.title}</h2><div className="skills-grid">{t.skills.groups.map(group => <article key={group.id}><h3>{group.title}</h3><ul className="skills-list">{group.items.map(item => <li key={item}>{item}</li>)}</ul></article>)}</div></section>
        <section id="contact" className="page-section contact-layout"><div><p className="eyebrow">04 — {t.contact.eyebrow}</p><h2>{t.contact.title}</h2><p>{t.contact.subtitle}</p></div><a className="primary-button" href={`mailto:${t.contact.emailValue}`}>{t.contact.primaryCta}<FaArrowRight aria-hidden="true" /></a></section>
      </main>
      <footer className="page-width site-footer"><p>© {new Date().getFullYear()} Solomon Taiwo</p><div className="footer-links"><a href="https://github.com/solomontaiwo" target="_blank" rel="noopener noreferrer">GitHub ↗</a><a href="https://www.linkedin.com/in/solomon-taiwo" target="_blank" rel="noopener noreferrer">LinkedIn ↗</a><a href="https://www.instagram.com/solomon.taiwo/" target="_blank" rel="noopener noreferrer">Instagram ↗</a></div></footer>
      {showBackToTop && <a href="#home" className="back-to-top icon-button" aria-label={t.backToTop}><FaArrowUp /></a>}
    </div>
  );
}
export default App;
