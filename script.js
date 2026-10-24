(() => {
  const toggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.main-nav');
  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      const open = toggle.getAttribute('aria-expanded') !== 'true';
      toggle.setAttribute('aria-expanded', String(open));
      toggle.setAttribute('aria-label', open ? 'Fermer le menu' : 'Ouvrir le menu');
      nav.classList.toggle('is-open', open);
    });
    nav.addEventListener('click', event => {
      if (event.target.closest('a')) {
        nav.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
        toggle.setAttribute('aria-label', 'Ouvrir le menu');
      }
    });
  }
  const stars = document.querySelector('.stars');
  if (stars && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    // A small number of decorative stars, created locally without external assets.
    for (let i = 0; i < 26; i++) {
      const star = document.createElement('span');
      star.className = 'extra-star';
      star.setAttribute('aria-hidden', 'true');
      star.style.cssText = `position:absolute;left:${(i * 37 + 11) % 100}%;top:${(i * 53 + 7) % 90}%;width:${i % 7 === 0 ? 3 : 2}px;height:${i % 7 === 0 ? 3 : 2}px;border-radius:50%;background:#eeeaff;opacity:${0.25 + (i % 6) * 0.1};animation:twinkle ${4 + (i % 5)}s ease-in-out ${(i % 4) * -1}s infinite alternate`;
      stars.appendChild(star);
    }
  }
})();
