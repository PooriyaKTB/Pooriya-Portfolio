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
    localStorage.setItem("mode", body.classList.contains("dark") ? "dark" : "light");
  });

  // Load saved theme
  const savedMode = localStorage.getItem("mode");
  if (savedMode === "dark") {
    body.classList.add("dark");
    modeToggle.textContent = "☀️";
  }

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
          <a href="${repo.github}" class="project-btn github" target="_blank">
            <i class="fa-brands fa-github"></i> GitHub
          </a>
          ${repo.demo ? `<a href="${repo.demo}" class="project-btn live" target="_blank">
            <i class="fa-solid fa-arrow-up-right-from-square"></i> Live Demo
          </a>` : ""}
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
      "about.content": "Self-taught technologist with a passion for code.",
      "projects.title": "Projects",
      "resume.title": "Resume",
      "resume.download": "Download PDF",
      "contact.title": "Contact",
      "form.name": "Name",
      "form.email": "Email",
      "form.message": "Message",
      "form.send": "Send",
      "form.success": "Your message was sent successfully!"
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
      "about.content": "Autodidaktischer Entwickler mit Leidenschaft für Code.",
      "projects.title": "Projekte",
      "resume.title": "Lebenslauf",
      "resume.download": "PDF herunterladen",
      "contact.title": "Kontakt",
      "form.name": "Name",
      "form.email": "E-Mail",
      "form.message": "Nachricht",
      "form.send": "Senden",
      "form.success": "Ihre Nachricht wurde erfolgreich gesendet!"
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
      "about.content": "برنامه‌نویس خودآموخته با عشق به کدنویسی.",
      "projects.title": "پروژه‌ها",
      "resume.title": "رزومه",
      "resume.download": "دانلود PDF",
      "contact.title": "تماس",
      "form.name": "نام",
      "form.email": "ایمیل",
      "form.message": "پیام",
      "form.send": "ارسال",
      "form.success": "پیام شما با موفقیت ارسال شد!"
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
      "about.content": "Développeur autodidacte passionné de code.",
      "projects.title": "Projets",
      "resume.title": "CV",
      "resume.download": "Télécharger le PDF",
      "contact.title": "Contact",
      "form.name": "Nom",
      "form.email": "Email",
      "form.message": "Message",
      "form.send": "Envoyer",
      "form.success": "Votre message a été envoyé avec succès !"
    }
  };

  function applyLanguage(lang) {
    document.querySelectorAll("[data-i18n]").forEach(el => {
      if (el.classList.contains("typewriter")) return;
      const key = el.dataset.i18n;
      if (i18n[lang] && i18n[lang][key]) el.textContent = i18n[lang][key];
    });
    renderProjects(lang);

    // Apply typewriter after i18n content load
    setTimeout(() => {
      const tw = document.querySelector(".typewriter");
      const typeText = i18n[lang]["hero.title"];
      tw.textContent = "";
      let i = 0;
      function type() {
        if (i < typeText.length) {
          tw.textContent += typeText.charAt(i);
          i++;
          setTimeout(type, 40);
        }
      }
      type();
    }, 200);
  }

  const lang = localStorage.getItem("lang") || "en";
  langSelect.value = lang;
  applyLanguage(lang);

  langSelect.addEventListener("change", (e) => {
    const newLang = e.target.value;
    localStorage.setItem("lang", newLang);
    applyLanguage(newLang);
  });

  const contactForm = document.querySelector(".contact-form");
  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();
      const form = this;
      fetch(form.action, {
        method: "POST",
        body: new FormData(form),
        headers: { Accept: "application/json" }
      }).then(res => {
        if (res.ok) {
          const successMsg = document.getElementById("form-success");
          successMsg.classList.add("show");
          form.reset();
        
          setTimeout(() => {
            successMsg.classList.remove("show");
          }, 5000); 
        }
      });
    });
  }
  // ScrollReveal animations
  ScrollReveal().reveal('#hero', {
    origin: 'top',
    distance: '80px',
    duration: 1000,
    delay: 100
  });
  ScrollReveal().reveal('#about', {
    origin: 'left',
    distance: '50px',
    duration: 1000,
    delay: 200
  });
  ScrollReveal().reveal('#projects', {
    origin: 'bottom',
    distance: '60px',
    duration: 1000,
    delay: 300
  });
  ScrollReveal().reveal('#resume', {
    origin: 'right',
    distance: '50px',
    duration: 1000,
    delay: 400
  });
  ScrollReveal().reveal('#contact', {
    origin: 'bottom',
    distance: '50px',
    duration: 1000,
    delay: 500
  });
  ScrollReveal().reveal('.card', {
    origin: 'bottom',
    distance: '30px',
    duration: 800,
    interval: 150
  });
  ScrollReveal().reveal('.cta-button', {
    origin: 'top',
    distance: '20px',
    duration: 800,
    delay: 600
  });
  ScrollReveal().reveal('.contact-form', {
    origin: 'bottom',
    distance: '40px',
    duration: 1000,
    delay: 600
  });
});

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./service-worker.js')
      .then(reg => console.log('✅ Service Worker registered:', reg))
      .catch(err => console.error('❌ SW registration failed:', err));
  });
}
