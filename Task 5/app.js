// Task 5 — Mobile menu toggle with ARIA, ESC to close, and auto-close on link click

const btn  = document.getElementById('menuToggle');
const nav  = document.getElementById('siteNav');
const links = nav.querySelectorAll('a');

function openMenu() {
  nav.classList.add('open');
  btn.setAttribute('aria-expanded', 'true');
  btn.setAttribute('aria-label', 'Close main menu');
}

function closeMenu() {
  nav.classList.remove('open');
  btn.setAttribute('aria-expanded', 'false');
  btn.setAttribute('aria-label', 'Open main menu');
}

btn.addEventListener('click', () => {
  const isOpen = nav.classList.contains('open');
  isOpen ? closeMenu() : openMenu();
});

// Close when a nav link is clicked (mobile)
links.forEach(a => a.addEventListener('click', closeMenu));

// Close on ESC
window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeMenu();
});

// Close if you click outside the open panel (mobile only)
document.addEventListener('click', (e) => {
  if (!nav.classList.contains('open')) return;
  const inside = nav.contains(e.target) || btn.contains(e.target);
  if (!inside) closeMenu();
});
