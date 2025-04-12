const toggle = document.getElementById('mode-toggle');
const body = document.body;

toggle.addEventListener('click', () => {
  body.classList.toggle('dark-mode');
  setTimeout(applyTilt, 300); // Reapply tilt on mode toggle
});

// Load projects
fetch('data/projects.json')
  .then(res => res.json())
  .then(projects => {
    const container = document.getElementById('project-list');
    container.innerHTML = '';

    projects.forEach(project => {
      const item = document.createElement('div');
      item.classList.add('project');

      item.innerHTML = `
        <h3>${project.title}</h3>
        <p>${project.description}</p>
        ${project.link ? `<a href="${project.link}" target="_blank">View Project</a>` : ''}
      `;

      container.appendChild(item);
    });

    applyTilt(); // after cards are loaded
  })
  .catch(err => {
    document.getElementById('project-list').textContent = 'Failed to load projects.';
    console.error('Error loading projects:', err);
  });

// Reveal on scroll
function revealOnScroll() {
  document.querySelectorAll('section').forEach(section => {
    const rect = section.getBoundingClientRect();
    if (rect.top < window.innerHeight - 100) {
      section.classList.add('visible');
    }
  });
}
window.addEventListener('scroll', revealOnScroll);
window.addEventListener('load', revealOnScroll);

// Typewriter effect
const heroText = "Creative Developer in Training";
let i = 0;
const h2 = document.querySelector(".hero h2");

function typeWriter() {
  if (i < heroText.length) {
    h2.textContent += heroText.charAt(i);
    i++;
    setTimeout(typeWriter, 80);
  }
}
window.addEventListener('load', () => {
  h2.textContent = '';
  typeWriter();
});

// Hamburger nav
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');
hamburger.addEventListener('click', () => {
  const expanded = navLinks.classList.toggle('show');
  hamburger.setAttribute('aria-expanded', expanded);
});

// Tilt effect (applied per mode)
function applyTilt() {
  const isDark = body.classList.contains('dark-mode');
  VanillaTilt.init(document.querySelectorAll(".project"), {
    max: isDark ? 15 : 6,
    speed: 400,
    glare: true,
    "max-glare": isDark ? 0.35 : 0.15
  });
}
