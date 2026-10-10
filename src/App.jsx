import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { FaArrowRight, FaArrowUp, FaChevronDown, FaChevronLeft, FaChevronRight, FaCode, FaChevronUp, FaEllipsisH, FaEnvelope, FaExternalLinkAlt, FaMoon, FaSun, FaThLarge, FaTimes, FaUser } from "react-icons/fa";
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
    image: "/images/projects/seenary/seenary.webp",
    link: "https://main.d10eewmnsih3qy.amplifyapp.com/",
    tech: ["Next.js", "Java", "Spring", "AWS", "CI/CD"],
    category: "webApp",
    status: "live",
  },
  {
    id: "eventfinder",
    sortDate: "2026-06-21",
    image: "/images/projects/eventfinder/eventfinder.webp",
    link: "https://event-planner-cuhua6hpb8bwc7ft.italynorth-01.azurewebsites.net/",
    tech: ["Next.js", "TypeScript", "API", "CI/CD"],
    category: "webApp",
    status: "live",
  },
  {
    id: "isHormuzOpen",
    sortDate: "2026-06-21",
    image: "/images/projects/is-hormuz-open/is-hormuz-open.webp",
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
    image: "/images/projects/exobabel/exobabel.webp",
    link: "https://witty-field-0719a7f03.2.azurestaticapps.net/",
    tech: ["React", "Python", "JavaScript", "ML"],
    category: "hackathon",
    status: "live",
  },
  {
    id: "soldisotto",
    sortDate: "2024-11-12",
    image: "/images/projects/soldisotto/soldi-sotto.webp",
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

// Add a project: append an entry to projectCatalog (above) and its texts to translations.js.
// The grid below adapts to any number of projects; only the first few are shown until "See more" (3 projects on mobile, 6 on desktop).
const featuredId = "seenary";
const INITIAL_OTHERS = 5; // desktop
const INITIAL_OTHERS_MOBILE = 2; // mobile: featured + 2 = three visible
const featuredProject = projectCatalog.find(project => project.id === featuredId);
const otherProjects = projectCatalog.filter(project => project.id !== featuredId);
const allProjects = [featuredProject, ...otherProjects];
const sectionIds = ["home", "projects", "about", "skills", "contact"];
const rowIds = ["about", "skills", "contact"];
const socialLinks = [
  { id: "github", label: "GitHub", hint: "solomontaiwo", href: "https://github.com/solomontaiwo" },
  { id: "linkedin", label: "LinkedIn", hint: "solomon-taiwo", href: "https://www.linkedin.com/in/solomon-taiwo" },
  { id: "instagram", label: "Instagram", hint: "@solomon.taiwo", href: "https://www.instagram.com/solomon.taiwo/" },
];

// Rows of three vertical cards; a remainder of 2 becomes two half-width cards, a remainder of 1 one full-width card.
const layoutOthers = list => {
  const remainder = list.length % 3;
  const full = list.length - remainder;
  return list.map((project, index) => (index < full
    ? { project, variant: "tall", span: 2 }
    : { project, variant: "wide", span: remainder === 2 ? 3 : 6 }));
};

function useMediaQuery(query) {
  const [matches, setMatches] = useState(() => typeof window !== "undefined" && window.matchMedia(query).matches);
  useEffect(() => {
    const media = window.matchMedia(query);
    const update = () => setMatches(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, [query]);
  return matches;
}

const parseTimeline = item => {
  const [title, ...rest] = item.split(" - ");
  const sub = rest.join(" - ").replace(/\.$/, "");
  return { title: sub ? title : title.replace(/\.$/, ""), sub };
};

const scrollToTop = event => {
  event.preventDefault();
  window.scrollTo({ top: 0, behavior: "smooth" });
};

// Featured card (desktop hero) links straight to the project; every other card opens the details dialog.
function ProjectCard({ project, t, variant, span, onOpen }) {
  const content = t.projects.items[project.id];
  const featured = variant === "featured";
  const meta = featured ? t.projects.featured : t.projects.categories[project.category];
  return (
    <article className={`glass project project-${variant}${span ? ` span-${span}` : ""}`}>
      <div className="project-media"><img src={project.image} alt="" loading={featured ? "eager" : "lazy"} decoding="async" /></div>
      <div className="project-copy">
        <p className="project-meta"><span>{meta}</span><span className="project-status">{t.projects.status[project.status]}</span></p>
        {featured ? (
          <h3><a href={project.link} target="_blank" rel="noopener noreferrer">{content.title}<span className="visually-hidden"> — {t.projects.viewProject}</span></a></h3>
        ) : (
          <h3><button type="button" className="project-open" data-project={project.id} aria-haspopup="dialog" onClick={event => onOpen(project, event.currentTarget)}>{content.title}</button></h3>
        )}
        {featured && <p className="project-desc">{content.description}</p>}
        {featured && <p className="project-impact">{content.impact}</p>}
        {variant !== "row" && <ul className="tech-list" aria-label={t.skills.title}>{project.tech.map(tech => <li key={tech}>{tech}</li>)}</ul>}
        {featured && <span className="project-cta" aria-hidden="true">{t.projects.viewProject}<FaExternalLinkAlt /></span>}
      </div>
      {variant === "row" && <FaChevronRight className="row-arrow" aria-hidden="true" />}
    </article>
  );
}

// Details: a bottom sheet on mobile, a centred dialog on desktop (layout is CSS only).
function ProjectDialog({ projectId, projects, t, closing, onSelect, onClose, onExited }) {
  const panelRef = useRef(null);
  const closeRef = useRef(null);
  const drag = useRef(null);
  const backdropRef = useRef(null);
  const index = Math.max(0, projects.findIndex(item => item.id === projectId));
  const project = projects[index];
  const content = t.projects.items[project.id];
  const step = delta => onSelect(projects[(index + delta + projects.length) % projects.length].id);
  const latest = useRef({});
  latest.current = { onClose, step };

  useEffect(() => {
    closeRef.current?.focus({ preventScroll: true });
    const onKey = event => {
      if (event.key === "Escape") latest.current.onClose();
      else if (event.key === "ArrowRight") latest.current.step(1);
      else if (event.key === "ArrowLeft") latest.current.step(-1);
      else if (event.key === "Tab" && panelRef.current) {
        const items = [...panelRef.current.querySelectorAll("a[href], button:not([disabled])")].filter(item => item.offsetParent !== null);
        if (!items.length) return;
        const first = items[0];
        const last = items[items.length - 1];
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
        else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
        else if (!panelRef.current.contains(document.activeElement)) { event.preventDefault(); first.focus(); }
      }
    };
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => { window.removeEventListener("keydown", onKey); document.body.style.overflow = previous; };
  }, []);

  useEffect(() => {
    if (!closing) return undefined;
    const timer = window.setTimeout(onExited, 220);
    return () => window.clearTimeout(timer);
  }, [closing]); // eslint-disable-line react-hooks/exhaustive-deps

  // Drag the handle: the sheet follows the finger, then either dismisses (far or fast enough) or springs back.
  const onDragStart = event => {
    drag.current = { id: event.pointerId, startY: event.clientY, dy: 0, lastY: event.clientY, lastTime: event.timeStamp, velocity: 0 };
    event.currentTarget.setPointerCapture(event.pointerId);
    panelRef.current.style.transition = "none";
  };
  const onDragMove = event => {
    const state = drag.current;
    if (!state || state.id !== event.pointerId) return;
    const dt = event.timeStamp - state.lastTime;
    if (dt > 0) state.velocity = (event.clientY - state.lastY) / dt;
    state.lastY = event.clientY;
    state.lastTime = event.timeStamp;
    state.dy = Math.max(0, event.clientY - state.startY);
    panelRef.current.style.transform = `translateY(${state.dy}px)`;
    backdropRef.current.style.opacity = String(Math.max(0.2, 1 - state.dy / panelRef.current.offsetHeight));
  };
  const onDragEnd = event => {
    const state = drag.current;
    if (!state || state.id !== event.pointerId) return;
    drag.current = null;
    const panel = panelRef.current;
    const backdrop = backdropRef.current;
    const dismiss = event.type !== "pointercancel" && state.dy > 8 && (state.dy > panel.offsetHeight * 0.25 || state.velocity > 0.6);
    if (dismiss) {
      // The closing animation starts from where the finger left the sheet.
      panel.style.setProperty("--drag", `${state.dy}px`);
      backdrop.style.setProperty("--fade", backdrop.style.opacity || "1");
      onClose();
    } else {
      panel.style.transition = "transform .32s cubic-bezier(.22, 1, .36, 1)";
      panel.style.transform = "";
      backdrop.style.transition = "opacity .32s ease";
      backdrop.style.opacity = "";
    }
  };

  return (
    <div className={`dialog-overlay${closing ? " is-closing" : ""}`}>
      <div ref={backdropRef} className="dialog-backdrop" onClick={onClose} />
      <section ref={panelRef} className="glass dialog-panel" role="dialog" aria-modal="true" aria-labelledby="dialog-title">
        <div className="sheet-handle" onPointerDown={onDragStart} onPointerMove={onDragMove} onPointerUp={onDragEnd} onPointerCancel={onDragEnd} aria-hidden="true"><span /></div>
        <button ref={closeRef} type="button" className="icon-button dialog-close" aria-label={t.projects.close} onClick={onClose}><FaTimes aria-hidden="true" /></button>
        <div className="project-media dialog-media"><img src={project.image} alt="" decoding="async" /></div>
        <div className="dialog-body">
          <p className="project-meta"><span>{project.id === featuredId ? t.projects.featured : t.projects.categories[project.category]}</span><span className="project-status">{t.projects.status[project.status]}</span></p>
          <h2 id="dialog-title">{content.title}</h2>
          <p className="dialog-desc">{content.description}</p>
          {content.impact && <p className="project-impact">{content.impact}</p>}
          <ul className="tech-list" aria-label={t.skills.title}>{project.tech.map(tech => <li key={tech}>{tech}</li>)}</ul>
          <a className="primary-button dialog-cta" href={project.link} target="_blank" rel="noopener noreferrer">{t.projects.viewProject}<FaExternalLinkAlt aria-hidden="true" /></a>
        </div>
        <div className="dialog-nav">
          <button type="button" className="icon-button" aria-label={t.projects.previous} onClick={() => step(-1)}><FaChevronLeft aria-hidden="true" /></button>
          <button type="button" className="icon-button" aria-label={t.projects.next} onClick={() => step(1)}><FaChevronRight aria-hidden="true" /></button>
          <span className="dialog-count" aria-hidden="true">{index + 1} / {projects.length}</span>
        </div>
      </section>
    </div>
  );
}

const PHOTO = { thumb: "/images/solomon-profile-thumb.jpg", src: "/images/solomon-profile-photo.jpg", width: 2285, height: 2233 };

function PhotoViewer({ open, visible, originRef, alt, closeLabel, onClose, onExited }) {
  const imgRef = useRef(null);
  const backdropRef = useRef(null);
  const closeRef = useRef(null);
  const animations = useRef([]);

  useLayoutEffect(() => {
    if (!visible) return undefined;
    const img = imgRef.current;
    const origin = originRef.current;
    if (!img || !origin) return undefined;
    animations.current.forEach(animation => animation.cancel());
    const ratio = PHOTO.width / PHOTO.height;
    const width = Math.min(window.innerWidth * 0.92, 640, window.innerHeight * 0.82 * ratio);
    img.style.width = `${width}px`;
    img.style.height = `${width / ratio}px`;
    const from = origin.getBoundingClientRect();
    const to = img.getBoundingClientRect();
    const square = Math.min(to.width, to.height);
    const cropX = (to.width - square) / 2;
    const cropY = (to.height - square) * 0.3;
    const scale = from.width / square;
    const collapsed = {
      transform: `translate(${from.left - to.left - cropX * scale}px, ${from.top - to.top - cropY * scale}px) scale(${scale})`,
      clipPath: `inset(${cropY}px ${to.width - cropX - square}px ${to.height - cropY - square}px ${cropX}px round ${square / 2}px)`,
    };
    const expanded = { transform: "translate(0px, 0px) scale(1)", clipPath: "inset(0px 0px 0px 0px round 28px)" };
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const options = { duration: reduce ? 0 : open ? 560 : 400, easing: "cubic-bezier(.22, 1, .36, 1)", fill: "both" };
    const photo = img.animate(open ? [collapsed, expanded] : [expanded, collapsed], options);
    const fade = backdropRef.current.animate(open ? [{ opacity: 0 }, { opacity: 1 }] : [{ opacity: 1 }, { opacity: 0 }], { ...options, easing: "ease" });
    animations.current = [photo, fade];
    if (open) closeRef.current?.focus({ preventScroll: true });
    else photo.finished.then(onExited, () => {});
    return undefined;
  }, [open, visible]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (!visible) return undefined;
    const onKey = event => {
      if (event.key === "Escape") onClose();
      if (event.key === "Tab") { event.preventDefault(); closeRef.current?.focus(); }
    };
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => { window.removeEventListener("keydown", onKey); document.body.style.overflow = previous; };
  }, [visible, onClose]);

  if (!visible) return null;
  return (
    <div className="photo-overlay" role="dialog" aria-modal="true" aria-label={alt}>
      <div ref={backdropRef} className="photo-backdrop" onClick={onClose} />
      <img ref={imgRef} className="photo-large" src={PHOTO.src} alt={alt} width={PHOTO.width} height={PHOTO.height} onClick={onClose} />
      <button ref={closeRef} type="button" className="glass icon-button photo-close" aria-label={closeLabel} onClick={onClose}><FaTimes aria-hidden="true" /></button>
    </div>
  );
}

function App() {
  const { language, setLanguage } = useLanguage();
  const t = translations[language] || translations.en;
  const isDesktop = useMediaQuery("(min-width: 720px)");
  const glass = on => (on ? " glass" : "");
  const [showAll, setShowAll] = useState(false);
  const [openGroup, setOpenGroup] = useState(null);
  const [active, setActive] = useState("home");
  const [headerHidden, setHeaderHidden] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [photoState, setPhotoState] = useState("closed");
  const [dialog, setDialog] = useState(null);
  const opener = useRef(null);
  const avatarRef = useRef(null);
  const dockAvatarRef = useRef(null);
  const moreButtonRef = useRef(null);
  const [moreOpen, setMoreOpen] = useState(false);
  const openProject = (project, element) => { opener.current = element; setDialog({ id: project.id, closing: false }); };
  const closeDialog = () => setDialog(current => (current && !current.closing ? { ...current, closing: true } : current));
  const dialogExited = () => {
    const id = dialog && dialog.id;
    setDialog(null);
    const target = document.querySelector(`.project-open[data-project="${id}"]`) || opener.current;
    if (target && target.focus) target.focus({ preventScroll: true });
  };
  const closePhoto = () => setPhotoState(state => (state === "open" ? "closing" : state));
  const [theme, setTheme] = useState(() => document.documentElement.getAttribute("data-theme") || "light");
  const applyTheme = next => {
    setTheme(next);
    document.documentElement.setAttribute("data-theme", next);
    try { window.localStorage.setItem("theme", next); } catch { /* Theme still works when storage is unavailable. */ }
  };
  const toggleTheme = () => applyTheme(theme === "dark" ? "light" : "dark");
  const closeMore = () => { setMoreOpen(false); if (moreButtonRef.current) moreButtonRef.current.focus({ preventScroll: true }); };
  useEffect(() => {
    if (!moreOpen) return undefined;
    const onKey = event => { if (event.key === "Escape") { setMoreOpen(false); if (moreButtonRef.current) moreButtonRef.current.focus({ preventScroll: true }); } };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [moreOpen]);
  useEffect(() => { if (isDesktop) setMoreOpen(false); }, [isDesktop]);
  useEffect(() => {
    let last = window.scrollY;
    let frame = 0;
    const update = () => {
      frame = 0;
      const y = window.scrollY;
      const desktop = window.innerWidth >= 720;
      setShowBackToTop(y > 500);
      if (y < 80 || y < last - 4) setHeaderHidden(false);
      else if (y > last + 4 && y > 160) setHeaderHidden(true);
      if (Math.abs(y - last) > 4) last = y;
      const line = window.innerHeight * 0.4;
      let current = "home";
      sectionIds.forEach(id => {
        const element = document.getElementById(id);
        if (element && element.getBoundingClientRect().top <= line) current = id;
      });
      if (desktop) {
        // Profile, skills and contact share one row, so on desktop they are a single "about" entry.
        // The row sits at the very end of the page, so it may never reach the reading line: the bottom counts as "about" too.
        if (rowIds.includes(current) || window.innerHeight + y >= document.documentElement.scrollHeight - 4) current = "about";
      } else if (window.innerHeight + y >= document.documentElement.scrollHeight - 4) current = "contact";
      else if (current === "skills") current = "about"; // On mobile the "Profilo" entry covers profile and skills.
      setActive(current);
    };
    const onScroll = () => { if (!frame) frame = window.requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  const activeGroup = openGroup ?? t.skills.groups[0].id;
  const links = [
    { id: "projects", label: t.nav.projects, Icon: FaThLarge },
    { id: "about", label: t.nav.about, Icon: FaUser },
    { id: "skills", label: t.nav.skills, Icon: FaCode },
    { id: "contact", label: t.nav.contact, Icon: FaEnvelope },
  ];
  const compact = headerHidden && !moreOpen && !isDesktop;
  const sectionLabel = ({ home: t.nav.home, projects: t.nav.projects, about: t.nav.about, skills: t.nav.about, contact: t.nav.contact })[active] || t.nav.home;
  const mailto = `mailto:${t.contact.emailValue}`;
  const primaryContact = <a className="primary-button" href={mailto}>{t.contact.primaryCta}<FaArrowRight aria-hidden="true" /></a>;
  const initialOthers = isDesktop ? INITIAL_OTHERS : INITIAL_OTHERS_MOBILE;
  const visibleOthers = showAll ? otherProjects : otherProjects.slice(0, initialOthers);
  const hiddenCount = otherProjects.length - initialOthers;
  const contactIntro = (
    <div className="contact-main">
      <p className="eyebrow">{t.contact.eyebrow}</p>
      <h2>{t.contact.title}</h2>
      <p>{t.contact.subtitle}</p>
    </div>
  );

  return (
    <div className="portfolio">
      <div className="ambient" aria-hidden="true" />
      <a className="skip-link" href="#main">{t.nav.skip}</a>
      {isDesktop && <header className={`site-header${headerHidden ? " is-hidden" : ""}`} onFocus={() => setHeaderHidden(false)}>
        <div className="glass header-pill">
          <div className="header-id">
            <button ref={avatarRef} type="button" className="avatar-button" data-hidden={photoState !== "closed"} aria-haspopup="dialog" aria-label={t.hero.openPhoto} onClick={() => setPhotoState("open")}><img src={PHOTO.thumb} alt="" width="44" height="44" /></button>
            <a className="brand" href="#home" onClick={scrollToTop}>Solomon Taiwo<span aria-hidden="true"> /</span></a>
          </div>
          <nav className="desktop-nav" aria-label={t.nav.navigation}>
            {links.filter(link => ["projects", "about"].includes(link.id)).map(link => (
              <a key={link.id} href={`#${link.id}`} aria-current={active === link.id ? "location" : undefined}>{link.label}</a>
            ))}
          </nav>
          <div className="nav-controls">
            {isDesktop && <a className="header-cta" href="#contact">{t.contact.primaryCta}</a>}
            <button className="icon-button language-button" type="button" onClick={() => setLanguage(language === "it" ? "en" : "it")} aria-label={t.nav.languageLabel}>{t.nav.langSwitch}</button>
            <button className="icon-button" type="button" onClick={toggleTheme} aria-label={t.nav.themeToggle}>{theme === "dark" ? <FaSun /> : <FaMoon />}</button>
          </div>
        </div>
      </header>}

      <main id="main" className="page-width">
        <section id="home" className="hero">
          <div className={`hero-main${glass(isDesktop)}`}>
            <p className="eyebrow">{t.hero.role}</p>
            <h1>{t.hero.headline[0]}<br /><span>{t.hero.headline[1]}</span></h1>
            <p className="hero-description">{t.hero.description}</p>
          </div>
          {isDesktop && <ProjectCard project={featuredProject} t={t} variant="featured" />}
        </section>

        <section id="projects" className="section">
          <div className="section-head"><p className="eyebrow">{t.projects.eyebrow}</p><h2>{isDesktop ? t.projects.othersTitle : t.projects.title}</h2></div>
          <div id="project-grid" className="project-grid">
            {!isDesktop && <ProjectCard project={featuredProject} t={t} variant="row" onOpen={openProject} />}
            {isDesktop
              ? layoutOthers(visibleOthers).map(({ project, variant, span }) => <ProjectCard key={project.id} project={project} t={t} variant={variant} span={span} onOpen={openProject} />)
              : visibleOthers.map(project => <ProjectCard key={project.id} project={project} t={t} variant="row" onOpen={openProject} />)}
          </div>
          {hiddenCount > 0 && (
            <button type="button" className="more-projects" aria-expanded={showAll} aria-controls="project-grid" onClick={() => setShowAll(!showAll)}>
              {showAll ? t.projects.showLess : `${t.projects.seeMore} (${hiddenCount})`}
            </button>
          )}
        </section>

        <div id="about" className="section bottom-row">
          <section className={`profile-card${glass(isDesktop)}`} aria-labelledby="about-title">
            <p className="eyebrow">{t.about.eyebrow}</p>
            <h2 id="about-title">{t.about.title}</h2>
            <p className="profile-intro">{t.about.intro}</p>
            <div className={`timeline-card${glass(!isDesktop)}`}>
              <h3>{t.about.cards.education.title}</h3>
              <ol className="timeline">{t.about.timeline.map(item => { const entry = parseTimeline(item); return <li key={item}><strong>{entry.title}</strong>{entry.sub && <span>{entry.sub}</span>}</li>; })}</ol>
            </div>
          </section>
          <section id="skills" className={`skills-card${glass(isDesktop)}`} aria-labelledby="skills-title">
            <p className="eyebrow">{t.skills.eyebrow}</p>
            <h2 id="skills-title">{t.skills.title}</h2>
            <div className="skill-groups">
              {t.skills.groups.map(group => {
                const open = isDesktop || activeGroup === group.id;
                return (
                  <div key={group.id} className={`skill-group${glass(!isDesktop)}`} data-open={open}>
                    {isDesktop
                      ? <h3>{group.title}</h3>
                      : <button type="button" className="skill-toggle" aria-expanded={open} aria-controls={`skills-${group.id}`} onClick={() => setOpenGroup(open ? "" : group.id)}>{group.title}<FaChevronDown aria-hidden="true" /></button>}
                    <ul id={`skills-${group.id}`} className="chips" hidden={!open}>{group.items.map(item => <li key={item}>{item}</li>)}</ul>
                  </div>
                );
              })}
            </div>
          </section>
          {isDesktop ? (
            <section id="contact" className="glass contact-card">
              {contactIntro}
              {primaryContact}
              <ul className="social-links">{socialLinks.map(link => <li key={link.id}><a href={link.href} target="_blank" rel="noopener noreferrer">{link.label}<span aria-hidden="true">↗</span></a></li>)}</ul>
            </section>
          ) : (
            <section id="contact" className="contact-mobile">
              <div className="glass contact-card">
                {contactIntro}
                {primaryContact}
              </div>
              <ul className="social-rows">
                {socialLinks.map(link => (
                  <li key={link.id}><a className="glass" href={link.href} target="_blank" rel="noopener noreferrer"><span>{link.label}</span><span className="social-hint">{link.hint}<FaExternalLinkAlt aria-hidden="true" /></span></a></li>
                ))}
              </ul>
            </section>
          )}
        </div>
      </main>

      <footer className="page-width site-footer"><p>© {new Date().getFullYear()} Solomon Taiwo</p></footer>

      {!isDesktop && (
        <>
          {moreOpen && <div className="dock-menu-backdrop" onClick={closeMore} aria-hidden="true" />}
          {moreOpen && (
            <div className="dock-menu" role="group" aria-label={t.nav.more}>
              <div className="dock-menu-row">
                <span className="dock-menu-label">{t.nav.language}</span>
                <div className="seg">
                  <button type="button" aria-pressed={language === "it"} aria-label="Italiano" onClick={() => setLanguage("it")}>IT</button>
                  <button type="button" aria-pressed={language === "en"} aria-label="English" onClick={() => setLanguage("en")}>EN</button>
                </div>
              </div>
              <div className="dock-menu-row">
                <span className="dock-menu-label">{t.nav.theme}</span>
                <div className="seg">
                  <button type="button" aria-pressed={theme === "light"} onClick={() => applyTheme("light")}><FaSun aria-hidden="true" />{t.nav.themeLight}</button>
                  <button type="button" aria-pressed={theme === "dark"} onClick={() => applyTheme("dark")}><FaMoon aria-hidden="true" />{t.nav.themeDark}</button>
                </div>
              </div>
            </div>
          )}
          <nav className={`glass dock${compact ? " is-compact" : ""}`} aria-label={t.nav.quickNav} onFocus={() => setHeaderHidden(false)}>
            <button ref={dockAvatarRef} type="button" className="avatar-button dock-avatar" data-hidden={photoState !== "closed"} aria-haspopup="dialog" aria-label={t.hero.openPhoto} onClick={() => setPhotoState("open")}><img src={PHOTO.thumb} alt="" width="44" height="44" /></button>
            <div className="dock-full">
              {links.filter(link => link.id !== "skills").map(({ id, label, Icon }) => (
                <a key={id} href={`#${id}`} aria-current={active === id ? "location" : undefined}><Icon aria-hidden="true" /><span>{label}</span></a>
              ))}
              <button ref={moreButtonRef} type="button" className="dock-more" aria-haspopup="true" aria-expanded={moreOpen} onClick={() => setMoreOpen(open => !open)}><FaEllipsisH aria-hidden="true" /><span>{t.nav.more}</span></button>
            </div>
            <button type="button" className="dock-compact" aria-label={t.nav.expandMenu} onClick={() => setHeaderHidden(false)}>
              <span className="dock-here"><small>{t.nav.currentSection}</small><strong>{sectionLabel}</strong></span>
              <FaChevronUp aria-hidden="true" />
            </button>
          </nav>
        </>
      )}
      {dialog && <ProjectDialog projectId={dialog.id} projects={allProjects} t={t} closing={dialog.closing} onSelect={id => setDialog({ id, closing: false })} onClose={closeDialog} onExited={dialogExited} />}
      <PhotoViewer open={photoState === "open"} visible={photoState !== "closed"} originRef={isDesktop ? avatarRef : dockAvatarRef} alt={t.hero.imageAlt} closeLabel={t.hero.closePhoto} onClose={closePhoto} onExited={() => setPhotoState("closed")} />
      {showBackToTop && <a href="#home" onClick={scrollToTop} className="glass back-to-top icon-button" aria-label={t.backToTop}><FaArrowUp /></a>}
    </div>
  );
}
export default App;
