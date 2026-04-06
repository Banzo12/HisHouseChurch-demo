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
    if (window.innerWidth <= 768) {
      e.preventDefault();
      dropdownParent.classList.toggle('open');
    }
  });
}

/* ---- Stats count-up animation ---- */
function animateCount(el) {
  const target   = parseInt(el.dataset.target, 10);
  const duration = 1800;
  const start    = performance.now();

  function step(now) {
    const elapsed  = now - start;
    const progress = Math.min(elapsed / duration, 1);
    const eased    = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.floor(eased * target).toLocaleString();
    if (progress < 1) requestAnimationFrame(step);
    else el.textContent = target.toLocaleString();
  }
  requestAnimationFrame(step);
}

const statNumbers = document.querySelectorAll('.stat-number');
if (statNumbers.length && 'IntersectionObserver' in window) {
  const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        statNumbers.forEach(animateCount);
        statsObserver.disconnect();
      }
    });
  }, { threshold: 0.4 });

  const strip = document.querySelector('.stats-strip');
  if (strip) statsObserver.observe(strip);
}

/* ====================================================
   SCROLL REVEAL — elements slide up & fade in
   ==================================================== */

/* 
  How it works:
  - Any element with class "reveal" starts invisible (opacity 0, shifted down 40px)
  - When it enters the viewport, the class "revealed" is added
  - CSS handles the smooth transition
  - Optional: add "reveal-delay-1" through "reveal-delay-4" to stagger children
*/

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('revealed');
      // Once revealed, stop watching it
      revealObserver.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.12,       // trigger when 12% of element is visible
  rootMargin: '0px 0px -40px 0px'  // trigger slightly before fully in view
});

// Watch every element that has the "reveal" class
document.querySelectorAll('.reveal').forEach(el => {
  revealObserver.observe(el);
});

window.addEventListener('DOMContentLoaded', () => {
  // Add reveal class to each hero child so they start hidden
  const heroChildren = document.querySelectorAll(
    '.hero-script, .hero h1, .hero-tagline, .hero-sub, .hero .btn-gap'
  );
  heroChildren.forEach(el => el.classList.add('reveal'));

  // Short timeout then trigger them all — stagger handled by CSS delays above
  setTimeout(() => {
    heroChildren.forEach(el => el.classList.add('revealed'));
  }, 100);
});