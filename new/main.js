// main.js

document.addEventListener("DOMContentLoaded", () => {
  const modeToggle = document.getElementById("mode-toggle");
  const langSelect = document.getElementById("lang-select");
  const body = document.body;
  const container = document.querySelector(".projects-container");

  const getLang = () => localStorage.getItem("lang") || "en";
  langSelect.value = getLang();
  const currentLang = getLang();

  // Mode toggle
  modeToggle.addEventListener("click", () => {
    body.classList.toggle("dark");
    modeToggle.textContent = body.classList.contains("dark") ? "☀️" : "🌙";
  });

  // Typewriter
  const tw = document.querySelector(".typewriter");
  const text = tw.textContent;
  tw.textContent = "";
  let i = 0;
  const type = () => {
    if (i < text.length) {
      tw.textContent += text.charAt(i);
      i++;
      setTimeout(type, 50);
    }
  };
  type();

  // Static Pinned Projects
  const pinnedProjects = [
    {
      name: "Quote Generator",
      descriptions: {
        en: "A simple app that displays random quotes. Built with HTML, CSS, JS.",
        de: "Eine einfache App, die zufällige Zitate anzeigt. Erstellt mit HTML, CSS, JS.",
        fr: "Une application simple qui affiche des citations aléatoires. Conçue en HTML, CSS, JS.",
        fa: "برنامه‌ای ساده برای نمایش نقل‌قول‌های تصادفی با HTML, CSS و JS."
      },
      github: "https://github.com/PooriyaKTB/Quote-Generator"
    },
    {
      name: "Spell Checker",
      descriptions: {
        en: "Spell checking app with highlighting and dictionary expansion.",
        de: "Rechtschreibprüfung mit Hervorhebung und Wörterbucherweiterung.",
        fr: "Application de vérification orthographique avec surlignage et extension de dictionnaire.",
        fa: "برنامه‌ای برای بررسی املایی با هایلایت و افزودن به دیکشنری."
      },
      github: "https://github.com/PooriyaKTB/Spell-Checker",
      demo: "https://piscine-spell-checker.netlify.app/"
    },
    {
      name: "Days Calendar",
      descriptions: {
        en: "Interactive calendar showing meaningful day differences.",
        de: "Interaktiver Kalender zur Anzeige bedeutungsvoller Tagesunterschiede.",
        fr: "Calendrier interactif montrant des écarts de jours significatifs.",
        fa: "تقویم تعاملی برای نمایش اختلاف روزهای معنادار."
      },
      github: "https://github.com/PooriyaKTB/The-Days-Calendar",
      demo: "https://piscine-days-calendar.netlify.app/"
    },
    {
      name: "Spaced Repetition Tracker",
      descriptions: {
        en: "Visual tracker for spaced repetition learning cycles.",
        de: "Visueller Tracker für Wiederholungslernrhythmen.",
        fr: "Suivi visuel des cycles d'apprentissage par répétition espacée.",
        fa: "ردیاب بصری برای چرخه‌های یادگیری تکرار با فاصله."
      },
      github: "https://github.com/PooriyaKTB/Project-Spaced-Repetition-Tracker",
      demo: "https://piscine-spaced-repetition-tracker.netlify.app/"
    },
    {
      name: "TV Show",
      descriptions: {
        en: "TV show search app using TVMaze API. Modern UI and filters included.",
        de: "TV-Show-Such-App mit TVMaze API. Modernes UI und Filter enthalten.",
        fr: "Application de recherche de séries TV utilisant l'API TVMaze. UI moderne et filtres inclus.",
        fa: "برنامه جستجوی سریال با استفاده از API سرویس TVMaze، با رابط کاربری مدرن و فیلترها."
      },
      github: "https://github.com/PooriyaKTB/Project-TV-Show",
      demo: "https://cyf-pooriyaktb-tv.netlify.app/"
    },
    {
      name: "HomeTown",
      descriptions: {
        en: "My very first project — a personal page built in early HTML/CSS days.",
        de: "Mein allererstes Projekt – eine persönliche Seite aus den frühen HTML/CSS-Tagen.",
        fr: "Mon tout premier projet – une page personnelle créée aux débuts de HTML/CSS.",
        fa: "اولین پروژه من — یک صفحه شخصی در روزهای ابتدایی یادگیری HTML/CSS."
      },
      github: "https://github.com/PooriyaKTB/HomeTown",
      demo: "https://pooriya-hometown.netlify.app/"
    }
  ];

  function renderProjects(lang) {
    container.innerHTML = "";
    pinnedProjects.forEach(repo => {
      const card = document.createElement("div");
      card.className = "card";
      card.innerHTML = `
        <h3>${repo.name}</h3>
        <p>${repo.descriptions[lang]}</p>
        <div class="project-links">
          <a href="${repo.github}" class="project-btn github" target="_blank">GitHub</a>
          ${repo.demo ? `<a href="${repo.demo}" class="project-btn live" target="_blank">Live Demo</a>` : ""}
        </div>
      `;
      container.appendChild(card);
    });
  }

  const i18nKeys = document.querySelectorAll("[data-i18n]");
  const i18n = {
    en: {
      "nav.home": "Home",
      "nav.about": "About",
      "nav.projects": "Projects",
      "nav.resume": "Resume",
      "nav.contact": "Contact",
      "hero.title": "Hi, I'm Pooriya — a creative technologist.",
      "hero.subtitle": "Crafting interactive digital experiences with style and precision.",
      "hero.cta": "See My Work",
      "about.title": "About Me",
      "about.content": "I’ve always been fascinated by technology and creativity...",
      "projects.title": "Projects",
      "resume.title": "Resume",
      "resume.download": "Download PDF",
      "contact.title": "Contact"
    },
    de: {
      "nav.home": "Startseite",
      "nav.about": "Über mich",
      "nav.projects": "Projekte",
      "nav.resume": "Lebenslauf",
      "nav.contact": "Kontakt",
      "hero.title": "Hi, ich bin Pooriya — ein kreativer Technologe.",
      "hero.subtitle": "Interaktive digitale Erlebnisse mit Stil und Präzision gestalten.",
      "hero.cta": "Meine Arbeit ansehen",
      "about.title": "Über mich",
      "about.content": "Ich war schon immer fasziniert von Technologie und Kreativität...",
      "projects.title": "Projekte",
      "resume.title": "Lebenslauf",
      "resume.download": "PDF herunterladen",
      "contact.title": "Kontakt"
    },
    fa: {
      "nav.home": "خانه",
      "nav.about": "درباره من",
      "nav.projects": "پروژه‌ها",
      "nav.resume": "رزومه",
      "nav.contact": "تماس",
      "hero.title": "سلام، من پوریام — یک تکنولوژیست خلاق.",
      "hero.subtitle": "خلق تجربه‌های دیجیتال تعاملی با دقت و زیبایی.",
      "hero.cta": "نمونه‌کارها",
      "about.title": "درباره من",
      "about.content": "من همیشه به تکنولوژی و خلاقیت علاقه‌مند بودم...",
      "projects.title": "پروژه‌ها",
      "resume.title": "رزومه",
      "resume.download": "دانلود PDF",
      "contact.title": "تماس"
    },
    fr: {
      "nav.home": "Accueil",
      "nav.about": "À propos",
      "nav.projects": "Projets",
      "nav.resume": "CV",
      "nav.contact": "Contact",
      "hero.title": "Salut, je suis Pooriya — un technologue créatif.",
      "hero.subtitle": "Créer des expériences numériques interactives avec style et précision.",
      "hero.cta": "Voir mes projets",
      "about.title": "À propos de moi",
      "about.content": "J'ai toujours été passionné par la technologie et la créativité...",
      "projects.title": "Projets",
      "resume.title": "CV",
      "resume.download": "Télécharger le PDF",
      "contact.title": "Contact"
    }
  };

  function applyLanguage(lang) {
    i18nKeys.forEach((el) => {
      const key = el.dataset.i18n;
      if (i18n[lang] && i18n[lang][key]) {
        el.textContent = i18n[lang][key];
      }
    });
    renderProjects(lang);
  }

  applyLanguage(currentLang);

  langSelect.addEventListener("change", (e) => {
    const lang = e.target.value;
    localStorage.setItem("lang", lang);
    applyLanguage(lang);
  });
});
