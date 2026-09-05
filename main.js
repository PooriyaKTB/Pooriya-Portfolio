// main.js

document.addEventListener("DOMContentLoaded", () => {
  const modeToggle = document.getElementById("mode-toggle");
  const body = document.body;
  const container = document.querySelector(".projects-container");

  // Mode toggle
  modeToggle.addEventListener("click", () => {
    body.classList.toggle("dark");
    const isDarkMode = body.classList.contains("dark");
    modeToggle.innerHTML = isDarkMode
      ? `<i class="fa-solid fa-sun"></i>`
      : `<i class="fa-solid fa-moon"></i>`;
    localStorage.setItem("mode", isDarkMode ? "dark" : "light");
  });

  // Load saved theme
  const savedMode = localStorage.getItem("mode");
  if (savedMode === "light") {
    body.classList.remove("dark");
    modeToggle.innerHTML = `<i class="fa-solid fa-moon"></i>`;
  }

  const pinnedProjects = [
    {
      name: "ThisAbility – EquiVerse",
      technologies: ["html5", "css3", "javascript"],
      description:
        "An accessibility-focused transport planning prototype exploring how personalised routing and real-time information can improve confidence and independence for people with disabilities. Presented at Google London HQ as part of the Tech4Positive Futures programme.",
      github: "https://github.com/PooriyaKTB/T4PF---ThisAbility",
      website: "https://t4pf-equiverse-thisability.netlify.app/",
      demo: "https://t4pf-thisability-mvp.netlify.app/",
    },
    {
      name: "Mentoro – Quiz App",
      technologies: ["react", "tailwindcss", "nodejs", "postgresql", "docker"],
      description:
        "A real-time quiz platform for interactive learning. Mentors host live quizzes with WebSocket-powered instant scoring, and students join to submit answers in real time.",
      github: "https://github.com/samirahekmati/quiz-app",
      demo: "https://mentoro.hosting.codeyourfuture.io/",
    },
    {
      name: "PiTranslate",
      technologies: [
        "javascript",
        "nodejs",
        "express",
        "firebase",
        "html5",
        "css3",
      ],
      description:
        "An AI-powered language-learning companion using the OpenAI API to generate translations, idioms, and example sentences, with spaced repetition review for personalised practice.",
      github: "https://github.com/PooriyaKTB/PiTranslate",
      demo: "https://pitranslate.netlify.app/",
    },
  ];

  function renderProjects() {
    container.innerHTML = "";
    pinnedProjects.forEach((repo) => {
      const card = document.createElement("div");
      card.className = "card project-card";

      const techIcons = repo.technologies
        .map(
          (tech) =>
            `<i class="devicon-${tech}-plain colored" title="${tech}"></i>`
        )
        .join("");

      card.innerHTML = `
        <div class="project-tech-stack">
          ${techIcons}
        </div>
        <div class="project-content">
        <h3>${repo.name}</h3>
          <p>${repo.description}</p>
        <div class="project-links">
            <a href="${
              repo.github
            }" class="project-link github" target="_blank">
            <i class="fa-brands fa-github"></i> GitHub
          </a>
            ${
              repo.website
                ? `<a href="${repo.website}" class="project-link website" target="_blank">
            <i class="fa-solid fa-globe"></i> Website
          </a>`
                : ""
            }
            ${
              repo.demo
                ? `<a href="${repo.demo}" class="project-link live" target="_blank">
            <i class="fa-solid fa-arrow-up-right-from-square"></i> Live Demo
          </a>`
                : ""
            }
          </div>
        </div>
      `;
      container.appendChild(card);
    });
  }

  renderProjects();

  // Typewriter effect on the hero heading
  const tw = document.querySelector(".typewriter");
  if (tw) {
    const typeText = tw.textContent;
    tw.textContent = "";
    let i = 0;
    function type() {
      if (i < typeText.length) {
        tw.textContent += typeText.charAt(i);
        i++;
        setTimeout(type, 40);
      }
    }
    setTimeout(type, 200);
  }

  // AJAX Contact Form Submission
  const contactForm = document.querySelector(".contact-form");
  const formSuccessMessage = document.getElementById("form-success");
  const formErrorMessage = document.getElementById("form-error");

  // Basic email validation regex
  const isValidEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();
      const form = e.target;
      const formData = new FormData(form);
      const submitButton = form.querySelector('button[type="submit"]');
      const originalButtonText = submitButton.textContent;

      // --- Client-side validation ---
      const name = formData.get("name").trim();
      const email = formData.get("_replyto").trim();
      const message = formData.get("message").trim();

      formErrorMessage.classList.remove("show"); // Hide previous errors

      if (!name || !email || !message) {
        formErrorMessage.textContent = "Please fill out all fields.";
        formErrorMessage.classList.add("show");
        return; // Stop the submission
      }

      if (!isValidEmail(email)) {
        formErrorMessage.textContent = "Please enter a valid email address.";
        formErrorMessage.classList.add("show");
        return; // Stop the submission
      }
      // --- End of validation ---

      // Disable button and show a sending state
      submitButton.disabled = true;
      submitButton.textContent = "Sending...";

      fetch(form.action, {
        method: form.method,
        body: formData,
        headers: {
          Accept: "application/json",
        },
      })
        .then((response) => {
          if (response.ok) {
            formSuccessMessage.classList.add("show");
            form.reset();
            setTimeout(() => {
              formSuccessMessage.classList.remove("show");
            }, 5000); // Hide after 5 seconds
          } else {
            // Handle server errors from Formspree
            response.json().then((data) => {
              if (Object.hasOwn(data, "errors")) {
                const errorMessages = data.errors
                  .map((error) => error.message)
                  .join(", ");
                formErrorMessage.textContent = `Error: ${errorMessages}`;
                formErrorMessage.classList.add("show");
              } else {
                formErrorMessage.textContent =
                  "An unexpected error occurred. Please try again.";
                formErrorMessage.classList.add("show");
              }
            });
          }
        })
        .catch((error) => {
          // Handle network errors
          formErrorMessage.textContent =
            "A network error occurred. Please check your connection and try again.";
          formErrorMessage.classList.add("show");
          console.error("Form submission network error:", error);
        })
        .finally(() => {
          // Re-enable the button and restore its original text
          submitButton.disabled = false;
          submitButton.textContent = originalButtonText;
        });
    });
  }

  // Calendly pop-up logic
  const calendlyLink = document.getElementById("calendly-link");
  if (calendlyLink) {
    calendlyLink.addEventListener("click", function (e) {
      e.preventDefault();
      Calendly.initPopupWidget({
        url: "https://calendly.com/pooriya-ketabi/online-meeting",
      });
    });
  }

  // Reveal-on-scroll. Progressive enhancement only: elements are visible by
  // default, and only get the fade-in treatment once JS opts them in, so a
  // script failure or an unsupported browser never leaves content hidden.
  if ("IntersectionObserver" in window) {
    const revealTargets = document.querySelectorAll(
      "#about, #projects, #resume, #contact, .card, .contact-form, .cta-button"
    );
    revealTargets.forEach((el) => el.classList.add("reveal"));

    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    revealTargets.forEach((el) => observer.observe(el));
  }
});

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("./service-worker.js")
      .then((reg) => console.log("✅ Service Worker registered:", reg))
      .catch((err) => console.error("❌ SW registration failed:", err));
  });
}
