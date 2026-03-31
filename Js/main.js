/* ===========================================
   HIS HOUSE CHURCH — main.js
   =========================================== */

/* ---- Navbar scroll shadow ---- */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
});

/* ---- Hamburger toggle ---- */
const hamburger = document.getElementById('hamburger');
const navMenu   = document.getElementById('navMenu');
hamburger.addEventListener('click', () => {
  navMenu.classList.toggle('open');
  hamburger.setAttribute('aria-expanded', navMenu.classList.contains('open'));
});

/* ---- Mobile: tap About to toggle its dropdown ---- */
const dropdownParent = document.querySelector('.nav-item-dropdown');
if (dropdownParent) {
  const dropdownTrigger = dropdownParent.querySelector('.nav-link-dropdown');
  dropdownTrigger.addEventListener('click', (e) => {
    // Only intercept on mobile (hamburger visible)
    if (window.innerWidth <= 768) {
      e.preventDefault();
      dropdownParent.classList.toggle('open');
    }
  });
}

/* ---- Stats count-up animation ---- */
function animateCount(el) {
  const target   = parseInt(el.dataset.target, 10);
  const duration = 1800; // ms
  const start    = performance.now();

  function step(now) {
    const elapsed  = now - start;
    const progress = Math.min(elapsed / duration, 1);
    // Ease-out cubic
    const eased    = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.floor(eased * target).toLocaleString();
    if (progress < 1) requestAnimationFrame(step);
    else el.textContent = target.toLocaleString();
  }
  requestAnimationFrame(step);
}

/* Trigger count-up when stats strip enters viewport */
const statNumbers = document.querySelectorAll('.stat-number');
if (statNumbers.length && 'IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        statNumbers.forEach(animateCount);
        observer.disconnect();
      }
    });
  }, { threshold: 0.4 });

  const strip = document.querySelector('.stats-strip');
  if (strip) observer.observe(strip);
}
