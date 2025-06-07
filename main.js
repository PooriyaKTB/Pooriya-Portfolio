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
      "hero.title": "Hi, I'm Pooriya | Full-Stack Software Developer.",
      "hero.subtitle": "Solving complex problems by delivering clear and effective software solutions.",
      "hero.cta": "See My Work",
      "about.title": "About Me",
      "about.content": "My passion for technology started early, exploring computers like the Commodore 64 and MS-DOS, always curious to understand how things work behind the scenes. That curiosity eventually grew into a strong interest in software development. Since then, I've taught myself full-stack development and built several applications using JavaScript, Node.js, and REST APIs. I care deeply about writing clean, accessible, and reliable code that works well for users. I'm also continuing to expand my skills in backend engineering and AWS as I take on more advanced challenges.",
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
      "hero.title": "Hallo, ich bin Pooriya | Full-Stack-Entwickler.",
      "hero.subtitle": "Komplexe Herausforderungen in durchdachte Softwarelösungen verwandeln.",
      "hero.cta": "Meine Arbeit ansehen",
      "about.title": "Über mich",
      "about.content": "Meine Leidenschaft für Technologie begann schon früh, als ich Computer wie den Commodore 64 und MS-DOS erkundete und stets neugierig war, zu verstehen, wie die Dinge im Hintergrund funktionieren. Diese Neugier entwickelte sich schließlich zu einem starken Interesse an der Softwareentwicklung. Seitdem habe ich mir Full-Stack-Entwicklung selbst beigebracht und mehrere Anwendungen mit JavaScript, Node.js und REST-APIs gebaut. Es ist mir sehr wichtig, sauberen, zugänglichen und zuverlässigen Code zu schreiben, der gut für die Benutzer funktioniert. Aktuell erweitere ich außerdem meine Kenntnisse in Backend-Engineering und AWS, während ich mich neuen, anspruchsvolleren Herausforderungen stelle.",
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
      "hero.title": "سلام، من پوریاهستم | توسعه‌دهنده فول‌استک نرم‌افزار.",
      "hero.subtitle": "حل مسائل پیچیده با ارائه راهکارهای نرم‌افزاری شفاف و مؤثر.",
      "hero.cta": "نمونه‌کارها",
      "about.title": "درباره من",
      "about.content": "علاقهٔ من به فناوری از سنین پایین آغاز شد؛ همیشه کنجکاو بودم بدانم  کامپیوترها پشت صحنه چگونه کار می‌کنند. این کنجکاوی به‌تدریج به علاقه‌ای جدی به توسعهٔ نرم‌افزار تبدیل شد. از آن زمان تاکنون، به‌صورت خودآموز توسعهٔ فول‌استک را آموخته‌ام و چندین برنامه پیاده‌سازی کرده‌ام. برای من بسیار مهم است که کدی تمیز، قابل‌دسترس و قابل‌اعتماد بنویسم که تجربهٔ کاربری خوبی ارائه دهد. همچنین در حال گسترش مهارت‌هایم هستم و با چالش‌های پیشرفته‌تری روبه‌رو می‌شوم.",
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
      "hero.title": "Bonjour, je suis Pooriya | développeur logiciel full-stack.",
      "hero.subtitle": "Transformer des défis complexes en solutions logicielles efficaces et élégantes.",
      "hero.cta": "Voir mes projets",
      "about.title": "À propos de moi",
      "about.content": "Ma passion pour la technologie a commencé très tôt, en explorant des ordinateurs comme le Commodore 64 et MS-DOS, toujours animé par la curiosité de comprendre comment les choses fonctionnent en coulisses. Cette curiosité s'est ensuite transformée en un véritable intérêt pour le développement logiciel. Depuis, j'ai appris le développement full-stack en autodidacte et j'ai construit plusieurs applications en utilisant JavaScript, Node.js et des API REST. J'accorde beaucoup d'importance à l'écriture d'un code propre, accessible et fiable, qui offre une bonne expérience utilisateur. Je continue également à développer mes compétences en ingénierie backend et sur AWS en relevant des défis plus avancés.",
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
