// Contact form, Calendly popup, and removal of the old service worker.

document.addEventListener("DOMContentLoaded", () => {
  // Mobile menu: the toggle is only visible below 640px.
  const navToggle = document.getElementById("navToggle");
  const siteNav = document.getElementById("siteNav");
  if (navToggle && siteNav) {
    const setOpen = (open) => {
      siteNav.classList.toggle("is-open", open);
      navToggle.setAttribute("aria-expanded", String(open));
      navToggle.textContent = open ? "Close" : "Menu";
    };
    navToggle.addEventListener("click", () => setOpen(!siteNav.classList.contains("is-open")));
    siteNav.querySelectorAll("a").forEach((link) => link.addEventListener("click", () => setOpen(false)));
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && siteNav.classList.contains("is-open")) {
        setOpen(false);
        navToggle.focus();
      }
    });
    document.addEventListener("click", (e) => {
      if (!siteNav.contains(e.target) && e.target !== navToggle) setOpen(false);
    });
  }

  // Stack: clicking a linked technology highlights the projects that use a technology and scroll to the first one.
  // Without JS each one is a plain anchor link to its first project.
  const techLinks = document.querySelectorAll(".tech[data-projects]");
  const cases = document.querySelectorAll(".case");
  const filterNote = document.getElementById("filterNote");
  const filterName = document.getElementById("filterName");
  const filterClear = document.getElementById("filterClear");
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const clearFilter = () => {
    techLinks.forEach((c) => c.classList.remove("is-active"));
    cases.forEach((c) => c.classList.remove("is-dim", "is-match"));
    if (filterNote) filterNote.hidden = true;
  };

  techLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const ids = link.dataset.projects.split(" ");
      clearFilter();
      link.classList.add("is-active");
      cases.forEach((c) => c.classList.add(ids.includes(c.id) ? "is-match" : "is-dim"));
      if (filterNote) {
        filterName.textContent = link.textContent;
        filterNote.hidden = false;
      }
      const first = document.getElementById(ids[0]);
      if (first) first.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });
    });
  });

  if (filterClear) {
    filterClear.addEventListener("click", () => {
      clearFilter();
      document.getElementById("work").scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth" });
    });
  }

  // Open Calendly as a popup when its script has loaded; otherwise the link works normally.
  const bookBtn = document.getElementById("bookMeetingBtn");
  if (bookBtn) {
    bookBtn.addEventListener("click", (e) => {
      if (window.Calendly) {
        e.preventDefault();
        window.Calendly.initPopupWidget({ url: bookBtn.href });
      }
    });
  }

  // Contact form: submit to Formspree without leaving the page.
  const form = document.getElementById("contactForm");
  const status = document.getElementById("cf-status");
  const submitBtn = document.getElementById("cf-submit");
  if (!form) return;

  const setStatus = (message, tone) => {
    status.textContent = message;
    status.classList.remove("is-error", "is-success");
    if (tone) status.classList.add(tone);
  };

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const data = new FormData(form);
    const name = data.get("name").trim();
    const email = data.get("email").trim();
    const message = data.get("message").trim();

    if (!name || !email || !message) {
      setStatus("Please fill in all fields.", "is-error");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setStatus("Please enter a valid email address.", "is-error");
      return;
    }

    submitBtn.disabled = true;
    setStatus("Sending...", null);

    try {
      const response = await fetch(form.action, {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });
      if (response.ok) {
        form.reset();
        setStatus("Thanks, your message has been sent.", "is-success");
      } else {
        const body = await response.json().catch(() => null);
        const errors = body && body.errors ? body.errors.map((err) => err.message).join(", ") : "";
        setStatus(errors || "Something went wrong. Please try again or email me directly.", "is-error");
      }
    } catch {
      setStatus("Network error. Please check your connection and try again.", "is-error");
    } finally {
      submitBtn.disabled = false;
    }
  });
});

// Earlier versions of the site registered a caching service worker that could keep serving
// stale pages. Unregister any that are still installed.
if ("serviceWorker" in navigator) {
  navigator.serviceWorker.getRegistrations().then((regs) => regs.forEach((reg) => reg.unregister()));
}
