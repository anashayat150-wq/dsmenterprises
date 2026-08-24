// DSM Enterprises — site interactions
(function () {
  'use strict';

  // Footer year
  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Mobile nav toggle
  var toggle = document.getElementById('navToggle');
  var nav = document.getElementById('mainNav');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var isOpen = nav.classList.toggle('open');
      toggle.classList.toggle('open', isOpen);
      toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });

    // Close menu after tapping a link (mobile)
    nav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        nav.classList.remove('open');
        toggle.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // Header background solidifies on scroll
  var header = document.querySelector('.site-header');
  var onScroll = function () {
    if (!header) return;
    if (window.scrollY > 12) {
      header.style.background = 'rgba(18,22,26,0.92)';
    } else {
      header.style.background = 'rgba(18,22,26,0.72)';
    }
  };
  document.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Subtle entrance for cards already in view + as they scroll in,
  // with a safety fallback so content is never left invisible.
  var revealTargets = document.querySelectorAll(
    '.service-card, .why-item, .gallery-item'
  );
  revealTargets.forEach(function (el) {
    el.classList.add('reveal', 'reveal-armed');
  });

  if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );
    revealTargets.forEach(function (el) { observer.observe(el); });
  } else {
    revealTargets.forEach(function (el) { el.classList.add('in-view'); });
  }

  // Safety net: guarantee visibility even if the observer never fires
  window.setTimeout(function () {
    revealTargets.forEach(function (el) { el.classList.add('in-view'); });
  }, 2500);
})();

