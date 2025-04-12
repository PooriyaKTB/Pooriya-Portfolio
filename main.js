const toggle = document.getElementById('mode-toggle');
const body = document.body;

toggle.addEventListener('click', () => {
  body.classList.toggle('dark-mode');
  setTimeout(applyTilt, 300);
});

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

    applyTilt();
  })
  .catch(err => {
    console.error('Error loading projects:', err);
    const container = document.getElementById('project-list');
    container.innerHTML = `
      <div class="project">
        <h3>Example Project</h3>
        <p>This is a placeholder project shown because projects couldn't be loaded.</p>
      </div>
    `;
  });

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

// Typewriter
const heroText = "Creative Developer in Training";
let i = 0;
const h2 = document.querySelector(".hero h2");

window.addEventListener('DOMContentLoaded', () => {
  h2.textContent = '';
  typeWriter();
});

function typeWriter() {
  if (i < heroText.length) {
    h2.textContent += heroText.charAt(i);
    i++;
    setTimeout(typeWriter, 80);
  }
}

// Hamburger nav
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');
hamburger.addEventListener('click', () => {
  const expanded = navLinks.classList.toggle('show');
  hamburger.setAttribute('aria-expanded', expanded);
});

// Tilt effect
function applyTilt() {
  const isDark = body.classList.contains('dark-mode');
  VanillaTilt.init(document.querySelectorAll(".project"), {
    max: isDark ? 15 : 6,
    speed: 400,
    glare: true,
    "max-glare": isDark ? 0.35 : 0.15
  });
}
