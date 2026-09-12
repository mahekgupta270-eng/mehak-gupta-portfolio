const menuToggle = document.querySelector('.menu-toggle');
const mainNav = document.querySelector('.main-nav');
const themeToggle = document.querySelector('.theme-toggle');
const backToTop = document.querySelector('.back-to-top');

menuToggle.addEventListener('click', () => {
  const isOpen = mainNav.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(isOpen));
});

document.querySelectorAll('.main-nav a').forEach((link) => {
  link.addEventListener('click', () => {
    mainNav.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
  });
});

themeToggle.addEventListener('click', () => {
  const isLight = document.body.classList.toggle('light-theme');
  themeToggle.textContent = isLight ? '☀' : '◐';
  themeToggle.setAttribute('aria-label', isLight ? 'Switch to dark mode' : 'Switch to light mode');
});

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in-view');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach((element) => revealObserver.observe(element));

document.querySelectorAll('.filter-button').forEach((button) => {
  button.addEventListener('click', () => {
    document.querySelector('.filter-button.active').classList.remove('active');
    button.classList.add('active');
    const filter = button.dataset.filter;
    document.querySelectorAll('.project-card').forEach((card) => {
      card.classList.toggle('is-hidden', filter !== 'all' && card.dataset.category !== filter);
    });
  });
});

window.addEventListener('scroll', () => {
  backToTop.classList.toggle('visible', window.scrollY > 600);
  const sections = [...document.querySelectorAll('main section[id]')];
  const current = sections.find((section) => window.scrollY >= section.offsetTop - 180);
  document.querySelectorAll('.main-nav a').forEach((link) => {
    link.classList.toggle('active', current && link.getAttribute('href') === `#${current.id}`);
  });
});

backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

document.querySelector('.contact-form').addEventListener('submit', (event) => {
  event.preventDefault();
  const note = document.querySelector('.form-note');
  note.textContent = 'Thanks. This placeholder form is ready to connect to your email service.';
  event.target.reset();
});