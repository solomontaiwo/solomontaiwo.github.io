export const translations = {
  it: {
    nav: {
      skip: "Vai al contenuto",
      menu: "Apri o chiudi menu",
      navigation: "Navigazione principale",
      languageLabel: "Switch to English",
      about: "Profilo",
      skills: "Competenze",
      projects: "Progetti",
      contact: "Contatti",
      cta: "Parliamone",
      langSwitch: "EN",
      themeToggle: "Cambia tema",
      home: "Home",
      quickNav: "Navigazione rapida",
    },
    hero: {
      headline: ["Idee complesse.", "Software chiaro."],
      greeting: "Ciao, sono",
      name: "Solomon Taiwo",
      role: "Software Engineer | AI & Data",
      description:
        "Sono Solomon Taiwo. Progetto e sviluppo applicazioni web affidabili, dal frontend ai dati.",
      primaryCta: "Vedi i progetti",
      socialLabel: "Canali professionali",
      factsLabel: "Punti chiave",
      imageAlt: "Ritratto professionale di Solomon Taiwo",
      spotlightLabel: "Focus attuale",
      spotlightTitle: "Prodotti digitali puliti, veloci e scalabili",
      spotlightText:
        "Dal requisito al rilascio, con attenzione a qualità del codice, esperienza utente e mantenibilità nel tempo.",
      quickFacts: ["Full Stack Engineering", "AI e Data Analysis", "Delivery orientata ai risultati"],
      openPhoto: "Apri la foto",
      closePhoto: "Chiudi la foto",
    },
    about: {
      eyebrow: "Profilo",
      title: "Dal problema al prodotto.",
      subtitle:
        "Unisco rigore tecnico e pragmatismo per trasformare idee in prodotti digitali chiari, solidi e utili.",
      intro:
        "Lavoro con un processo semplice e disciplinato: analisi del problema, design tecnico, sviluppo incrementale e verifica continua della qualità.",
      timeline: [
        "Laurea in Informatica - Università degli Studi di Ferrara.",
        "Magistrale in Computer Engineering (AI e Data Analysis) - Politecnico di Torino.",
        "Esperienza su web app, progetti data-driven e implementazioni orientate a utenti reali.",
      ],
      cards: {
        experience: {
          title: "Esperienza pratica",
          description:
            "Frontend e backend, integrazione dati, performance tuning e attenzione costante alla stabilità.",
        },
        education: {
          title: "Formazione solida",
          description:
            "Fondamenti su software engineering, algoritmi, data management e metodi quantitativi.",
        },
        focus: {
          title: "Focus operativo",
          description:
            "Problem solving, collaborazione efficace e miglioramento continuo della qualità del prodotto.",
        },
      },
    },
    skills: {
      eyebrow: "Competenze",
      title: "Stack tecnico",
      subtitle: "Tecnologie moderne orientate a delivery, qualità e impatto reale.",
      groups: [
        {
          id: "engineering",
          title: "Software Engineering",
          items: ["Java", "React", "JavaScript", "Node.js", "Rust", "AWS", "Embedded programming (ASM)", "REST API"],
        },
        {
          id: "data",
          title: "Data & AI",
          items: ["Python", "SQL", "Machine Learning", "Data Analysis", "MySQL", "PostgreSQL", "MongoDB"],
        },
        {
          id: "delivery",
          title: "Quality & Delivery",
          items: ["Git/GitHub", "Refactoring", "Debugging", "Deploy", "Responsive UI", "Testing mindset"],
        },
      ],
      workflowTitle: "Metodo di lavoro",
      workflow: [
        "Analisi obiettivi, requisiti e vincoli.",
        "Sviluppo incrementale con feedback continuo.",
        "Ottimizzazione, quality check e rilascio.",
      ],
    },
    projects: {
      featured: "In evidenza · Full stack",
      showMore: "Altri progetti",
      showLess: "Mostra meno",
      eyebrow: "Showcase",
      title: "Progetti selezionati",
      subtitle: "Una selezione di lavori che mostrano execution tecnica e impatto concreto.",
      viewProject: "Apri progetto",
      filterAll: "Tutti",
      filterLabel: "Filtra i progetti",
      seeMore: "Vedi altro",
      othersTitle: "Altri progetti",
      status: {
        live: "Live",
        completed: "Completato",
        inProgress: "In sviluppo",
      },
      categories: {
        hackathon: "Hackathon",
        webApp: "Web App",
        university: "Universitario",
        repository: "Repository",
      },
      items: {
        securityQuiz: {
          title: "Quiz Sicurezza dei sistemi informativi",
          description:
            "Simulazione PWA per preparare l'esame di sicurezza dei sistemi informativi con domande a risposta multipla tratte dalle prove passate.",
          impact:
            "Impatto: esperienza di studio offline-first con 73 affermazioni, cinque lingue, spiegazioni degli errori e deploy automatico su Cloudflare Pages.",
        },
        seenary: {
          title: "Seenary",
          description:
            "Tracker responsive per film, serie TV e anime, con progressi, valutazioni, recensioni e interfaccia multilingua.",
          impact:
            "Impatto: applicazione full-stack pronta per la produzione con Next.js, Java/Spring Boot e servizi serverless AWS, completa di CI/CD.",
        },
        exobabel: {
          title: "Exobabel",
          description:
            "Progetto NASA Space Apps Challenge 2025 per analisi di esopianeti con approccio machine learning.",
          impact: "Impatto: integrazione tra UI moderna e logiche data-driven su un caso ad alta complessità.",
        },
        soldisotto: {
          title: "SoldiSotto",
          description:
            "Web app per gestione finanze personali con UX chiara e flusso orientato alla praticità.",
          impact: "Impatto: prodotto end-to-end con focus su usabilità, affidabilità e miglioramento progressivo.",
        },
        isHormuzOpen: {
          title: "Is Hormuz Open",
          description:
            "Web app minimale che indica se lo Stretto di Hormuz risulta aperto, citando una fonte verificabile.",
          impact: "Impatto: rilascio end-to-end con Cloudflare Workers, dominio custom, CI/CD e UI essenziale.",
        },
        // ruggine: {
        //   title: "Ruggine",
        //   description:
        //     "Progetto universitario di messaggistica real-time con backend Rust, frontend React, autenticazione JWT e persistenza SQLite.",
        //   impact:
        //     "Impatto: applicazione full-stack completa con chat 1-1, gruppi, inviti e comunicazione WebSocket.",
        // },
        eventfinder: {
          title: "EventFinder",
          description:
            "Applicazione Next.js live su Azure per scoprire eventi reali da Wikidata, fonti civiche e provider come Ticketmaster.",
          impact:
            "Impatto: ricerca responsive con filtri per città valida e data, deduplicazione cross-source, API route e pipeline CI/CD.",
        },
        // Progetti archiviati e non più presenti nel catalogo visualizzato.
        // artistRoom: {
        //   title: "The Artist Room",
        //   description:
        //     "Piattaforma per artisti e gallerie realizzata con stack eterogeneo e gestione dati strutturata.",
        //   impact: "Impatto: coordinamento efficace di tecnologie diverse in un unico prodotto coerente.",
        // },
        // bibliotecaUnife: {
        //   title: "Biblioteca UNIFE",
        //   description:
        //     "Repository tecnico orientato a Java e pattern software in contesto didattico.",
        //   impact: "Impatto: consolidamento di basi ingegneristiche e disciplina progettuale del codice.",
        // },
      },
    },
    contact: {
      eyebrow: "Contatto",
      title: "Parliamo del tuo prossimo progetto",
      subtitle:
        "Disponibile per collaborazioni professionali, opportunità IT e sfide tecniche con obiettivi chiari.",
      linkedinText: "Profilo professionale aggiornato",
      emailValue: "taiwo.o.solomon@gmail.com",
      emailText: "Scrivimi direttamente",
      primaryCta: "Scrivimi",
      actions: {
        github: "GitHub",
        linkedin: "LinkedIn",
        email: "Email",
      },
    },
    backToTop: "Torna su",
    footer: {
      madeWith: "Portfolio sviluppato con React e Bootstrap",
    },
  },

  en: {
    nav: {
      skip: "Skip to content",
      menu: "Open or close menu",
      navigation: "Main navigation",
      languageLabel: "Passa a italiano",
      about: "Profile",
      skills: "Skills",
      projects: "Projects",
      contact: "Contact",
      cta: "Let's talk",
      langSwitch: "IT",
      themeToggle: "Toggle theme",
      home: "Home",
      quickNav: "Quick navigation",
    },
    hero: {
      headline: ["Complex ideas.", "Clear software."],
      greeting: "Hi, I'm",
      name: "Solomon Taiwo",
      role: "Software Engineer | AI & Data",
      description:
        "I'm Solomon Taiwo. I design and build reliable web applications, from frontend to data.",
      primaryCta: "View projects",
      socialLabel: "Professional channels",
      factsLabel: "Key points",
      imageAlt: "Professional portrait of Solomon Taiwo",
      spotlightLabel: "Current focus",
      spotlightTitle: "Clean, fast, and scalable digital products",
      spotlightText:
        "From requirement to release, with strong attention to code quality, user experience, and long-term maintainability.",
      quickFacts: ["Full Stack Engineering", "AI and Data Analysis", "Result-oriented delivery"],
      openPhoto: "Open photo",
      closePhoto: "Close photo",
    },
    about: {
      eyebrow: "Profile",
      title: "From problem to product.",
      subtitle:
        "I combine technical rigor and pragmatism to turn ideas into clear, reliable, and useful digital products.",
      intro:
        "My process is simple and disciplined: problem analysis, technical design, incremental implementation, and continuous quality validation.",
      timeline: [
        "Bachelor's degree in Computer Science - University of Ferrara.",
        "Master's in Computer Engineering (AI and Data Analysis) - Polytechnic University of Turin.",
        "Hands-on experience in web apps, data-driven projects, and real-user focused implementations.",
      ],
      cards: {
        experience: {
          title: "Practical experience",
          description:
            "Frontend and backend development, data integration, performance tuning, and reliable delivery.",
        },
        education: {
          title: "Strong education",
          description:
            "Foundation in software engineering, algorithms, data management, and quantitative methods.",
        },
        focus: {
          title: "Operational focus",
          description:
            "Problem solving, effective collaboration, and continuous product quality improvement.",
        },
      },
    },
    skills: {
      eyebrow: "Skills",
      title: "Technical stack",
      subtitle: "Modern technologies built for delivery, quality, and measurable impact.",
      groups: [
        {
          id: "engineering",
          title: "Software Engineering",
          items: ["Java", "React", "JavaScript", "Node.js", "Rust", "AWS", "Embedded programming (ASM)", "REST API"],
        },
        {
          id: "data",
          title: "Data & AI",
          items: ["Python", "SQL", "Machine Learning", "Data Analysis", "MySQL", "PostgreSQL", "MongoDB"],
        },
        {
          id: "delivery",
          title: "Quality & Delivery",
          items: ["Git/GitHub", "Refactoring", "Debugging", "Deploy", "Responsive UI", "Testing mindset"],
        },
      ],
      workflowTitle: "Work method",
      workflow: [
        "Analyze goals, requirements, and constraints.",
        "Incremental development with continuous feedback.",
        "Optimization, quality checks, and release.",
      ],
    },
    projects: {
      featured: "Featured · Full stack",
      showMore: "More projects",
      showLess: "Show less",
      eyebrow: "Showcase",
      title: "Selected projects",
      subtitle: "A curated set of work showing technical execution and concrete impact.",
      viewProject: "Open project",
      filterAll: "All",
      filterLabel: "Filter projects",
      seeMore: "See more",
      othersTitle: "More projects",
      status: {
        live: "Live",
        completed: "Completed",
        inProgress: "In progress",
      },
      categories: {
        hackathon: "Hackathon",
        webApp: "Web App",
        university: "University",
        repository: "Repository",
      },
      items: {
        securityQuiz: {
          title: "Information Systems Security Quiz",
          description:
            "PWA study simulator for the Information Systems Security exam, with multiple-choice questions derived from past papers.",
          impact:
            "Impact: offline-first study experience with 73 statements, five languages, mistake explanations, and automatic deployment on Cloudflare Pages.",
        },
        seenary: {
          title: "Seenary",
          description:
            "Responsive tracker for films, TV series and anime, with progress tracking, ratings, reviews, and a multilingual UX.",
          impact:
            "Impact: production-ready full-stack application built with Next.js, Java/Spring Boot, and AWS serverless services, with CI/CD included.",
        },
        exobabel: {
          title: "Exobabel",
          description:
            "NASA Space Apps Challenge 2025 project focused on exoplanet analysis with a machine learning approach.",
          impact: "Impact: integration of modern UI and data-driven logic on a high-complexity case.",
        },
        soldisotto: {
          title: "SoldiSotto",
          description:
            "Personal finance web app with clear UX and a practical user-oriented flow.",
          impact: "Impact: end-to-end product focused on usability, reliability, and iterative improvement.",
        },
        isHormuzOpen: {
          title: "Is Hormuz Open",
          description:
            "Minimal web app reporting whether the Strait of Hormuz appears open, with a verifiable source.",
          impact: "Impact: end-to-end release with Cloudflare Workers, custom domain, CI/CD, and a minimal UI.",
        },
        // ruggine: {
        //   title: "Ruggine",
        //   description:
        //     "University real-time messaging project with a Rust backend, React frontend, JWT authentication, and SQLite persistence.",
        //   impact:
        //     "Impact: complete full-stack application with one-to-one chats, groups, invite codes, and WebSocket communication.",
        // },
        eventfinder: {
          title: "EventFinder",
          description:
            "Live Next.js application on Azure for discovering real events from Wikidata, civic sources, and providers such as Ticketmaster.",
          impact:
            "Impact: responsive search with valid-city and date filters, cross-source deduplication, API routes, and CI/CD pipeline.",
        },
        // Archived projects kept as commented references and excluded from the catalog.
        // artistRoom: {
        //   title: "The Artist Room",
        //   description:
        //     "Platform for artists and galleries built with a heterogeneous stack and structured data handling.",
        //   impact: "Impact: effective orchestration of different technologies into one coherent product.",
        // },
        // bibliotecaUnife: {
        //   title: "Biblioteca UNIFE",
        //   description:
        //     "Technical repository focused on Java and software patterns in an educational context.",
        //   impact: "Impact: stronger engineering fundamentals and cleaner code design discipline.",
        // },
      },
    },
    contact: {
      eyebrow: "Contact",
      title: "Let's discuss your next project",
      subtitle:
        "Available for professional collaborations, IT opportunities, and technical challenges with clear goals.",
      linkedinText: "Updated professional profile",
      emailValue: "taiwo.o.solomon@gmail.com",
      emailText: "Get in touch directly",
      primaryCta: "Contact me",
      actions: {
        github: "GitHub",
        linkedin: "LinkedIn",
        email: "Email",
      },
    },
    backToTop: "Back to top",
    footer: {
      madeWith: "Portfolio built with React and Bootstrap",
    },
  },
};
