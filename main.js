// main.js

document.addEventListener("DOMContentLoaded", () => {
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const hoverCapable = window.matchMedia("(hover: hover)").matches;

  /* Mobile nav */
  const navToggle = document.getElementById("navToggle");
  const siteNav = document.getElementById("siteNav");
  if (navToggle && siteNav) {
    const closeNav = () => {
      siteNav.classList.remove("is-open");
      navToggle.setAttribute("aria-expanded", "false");
    };
    navToggle.addEventListener("click", (e) => {
      e.stopPropagation();
      const open = siteNav.classList.toggle("is-open");
      navToggle.setAttribute("aria-expanded", open);
    });
    siteNav.querySelectorAll("a").forEach((a) => a.addEventListener("click", closeNav));
    document.addEventListener("click", (e) => {
      if (siteNav.classList.contains("is-open") && !siteNav.contains(e.target) && e.target !== navToggle) {
        closeNav();
      }
    });
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") closeNav();
    });
  }

  /* Typewriter effect on the hero heading */
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

  /* Reveal on scroll */
  const revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, i) => {
          if (entry.isIntersecting) {
            setTimeout(() => entry.target.classList.add("is-visible"), (i * 60) % 240);
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -60px 0px" }
    );
    revealEls.forEach((el) => io.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add("is-visible"));
  }

  /* Scroll progress bar */
  const progressFill = document.getElementById("progressFill");
  function updateProgress() {
    const h = document.documentElement.scrollHeight - window.innerHeight;
    const pct = h > 0 ? (window.scrollY / h) * 100 : 0;
    progressFill.style.width = Math.min(100, Math.max(0, pct)) + "%";
  }
  if (progressFill) {
    window.addEventListener("scroll", updateProgress, { passive: true });
    updateProgress();
  }

  /* Cursor glow */
  const cursorGlow = document.getElementById("cursorGlow");
  if (cursorGlow && hoverCapable && !reduceMotion) {
    let gx = window.innerWidth / 2,
      gy = window.innerHeight / 2,
      cx = gx,
      cy = gy;
    window.addEventListener("mousemove", (e) => {
      gx = e.clientX;
      gy = e.clientY;
      cursorGlow.style.opacity = "1";
    });
    (function loop() {
      cx += (gx - cx) * 0.12;
      cy += (gy - cy) * 0.12;
      cursorGlow.style.left = cx + "px";
      cursorGlow.style.top = cy + "px";
      requestAnimationFrame(loop);
    })();
  }

  /* Magnetic buttons */
  if (hoverCapable && !reduceMotion) {
    document.querySelectorAll(".btn, .btn-primary").forEach((btn) => {
      btn.addEventListener("mousemove", (e) => {
        const r = btn.getBoundingClientRect();
        const x = (e.clientX - r.left - r.width / 2) * 0.18;
        const y = (e.clientY - r.top - r.height / 2) * 0.28;
        btn.style.transform = "translate(" + x + "px," + y + "px)";
      });
      btn.addEventListener("mouseleave", () => {
        btn.style.transform = "";
      });
    });
  }

  /* Spotlight cards */
  if (hoverCapable) {
    document.querySelectorAll(".spot-card").forEach((card) => {
      card.addEventListener("mousemove", (e) => {
        const r = card.getBoundingClientRect();
        card.style.setProperty("--mx", e.clientX - r.left + "px");
        card.style.setProperty("--my", e.clientY - r.top + "px");
      });
    });
  }

  /* Book a meeting — open Calendly as an in-page popup instead of a new tab */
  const bookBtn = document.getElementById("bookMeetingBtn");
  if (bookBtn) {
    bookBtn.addEventListener("click", (e) => {
      if (window.Calendly) {
        e.preventDefault();
        window.Calendly.initPopupWidget({ url: "https://calendly.com/pooriya-ketabi/online-meeting" });
      }
      // if the Calendly script hasn't loaded yet, the link still works as a normal fallback
    });
  }

  /* Contact form — AJAX submit to Formspree with inline validation and status */
  const contactForm = document.getElementById("contactForm");
  const statusNote = document.getElementById("cf-status");
  const submitBtn = document.getElementById("cf-submit");

  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  function setStatus(message, tone) {
    if (!statusNote) return;
    statusNote.textContent = message;
    statusNote.classList.remove("is-error", "is-success");
    if (tone) statusNote.classList.add(tone);
  }

  if (contactForm) {
    const defaultStatus = statusNote ? statusNote.textContent : "";

    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const form = e.target;
      const formData = new FormData(form);
      const name = formData.get("name").trim();
      const email = formData.get("email").trim();
      const message = formData.get("message").trim();

      if (!name || !email || !message) {
        setStatus("Please fill out all fields.", "is-error");
        return;
      }
      if (!isValidEmail(email)) {
        setStatus("Please enter a valid email address.", "is-error");
        return;
      }

      submitBtn.disabled = true;
      const originalLabel = submitBtn.textContent;
      submitBtn.textContent = "Sending…";
      setStatus("Sending your message…", null);

      fetch(form.action, {
        method: form.method,
        body: formData,
        headers: { Accept: "application/json" },
      })
        .then((response) => {
          if (response.ok) {
            form.reset();
            setStatus("Thanks — your message is on its way.", "is-success");
            setTimeout(() => setStatus(defaultStatus, null), 5000);
          } else {
            response.json().then((data) => {
              const errorMessages =
                data && data.errors ? data.errors.map((error) => error.message).join(", ") : null;
              setStatus(errorMessages || "Something went wrong. Please try again.", "is-error");
            });
          }
        })
        .catch(() => {
          setStatus("Network error — please check your connection and try again.", "is-error");
        })
        .finally(() => {
          submitBtn.disabled = false;
          submitBtn.textContent = originalLabel;
        });
    });
  }
});

/* PWA service worker registration */
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("./service-worker.js")
      .then((reg) => console.log("✅ Service Worker registered:", reg))
      .catch((err) => console.error("❌ SW registration failed:", err));
  });
}
