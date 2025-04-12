// Dark mode toggle
const toggle = document.getElementById('mode-toggle');
const body = document.body;

toggle.addEventListener('click', () => {
  body.classList.toggle('dark-mode');
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
  })
  .catch(err => {
    document.getElementById('project-list').textContent = 'Failed to load projects.';
    console.error('Error loading projects:', err);
  });

// Scroll animation
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

// Hero typewriter effect
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
